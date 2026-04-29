import { Product, Service, WholesaleCategory } from './types';

export const MOBILE_PARTS: Product[] = [
  // Major Components
  {
    id: 'mp1',
    name: 'Redmi Note 13 Pro 5G Original Display (AMOLED)',
    price: 4200.00,
    originalPrice: 6500.00,
    category: 'part',
    image: 'https://www.xparts.in/wp-content/uploads/2023/07/Redmi-Note-12-5G-Display-With-Touchscreen-3.png',
    description: '100% Original Service Center AMOLED Display with Frame. 90-Day Warranty.'
  },
  {
    id: 'mp2',
    name: 'Redmi Note 12/13 Pro Battery (BN5P)',
    price: 1499.00,
    originalPrice: 2499.00,
    category: 'part',
    image: 'https://moborocks.com/images/detailed/158/battery-bn5p-for-xiaomi-redmi-note-13-5g-1734516144135.jpg',
    description: 'Original 5000mAh Battery with 6-month replacement warranty. High backup capacity.'
  },
  {
    id: 'mp3',
    name: 'Redmi Note 12 5G Motherboard (Swap)',
    price: 6500.00,
    originalPrice: 9000.00,
    category: 'part',
    image: 'https://static.wixstatic.com/media/df00ee_2096717a3ee04f4e8718abd10254b20d~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg',
    description: 'Unlocked Original Motherboard (Clean iCloud/Mi Cloud). 100% Tested Working PCB.'
  },
  {
    id: 'mp4',
    name: 'Samsung Galaxy M34 / A54 Super AMOLED Display',
    price: 3800.00,
    originalPrice: 5999.00,
    category: 'part',
    image: 'https://phoner.in/wp-content/uploads/2025/06/Samsung-Galaxy-M34-Display-6.png',
    description: 'Original Service Pack Display with In-Display Fingerprint Support.'
  },
  {
    id: 'mp5',
    name: 'Samsung Galaxy M34 5G Battery (6000mAh)',
    price: 1850.00,
    originalPrice: 2999.00,
    category: 'part',
    image: 'https://rukminim2.flixcart.com/image/480/480/xif0q/mobile-battery/w/i/f/sm-e546b-full-cell-6000-original-imahyagwmhjahcgr.jpeg?q=90',
    description: 'Long-lasting original battery cell. Model: EB-BM346ABY.'
  },
  
  // ICs and Memory
  {
    id: 'mp6',
    name: 'Samsung Galaxy A54 5G Motherboard',
    price: 8500.00,
    originalPrice: 12000.00,
    category: 'part',
    image: 'https://static.wixstatic.com/media/df00ee_2532880c42ee4d549ff1b26c8540498a~mv2.jpg/v1/fill/w_480,h_310,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/df00ee_2532880c42ee4d549ff1b26c8540498a~mv2.jpg',
    description: 'Full Fresh Logic Board. 8GB RAM / 128GB Storage variant.'
  },
  {
    id: 'mp7',
    name: 'Realme 11 Pro+ Curved Display',
    price: 5500.00,
    originalPrice: 8999.00,
    category: 'part',
    image: 'https://www.fixshop.eu/media/carousel_images/watermarked/bee10557fc7b7ee4abb00764ce54cd3a3b4754d6.jpg',
    description: 'Original Curved AMOLED Panel with 120Hz Refresh Rate.'
  },
  {
    id: 'mp8',
    name: 'Realme 11 / 12 Pro Battery (BLPA35)',
    price: 1250.00,
    category: 'part',
    image: 'https://www.zeenkart.com/wp-content/uploads/2024/12/BLPA35-1-1.jpg',
    description: 'High capacity lithium-polymer battery. Fast charging support.'
  },
  {
    id: 'mp9',
    name: 'Realme 11 Pro 5G Main Board (PCB)',
    price: 7200.00,
    category: 'part',
    image: 'https://static.wixstatic.com/media/df00ee_b7a9d98f53c74778aade1ed6891c4098~mv2.png/v1/fill/w_480,h_362,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/df00ee_b7a9d98f53c74778aade1ed6891c4098~mv2.png',
    description: 'Original Motherboard pulled from working unit. 100% Network tested.'
  },
  {
    id: 'mp10',
    name: 'Universal Fast Charging IC (PMI632)',
    price: 1350.00,
    category: 'part',
    image: 'https://zeespares.in/cdn/shop/products/download_1aad272d-52a2-4ada-aa66-241f182e9ad2.jpg?v=1744632486',
    description: 'Power Management IC for Qualcomm devices. Solves charging issues.'
  },
  {
    id: 'mp11',
    name: 'Tashan TS 31',
    price: 450.00,
    category: 'part',
    image: 'https://5.imimg.com/data5/SELLER/Default/2021/1/ME/DM/HH/87927648/itel-u10-black-dual-sim-500x500.jpg',
    description: 'Power Management IC for Qualcomm devices. Solves charging issues.'
  }
];

export const ACCESSORIES: Product[] = [
  // 1. Charging & Power
  {
    id: 'a1',
    name: 'Tashan TS 31',
    price: 429.00,
    category: 'accessory',
    image: 'https://5.imimg.com/data5/SELLER/Default/2021/1/ME/DM/HH/87927648/itel-u10-black-dual-sim-500x500.jpg',
    description: 'Fast Charging Cable (चार्जिंग केबल) - Durable braided cables.'
  },
  {
    id: 'a2',
    name: 'Giva G4',
    price: 449.00,
    category: 'accessory',
    image: 'https://m.media-amazon.com/images/I/61dY4PvDClL.jpg',
    description: 'Fast Charger (पावर एडाप्टर) - 18W/30W/65W Support.'
  },
  {
    id: 'a3',
    name: 'Jio Bharat V4',
    price: 649.00,
    category: 'accessory',
    image: 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2025/5/15/1f248949-4573-409f-91c2-898ccdd3fe87_177924_1.jpg',
    description: 'Power Bank (पावर बैंक) - High capacity portable charger.'
  },
  {
    id: 'a4',
    name: 'Itel Ace 2',
    price: 749.00,
    category: 'accessory',
    image: 'https://m.media-amazon.com/images/I/71l9jN+bhlL.jpg',
    description: 'Wireless Charger (वायरलेस चार्जिंग पैड) - Qi-certified pad.'
  },
  {
    id: 'a5',
    name: 'NV01 v8 Cable',
    price: 19.00,
    category: 'accessory',
    image: 'https://m.media-amazon.com/images/I/61--TuQWWAL.jpg',
    description: 'Travel Adapter (यूनिवर्सल ट्रैवल एडाप्टर) - All-in-one plug.'
  },
  {
    id: 'a6',
    name: 'NV01 C Data cable',
    price: 22.00,
    category: 'accessory',
    image: 'https://rukminim2.flixcart.com/image/180/240/xif0q/cable-power-meter/g/7/5/10-2-45215363-karwan-original-imahg6x6fma5egtm.jpeg?q=90',
    description: 'Extension Cord (एक्सटेंशन कॉर्ड) - Multiple socket board.'
  },
  {
    id: 'a7',
    name: 'Black Horse V8 (100W)',
    price: 61.00,
    category: 'accessory',
    image: 'https://m.media-amazon.com/images/I/71zw4b0jMLL.jpg',
    description: 'Mini UPS (यूपीएस) - Power backup for routers.'
  },
  {
    id: 'a8',
    name: 'Novtel V8 (25W)',
    price: 46.00,
    category: 'accessory',
    image: 'https://m.media-amazon.com/images/I/61--TuQWWAL.jpg',
    description: 'Alkaline Batteries (बैटरी) - Pack of 4.'
  },

  // 2. Audio Devices
  {
    id: 'a9',
    name: 'Riotel HT3',
    price: 36.00,
    category: 'accessory',
    image: 'https://www.tradefixa.com/company-data/Global_Marketing/180220210916591.jpg',
    description: 'Wired Earphones (वायर्ड इयरफ़ोन) - Deep bass audio.'
  },
  {
    id: 'a10',
    name: 'True Wireless Earbuds (TWS)',
    price: 499.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=600&q=80',
    description: 'TWS Earbuds (ट्रू वायरलेस इयरबड्स) - Noise cancellation.'
  },
  {
    id: 'a11',
    name: 'Bluetooth Headphones',
    price: 999.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    description: 'Headphones (ब्लूटूथ हेडफ़ोन) - Over-ear comfort.'
  },
  {
    id: 'a12',
    name: 'Portable Bluetooth Speaker',
    price: 1200.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80',
    description: 'Bluetooth Speaker (पोर्टेबल ब्लूटूथ स्पीकर) - 10W sound.'
  },

  // 3. Mobile Protection & Holders
  {
    id: 'a13',
    name: 'Novotel (15w) type C or V8 ',
    price: 117.00,
    category: 'accessory',
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/10/351040890/TR/VF/TC/198011237/samsung-type-c-travel-adapter-15w-charger-black-500x500.jpg',
    description: 'OTG Adapter (OTG केबल) - Connect USB devices.'
  },
  {
    id: 'a14',
    name: 'Novotel (20W)type C or V8',
    price: 110.00,
    category: 'accessory',
    image: 'https://m.media-amazon.com/images/I/61wEhOLnI7L.jpg',
    description: 'OTG Adapter (OTG केबल) - Connect USB devices.'
  },
  {
    id: 'a15',
    name: 'Realme (85W)type C or V8 ',
    price: 160.00,
    category: 'accessory',
    image: 'https://ugstore.in/wp-content/uploads/2024/06/51TziGHdrcL._SL1500_.jpg',
    description: 'OTG Adapter (OTG केबल) - Connect USB devices.'
  },
  {
    id: 'a16',
    name: 'One Pluse (85W)type C or V8',
    price: 169.00,
    category: 'accessory',
    image: 'https://m.media-amazon.com/images/I/61uIyqQij2L._AC_UF1000,1000_QL80_.jpg',
    description: 'OTG Adapter (OTG केबल) - Connect USB devices.'
  },
  {
    id: 'a17',
    name: 'Oppo (45W)type C or V8',
    price: 95.00,
    category: 'accessory',
    image: 'https://rukminim2.flixcart.com/image/480/640/xif0q/battery-charger/s/v/o/45w-supervooc-charger-oppo-original-imahfrfhew2defbv.jpeg?q=90',
    description: 'OTG Adapter (OTG केबल) - Connect USB devices.'
  },
  {
    id: 'a18',
    name: 'Vivo (120W)type C or V8',
    price: 199.00,
    category: 'accessory',
    image: 'https://i0.wp.com/gotit.org.in/wp-content/uploads/2024/04/3-72.jpeg?fit=600%2C600&ssl=1',
    description: 'OTG Adapter (OTG केबल) - Connect USB devices.'
  },

  // 4. Storage & Memory
  {
    id: 'a19',
    name: 'Keypad mobile charger',
    price: 30.00,
    category: 'accessory',
    image: 'https://m.media-amazon.com/images/I/41p6UQOl7jL._AC_UF1000,1000_QL80_.jpg',
    description: 'OTG Adapter (OTG केबल) - Connect USB devices.'
  },
  {
    id: 'a20',
    name: 'One pluse 3Pro earbuds',
    price: 340.00,
    category: 'accessory',
    image: 'https://m.media-amazon.com/images/I/51RaySTbIVL.jpg',
    description: 'TWS Earbuds (ट्रू वायरलेस इयरबड्स) - Noise cancellation.'
  },
  {
    id: 'a21',
    name: 'CMF Earbuds',
    price: 220.00,
    category: 'accessory',
    image: 'https://rukminim2.flixcart.com/image/480/640/xif0q/headphone/u/v/0/-original-imahyfkkyamsjxn8.jpeg?q=90',
    description: 'TWS Earbuds (ट्रू वायरलेस इयरबड्स) - Noise cancellation.'
  },
  {
    id: 'a22',
    name: 'Realme T200 Lite buds',
    price: 250.00,
    category: 'accessory',
    image: 'https://cdn.phonebunch.com/news-images/2025/03/Realme-Buds-T200-Lite-colors-India.webp',
    description: 'TWS Earbuds (ट्रू वायरलेस इयरबड्स) - Noise cancellation.'
  },

  // 5. Computer Peripherals
  {
    id: 'a23',
    name: 'Reakme Nakeband',
    price: 155.00,
    category: 'accessory',
    image: 'https://celltophone.com/wp-content/uploads/2022/10/Realme-Buds-Wireless-Neckband.jpg',
    description: 'TWS Earbuds (ट्रू वायरलेस इयरबड्स) - Noise cancellation.'
  },
  {
    id: 'a24',
    name: 'mouse',
    price: 199.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1615663245857-acda5b2b1518?auto=format&fit=crop&w=600&q=80',
    description: 'Wired Mouse (वायर्ड माउस) - USB connection.'
  },
  {
    id: 'a25',
    name: 'Wireless Mouse',
    price: 399.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    description: 'Wireless Mouse (वायरलेस माउस) - 2.4GHz receiver.'
  },
  {
    id: 'a26',
    name: 'Wired Keyboard',
    price: 350.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?auto=format&fit=crop&w=600&q=80',
    description: 'Keyboard (वायर्ड कीबोर्ड) - Standard layout.'
  },
  {
    id: 'a27',
    name: 'One Pluse nakebands',
    price: 185.00,
    category: 'accessory',
    image: 'https://i0.wp.com/gotit.org.in/wp-content/uploads/2024/06/1-57.jpeg?fit=600%2C600&ssl=1',
    description: 'TWS Earbuds (ट्रू वायरलेस इयरबड्स) - Noise cancellation.'
  },
  {
    id: 'a28',
    name: 'Z2 ANC Nakebands (one pluse) ',
    price: 170.00,
    category: 'accessory',
    image: 'https://m.media-amazon.com/images/I/51sZ0bOotML._AC_UF1000,1000_QL80_.jpg',
    description: 'TWS Earbuds (ट्रू वायरलेस इयरबड्स) - Noise cancellation.'
  },
  {
    id: 'a29',
    name: 'One pluse Z2',
    price: 149.00,
    category: 'accessory',
    image: 'https://www.bigcmobiles.com/media/catalog/product/cache/e19e56cdd4cf1b4ec073d4305f5db95a/o/n/oneplus_bullets_z2_bluetooth_wireless_neckband_red-4.jpg',
    description: 'TWS Earbuds (ट्रू वायरलेस इयरबड्स) - Noise cancellation.'
  },
  {
    id: 'a30',
    name: 'out of stock',
    price: 150.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1563351999-523c9597792f?auto=format&fit=crop&w=600&q=80',
    description: 'HDMI Cable (HDMI केबल) - 4K support.'
  },
  {
    id: 'a31',
    name: 'LAN / Ethernet Cable',
    price: 120.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bbcbf?auto=format&fit=crop&w=600&q=80',
    description: 'LAN Cable (नेटवर्क केबल) - Cat6 high speed.'
  },

  // 6. Smart Home & Gadgets
  {
    id: 'a32',
    name: 'Smart Watch Charger',
    price: 250.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80',
    description: 'Watch Charger (स्मार्ट वॉच चार्जर) - Magnetic dock.'
  },
  {
    id: 'a33',
    name: 'Smart WiFi Plug',
    price: 799.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=600&q=80',
    description: 'Smart Plug (स्मार्ट प्लग) - Control via App/Alexa.'
  },
  {
    id: 'a34',
    name: 'Smart LED Bulb',
    price: 399.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1550985543-f47f38aee65d?auto=format&fit=crop&w=600&q=80',
    description: 'Smart Bulb (स्मार्ट बल्ब) - RGB Color changing.'
  },
  {
    id: 'a35',
    name: 'Cable Organizer / Clips',
    price: 99.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1621252179027-94459d27d3ee?auto=format&fit=crop&w=600&q=80',
    description: 'Cable Organizer (केबल ऑर्गेनाइज़र) - Keep desk tidy.'
  },
  {
    id: 'a36',
    name: 'Security CCTV Camera',
    price: 1499.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3d63?auto=format&fit=crop&w=600&q=80',
    description: 'WiFi Camera (सिक्योरिटी कैमरा) - Night vision.'
  },
  {
    id: 'a37',
    name: 'TV/AC Remote Control',
    price: 150.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1625946857187-578988647035?auto=format&fit=crop&w=600&q=80',
    description: 'Remote Control (रिमोट) - Universal compatibility.'
  },
  
  // 7. Other Accessories
  {
    id: 'a38',
    name: 'Stylus Touch Pen',
    price: 120.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1549557404-5f502c34031d?auto=format&fit=crop&w=600&q=80',
    description: 'Stylus (स्टाइलस पेन) - For tablets/mobiles.'
  },
  {
    id: 'a39',
    name: 'Tablet Flip Cover',
    price: 399.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
    description: 'Tablet Cover (टैबलेट कवर) - Protective case.'
  },
  {
    id: 'a40',
    name: 'Screen Cleaning Kit',
    price: 99.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1626294711756-3475d6585148?auto=format&fit=crop&w=600&q=80',
    description: 'Cleaning Kit (क्लीनिंग किट) - Spray & Cloth.'
  },
  {
    id: 'a41',
    name: 'Mobile/Camera Tripod',
    price: 450.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1456424683832-75d19fb5430b?auto=format&fit=crop&w=600&q=80',
    description: 'Tripod (ट्राइपॉड) - Adjustable height.'
  },
  {
    id: 'a42',
    name: 'Laptop Sleeve / Bag',
    price: 499.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1528659551406-f64ee9a6eb6b?auto=format&fit=crop&w=600&q=80',
    description: 'Laptop Bag (लैपटॉप बैग) - Padded protection.'
  },
  {
    id: 'a43',
    name: '4G WiFi Dongle',
    price: 1100.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1588716381462-801265db2658?auto=format&fit=crop&w=600&q=80',
    description: 'WiFi Dongle (डेटा कार्ड) - Portable internet.'
  },
  {
    id: 'a44',
    name: 'Gaming Controller (Mobile/PC)',
    price: 899.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1593118247619-e2d6f056869e?auto=format&fit=crop&w=600&q=80',
    description: 'Controller (गेमिंग कंट्रोलर) - Wireless gamepad.'
  },
  {
    id: 'a45',
    name: 'Digital Thermometer',
    price: 150.00,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=600&q=80',
    description: 'Thermometer (डिजिटल थर्मामीटर) - Quick reading.'
  }
];

export const REPAIR_SERVICES: Service[] = [
  // I. Display & Touch
  {
    id: 'rs1',
    name: 'Display/Screen Replacement Service',
    price: 2499.00,
    originalPrice: 3500.00,
    description: 'Complete Display/Screen Assembly (LCD/OLED + Digitizer) (स्क्रीन रिप्लेसमेंट). Restores full touch and visual functionality.',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80',
    category: 'Display & Touch'
  },
  {
    id: 'rs2',
    name: 'Touch Screen/Digitizer Replacement',
    price: 1200.00,
    description: 'Glass/Digitizer replacement for phones with working LCDs (टच स्क्रीन रिपेयर). Fixes cracked glass or unresponsive touch.',
    image: 'https://images.unsplash.com/photo-1596742578443-7682e525c489?auto=format&fit=crop&w=800&q=80',
    category: 'Display & Touch'
  },
  {
    id: 'rs3',
    name: 'Display FPC Connector Repair',
    price: 800.00,
    description: 'Repair of the main board display connector (डिस्प्ले कनेक्टर रिपेयर). Solves "No Display" or flickering issues.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    category: 'Display & Touch'
  },

  // II. Battery & Charging
  {
    id: 'rs4',
    name: 'Battery Replacement Service',
    price: 999.00,
    description: 'Original Li-ion/Li-Po Battery Replacement (बैटरी रिप्लेसमेंट). Solves drainage and shutdown issues.',
    image: 'https://images.unsplash.com/photo-1592659762303-90081d34b277?auto=format&fit=crop&w=800&q=80',
    category: 'Battery & Power'
  },
  {
    id: 'rs5',
    name: 'Charging Port Replacement',
    price: 499.00,
    description: 'Type-C/Micro-USB/Lightning Port Repair (चार्जिंग पोर्ट रिपेयर). Fixes loose connection or slow charging.',
    image: 'https://images.unsplash.com/photo-1594806535508-204369e469b4?auto=format&fit=crop&w=800&q=80',
    category: 'Battery & Power'
  },
  {
    id: 'rs6',
    name: 'Charging IC / PMIC Repair',
    price: 1500.00,
    description: 'Advanced chip-level repair for Power Management IC (पावर IC रिपेयर). For dead phones or not charging issues.',
    image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80',
    category: 'Battery & Power'
  },

  // III. Camera Components
  {
    id: 'rs7',
    name: 'Rear Camera Module Replacement',
    price: 1400.00,
    description: 'Main Camera replacement (पीछे का कैमरा रिपेयर). Fixes blurry, black, or shaking camera issues.',
    image: 'https://images.unsplash.com/photo-1616440347437-b1c73416ef12?auto=format&fit=crop&w=800&q=80',
    category: 'Camera'
  },
  {
    id: 'rs8',
    name: 'Front Selfie Camera Repair',
    price: 900.00,
    description: 'Selfie Camera module replacement (फ्रंट कैमरा रिपेयर). Restores clear video calls and selfies.',
    image: 'https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&w=800&q=80',
    category: 'Camera'
  },
  {
    id: 'rs9',
    name: 'Camera Lens Glass Replacement',
    price: 350.00,
    description: 'Replacement of broken outer camera glass (कैमरा लेंस ग्लास). Protects the camera sensor from dust.',
    image: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&w=800&q=80',
    category: 'Camera'
  },

  // IV. Audio Components
  {
    id: 'rs10',
    name: 'Earpiece Speaker Repair',
    price: 450.00,
    description: 'Receiver/Earpiece replacement (ईयरपीस स्पीकर रिपेयर). Fixes low volume during calls.',
    image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80',
    category: 'Audio'
  },
  {
    id: 'rs11',
    name: 'Loudspeaker / Ringer Repair',
    price: 600.00,
    description: 'Main Speaker buzzer replacement (लाउडस्पीकर रिपेयर). Fixes no sound for music/ringtone issues.',
    image: 'https://images.unsplash.com/photo-1543599538-a6c4f6cc5c05?auto=format&fit=crop&w=800&q=80',
    category: 'Audio'
  },
  {
    id: 'rs12',
    name: 'Microphone (Mic) Repair',
    price: 500.00,
    description: 'Primary/Secondary Mic replacement (माइक रिपेयर). Fixes voice not being heard during calls.',
    image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?auto=format&fit=crop&w=800&q=80',
    category: 'Audio'
  },

  // V. Buttons & Sensors
  {
    id: 'rs13',
    name: 'Power & Volume Button Repair',
    price: 450.00,
    description: 'Flex cable replacement for On/Off and Volume keys (पावर/वॉल्यूम बटन). Fixes stuck or non-working buttons.',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
    category: 'Buttons & Sensors'
  },
  {
    id: 'rs14',
    name: 'Fingerprint Sensor Repair',
    price: 800.00,
    description: 'Biometric sensor replacement (फिंगरप्रिंट सेंसर). Restores fingerprint unlock functionality.',
    image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80',
    category: 'Buttons & Sensors'
  },

  // VI. Housing & Structure
  {
    id: 'rs15',
    name: 'Back Panel / Glass Replacement',
    price: 900.00,
    description: 'Rear housing glass change (बैक पैनल/ग्लास). Restores the look of your phone.',
    image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=800&q=80',
    category: 'Housing & Body'
  },
  {
    id: 'rs16',
    name: 'Full Body Housing Refurbishment',
    price: 1500.00,
    description: 'Complete Middle Frame & Bezel change (फुल बॉडी हाउसिंग). Makes old phones look brand new.',
    image: 'https://images.unsplash.com/photo-1596742578443-7682e525c489?auto=format&fit=crop&w=800&q=80',
    category: 'Housing & Body'
  },

  // VII. Board Level Components
  {
    id: 'rs17',
    name: 'Water Damage Repair Service',
    price: 1000.00,
    description: 'Ultrasonic cleaning and component revival (वाटर डैमेज रिपेयर). For phones dropped in water.',
    image: 'https://images.unsplash.com/photo-1599950755346-a3e58f84ca63?auto=format&fit=crop&w=800&q=80',
    category: 'Motherboard & Advanced'
  },
  {
    id: 'rs18',
    name: 'Motherboard Chip-Level Repair',
    price: 2000.00,
    description: 'Advanced diagnosis and repair of CPU, EMMC, and Short Circuits (मदरबोर्ड चिप-लेवल रिपेयर).',
    image: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=800&q=80',
    category: 'Motherboard & Advanced'
  },
  {
    id: 'rs19',
    name: 'Network / Signal Repair',
    price: 1200.00,
    description: 'Fixing Network IC, Antenna Switch, or P.A. (नेटवर्क रिपेयर). Solves low signal or "No Service" issues.',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
    category: 'Motherboard & Advanced'
  }
];

export const WHOLESALE_CATALOG: WholesaleCategory[] = [
  {
    title: "Mobile Accessories (मोबाइल एक्सेसरीज़)",
    items: [
      {
        name: "Mobile Charger (मोबाइल चार्जर)",
        description: "Fast & Standard Adapter (फास्ट चार्जर अडैप्टर, ट्रैवल चार्जर)",
        image: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Data Cable (डेटा केबल)",
        description: "USB-A to Type-C, Micro USB, Lightning (iPhone)",
        image: "https://images.unsplash.com/photo-1562767073-1991d2906e5e?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Power Bank (पावर बैंक)",
        description: "10000mAh, 20000mAh Portable Chargers",
        image: "https://images.unsplash.com/photo-1609592424009-4340798eb4b2?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Earphones & Headphones",
        description: "Wired (वायर्ड इयरफ़ोन), Neckband, TWS Earbuds, Over-Ear Headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Bluetooth Speakers",
        description: "Mini Portable & Party Speakers (ब्लूटूथ स्पीकर)",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Mobile Stand/Holder",
        description: "Desktop Stand, Car Mount Holder (मोबाइल स्टैंड/होल्डर)",
        image: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Smart Watch / Fitness Band",
        description: "Digital Smart Watches & Trackers (स्मार्ट वॉच)",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Tempered Glass (टेम्पर्ड ग्लास)",
        description: "Screen Protectors for various models (स्क्रीन प्रोटेक्टर)",
        image: "https://images.unsplash.com/photo-1591147551066-8324e934a36e?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Mobile Back Cover (मोबाइल बैक कवर)",
        description: "Silicone, Plastic, Leather Cases",
        image: "https://images.unsplash.com/photo-1603351154351-5cf99bc5f16d?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    title: "Daily Use Gadgets (रोज़मर्रा के गैजेट्स)",
    items: [
      {
        name: "LED Bulb (एलईडी बल्ब)",
        description: "Various Wattage Bulbs",
        image: "https://images.unsplash.com/photo-1550985543-f47f38aee65d?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Torch / Emergency Light",
        description: "Rechargeable Lights (इमरजेंसी लाइट)",
        image: "https://images.unsplash.com/photo-1590422915863-7140f0c0ee6b?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Extension Cord/Board",
        description: "Multi-plug Socket (एक्सटेंशन कॉर्ड)",
        image: "https://images.unsplash.com/photo-1558230230-00832049e7b4?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "USB Hub / Card Reader",
        description: "Multi-port Hubs (USB हब)",
        image: "https://images.unsplash.com/photo-1628280072670-c752fb58f8ce?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Wireless Mouse",
        description: "2.4GHz Wireless Mouse (वायरलेस माउस)",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Webcam",
        description: "HD Web Camera (वेबकैम)",
        image: "https://images.unsplash.com/photo-1563721328006-254b73cb439e?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "LCD Writing Pad",
        description: "Digital Slate / E-Writer",
        image: "https://plus.unsplash.com/premium_photo-1663100424578-8318d451b545?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Portable USB Fan",
        description: "Mini Cooling Fan (पोर्टेबल यूएसबी फैन)",
        image: "https://images.unsplash.com/photo-1585820464687-f83b6329437b?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Personal Care Electronics",
        description: "Trimmer, Shaver, Hair Dryer (ट्रिमर/शेवर/हेयर ड्रायर)",
        image: "https://images.unsplash.com/photo-1621607512214-68297f319087?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    title: "Main Mobile Parts (मुख्य मोबाइल पार्ट्स)",
    items: [
      {
        name: "Display / Touch Screen",
        description: "LCD, OLED, Combo Folder (मोबाइल डिस्प्ले)",
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Mobile Battery",
        description: "Replacement Batteries (मोबाइल बैटरी)",
        image: "https://images.unsplash.com/photo-1619656402830-13f56346766d?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Charging Connector",
        description: "Type-C, Micro USB Ports (चार्जिंग कनेक्टर)",
        image: "https://images.unsplash.com/photo-1594806535508-204369e469b4?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Sound Components",
        description: "Mic, Speaker, Ringer, Earpiece (माइक/स्पीकर/रिंगर)",
        image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Camera Glass & Housing",
        description: "Camera Lens Glass, Back Panel, Middle Frame",
        image: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Buttons & Flex Cables",
        description: "Volume/Power Button, On/Off Flex (फ्लेक्स केबल)",
        image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "SIM Tray & Slots",
        description: "SIM Card Holder Trays (सिम ट्रे)",
        image: "https://images.unsplash.com/photo-1588200908342-23b585c03e26?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Vibration Motor",
        description: "Vibrator (वाइब्रेशन मोटर)",
        image: "https://images.unsplash.com/photo-1588508065123-287b9eddcf78?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    title: "Small Components & Tools (रिपेयरिंग टूल्स)",
    items: [
      {
        name: "Soldering Essentials",
        description: "Wire, Paste, Flux (सोल्डरिंग वायर/पेस्ट)",
        image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Jumper Wire",
        description: "0.1mm Thin Wire (जम्पर वायर)",
        image: "https://images.unsplash.com/photo-1563770095-39d468f9a51d?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Screwdriver Set",
        description: "Precision Tool Kit for Mobiles (स्क्रू ड्राइवर सेट)",
        image: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Opener Tools",
        description: "Spudger, Tweezers (ओपनर टूल किट)",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "SMD Components",
        description: "Resistor, Capacitor, Diode (SMD कॉम्पोनेन्टस)",
        image: "https://images.unsplash.com/photo-1555617778-02518510b9fa?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "IC Chips",
        description: "Power, Charging, Network ICs (इंटीग्रेटेड सर्किट)",
        image: "https://plus.unsplash.com/premium_photo-1678565869434-c81195861939?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Chemicals & Glues",
        description: "UV Glue, Cleaning Liquid (यूवी ग्लू/क्लीनिंग लिक्विड)",
        image: "https://images.unsplash.com/photo-1626294711756-3475d6585148?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Machines & Equipment",
        description: "Hot Air Gun, Microscope, Multimeter, Separator",
        image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=600&q=80"
      }
    ]
  }
];
