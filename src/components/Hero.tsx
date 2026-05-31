import React from "react";
import { ArrowRight, Star, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreClick }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#44C255]/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-[1280px] mx-auto w-full px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Content Column */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start text-left"
        >
          {/* Badge indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-white/5 mb-6">
            <Sparkles className="w-4 h-4 text-[#44C255]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
              Welcome to cnnect Salon & Spa
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-5xl md:text-6xl xl:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Reveal Your True <span className="text-[#44C255]">Radiance</span>
          </h1>

          {/* Subtext */}
          <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-xl font-light">
            Indulge in a bespoke pampering experience tailored to your unique beauty. From expert hair styling and coloring to deep-cleansing skincare treatments, our specialists are dedicated to your glow.
          </p>

          {/* Call-to-actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#44C255] text-white hover:bg-[#3db04c] px-8 py-4 rounded-full font-bold text-base transition-all duration-200 shadow-[0_8px_24px_rgba(68,194,85,0.3)] active:scale-98 cursor-pointer"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 border border-white/10 text-white hover:bg-neutral-800 hover:border-white/20 px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 active:scale-98 cursor-pointer"
            >
              Explore Services
            </button>
          </div>

          {/* Core Trust Statistics */}
          <div className="flex flex-wrap items-center gap-8 border-t border-white/5 pt-8 w-full">
            <div className="flex items-center gap-2">
              <div className="flex text-[#44C255]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-white">4.9 / 5</span>
              <span className="text-white/40 text-sm">(800+ reviews)</span>
            </div>
            
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#44C255]" />
              <span>Certified Experts</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Premium Imagery Grid */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative grid grid-cols-12 gap-4 h-[500px]"
        >
          {/* Main Large Image */}
          <div className="col-span-8 h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 relative">
            <img 
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800" 
              alt="Luxury hair salon styling" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="bg-[#44C255] text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Hair Design
              </span>
            </div>
          </div>

          {/* Grid stack (Right Side) */}
          <div className="col-span-4 flex flex-col gap-4 h-full">
            {/* Top right image */}
            <div className="h-1/2 rounded-2xl overflow-hidden border border-white/10 relative">
              <img 
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400" 
                alt="Nail Art manicure" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Nails
                </span>
              </div>
            </div>

            {/* Bottom right image */}
            <div className="h-1/2 rounded-2xl overflow-hidden border border-white/10 relative">
              <img 
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400" 
                alt="Skincare Facial" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="bg-cyan-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Skincare
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
