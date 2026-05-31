import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { BookingWizard } from "./components/BookingWizard";
import { AdminDashboard } from "./components/AdminDashboard";
import { Reviews } from "./components/Reviews";
import { Contact } from "./components/Contact";
import type { Service, Booking, Review } from "./types";

const MOCK_SERVICES: Service[] = [
  {
    id: "h1",
    name: "Salon Haircut & Blowout",
    price: 65,
    duration: 45,
    category: "Hair",
    description: "Premium precision cut followed by a professional shampoo, relaxing scalp massage, and custom volume blowout.",
    imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "h2",
    name: "Full Balayage & Styling",
    price: 180,
    duration: 150,
    category: "Hair",
    description: "Hand-painted dimensional highlights tailored to your skin tone, completed with custom tone glaze and wavy style finish.",
    imageUrl: "https://images.unsplash.com/photo-1560869713-7d0a29430f23?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "n1",
    name: "Signature Gel Manicure",
    price: 45,
    duration: 45,
    category: "Nails",
    description: "Nail shaping, cuticle therapy, therapeutic hand hydration, and premium long-lasting gel polish with LED curing.",
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "s1",
    name: "Glow Advanced Hydrafacial",
    price: 120,
    duration: 60,
    category: "Skincare",
    description: "Deep cleanse, custom light peel, vacuum extraction of impurities, and intensive peptide/antioxidant serum infusion.",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "m1",
    name: "Deep Tissue Stress Relief",
    price: 110,
    duration: 60,
    category: "Massages",
    description: "Targeted deep muscle pressure release designed to melt chronic knots, increase blood flow, and restore muscular balance.",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600"
  }
];

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "b1",
    customerName: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 304-9021",
    serviceId: "h1",
    serviceName: "Salon Haircut & Blowout",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
    timeSlot: "10:00 AM",
    status: "pending",
    createdAt: new Date().toISOString()
  },
  {
    id: "b2",
    customerName: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 (555) 782-9011",
    serviceId: "s1",
    serviceName: "Glow Advanced Hydrafacial",
    date: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0], // 2 days later
    timeSlot: "12:00 PM",
    status: "approved",
    createdAt: new Date().toISOString()
  },
  {
    id: "b3",
    customerName: "Sarah Jenkins",
    email: "sarah@example.com",
    phone: "+1 (555) 891-3044",
    serviceId: "n1",
    serviceName: "Signature Gel Manicure",
    date: new Date().toISOString().split("T")[0], // Today
    timeSlot: "02:00 PM",
    status: "completed",
    createdAt: new Date().toISOString()
  }
];

const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Clara Vance",
    rating: 5,
    comment: "Absolutely in love with my haircut! The blowout was perfect and lasted for days. The styling expert was so sweet.",
    date: "2026-05-28",
    serviceName: "Salon Haircut & Blowout"
  },
  {
    id: "r2",
    author: "Sophia Reynolds",
    rating: 5,
    comment: "Glow advanced hydrafacial is a game changer. My skin has never looked so clear, glowing, and revitalized.",
    date: "2026-05-29",
    serviceName: "Glow Advanced Hydrafacial"
  },
  {
    id: "r3",
    author: "Beatrice Stone",
    rating: 4,
    comment: "Best manicure ever! The selection of gel colors is premium and the shaping is extremely precise. I'll definitely come back.",
    date: "2026-05-30",
    serviceName: "Signature Gel Manicure"
  }
];

function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Status updates in Admin Dashboard
  const handleUpdateBookingStatus = (id: string, status: Booking["status"]) => {
    setBookings((prevBookings) =>
      prevBookings.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  // Add new Booking from client BookingWizard
  const handleAddBooking = (bookingData: Omit<Booking, "id" | "status" | "createdAt">) => {
    const newBooking: Booking = {
      ...bookingData,
      id: "b_" + Math.random().toString(36).substr(2, 9),
      status: "pending",
      createdAt: new Date().toISOString()
    };
    setBookings((prevBookings) => [newBooking, ...prevBookings]);
  };

  // Add new Review from client Review list
  const handleAddReview = (reviewData: Omit<Review, "id" | "date">) => {
    const newReview: Review = {
      ...reviewData,
      id: "r_" + Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split("T")[0]
    };
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  // Direct select from services grid
  const handleSelectServiceFromGrid = (service: Service) => {
    setSelectedService(service);
    setCurrentTab("booking");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#0c090a]">
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onBookClick={() => {
          setSelectedService(null);
          setCurrentTab("booking");
        }}
      />

      {/* Main Content Sections Routing */}
      <main className="flex-grow">
        {currentTab === "home" && (
          <>
            <Hero
              onBookClick={() => {
                setSelectedService(null);
                setCurrentTab("booking");
              }}
              onExploreClick={() => setCurrentTab("services")}
            />
            {/* Embedded Inline Reviews onto Home for rich context */}
            <Reviews
              reviews={reviews}
              services={MOCK_SERVICES}
              onAddReview={handleAddReview}
            />
          </>
        )}

        {currentTab === "booking" && (
          <BookingWizard
            services={MOCK_SERVICES}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            onAddBooking={handleAddBooking}
            onViewBookings={() => setCurrentTab("admin")}
          />
        )}

        {currentTab === "services" && (
          <Services
            services={MOCK_SERVICES}
            onSelectService={handleSelectServiceFromGrid}
          />
        )}

        {currentTab === "admin" && (
          <AdminDashboard
            bookings={bookings}
            services={MOCK_SERVICES}
            onUpdateStatus={handleUpdateBookingStatus}
          />
        )}

        {currentTab === "about" && <Contact />}
      </main>

      {/* Site Footer */}
      <footer className="bg-neutral-950 border-t border-white/5 py-8 text-center text-sm text-white/40">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#44C255] w-6 h-6"
            >
              <path
                d="M10 21C6.134 21 3 17.866 3 14C3 10.134 6.134 7 10 7C12.5186 7 14.7314 8.32637 15.9621 10.3151M22 11C25.866 11 29 14.134 29 18C29 21.866 25.866 25 22 25C19.4814 25 17.2686 23.6736 16.0379 21.6849M16.0379 21.6849C16.9248 20.2526 17.5 18.5954 17.5 16.8151M16.0379 21.6849C14.7314 23.6736 12.5186 25 10 25C6.134 25 3 21.866 3 18C3 16.2197 3.57522 14.5626 4.46214 13.1302M15.9621 10.3151C15.0752 11.7474 14.5 13.4046 14.5 15.1849M15.9621 10.3151C17.2686 8.32637 19.4814 7 22 7C25.866 7 29 10.134 29 14C29 15.7803 28.4248 17.4374 27.5379 18.8698M14.5 15.1849C14.5 16.8151 15.9621 21.6849 15.9621 21.6849M17.5 16.8151C17.5 15.1849 15.9621 10.3151 15.9621 10.3151"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-heading font-extrabold text-lg text-white">cnnect</span>
          </div>
          <span>© 2026 cnnect Local Business Systems. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
