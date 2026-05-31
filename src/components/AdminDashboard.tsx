import React, { useState } from "react";
import { CheckCircle2, XCircle, Clock, DollarSign, Calendar, TrendingUp, Filter } from "lucide-react";
import type { Booking, Service } from "../types";

interface AdminDashboardProps {
  bookings: Booking[];
  services: Service[];
  onUpdateStatus: (id: string, status: Booking["status"]) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  bookings,
  services,
  onUpdateStatus,
}) => {
  const [filter, setFilter] = useState<string>("all");

  const getServicePrice = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    return service ? service.price : 0;
  };

  // Stats calculation
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const approvedBookings = bookings.filter((b) => b.status === "approved").length;
  
  // Total Revenue: sum of prices of approved or completed bookings
  const revenue = bookings
    .filter((b) => b.status === "approved" || b.status === "completed")
    .reduce((acc, curr) => acc + getServicePrice(curr.serviceId), 0);

  const filteredBookings = bookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  return (
    <section className="py-24 bg-neutral-950 min-h-screen text-left">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        {/* Dashboard Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-white/5 pb-6">
          <div>
            <h2 className="font-heading text-3xl font-extrabold text-white">
              Business Admin Dashboard
            </h2>
            <p className="text-white/40 text-sm mt-1">
              Manage client appointments, reviews, and track performance indicators.
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#44C255]/15 border border-[#44C255]/30 text-[#44C255] text-xs font-bold uppercase tracking-wider rounded-full">
            <span className="w-2 h-2 bg-[#44C255] rounded-full animate-ping" />
            Live Simulator View
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Total bookings */}
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                Total Bookings
              </span>
              <div className="p-2 rounded-lg bg-neutral-900 border border-white/5 text-white/80">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <span className="text-4xl font-extrabold text-white">{totalBookings}</span>
            <div className="flex items-center gap-1.5 text-xs text-white/50 mt-2">
              <TrendingUp className="w-3.5 h-3.5 text-[#44C255]" />
              <span>Simulated current records</span>
            </div>
          </div>

          {/* Card 2: Projected revenue */}
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                Projected Revenue
              </span>
              <div className="p-2 rounded-lg bg-neutral-900 border border-white/5 text-[#44C255]">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <span className="text-4xl font-extrabold text-white">${revenue}</span>
            <div className="flex items-center gap-1.5 text-xs text-white/50 mt-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#44C255]" />
              <span>Approved / Complete</span>
            </div>
          </div>

          {/* Card 3: Approved bookings */}
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                Active / Approved
              </span>
              <div className="p-2 rounded-lg bg-neutral-900 border border-white/5 text-blue-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <span className="text-4xl font-extrabold text-white">{approvedBookings}</span>
            <div className="flex items-center gap-1.5 text-xs text-white/50 mt-2">
              <span>Ready for appointments</span>
            </div>
          </div>

          {/* Card 4: Pending bookings */}
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                Pending Actions
              </span>
              <div className="p-2 rounded-lg bg-neutral-900 border border-white/5 text-orange-400">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <span className="text-4xl font-extrabold text-white">{pendingBookings}</span>
            <div className="flex items-center gap-1.5 text-xs text-white/50 mt-2">
              <span>Awaiting owner approval</span>
            </div>
          </div>
        </div>

        {/* Filters and Booking Queue Table */}
        <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
          {/* Section Header with Status Filters */}
          <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#44C255]" />
              Booking Queue Management
            </h3>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-neutral-950 p-1.5 rounded-full border border-white/5">
              {["all", "pending", "approved", "completed", "cancelled"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide cursor-pointer transition-all ${
                    filter === f
                      ? "bg-[#44C255] text-white shadow-sm"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {filteredBookings.length > 0 ? (
              <table className="w-full text-sm text-left text-white/80">
                <thead className="text-xs uppercase tracking-wider text-white/40 bg-neutral-950 border-b border-white/5">
                  <tr>
                    <th scope="col" className="px-6 py-4">Client Detail</th>
                    <th scope="col" className="px-6 py-4">Treatment</th>
                    <th scope="col" className="px-6 py-4">Date / Slot</th>
                    <th scope="col" className="px-6 py-4 text-center">Status</th>
                    <th scope="col" className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-neutral-900/10">
                  {filteredBookings.map((booking) => {
                    const price = getServicePrice(booking.serviceId);
                    return (
                      <tr key={booking.id} className="hover:bg-neutral-900/30 transition-colors">
                        {/* Client details */}
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">{booking.customerName}</div>
                          <div className="text-xs text-white/40 mt-0.5">{booking.phone}</div>
                          <div className="text-xs text-white/40">{booking.email}</div>
                        </td>

                        {/* Service detail */}
                        <td className="px-6 py-4">
                          <span className="font-semibold text-white">{booking.serviceName}</span>
                          <div className="text-xs text-[#44C255] mt-0.5 font-bold">${price}</div>
                        </td>

                        {/* Calendar parameters */}
                        <td className="px-6 py-4">
                          <div className="font-medium text-white">{booking.date}</div>
                          <div className="text-xs text-white/40 mt-0.5">{booking.timeSlot}</div>
                        </td>

                        {/* Queue status tag */}
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              booking.status === "pending"
                                ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                                : booking.status === "approved"
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                : booking.status === "completed"
                                ? "bg-[#44C255]/10 text-[#44C255] border border-[#44C255]/20"
                                : "bg-red-500/10 text-red-400 border border-red-500/20"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {booking.status}
                          </span>
                        </td>

                        {/* Owner action controls */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2.5">
                            {booking.status === "pending" && (
                              <button
                                onClick={() => onUpdateStatus(booking.id, "approved")}
                                className="p-2 rounded-lg bg-neutral-900 border border-white/5 text-[#44C255] hover:bg-[#44C255]/10 hover:border-[#44C255]/30 cursor-pointer transition-colors"
                                title="Approve booking"
                              >
                                <CheckCircle2 className="w-4.5 h-4.5" />
                              </button>
                            )}

                            {booking.status === "approved" && (
                              <button
                                onClick={() => onUpdateStatus(booking.id, "completed")}
                                className="p-2 rounded-lg bg-neutral-900 border border-white/5 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400/30 cursor-pointer transition-colors"
                                title="Mark as Completed"
                              >
                                <CheckCircle2 className="w-4.5 h-4.5" />
                              </button>
                            )}

                            {(booking.status === "pending" || booking.status === "approved") && (
                              <button
                                onClick={() => onUpdateStatus(booking.id, "cancelled")}
                                className="p-2 rounded-lg bg-neutral-900 border border-white/5 text-red-400 hover:bg-red-400/10 hover:border-red-400/30 cursor-pointer transition-colors"
                                title="Cancel booking"
                              >
                                <XCircle className="w-4.5 h-4.5" />
                              </button>
                            )}

                            {booking.status === "cancelled" && (
                              <span className="text-xs text-white/30 italic mr-2">Cancelled</span>
                            )}

                            {booking.status === "completed" && (
                              <span className="text-xs text-[#44C255] font-bold mr-2">Archived</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-16">
                <p className="text-white/40">No appointments found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
