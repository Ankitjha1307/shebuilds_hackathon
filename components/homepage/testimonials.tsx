"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";

interface Testimonial {
  key: "priya" | "anjali" | "meera" | "kavita" | "lakshmi" | "nisha";
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  { key: "priya", image: "/testimonials/priya.jpg", rating: 5 },
  { key: "anjali", image: "/testimonials/anjali.jpg", rating: 5 },
  { key: "meera", image: "/testimonials/meera.jpg", rating: 5 },
  { key: "kavita", image: "/testimonials/kavita.jpg", rating: 5 },
  { key: "lakshmi", image: "/testimonials/lakshmi.jpg", rating: 5 },
  { key: "nisha", image: "/testimonials/nisha.jpg", rating: 5 },
];

const TestimonialsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-black/10 mb-6 shadow-lg"
          >
            <Quote className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-black/70">
              {t.testimonials.badge}
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            {t.testimonials.title}{" "}
            <span className="italic">{t.testimonials.titleAccent}</span>
          </h2>
          <p className="text-base sm:text-lg text-black/70 max-w-2xl mx-auto px-4">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        {/* Testimonials Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => {
            const copy = t.testimonials.items[testimonial.key];

            return (
            <motion.div
              key={testimonial.key}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              } ${index === 2 ? "lg:row-span-2" : ""}`}
            >
              <div className="relative h-full bg-white/90 backdrop-blur-md rounded-2xl border border-black/10 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500" />

                {/* Content */}
                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      {/* Avatar Placeholder */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
                        {copy.name.charAt(0)}
                      </div>

                      {/* Info */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-black">
                          {copy.name}
                        </h3>
                        <p className="text-sm text-black/60">
                          {copy.role}
                        </p>
                        <p className="text-xs text-violet-600 font-medium">
                          {copy.business}
                        </p>
                      </div>
                    </div>

                    {/* Revenue Badge */}
                    {copy.revenue && (
                      <div className="px-3 py-1 rounded-full bg-green-100 border border-green-200 shrink-0">
                        <p className="text-xs sm:text-sm font-bold text-green-700">
                          {copy.revenue}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-violet-200 mb-3" />

                  {/* Testimonial */}
                  <p className="text-sm sm:text-base text-black/80 leading-relaxed mb-4">
                    &ldquo;{copy.testimonial}&rdquo;
                  </p>

                  {/* Highlight */}
                  <div className="flex items-center gap-2 pt-4 border-t border-black/10">
                    <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                    <p className="text-xs sm:text-sm font-semibold text-violet-600 italic">
                      {copy.highlight}
                    </p>
                  </div>

                  {/* Location */}
                  <p className="text-xs text-black/40 mt-3">
                    📍 {copy.location}
                  </p>
                </div>

                {/* Bottom Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-12 bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-black/10 shadow-xl">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-black mb-1">
                4.9/5
              </p>
              <p className="text-sm text-black/60">
                {t.testimonials.averageRating}
              </p>
            </div>
            <div className="h-12 w-px bg-black/10 hidden sm:block" />
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-black mb-1">
                10,000+
              </p>
              <p className="text-sm text-black/60">
                {t.testimonials.happyEntrepreneurs}
              </p>
            </div>
            <div className="h-12 w-px bg-black/10 hidden sm:block" />
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-black mb-1">
                ₹50Cr+
              </p>
              <p className="text-sm text-black/60">
                {t.testimonials.combinedRevenue}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;