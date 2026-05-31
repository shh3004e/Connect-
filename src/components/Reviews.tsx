import React, { useState } from "react";
import { Star, MessageSquare, Plus, Check } from "lucide-react";
import type { Review, Service } from "../types";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewsProps {
  reviews: Review[];
  services: Service[];
  onAddReview: (review: Omit<Review, "id" | "date">) => void;
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews, services, onAddReview }) => {
  const [showForm, setShowForm] = useState(false);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Total rating calculation
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
    : "0.0";

  const ratingCounts = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => Math.round(r.rating) === stars).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { stars, count, percentage };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    onAddReview({
      author,
      rating,
      comment,
      serviceName: selectedService || undefined,
    });

    setFormSubmitted(true);
    setTimeout(() => {
      setAuthor("");
      setRating(5);
      setComment("");
      setSelectedService("");
      setFormSubmitted(false);
      setShowForm(false);
    }, 2000);
  };

  return (
    <section className="py-24 bg-neutral-950 min-h-screen text-left">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
            Customer Testimonials
          </h2>
          <p className="text-white/60 text-lg">
            See what our clients say about their pampering experiences at Glow & Co.
          </p>
        </div>

        {/* Rating Overview and Action Trigger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Average rating card */}
          <div className="lg:col-span-4 glass-panel p-8 rounded-2xl flex flex-col items-center justify-center text-center">
            <span className="text-6xl font-extrabold text-white mb-4">{averageRating}</span>
            
            <div className="flex text-[#44C255] gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 fill-current ${
                    i < Math.round(parseFloat(averageRating))
                      ? "text-[#44C255]"
                      : "text-white/10"
                  }`}
                />
              ))}
            </div>
            
            <span className="text-white/50 text-sm mb-6">
              Based on {totalReviews} client reviews
            </span>
            
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#44C255] text-white hover:bg-[#3db04c] font-semibold rounded-full px-6 py-3 text-sm flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_rgba(68,194,85,0.3)] active:scale-95 cursor-pointer w-full"
            >
              <Plus className="w-4 h-4" />
              <span>Leave a Review</span>
            </button>
          </div>

          {/* Detailed distribution bars */}
          <div className="lg:col-span-8 glass-panel p-8 rounded-2xl space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Review Breakdown
            </h4>
            {ratingCounts.map((rc) => (
              <div key={rc.stars} className="flex items-center gap-4 text-sm">
                <span className="text-white/60 w-3 font-semibold">{rc.stars}</span>
                <Star className="w-4 h-4 fill-current text-[#44C255] flex-shrink-0" />
                
                {/* Visual Bar */}
                <div className="flex-grow h-3 bg-neutral-950 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${rc.percentage}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-[#44C255] rounded-full"
                  />
                </div>
                
                <span className="text-white/40 w-10 text-right">{rc.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sliding Rating Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-16"
            >
              <div className="glass-panel p-8 rounded-3xl max-w-2xl mx-auto border border-[#44C255]/20">
                <AnimatePresence mode="wait">
                  {formSubmitted ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-14 h-14 bg-[#44C255]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#44C255]">
                        <Check className="w-8 h-8" />
                      </div>
                      <h4 className="font-heading text-xl font-bold text-white mb-1">
                        Thank you for your feedback!
                      </h4>
                      <p className="text-white/50 text-sm">
                        Your review has been successfully simulated and published.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="font-heading text-xl font-bold text-white">
                        Write a Review
                      </h3>

                      {/* Stars input selector */}
                      <div>
                        <span className="block text-white/60 text-xs font-semibold mb-2 uppercase tracking-wider">
                          Rating
                        </span>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="text-2xl hover:scale-110 transition-transform cursor-pointer"
                            >
                              <Star
                                className={`w-8 h-8 ${
                                  star <= rating ? "fill-current text-[#44C255]" : "text-white/10"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Author Name */}
                      <div>
                        <label className="block text-white/60 text-xs font-semibold mb-2 uppercase tracking-wider">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          className="w-full px-4 py-3 bg-neutral-950 border border-white/5 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#44C255] transition-all text-sm"
                          placeholder="Jane Doe"
                        />
                      </div>

                      {/* Treatment select drop-down */}
                      <div>
                        <label className="block text-white/60 text-xs font-semibold mb-2 uppercase tracking-wider">
                          Select Treatment (Optional)
                        </label>
                        <select
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full px-4 py-3 bg-neutral-950 border border-white/5 rounded-xl text-white focus:outline-none focus:border-[#44C255] transition-all text-sm cursor-pointer"
                        >
                          <option value="">Select a service...</option>
                          {services.map((s) => (
                            <option key={s.id} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Review Comment text-area */}
                      <div>
                        <label className="block text-white/60 text-xs font-semibold mb-2 uppercase tracking-wider">
                          Your Comment
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full px-4 py-3 bg-neutral-950 border border-white/5 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#44C255] transition-all text-sm resize-none"
                          placeholder="Describe your salon experience..."
                        />
                      </div>

                      <div className="flex gap-4 justify-end">
                        <button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="bg-neutral-900 border border-white/5 text-white hover:bg-neutral-800 rounded-full px-6 py-2.5 text-sm active:scale-95 transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-[#44C255] text-white hover:bg-[#3db04c] font-semibold rounded-full px-6 py-2.5 text-sm active:scale-95 transition-all shadow-[0_4px_14px_rgba(68,194,85,0.3)] cursor-pointer"
                        >
                          Submit Review
                        </button>
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Timeline Queue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="glass-panel p-6 rounded-2xl hover:border-white/10 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Header info */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-white font-bold text-base">{review.author}</h4>
                    <span className="text-white/40 text-[10px]">{review.date}</span>
                  </div>

                  {/* Stars display */}
                  <div className="flex text-[#44C255] gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 fill-current ${
                          i < review.rating ? "text-[#44C255]" : "text-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  "{review.comment}"
                </p>
              </div>

              {/* Mapped treatment tags */}
              {review.serviceName && (
                <div className="flex items-center gap-1.5 mt-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#44C255]" />
                  <span className="text-xs text-white/50 font-medium">
                    Reviewed: <span className="text-[#44C255]">{review.serviceName}</span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
