import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mapped navigation links from the user screenshot
  const navLinks = [
    { name: "Home", tab: "home" },
    { name: "How It Works", tab: "booking" },
    { name: "Features", tab: "services" },
    { name: "For Businesses", tab: "admin" },
    { name: "About Us", tab: "about" },
  ];

  const LogoSVG = () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#44C255] w-8 h-8"
    >
      <path
        d="M10 21C6.134 21 3 17.866 3 14C3 10.134 6.134 7 10 7C12.5186 7 14.7314 8.32637 15.9621 10.3151M22 11C25.866 11 29 14.134 29 18C29 21.866 25.866 25 22 25C19.4814 25 17.2686 23.6736 16.0379 21.6849M16.0379 21.6849C16.9248 20.2526 17.5 18.5954 17.5 16.8151M16.0379 21.6849C14.7314 23.6736 12.5186 25 10 25C6.134 25 3 21.866 3 18C3 16.2197 3.57522 14.5626 4.46214 13.1302M15.9621 10.3151C15.0752 11.7474 14.5 13.4046 14.5 15.1849M15.9621 10.3151C17.2686 8.32637 19.4814 7 22 7C25.866 7 29 10.134 29 14C29 15.7803 28.4248 17.4374 27.5379 18.8698M14.5 15.1849C14.5 16.8151 15.9621 21.6849 15.9621 21.6849M17.5 16.8151C17.5 15.1849 15.9621 10.3151 15.9621 10.3151"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      <nav className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between h-20">
        
        {/* Logo and Brand Title */}
        <div 
          onClick={() => setCurrentTab("home")} 
          className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <LogoSVG />
          <span className="font-heading font-extrabold text-2xl tracking-tight text-white select-none">
            cnnect
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 h-full">
          {navLinks.map((link) => {
            const isActive = currentTab === link.tab;
            return (
              <button
                key={link.name}
                onClick={() => setCurrentTab(link.tab)}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-200 py-2 cursor-pointer ${
                  isActive ? "text-[#44C255]" : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbarUnderline"
                    className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#44C255] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Action Button (Get Started / Booking Trigger) */}
        <div className="hidden lg:block">
          <button 
            onClick={onBookClick}
            className="bg-[#44C255] text-white hover:bg-[#3db04c] transition-all duration-200 font-semibold rounded-full px-6 py-2.5 text-sm shadow-[0_4px_14px_rgba(68,194,85,0.3)] active:scale-95 cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 text-white/80 hover:text-white transition-opacity cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Navigation Drawer Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 h-full w-[80vw] max-w-[320px] bg-neutral-950 border-l border-white/10 z-50 p-6 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <LogoSVG />
                    <span className="font-heading font-extrabold text-xl text-white">
                      cnnect
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-white/80 hover:text-white transition-opacity cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Staggered Links */}
                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => {
                    const isActive = currentTab === link.tab;
                    return (
                      <button
                        key={link.name}
                        onClick={() => {
                          setCurrentTab(link.tab);
                          setMobileMenuOpen(false);
                        }}
                        className={`text-left text-lg font-medium tracking-wide transition-colors py-1 cursor-pointer ${
                          isActive ? "text-[#44C255]" : "text-white/80 hover:text-white"
                        }`}
                      >
                        {link.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Call-to-Action */}
              <div className="pt-6 border-t border-white/10">
                <button
                  onClick={() => {
                    onBookClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#44C255] text-white py-3 rounded-full font-semibold shadow-lg hover:bg-[#3db04c] transition-all cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
