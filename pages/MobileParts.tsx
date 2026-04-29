import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface MobilePartsProps {
  addToCart: (id: string) => void;
  products: Product[];
}

export const MobileParts: React.FC<MobilePartsProps> = ({ addToCart, products }) => {
  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-900 dark:text-white mb-4">Genuine Mobile Parts</h1>
          <p className="text-slate-600 dark:text-slate-400">Explore our wide range of authentic mobile components (मोबाइल स्पेयर पार्ट्स) for repairs.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800 sticky top-24 transition-colors duration-300">
              <h3 className="font-bold text-lg mb-6 pb-2 border-b border-slate-100 dark:border-slate-800 text-slate-800 dark:text-white">Filters</h3>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 text-slate-800 dark:text-slate-200">Brand</h4>
                <div className="space-y-2">
                  {['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Oppo', 'Vivo', 'Realme'].map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                      <div className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 group-hover:border-brand-accent dark:group-hover:border-brand-accent transition-colors"></div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-brand-accent dark:group-hover:text-brand-accent transition-colors">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 text-slate-800 dark:text-slate-200">Category</h4>
                <div className="space-y-2">
                  {[
                    'Display & Touch', 
                    'Batteries', 
                    'Motherboard & CPU',
                    'ICs & Chips', 
                    'Cameras',
                    'Audio (Mic/Speaker)',
                    'Charging & Ports',
                    'Body & Housing',
                    'Small Components (SMD)',
                    'Sensors'
                  ].map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                       <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 group-hover:border-brand-accent dark:group-hover:border-brand-accent transition-colors"></div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-brand-accent dark:group-hover:text-brand-accent transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-3 sm:p-4 flex flex-col group hover:shadow-md transition-all duration-300">
                  <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg mb-3 sm:mb-4 overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {product.originalPrice && (
                      <span className="absolute top-2 right-2 bg-brand-accent text-white text-[8px] sm:text-[10px] font-bold px-2 py-0.5 sm:py-1 rounded-full">
                        SALE
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-1 leading-tight h-8 sm:h-10 line-clamp-2 text-xs sm:text-base">{product.name}</h3>
                  <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{product.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex flex-col">
                      {product.originalPrice && (
                        <span className="text-[9px] sm:text-xs text-slate-400 line-through">Rs. {product.originalPrice}</span>
                      )}
                      <span className="text-sm sm:text-base font-bold text-brand-900 dark:text-brand-accent whitespace-nowrap">Rs. {product.price}</span>
                    </div>
                    <button 
                      onClick={() => addToCart(product.id)}
                      className="bg-brand-900 dark:bg-slate-800 text-white p-1.5 sm:px-4 sm:py-2 rounded text-[10px] sm:text-sm font-medium hover:bg-brand-accent dark:hover:bg-brand-accent transition-colors flex items-center gap-1 sm:gap-2 group/btn shadow-md"
                    >
                      <ShoppingCart size={14} className="sm:w-4 sm:h-4 group-hover/btn:rotate-12 transition-transform"/> <span className="hidden xs:inline">Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};