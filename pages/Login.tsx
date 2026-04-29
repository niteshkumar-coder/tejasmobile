import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, User as UserIcon, ArrowRight, Lock, CheckCircle } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    buildingNo: '',
    village: '',
    city: '',
    district: '',
    state: '',
    pinCode: ''
  });

  const statesAndDistricts: Record<string, string[]> = {
    "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
    "Uttar Pradesh": ["Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "RaeBareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
    "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
    "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
    "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"],
    "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
    "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
    "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Sri Muktsar Sahib", "Tarn Taran"]
  };

  const states = Object.keys(statesAndDistricts).sort();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginDirect = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.name.trim().length < 2) {
      setError('Please enter a valid name.');
      return;
    }
    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.district || !formData.state || !formData.pinCode.trim()) {
      setError('Please select your State and District, and enter PIN Code.');
      return;
    }

    setIsLoading(true);
    try {
      const user: User = {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        address: formData.address,
        buildingNo: formData.buildingNo,
        village: formData.village,
        city: formData.city,
        district: formData.district,
        state: formData.state,
        pinCode: formData.pinCode
      };

      // Save user profile to Firestore using mobile number as key for persistence
      const userPath = `users/user_${formData.mobile}`;
      try {
        await setDoc(doc(db, 'users', `user_${formData.mobile}`), user, { merge: true });
      } catch (saveError) {
        console.error('Failed to sync profile, proceeding with session:', saveError);
        // We report but don't block login if sync fails (e.g. offline)
        try {
          handleFirestoreError(saveError, OperationType.WRITE, userPath);
        } catch (reportErr) {
          // just log the reported error
        }
      }

      onLogin(user);
      navigate('/');
    } catch (err: any) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-24 w-24 rounded-full border-4 border-brand-accent/10 overflow-hidden bg-white shadow-xl flex items-center justify-center">
              <img 
                src="https://i.ibb.co/V80WYm0/ded959f5-18df-4f63-87a5-7d5364ac524f.png" 
                alt="Tejas Mobile Hub Logo" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Tejas Mobile Hub
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
            Professional Inventory & Repair Services Portal
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 py-8 px-4 shadow-2xl shadow-slate-200 dark:shadow-none sm:rounded-2xl sm:px-10 border border-slate-100 dark:border-slate-800 transition-colors duration-300">
          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded-r text-sm font-bold flex items-center gap-2">
              <span className="flex-shrink-0 animate-pulse">⚠️</span>
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLoginDirect}>
            {/* Personal Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-brand-accent">
                    <UserIcon className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="focus:ring-2 focus:ring-brand-accent focus:border-brand-accent block w-full pl-10 pr-4 py-3.5 sm:text-sm border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white rounded-xl transition-all outline-none"
                    placeholder="Arvind Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mobile" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                   Mobile Verified Auth
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-brand-accent">
                    <Smartphone className="h-4 w-4 text-slate-400" />
                  </div>
                  <span className="absolute inset-y-0 left-10 flex items-center text-slate-500 font-black text-xs">
                    +91
                  </span>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    maxLength={10}
                    required
                    className="focus:ring-2 focus:ring-brand-accent focus:border-brand-accent block w-full pl-20 pr-4 py-3.5 sm:text-sm border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white rounded-xl transition-all outline-none font-bold"
                    placeholder="97735 64409"
                    value={formData.mobile}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setFormData({ ...formData, mobile: val });
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                Gmail Address (Optional)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="focus:ring-2 focus:ring-brand-accent focus:border-brand-accent block w-full px-4 py-3.5 sm:text-sm border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white rounded-xl transition-all outline-none"
                placeholder="name@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-accent rounded-full"></span>
                Shipping Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="buildingNo" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                    Building / Flat / Shop No
                  </label>
                  <input
                    id="buildingNo"
                    type="text"
                    className="focus:ring-2 focus:ring-brand-accent focus:border-brand-accent block w-full px-4 py-3 sm:text-sm border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white rounded-xl outline-none"
                    placeholder="e.g. Shop No 42"
                    value={formData.buildingNo}
                    onChange={(e) => setFormData({ ...formData, buildingNo: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="village" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                    Village / Landmark / Area
                  </label>
                  <input
                    id="village"
                    type="text"
                    className="focus:ring-2 focus:ring-brand-accent focus:border-brand-accent block w-full px-4 py-3 sm:text-sm border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white rounded-xl outline-none"
                    placeholder="e.g. Near Main Market"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label htmlFor="state" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                    State
                  </label>
                  <select
                    id="state"
                    required
                    className="focus:ring-2 focus:ring-brand-accent focus:border-brand-accent block w-full px-4 py-3 sm:text-sm border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white rounded-xl outline-none appearance-none"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value, district: '' })}
                  >
                    <option value="">Select State</option>
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="district" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                    District
                  </label>
                  <select
                    id="district"
                    required
                    disabled={!formData.state}
                    className="focus:ring-2 focus:ring-brand-accent focus:border-brand-accent block w-full px-4 py-3 sm:text-sm border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white rounded-xl outline-none appearance-none disabled:opacity-50"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  >
                    <option value="">Select District</option>
                    {formData.state && statesAndDistricts[formData.state]?.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="city" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                    City/Town
                  </label>
                  <input
                    id="city"
                    type="text"
                    required
                    className="focus:ring-2 focus:ring-brand-accent focus:border-brand-accent block w-full px-4 py-3 sm:text-sm border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white rounded-xl outline-none"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="col-span-1">
                  <label htmlFor="pinCode" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                    PIN Code
                  </label>
                  <input
                    id="pinCode"
                    type="text"
                    required
                    maxLength={6}
                    className="focus:ring-2 focus:ring-brand-accent focus:border-brand-accent block w-full px-4 py-3 sm:text-sm border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white rounded-xl outline-none font-bold tracking-widest"
                    placeholder="123456"
                    value={formData.pinCode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setFormData({ ...formData, pinCode: val });
                    }}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="address" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                  Full Permanent/Extra Address (Optional)
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={2}
                  className="focus:ring-2 focus:ring-brand-accent focus:border-brand-accent block w-full px-4 py-3 sm:text-sm border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white rounded-xl outline-none resize-none"
                  placeholder="Additional delivery instructions..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-xl text-xs font-black text-white bg-brand-accent hover:bg-slate-900 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed items-center gap-3 uppercase tracking-widest shadow-brand-accent/20"
            >
              {isLoading ? 'Encrypting Connection...' : (
                <>
                  Connect Securely <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};