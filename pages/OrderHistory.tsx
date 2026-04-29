import React, { useState } from 'react';
import { Order, User } from '../types';
import { Package, Clock, CheckCircle, ChevronDown, ChevronUp, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderHistoryProps {
  orders: Order[];
  user: User | null;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, user }) => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 transition-colors duration-300">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm text-center max-w-md w-full border border-slate-100 dark:border-slate-800">
          <ShoppingBag size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Login Required</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Please login to view your order history.</p>
          <Link to="/login" className="block w-full bg-brand-900 dark:bg-slate-800 text-white py-3 rounded-lg font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition">
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 transition-colors duration-300">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-heading font-bold text-brand-900 dark:text-white mb-8">My Orders</h1>
          <div className="bg-white dark:bg-slate-900 p-12 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 text-center">
            <Package size={64} className="mx-auto text-slate-200 dark:text-slate-700 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No orders yet</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8">You haven't placed any orders yet. Start shopping to see them here.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-brand-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition">
              Start Shopping <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const toggleOrder = (id: string) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'shipped': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
      case 'delivered': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing': return <Clock size={16} />;
      case 'delivered': return <CheckCircle size={16} />;
      default: return <Package size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-heading font-bold text-brand-900 dark:text-white mb-2">My Orders</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Welcome back, {user.name}</p>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-md">
              
              {/* Order Header */}
              <div 
                onClick={() => toggleOrder(order.id)}
                className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg text-slate-900 dark:text-white">#{order.id}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)} {order.status}
                    </span>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Placed on {new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                   <div className="flex flex-col items-end">
                     <span className="text-xs text-slate-500 dark:text-slate-400">Total Amount</span>
                     <span className="font-bold text-brand-900 dark:text-brand-accent text-lg">Rs. {order.total.toFixed(2)}</span>
                   </div>
                   <div className="text-slate-400 dark:text-slate-500">
                     {expandedOrder === order.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                   </div>
                </div>
              </div>

              {/* Order Details (Expanded) */}
              {expandedOrder === order.id && (
                <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-6 animate-fade-in-down">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-4">Items Ordered</h4>
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-slate-900 dark:text-white line-clamp-1">{item.name}</h5>
                          <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{item.category}</p>
                        </div>
                        <div className="font-bold text-slate-700 dark:text-slate-300">
                          Rs. {item.price.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button className="text-sm text-brand-accent font-bold hover:underline">Download Invoice</button>
                    <span className="text-slate-300 dark:text-slate-600">|</span>
                    <button className="text-sm text-brand-accent font-bold hover:underline">Track Shipment</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};