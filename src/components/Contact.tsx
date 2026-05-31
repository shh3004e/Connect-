import React from "react";
import { Clock, MapPin, Phone, Mail, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export const Contact: React.FC = () => {
  const businessHours = [
    { day: "Monday - Friday", hours: "09:00 AM - 07:00 PM" },
    { day: "Saturday", hours: "09:00 AM - 05:00 PM" },
    { day: "Sunday", hours: "Closed / Rest Day" },
  ];

  const socialLinks = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      ),
      name: "Instagram",
      href: "#instagram",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      ),
      name: "Facebook",
      href: "#facebook",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
        </svg>
      ),
      name: "Twitter/X",
      href: "#twitter",
    },
  ];

  return (
    <section className="py-24 bg-neutral-950 min-h-screen text-left">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
            Visit Glow & Co.
          </h2>
          <p className="text-white/60 text-lg">
            Find our premium location, check our hours, and get in touch with our booking experts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Business Info & Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 h-full">
            {/* Contact details */}
            <div className="glass-panel p-8 rounded-2xl space-y-6">
              <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#44C255]" />
                Salon Information
              </h3>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-neutral-900 border border-white/5 text-[#44C255] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Our Location</h4>
                  <p className="text-white/60 text-sm mt-1 leading-relaxed">
                    128 Premium Plaza Suite C, Luxury District, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-neutral-900 border border-white/5 text-[#44C255] flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Call Us</h4>
                  <p className="text-white/60 text-sm mt-1 leading-relaxed">
                    +1 (555) 752-0909
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-neutral-900 border border-white/5 text-[#44C255] flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Email Us</h4>
                  <p className="text-white/60 text-sm mt-1 leading-relaxed">
                    bookings@cnnectsalon.com
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="glass-panel p-8 rounded-2xl">
              <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#44C255]" />
                Operating Hours
              </h3>
              <div className="space-y-4">
                {businessHours.map((bh) => (
                  <div key={bh.day} className="flex justify-between items-center text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <span className="text-white/60 font-medium">{bh.day}</span>
                    <span className={`font-semibold ${bh.hours.includes("Closed") ? "text-red-400" : "text-white"}`}>
                      {bh.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-panel p-6 rounded-2xl flex items-center justify-between">
              <span className="text-white/60 text-sm font-semibold">Follow Us:</span>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    className="p-3 rounded-full bg-neutral-900 border border-white/5 text-white/80 hover:text-white hover:bg-neutral-800 transition-all"
                    title={s.name}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Custom Vector Map */}
          <div className="lg:col-span-7 h-full">
            <div className="glass-panel rounded-2xl overflow-hidden h-full flex flex-col justify-between p-6 min-h-[420px] relative">
              <h3 className="font-heading text-xl font-bold text-white mb-4">
                Interactive Map Location
              </h3>
              
              {/* Custom SVG Map Wrapper */}
              <div className="flex-grow w-full rounded-xl bg-neutral-950 border border-white/5 relative overflow-hidden flex items-center justify-center p-2">
                
                {/* SVG Mock Map Grid */}
                <svg
                  viewBox="0 0 800 450"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full opacity-60 pointer-events-none"
                >
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Styled roads/highways */}
                  <path d="M -10 100 Q 200 80 400 120 T 810 100" stroke="rgba(255,255,255,0.06)" strokeWidth="18" strokeLinecap="round" />
                  <path d="M 200 -10 Q 220 200 180 300 T 220 460" stroke="rgba(255,255,255,0.04)" strokeWidth="12" strokeLinecap="round" />
                  <path d="M 500 -10 Q 480 200 520 300 T 480 460" stroke="rgba(255,255,255,0.04)" strokeWidth="12" strokeLinecap="round" />
                  <path d="M -10 320 H 810" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
                  
                  {/* Rivers / Parks */}
                  <path d="M 700 -20 Q 650 150 720 300 T 680 470" stroke="rgba(68,194,85,0.06)" strokeWidth="40" strokeLinecap="round" />
                  
                  {/* Mock building blocks */}
                  <rect x="80" y="140" width="80" height="120" rx="6" fill="rgba(255,255,255,0.02)" />
                  <rect x="250" y="160" width="180" height="100" rx="8" fill="rgba(255,255,255,0.02)" />
                  <rect x="560" y="140" width="100" height="140" rx="8" fill="rgba(255,255,255,0.02)" />
                </svg>

                {/* Pulsing Pin Marker (Absolutely positioned in center) */}
                <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  
                  {/* Bouncing Pin */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                    className="w-12 h-12 bg-[#44C255] rounded-full flex items-center justify-center border-2 border-white text-white shadow-[0_8px_24px_rgba(68,194,85,0.5)] z-10"
                  >
                    <MapPin className="w-6 h-6 fill-current" />
                  </motion.div>

                  {/* Pulsing Ring Shadow */}
                  <div className="relative w-8 h-2 mt-1">
                    <span className="absolute inset-0 bg-[#44C255]/50 rounded-full scale-100 animate-ping" />
                    <span className="absolute inset-0 bg-black/60 rounded-full blur-[1.5px]" />
                  </div>
                </div>

                {/* Location Tooltip Card */}
                <div className="absolute bottom-4 right-4 bg-neutral-900 border border-white/10 rounded-xl p-3 shadow-2xl max-w-[200px]">
                  <span className="text-[10px] font-bold text-[#44C255] uppercase tracking-wide">
                    You Are Here
                  </span>
                  <p className="text-white font-bold text-xs mt-0.5">
                    Glow & Co. Salon
                  </p>
                  <p className="text-white/40 text-[10px] mt-0.5">
                    Luxury District NY
                  </p>
                </div>
              </div>
              
              <div className="text-xs text-white/40 mt-3 text-center">
                Mock location for presentation purposes. Map controls simulated.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
