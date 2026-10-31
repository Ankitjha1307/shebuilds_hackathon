"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

const CTA = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main CTA Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
            {t.cta.titleLine1}
            <br />
            <span className="italic">{t.cta.titleLine2}</span>
          </h2>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-black/60 mb-12 max-w-2xl mx-auto px-4">
            {t.cta.subtitle}
          </p>

          {/* CTA Button */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 px-6 py-3 bg-black text-white text-lg font-semibold rounded-md shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 group"
            >
              {t.cta.button}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Minimal bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent" />
    </section>
  );
};

export default CTA;