import React, { useState } from 'react';
import { ShoppingCart, Filter } from 'lucide-react';
import { Product } from '../types';

interface AccessoriesProps {
  addToCart: (id: string) => void;
  products: Product[];
}

export const Accessories: React.FC<AccessoriesProps> = ({ addToCart, products }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Define categories based on the product list
  const categories = [
    'All',
    'Charging & Power',
    'Audio',
    'Mobile Protection',
    'Storage & Memory',
    'Computer Peripherals',
    'Smart Home & Gadgets',
    'Cables & Adapters',
    'Other'
  ];

  // Helper to categorize products simply based on keywords
  const getCategory = (name: string, desc: string) => {
    const text = (name + " " + desc).toLowerCase();
    if (text.includes('charge') || text.includes('power') || text.includes('battery') || text.includes('adapter') && !text.includes('travel') && !text.includes('dth')) return 'Charging & Power';
    if (text.includes('earphone') || text.includes('headphone') || text.includes('speaker') || text.includes('tws') || text.includes('mic')) return 'Audio';
    if (text.includes('cover') || text.includes('case') || text.includes('glass') || text.includes('holder') || text.includes('stand') || text.includes('stick')) return 'Mobile Protection';
    if (text.includes('card') || text.includes('drive') || text.includes('otg') || text.includes('hdd') || text.includes('ssd')) return 'Storage & Memory';
    if (text.includes('mouse') || text.includes('keyboard') || text.includes('webcam') || text.includes('hub') || text.includes('laptop')) return 'Computer Peripherals';
    if (text.includes('smart') || text.includes('watch') || text.includes('bulb') || text.includes('plug') || text.includes('camera') || text.includes('remote')) return 'Smart Home & Gadgets';
    if (text.includes('cable') || text.includes('lan') || text.includes('hdmi') || text.includes('vga')) return 'Cables & Adapters';
    return 'Other';
  };

  const filteredAccessories = selectedCategory === 'All' 
    ? products 
    : products.filter(p => getCategory(p.name, p.description || '') === selectedCategory);

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-900 dark:text-white mb-4">Gadgets & Accessories</h1>
          <p className="text-slate-600 dark:text-slate-400">Premium quality accessories for your mobile, computer, and smart home needs.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800 sticky top-24 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Filter size={20} className="text-brand-accent" />
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Categories</h3>
              </div>
              
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-brand-900 text-white font-medium shadow-md' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-accent'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredAccessories.map((product) => (
                <div key={product.id} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col">
                  <div className="aspect-square bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" referrerPolicy="no-referrer" />
                    
                    {product.originalPrice && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded">
                        OFFER
                      </span>
                    )}
                  </div>
                  
                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-1 leading-tight line-clamp-2 h-8 sm:h-10 text-xs sm:text-base">{product.name}</h3>
                    <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2 italic">{product.description}</p>
                    
                    <div className="mt-auto pt-2 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-lg font-bold text-brand-900 dark:text-white">Rs. {product.price}</span>
                        {product.originalPrice && (
                          <span className="text-[9px] sm:text-xs text-slate-400 line-through">
                            Rs. {product.originalPrice}
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={() => addToCart(product.id)}
                        className="bg-brand-accent text-white p-1.5 sm:p-2 rounded-full hover:bg-orange-600 transition shadow-lg shadow-orange-500/20 active:scale-95"
                        title="Add to Cart"
                      >
                        <ShoppingCart size={15} className="sm:w-[18px] sm:h-[18px]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredAccessories.length === 0 && (
               <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                  <p className="text-slate-500 dark:text-slate-400">No products found in this category.</p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};