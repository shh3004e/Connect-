import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import type { Service, Booking } from "../types";
import { motion, AnimatePresence } from "framer-motion";

interface BookingWizardProps {
  services: Service[];
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;
  onAddBooking: (booking: Omit<Booking, "id" | "status" | "createdAt">) => void;
  onViewBookings: () => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  services,
  selectedService,
  setSelectedService,
  onAddBooking,
  onViewBookings,
}) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate next 7 days for booking calendar
  const getNext7Days = () => {
    const days = [];
    const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dateString = d.toISOString().split("T")[0];
      days.push({
        dateString,
        dayName: weekdayNames[d.getDay()],
        dayNum: d.getDate(),
        month: d.toLocaleString("default", { month: "short" }),
      });
    }
    return days;
  };

  const dates = getNext7Days();

  // Hourly slots
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const handleNextStep = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && (!selectedDate || !selectedTimeSlot)) return;
    if (step === 3 && (!customerName || !email || !phone)) return;
    
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    onAddBooking({
      customerName,
      email,
      phone,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
    });

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate("");
    setSelectedTimeSlot("");
    setCustomerName("");
    setEmail("");
    setPhone("");
    setIsSubmitted(false);
  };

  return (
    <section className="py-24 bg-neutral-950 min-h-screen flex items-center justify-center">
      <div className="max-w-[700px] w-full mx-6">
        
        {/* Step tracker indicators */}
        {!isSubmitted && (
          <div className="flex items-center justify-between mb-8 px-2 max-w-sm mx-auto">
            {[1, 2, 3, 4].map((s) => (
              <React.Fragment key={s}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    step >= s
                      ? "bg-[#44C255] text-white shadow-md shadow-[#44C255]/20"
                      : "bg-neutral-900 border border-white/5 text-white/40"
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`flex-grow h-[2px] mx-2 transition-all duration-300 ${
                      step > s ? "bg-[#44C255]" : "bg-neutral-900"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Wizard panel */}
        <div className="glass-panel rounded-3xl p-8 relative overflow-hidden shadow-2xl">
          
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              // Success Screen
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-[#44C255]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#44C255]">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h3 className="font-heading text-3xl font-extrabold text-white mb-3">
                  Appointment Confirmed!
                </h3>
                <p className="text-white/60 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{customerName}</span>. Your booking for <span className="text-white font-semibold">{selectedService?.name}</span> is registered. A confirmation has been simulated to your mobile number.
                </p>

                {/* Info summary */}
                <div className="bg-neutral-950/50 border border-white/5 rounded-2xl p-6 text-left max-w-md mx-auto mb-8 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Treatment:</span>
                    <span className="text-white font-medium">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Date:</span>
                    <span className="text-white font-medium">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Time Slot:</span>
                    <span className="text-white font-medium">{selectedTimeSlot}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Client:</span>
                    <span className="text-white font-medium">{customerName}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={onViewBookings}
                    className="bg-[#44C255] text-white font-semibold rounded-full px-8 py-3.5 hover:bg-[#3db04c] shadow-lg shadow-[#44C255]/20 active:scale-95 transition-all text-sm cursor-pointer"
                  >
                    View Status in Admin
                  </button>
                  <button
                    onClick={handleReset}
                    className="bg-neutral-900 border border-white/5 text-white hover:bg-neutral-800 rounded-full px-8 py-3.5 active:scale-95 transition-all text-sm cursor-pointer"
                  >
                    Book Another Service
                  </button>
                </div>
              </motion.div>
            ) : (
              // Step Form Pages
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
              >
                {/* STEP 1: Select Service */}
                {step === 1 && (
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">
                      Select Treatment
                    </h3>
                    <p className="text-white/50 text-sm mb-6">
                      Which treatment would you like to schedule today?
                    </p>

                    <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => setSelectedService(service)}
                          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                            selectedService?.id === service.id
                              ? "bg-[#44C255]/10 border-[#44C255]/40"
                              : "bg-neutral-950/30 border-white/5 hover:border-white/10"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={service.imageUrl}
                              alt={service.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="text-left">
                              <h4 className="text-white font-semibold text-sm">
                                {service.name}
                              </h4>
                              <p className="text-white/40 text-xs mt-0.5">
                                {service.duration} mins
                              </p>
                            </div>
                          </div>
                          <span className="text-white font-extrabold text-sm">
                            ${service.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: Select Date & Time */}
                {step === 2 && (
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">
                      Select Date & Time
                    </h3>
                    <p className="text-white/50 text-sm mb-6">
                      Choose an available calendar day and time slot.
                    </p>

                    {/* Date Grid */}
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-6">
                      {dates.map((d) => (
                        <div
                          key={d.dateString}
                          onClick={() => {
                            setSelectedDate(d.dateString);
                            setSelectedTimeSlot(""); // reset time
                          }}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${
                            selectedDate === d.dateString
                              ? "bg-[#44C255] border-[#44C255] text-white shadow-md shadow-[#44C255]/20"
                              : "bg-neutral-950/40 border-white/5 text-white hover:border-white/10"
                          }`}
                        >
                          <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                            {d.dayName}
                          </span>
                          <span className="text-base font-extrabold my-1">{d.dayNum}</span>
                          <span className="text-[10px] font-semibold opacity-60">{d.month}</span>
                        </div>
                      ))}
                    </div>

                    {/* Time Slots Grid */}
                    {selectedDate ? (
                      <div>
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 text-left">
                          Available Slots for {selectedDate}
                        </h4>
                        <div className="grid grid-cols-3 gap-2.5">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`py-3 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                selectedTimeSlot === slot
                                  ? "bg-[#44C255]/20 border-[#44C255]/40 text-[#44C255]"
                                  : "bg-neutral-950/40 border-white/5 text-white/70 hover:text-white hover:border-white/10"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-10 bg-neutral-950/20 border border-dashed border-white/5 rounded-2xl">
                        <p className="text-white/40 text-xs">Please select a date from above first</p>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 3: Customer Information */}
                {step === 3 && (
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">
                      Your Contact Info
                    </h3>
                    <p className="text-white/50 text-sm mb-6">
                      Enter your details to confirm your appointment reservation.
                    </p>

                    <div className="space-y-4">
                      {/* Name input */}
                      <div>
                        <label className="block text-white/60 text-xs font-semibold mb-2 text-left uppercase tracking-wider">
                          Full Name
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                            <User className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            required
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-white/5 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#44C255] transition-all text-sm"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      {/* Email input */}
                      <div>
                        <label className="block text-white/60 text-xs font-semibold mb-2 text-left uppercase tracking-wider">
                          Email Address
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-white/5 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#44C255] transition-all text-sm"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      {/* Phone input */}
                      <div>
                        <label className="block text-white/60 text-xs font-semibold mb-2 text-left uppercase tracking-wider">
                          Phone Number
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                            <Phone className="w-4 h-4" />
                          </span>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-white/5 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#44C255] transition-all text-sm"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Checkout / Confirmation Summary */}
                {step === 4 && (
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">
                      Review & Confirm
                    </h3>
                    <p className="text-white/50 text-sm mb-6">
                      Check your scheduling details before completing.
                    </p>

                    <div className="bg-neutral-950 border border-white/5 rounded-2xl p-6 space-y-4 text-left">
                      <div className="flex items-start gap-4">
                        <img
                          src={selectedService?.imageUrl}
                          alt={selectedService?.name}
                          className="w-16 h-16 rounded-xl object-cover border border-white/5"
                        />
                        <div className="flex-grow">
                          <span className="text-[#44C255] text-[10px] font-bold uppercase tracking-wider">
                            {selectedService?.category}
                          </span>
                          <h4 className="text-white font-bold text-base mt-0.5">
                            {selectedService?.name}
                          </h4>
                          <p className="text-white/40 text-xs mt-1 leading-relaxed">
                            {selectedService?.description}
                          </p>
                        </div>
                      </div>

                      <div className="h-[1px] bg-white/5 w-full" />

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-[#44C255]" />
                          <span className="text-xs text-white/70">{selectedDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#44C255]" />
                          <span className="text-xs text-white/70">{selectedTimeSlot}</span>
                        </div>
                      </div>

                      <div className="h-[1px] bg-white/5 w-full" />

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-white/40">Client Name:</span>
                          <span className="text-white font-medium">{customerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">Phone Number:</span>
                          <span className="text-white font-medium">{phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">Treatment Price:</span>
                          <span className="text-white font-extrabold text-sm text-[#44C255]">
                            ${selectedService?.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer buttons row */}
                <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-8">
                  {step > 1 ? (
                    <button
                      onClick={handleBackStep}
                      className="bg-neutral-900 border border-white/5 hover:bg-neutral-800 text-white font-semibold rounded-full px-6 py-2.5 text-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <button
                      onClick={handleNextStep}
                      disabled={
                        (step === 1 && !selectedService) ||
                        (step === 2 && (!selectedDate || !selectedTimeSlot)) ||
                        (step === 3 && (!customerName || !email || !phone))
                      }
                      className="bg-[#44C255] hover:bg-[#3db04c] text-white disabled:opacity-30 font-semibold rounded-full px-6 py-2.5 text-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="bg-[#44C255] hover:bg-[#3db04c] text-white font-semibold rounded-full px-8 py-2.5 text-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Confirm Booking</span>
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
