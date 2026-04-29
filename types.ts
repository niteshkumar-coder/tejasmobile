export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'part' | 'accessory';
  image: string;
  description?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
}

export interface WholesaleItem {
  name: string;
  description: string;
  image: string;
}

export interface WholesaleCategory {
  title: string;
  items: WholesaleItem[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  mobile: string;
  email?: string;
  address?: string;
  village?: string;
  buildingNo?: string;
  city?: string;
  district?: string;
  state?: string;
  pinCode?: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: Product[];
  customer: User;
}