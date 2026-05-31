import React, { useState } from "react";
import { Search, Clock, DollarSign, ArrowRight } from "lucide-react";
import type { Service } from "../types";
import { motion } from "framer-motion";

interface ServicesProps {
  services: Service[];
  onSelectService: (service: Service) => void;
}

export const Services: React.FC<ServicesProps> = ({ services, onSelectService }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Hair", "Nails", "Skincare", "Massages"];

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-24 bg-neutral-950 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
            Our Treatment Menu
          </h2>
          <p className="text-white/60 text-lg">
            Explore our curated menu of luxury treatments designed to rejuvenate your style and comfort.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-neutral-900/50 border border-white/5 p-4 rounded-2xl backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === category
                    ? "bg-[#44C255] text-white shadow-md shadow-[#44C255]/20"
                    : "bg-neutral-900 border border-white/5 text-white/70 hover:text-white hover:border-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search treatments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-neutral-950 border border-white/5 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-[#44C255] focus:ring-1 focus:ring-[#44C255] transition-all text-sm"
            />
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredServices.map((service) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                key={service.id}
                className="group flex flex-col justify-between bg-neutral-900 border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 relative"
              >
                {/* Visual Header */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                  <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-[#44C255] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#44C255] transition-colors duration-200">
                      {service.name}
                    </h3>
                    <p className="text-white/60 text-sm mb-6 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Metadata Row & CTA */}
                  <div>
                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mb-4">
                      {/* Price Tag */}
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-[#44C255]" />
                        <span className="text-2xl font-extrabold text-white">
                          {service.price}
                        </span>
                      </div>

                      {/* Duration Tag */}
                      <div className="flex items-center gap-1.5 text-white/50 text-xs">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration} mins</span>
                      </div>
                    </div>

                    {/* Book Now trigger */}
                    <button
                      onClick={() => onSelectService(service)}
                      className="w-full bg-neutral-950 border border-white/5 group-hover:bg-[#44C255] group-hover:border-[#44C255] text-white hover:text-white transition-all duration-200 py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Book Treatment</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-24 bg-neutral-900/20 border border-dashed border-white/5 rounded-2xl max-w-md mx-auto">
            <p className="text-white/40 text-lg">No treatments match your query.</p>
          </div>
        )}
      </div>
    </section>
  );
};
