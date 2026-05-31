export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  category: "Hair" | "Nails" | "Skincare" | "Massages";
  description: string;
  imageUrl: string;
}

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM"
  status: "pending" | "approved" | "completed" | "cancelled";
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1 to 5
  comment: string;
  date: string; // YYYY-MM-DD
  serviceName?: string;
}
