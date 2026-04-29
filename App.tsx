import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { collection, onSnapshot, query, setDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { db, auth, handleFirestoreError, OperationType, googleProvider } from './lib/firebase';
import { Package, ArrowRight, Smartphone, X, Mail } from 'lucide-react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { RepairServices } from './pages/RepairServices';
import { Wholesale } from './pages/Wholesale';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Shop } from './pages/Shop';
import { MobileParts } from './pages/MobileParts';
import { Accessories } from './pages/Accessories';
import { Cart } from './pages/Cart';
import { Terms, Privacy, Refund, Shipping } from './pages/Legal';
import { OrderHistory } from './pages/OrderHistory';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { MOBILE_PARTS, ACCESSORIES } from './constants';
import { User, Order, Product } from './types';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('tejas_user_session');
    return saved ? JSON.parse(saved) : null;
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('tejas_admin_session') === 'active';
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showProfileUpdate, setShowProfileUpdate] = useState(false);
  const [tempGoogleUser, setTempGoogleUser] = useState<any>(null);

  // Auth State Listener (for Admin)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        if (firebaseUser.email === 'niteshk142udhd@gmail.com') {
          setIsAdminLoggedIn(true);
          localStorage.setItem('tejas_admin_session', 'active');
        }
        
        // If logged in via Google but no local session, try to fetch from Firestore
        if (!user) {
          const userSnap = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userSnap.exists()) {
            const userData = userSnap.data() as User;
            setUser(userData);
            localStorage.setItem('tejas_user_session', JSON.stringify(userData));
          } else if (firebaseUser.providerData[0]?.providerId === 'google.com') {
             // Google user but no Firestore profile - trigger update
             setTempGoogleUser(firebaseUser);
             setShowProfileUpdate(true);
          }
        }
      } else {
        // Only clear if not manually set in localStorage
        if (localStorage.getItem('tejas_admin_session') !== 'active') {
          setIsAdminLoggedIn(false);
        }
      }
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, [user]);

  // 5-second popup timer
  useEffect(() => {
    if (isAuthReady && !user && !isAdminLoggedIn) {
      const timer = setTimeout(() => {
        const hasSeenPopup = sessionStorage.getItem('has_seen_google_popup');
        if (!hasSeenPopup) {
          setShowGoogleModal(true);
          sessionStorage.setItem('has_seen_google_popup', 'true');
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isAuthReady, user, isAdminLoggedIn]);

  // Real-time products listener
  useEffect(() => {
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData: Product[] = [];
      snapshot.forEach((doc) => {
        productsData.push(doc.data() as Product);
      });
      setProducts(productsData);
      setIsLoadingProducts(false);
    }, (error) => {
      // Don't throw for products list, just log
      console.warn('Products list restricted or unavailable:', error.message);
      setIsLoadingProducts(false);
    });

    return () => unsubscribe();
  }, []);

  // Auto-seed if empty and admin is logged in
  useEffect(() => {
    if (isAdminLoggedIn && products.length === 0 && !isLoadingProducts && isAuthReady) {
      seedDatabase();
    }
  }, [isAdminLoggedIn, products.length, isLoadingProducts, isAuthReady]);

  // Real-time orders listener
  useEffect(() => {
    const q = query(collection(db, 'orders'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData: Order[] = [];
      snapshot.forEach((doc) => {
        ordersData.push(doc.data() as Order);
      });
      setOrders(ordersData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }, (error) => {
      // Non-admin users might get permission error here if they are listing all orders
      // In a real app, we'd filter this by user, but let's handle it gracefully
      console.warn('Orders listener restricted:', error.message);
    });

    return () => unsubscribe();
  }, []);

  const seedDatabase = async () => {
    if (!isAdminLoggedIn) return; // Only admin can seed
    const allInitialProducts = [...MOBILE_PARTS, ...ACCESSORIES];
    try {
      for (const product of allInitialProducts) {
        await setDoc(doc(db, 'products', product.id), product);
      }
      setNotification("Database seeded with default products!");
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Seeding failed:', error);
      handleFirestoreError(error, OperationType.WRITE, 'products');
    }
  };

  const addToCart = (productId: string) => {
    setCart((prev) => [...prev, productId]);
    setNotification("Item added to cart successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('tejas_user_session', JSON.stringify(userData));
    setNotification(`Welcome back, ${userData.name}!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setIsAdminLoggedIn(false);
      localStorage.removeItem('tejas_admin_session');
      localStorage.removeItem('tejas_user_session');
      setNotification("Logged out successfully.");
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handlePlaceOrder = async (newOrder: Order) => {
    try {
      await setDoc(doc(db, 'orders', newOrder.id), newOrder);
      setCart([]);
      setNotification("Order placed successfully!");
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `orders/${newOrder.id}`);
    }
  };

  const handleAddProduct = async (newProduct: Product) => {
    try {
      await setDoc(doc(db, 'products', newProduct.id), newProduct);
      setNotification("Product added successfully!");
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `products/${newProduct.id}`);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await setDoc(orderRef, { status: newStatus }, { merge: true });
      setNotification("Order updated successfully!");
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteDoc(doc(db, 'products', productId));
      setNotification("Product removed successfully!");
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `products/${productId}`);
    }
  };

  const setAdminActive = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('tejas_admin_session', 'active');
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setShowGoogleModal(false);
      // Logic handled by Auth State Listener
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const completeGoogleProfile = async (mobile: string, name: string) => {
    if (!tempGoogleUser) return;
    
    const newUser: User = {
      name: name || tempGoogleUser.displayName || 'User',
      mobile: mobile,
      email: tempGoogleUser.email || '',
      address: ''
    };

    try {
      await setDoc(doc(db, 'users', tempGoogleUser.uid), newUser);
      await setDoc(doc(db, 'users', `user_${mobile}`), newUser, { merge: true });
      setUser(newUser);
      localStorage.setItem('tejas_user_session', JSON.stringify(newUser));
      setShowProfileUpdate(false);
      setNotification(`Welcome, ${newUser.name}! Profile completed.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  return (
    <Router>
      <ScrollToTop />
      {/* 5-second Google Popup */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowGoogleModal(false)}></div>
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-md p-8 rounded-3xl shadow-2xl animate-fade-in-down border border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setShowGoogleModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X size={24} />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="text-brand-accent" size={32} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Sign in with Google</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">Access professional inventory, track repairs, and view special wholesale prices instantly.</p>
              
              <button 
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-4 px-6 rounded-2xl shadow-sm hover:shadow-md transition group"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                <span className="font-bold text-slate-700 dark:text-white">Continue with Google</span>
              </button>
              
              <button 
                onClick={() => setShowGoogleModal(false)}
                className="mt-6 text-slate-400 dark:text-slate-500 text-sm font-medium hover:underline"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Update Secondary Modal */}
      {showProfileUpdate && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md"></div>
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-md p-8 rounded-3xl shadow-2xl border border-brand-accent/30 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent"></div>
            <div className="text-center">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase">Complete Your Profile</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">Just one more step! We need your mobile number for secure updates and ordering.</p>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                completeGoogleProfile(
                  formData.get('mobile') as string,
                  formData.get('name') as string
                );
              }} className="space-y-4">
                <div className="text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">Full Name</label>
                  <input 
                    name="name"
                    type="text" 
                    required 
                    defaultValue={tempGoogleUser?.displayName || ''}
                    className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-brand-accent outline-none text-slate-900 dark:text-white font-bold"
                  />
                </div>
                <div className="text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 font-bold text-sm">+91</span>
                    <input 
                      name="mobile"
                      type="tel" 
                      required 
                      maxLength={10}
                      pattern="[0-9]{10}"
                      placeholder="9876543210"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-brand-accent outline-none text-slate-900 dark:text-white font-bold"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-brand-accent text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-brand-accent/20 hover:scale-[1.02] transition"
                >
                  Save & Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <Layout 
        user={user} 
        onLogout={handleLogout}
        cartCount={cart.length}
      >
        {notification && (
          <div className="fixed top-24 right-4 bg-brand-900 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fade-in-down flex items-center gap-2">
             <span className="text-brand-accent text-xl">✓</span> {notification}
          </div>
        )}
        <Routes>
          <Route path="/" element={
            isLoadingProducts && products.length === 0 ? (
              <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-6 text-center">
                <div className="w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6">
                   <Package className="text-brand-accent animate-pulse" size={40} />
                </div>
                <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-widest">
                  {isAdminLoggedIn ? "Live Inventory is Empty" : "Welcome to Tejas Mobile Hub"}
                </h2>
                <p className="text-slate-400 mb-8 max-w-md">
                  {isAdminLoggedIn 
                    ? "Your live database has no products yet. Click the button below to initialize the default catalog." 
                    : "Our professional inventory is currently being updated. Please check back in a few moments or log in as administrator to initialize the data."}
                </p>
                {isAdminLoggedIn ? (
                  <button 
                    onClick={seedDatabase}
                    className="bg-brand-accent text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition shadow-2xl flex items-center gap-3"
                  >
                    <span>Seed Database</span>
                    <ArrowRight size={20} />
                  </button>
                ) : (
                  <Link 
                    to="/admin/login"
                    className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-slate-700 transition"
                  >
                    Admin Login
                  </Link>
                )}
              </div>
            ) : (
              <Home addToCart={addToCart} products={products} />
            )
          } />
          <Route path="/shop" element={<Shop addToCart={addToCart} products={products} />} />
          <Route path="/mobile-parts" element={<MobileParts addToCart={addToCart} products={products.filter(p => p.category === 'part')} />} />
          <Route path="/accessories" element={<Accessories addToCart={addToCart} products={products.filter(p => p.category === 'accessory')} />} />
          <Route path="/cart" element={<Cart cartItems={cart} removeFromCart={removeFromCart} user={user} onPlaceOrder={handlePlaceOrder} products={products} />} />
          <Route path="/services" element={<RepairServices />} />
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/orders" element={<OrderHistory orders={orders} user={user} />} />
          
          <Route path="/admin/login" element={<AdminLogin onLoginSuccess={setAdminActive} />} />
          <Route 
            path="/admin/dashboard" 
            element={
              isAuthReady && isAdminLoggedIn ? (
                <AdminDashboard 
                  orders={orders} 
                  products={products} 
                  onAddProduct={handleAddProduct}
                  onDeleteProduct={handleDeleteProduct}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                  onSeedData={seedDatabase}
                  onLogout={handleLogout}
                />
              ) : isAuthReady ? (
                <AdminLogin onLoginSuccess={setAdminActive} />
              ) : (
                <div className="flex items-center justify-center min-h-screen">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
                </div>
              )
            } 
          />
          
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/shipping" element={<Shipping />} />

          <Route path="*" element={<Home addToCart={addToCart} products={products} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;