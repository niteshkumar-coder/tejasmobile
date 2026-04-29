import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { REPAIR_SERVICES } from '../constants';
import { CheckCircle2, Wrench, Filter } from 'lucide-react';

export const RepairServices: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Display & Touch',
    'Battery & Power',
    'Camera',
    'Audio',
    'Buttons & Sensors',
    'Housing & Body',
    'Motherboard & Advanced'
  ];

  const filteredServices = selectedCategory === 'All'
    ? REPAIR_SERVICES
    : REPAIR_SERVICES.filter(s => s.category === selectedCategory);

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-900 dark:text-white mb-4">Professional Repair Services</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            From basic screen replacements to advanced chip-level motherboard repairs, our experts fix it all.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 flex-shrink-0">
             <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800 sticky top-24 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Filter size={20} className="text-brand-accent" />
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Service Type</h3>
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

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div key={service.id} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden group">
                  <div className="h-48 overflow-hidden relative">
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-2 left-2 bg-brand-900/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                      {service.category}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">{service.name}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex-1">{service.description}</p>
                    
                    <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-col">
                           <span className="text-xs text-slate-400">Estimated Cost</span>
                           <span className="text-xl font-bold text-brand-900 dark:text-brand-accent">Rs. {service.price.toFixed(2)}</span>
                        </div>
                        {service.originalPrice && (
                           <div className="text-xs text-slate-400 line-through">Rs. {service.originalPrice.toFixed(2)}</div>
                        )}
                      </div>

                      <Link 
                        to="/contact"
                        className="flex items-center justify-center gap-2 w-full bg-brand-accent text-white py-2.5 rounded-lg font-bold hover:bg-green-600 transition text-sm shadow-md shadow-green-500/20"
                      >
                        <Wrench size={16} /> Book Service
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl font-bold text-brand-900 dark:text-white mb-4">Why Choose Tejas for Repairs?</h2>
                <ul className="space-y-3">
                  {[
                    'Certified Technicians with 5+ years experience',
                    'Genuine Parts Guarantee (Original OEM)',
                    'Transparent Pricing - No Hidden Fees',
                    'Fast Turnaround Time (Same Day for most repairs)',
                    'Advanced tools for Chip-Level (Motherboard) work'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="text-green-500 flex-shrink-0" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-auto text-center md:text-left">
                 <Link to="/contact" className="inline-block bg-brand-900 dark:bg-slate-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition">
                    Contact Support
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};