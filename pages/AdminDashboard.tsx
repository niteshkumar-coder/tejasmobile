import React, { useState } from 'react';
import { Package, Users, PlusCircle, LogOut, CheckCircle2, Trash2, Smartphone, TrendingUp, DollarSign } from 'lucide-react';
import { Order, Product } from '../types';

interface AdminDashboardProps {
  orders: Order[];
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: string) => void;
  onSeedData: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  orders, 
  products, 
  onAddProduct, 
  onDeleteProduct, 
  onUpdateOrderStatus, 
  onSeedData,
  onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  
  // Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: 'part' as 'part' | 'accessory',
    image: '',
    description: ''
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: `custom-${Date.now()}`,
      name: newProduct.name,
      price: Number(newProduct.price),
      originalPrice: newProduct.originalPrice ? Number(newProduct.originalPrice) : undefined,
      category: newProduct.category,
      image: newProduct.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
      description: newProduct.description
    };
    onAddProduct(product);
    setNewProduct({
      name: '',
      price: '',
      originalPrice: '',
      category: 'part',
      image: '',
      description: ''
    });
    alert('Product added successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[#0a0f1c] text-white flex flex-col p-6 sticky top-0 h-auto md:h-screen z-10">
        <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/10">
          <div className="bg-brand-accent p-2 rounded-lg">
            <Smartphone size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-heading font-black text-xl tracking-tighter">ADMIN PANEL</h2>
            <p className="text-[10px] text-brand-accent font-bold uppercase tracking-widest leading-none">Tejas Mobile Hub</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'orders' ? 'bg-brand-accent text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users size={20} />
            Order Management
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'products' ? 'bg-brand-accent text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <PlusCircle size={20} />
            Inventory Control
          </button>
        </nav>

        <div className="mt-10 pt-6 border-t border-white/10 space-y-4">
          <div className="bg-white/5 p-4 rounded-xl">
             <p className="text-[10px] uppercase font-black text-slate-500 mb-1">System Health</p>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-bold text-slate-300 tracking-wide">Live Dashboard</span>
             </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-red-400 font-bold py-3 transition"
          >
            <LogOut size={18} />
            Exit Panel
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-black text-brand-900 dark:text-white uppercase tracking-tighter">
              {activeTab === 'orders' ? 'Customer Requests' : 'Manage Inventory'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              {activeTab === 'orders' 
                ? 'Review total orders and customer contact information.' 
                : 'Expand the catalog by adding high-quality parts and accessories.'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
               <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600">
                  <TrendingUp size={20} />
               </div>
               <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase">Revenue</p>
                  <p className="text-lg font-black dark:text-white">₹{orders.reduce((acc, o) => acc + o.total, 0).toLocaleString()}</p>
               </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
               <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600">
                  <Package size={20} />
               </div>
               <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase">Orders</p>
                  <p className="text-lg font-black dark:text-white">{orders.length}</p>
               </div>
            </div>
          </div>
        </header>

        {activeTab === 'orders' ? (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 p-20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-center">
                 <Users size={64} className="mx-auto text-slate-200 dark:text-slate-700 mb-6" />
                 <h3 className="text-xl font-bold dark:text-white">No active orders found</h3>
                 <p className="text-slate-500 font-medium mt-2">When customers place orders, they will appear here with full details.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 pb-6 lg:pb-0 lg:pr-8">
                       <div className="flex items-center justify-between mb-6">
                          <span className="bg-brand-900 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">#{order.id}</span>
                          <span className="text-slate-400 text-xs font-bold uppercase">{order.date}</span>
                       </div>
                       
                       <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                             <p className="text-[10px] text-brand-accent font-black uppercase mb-1 tracking-widest">Customer Details</p>
                             <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tight">{order.customer.name}</h4>
                             <p className="text-sm font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2">📞 {order.customer.mobile}</p>
                             {order.customer.email && <p className="text-sm font-bold text-slate-500 flex items-center gap-2">✉️ {order.customer.email}</p>}
                          </div>
                          <div>
                             <p className="text-[10px] text-brand-accent font-black uppercase mb-1 tracking-widest">Shipping Address</p>
                             <p className="text-sm font-bold text-slate-600 dark:text-slate-400 leading-snug underline decoration-brand-accent/30 flex items-center gap-2">
                               📍 {order.customer.address || 'Address not provided'}
                             </p>
                          </div>
                       </div>
                       
                       <div className="mt-6 flex flex-wrap gap-2">
                          <p className="w-full text-[10px] text-slate-400 font-bold uppercase mb-1">Update Status</p>
                          {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                            <button
                              key={status}
                              onClick={() => onUpdateOrderStatus(order.id, status)}
                              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition ${
                                order.status === status 
                                  ? 'bg-brand-accent text-white shadow-md' 
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="flex-1">
                       <p className="text-[10px] text-brand-accent font-black uppercase mb-3 tracking-widest">Ordered Products</p>
                       <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                               <div className="flex items-center gap-3">
                                  <img src={item.image} alt="" className="w-10 h-10 object-contain bg-white dark:bg-slate-900 rounded-lg p-1" referrerPolicy="no-referrer" />
                                  <div>
                                     <p className="text-xs font-black dark:text-white leading-tight">{item.name}</p>
                                     <p className="text-[10px] text-slate-400 uppercase font-bold">{item.category}</p>
                                  </div>
                               </div>
                               <span className="text-sm font-black dark:text-brand-accent">₹{item.price.toLocaleString()}</span>
                            </div>
                          ))}
                       </div>
                       <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Total Valuation</span>
                          <span className="text-2xl font-black text-brand-900 dark:text-white">₹{order.total.toLocaleString()}</span>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
             {/* Add Form */}
             <div className="lg:col-span-1">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm sticky top-8">
                   <h3 className="text-xl font-black text-brand-900 dark:text-white uppercase mb-6 flex items-center gap-2 tracking-tighter">
                      <PlusCircle size={24} className="text-brand-accent" /> New Item Entry
                   </h3>
                   <form onSubmit={handleAddProduct} className="space-y-5">
                      <div>
                         <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Item Name</label>
                         <input 
                            required
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-brand-accent transition dark:text-white"
                            placeholder="e.g. iPhone 13 Pro Screen"
                            value={newProduct.name}
                            onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                         />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Sale Price (₹)</label>
                            <input 
                               required
                               type="number"
                               className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-brand-accent transition dark:text-white"
                               placeholder="1999"
                               value={newProduct.price}
                               onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                            />
                         </div>
                         <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Original (₹)</label>
                            <input 
                               type="number"
                               className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-brand-accent transition dark:text-white"
                               placeholder="2999"
                               value={newProduct.originalPrice}
                               onChange={e => setNewProduct({...newProduct, originalPrice: e.target.value})}
                            />
                         </div>
                      </div>
                      <div>
                         <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Category</label>
                         <select 
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-brand-accent transition dark:text-white cursor-pointer"
                            value={newProduct.category}
                            onChange={e => setNewProduct({...newProduct, category: e.target.value as 'part' | 'accessory'})}
                         >
                            <option value="part">Repair Part</option>
                            <option value="accessory">Digital Accessory</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Image Source Link</label>
                         <input 
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-brand-accent transition dark:text-white"
                            placeholder="https://images.unsplash.com/..."
                            value={newProduct.image}
                            onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                         />
                      </div>
                      <div>
                         <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Description</label>
                         <textarea 
                            rows={3}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-brand-accent transition dark:text-white"
                            placeholder="Brief details about the part..."
                            value={newProduct.description}
                            onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                         />
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-brand-900 dark:bg-brand-accent text-white font-black py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all uppercase tracking-widest flex items-center justify-center gap-2 group"
                      >
                         <CheckCircle2 size={20} className="group-hover:rotate-12 transition-transform" /> Confirm Entry
                      </button>
                   </form>
                </div>
             </div>

             {/* Inventory List */}
             <div className="lg:col-span-2">
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                   <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <h3 className="font-black dark:text-white tracking-widest uppercase text-sm">Live Inventory ({products.length})</h3>
                      {products.length === 0 && (
                        <button
                          onClick={onSeedData}
                          className="bg-brand-teal text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:shadow-lg transition"
                        >
                          Initialize Default Data
                        </button>
                      )}
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                         <thead className="bg-slate-50 dark:bg-slate-800/50 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                            <tr>
                               <th className="px-6 py-4">Product</th>
                               <th className="px-6 py-4">Classification</th>
                               <th className="px-6 py-4">Valuation</th>
                               <th className="px-6 py-4">Control</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {products.slice().reverse().map(p => (
                               <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                                  <td className="px-6 py-4">
                                     <div className="flex items-center gap-3">
                                        <img src={p.image} className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 p-1 object-contain" referrerPolicy="no-referrer" />
                                        <div>
                                           <p className="text-sm font-black dark:text-white leading-tight">{p.name}</p>
                                           <p className="text-[10px] text-slate-400 font-bold">{p.id}</p>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="px-6 py-4">
                                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${p.category === 'part' ? 'bg-blue-100 text-blue-700' : 'bg-teal-100 text-teal-700'}`}>
                                        {p.category}
                                     </span>
                                  </td>
                                  <td className="px-6 py-4">
                                     <p className="text-sm font-black dark:text-brand-accent">₹{p.price.toLocaleString()}</p>
                                  </td>
                                  <td className="px-6 py-4">
                                     <button 
                                       onClick={() => onDeleteProduct(p.id)}
                                       className="text-slate-300 hover:text-red-500 transition p-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"
                                     >
                                        <Trash2 size={18} />
                                     </button>
                                  </td>
                                </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};
