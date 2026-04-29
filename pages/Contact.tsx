import React from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-900 dark:text-white mb-4">Get In Touch</h1>
          <p className="text-slate-600 dark:text-slate-400">Have a question about a repair or looking for a specific part? We're here to help.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Info Card */}
          <div className="bg-brand-900 dark:bg-slate-900 text-white rounded-2xl p-8 md:p-12 shadow-xl flex flex-col justify-between transition-colors duration-300">
            <div>
              <h2 className="text-2xl font-bold mb-8 border-b border-brand-700 dark:border-slate-800 pb-4">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Mail className="text-brand-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email Us</h3>
                    <p className="text-slate-300">tejasmobilehubhelp@gmail.com</p>
                    <p className="text-slate-400 text-sm mt-1">We typically reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Phone className="text-brand-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Call Us</h3>
                    <p className="text-slate-300">+91 97735 64409</p>
                    <p className="text-slate-400 text-sm mt-1">Mon - Sat: 10:00 AM - 8:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="bg-white/10 p-3 rounded-lg">
                    <MessageCircle className="text-green-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">WhatsApp</h3>
                    <p className="text-slate-300">+91 97735 64409</p>
                    <a href="https://wa.me/+919773564409" className="text-brand-accent text-sm mt-1 inline-block hover:underline">Chat with us</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <MapPin className="text-brand-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Visit Us</h3>
                    <p className="text-slate-300">JP Nagar, Lauriya, West Champaran, Bihar</p>
                    <a 
                      href="https://www.google.com/maps/dir//Tejas+Mobile+Hub,+JP+Nagar,+Lauriya,+Bihar" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-brand-accent text-sm mt-1 inline-block hover:underline"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-brand-800 dark:border-slate-800">
               <div className="w-full h-64 bg-slate-800 rounded-lg overflow-hidden relative shadow-inner">
                  <iframe 
                    title="Tejas Mobile Location"
                    width="100%" 
                    height="100%" 
                    frameBorder="0"
                    style={{ border: 0, filter: 'grayscale(0.2) contrast(1.2) opacity(0.9)' }} 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3568.123456789!2d84.5!3d26.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzAwLjAiTiA4NMKwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    allowFullScreen
                  ></iframe>
               </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 shadow-lg border border-slate-100 dark:border-slate-800 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-brand-900 dark:text-white mb-6">Send us a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition" placeholder="Doe" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Service Type (Optional)</label>
                <select className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition">
                  <option value="">Select a subject</option>
                  <option value="repair">Repair Service</option>
                  <option value="part">Spare Parts</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition" placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" className="w-full bg-brand-accent text-white font-bold py-4 rounded-lg hover:bg-green-600 transition shadow-lg shadow-green-500/20">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};