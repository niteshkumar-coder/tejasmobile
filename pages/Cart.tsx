import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { User, Order, Product } from '../types';
import { MOBILE_PARTS, ACCESSORIES } from '../constants';

interface CartProps {
  cartItems: string[];
  removeFromCart: (index: number) => void;
  user: User | null;
  onPlaceOrder: (order: Order) => void;
  products: Product[];
}

export const Cart: React.FC<CartProps> = ({ cartItems, removeFromCart, user, onPlaceOrder, products }) => {
  const navigate = useNavigate();
  const allProducts = products;

  const cartProducts = cartItems.map(id => allProducts.find(p => p.id === id)).filter((p): p is Product => !!p);
  const totalAmount = cartProducts.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const newOrder: Order = {
      id: Math.floor(Math.random() * 10000).toString(),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      total: totalAmount,
      status: 'Processing',
      items: cartProducts,
      customer: user
    };

    onPlaceOrder(newOrder);
    navigate('/orders');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 flex flex-col items-center justify-center transition-colors duration-300">
        <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center max-w-lg w-full">
          <div className="bg-slate-50 dark:bg-slate-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={48} className="text-slate-300 dark:text-slate-600" />
          </div>
          <h2 className="text-2xl font-bold text-brand-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-brand-900 dark:bg-slate-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-accent dark:hover:bg-brand-accent transition shadow-lg">
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-heading font-bold text-brand-900 dark:text-white mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-1 space-y-4">
            {cartProducts.map((item, index) => (
              <div key={`${item.id}-${index}`} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-4 animate-fade-in-down transition-colors duration-300">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg leading-tight">{item.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">{item.category}</p>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-50 dark:border-slate-800">
                  <p className="font-bold text-brand-900 dark:text-brand-accent text-lg">₹{item.price.toLocaleString()}</p>
                  <button 
                    onClick={() => removeFromCart(index)}
                    className="text-red-500 text-sm hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 sticky top-24 transition-colors duration-300">
              <h3 className="font-bold text-xl text-brand-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Tax (18% GST included)</span>
                  <span>₹{Math.round(totalAmount * 0.18).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="font-bold text-lg text-brand-900 dark:text-white">Total</span>
                <span className="font-black text-2xl text-brand-accent">₹{totalAmount.toLocaleString()}</span>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full bg-brand-900 dark:bg-slate-800 text-white py-4 rounded-xl font-bold hover:bg-brand-accent dark:hover:bg-brand-accent transition shadow-lg flex items-center justify-center gap-2"
              >
                {user ? 'Place Order' : 'Login to Checkout'} <ArrowRight size={20} />
              </button>

              <div className="mt-4 text-center">
                 <Link to="/shop" className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-accent underline">Continue Shopping</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};