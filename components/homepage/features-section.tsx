"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Store,
  Calculator,
  Palette,
  Users,
  BookOpen,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

interface Feature {
  icon: LucideIcon;
  key:
    | "ideaGenerator"
    | "storeBuilder"
    | "smartPricing"
    | "designGenerator"
    | "mentorConnect"
    | "learningHub"
    | "marketInsights"
    | "quickLaunch";
  color: string;
  gradient: string;
}

const features: Feature[] = [
  {
    icon: Sparkles,
    key: "ideaGenerator",
    color: "text-violet-600",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: Store,
    key: "storeBuilder",
    color: "text-blue-600",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Calculator,
    key: "smartPricing",
    color: "text-green-600",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Palette,
    key: "designGenerator",
    color: "text-pink-600",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    icon: Users,
    key: "mentorConnect",
    color: "text-orange-600",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    icon: BookOpen,
    key: "learningHub",
    color: "text-indigo-600",
    gradient: "from-indigo-500/20 to-purple-500/20",
  },
  {
    icon: TrendingUp,
    key: "marketInsights",
    color: "text-teal-600",
    gradient: "from-teal-500/20 to-cyan-500/20",
  },
  {
    icon: Zap,
    key: "quickLaunch",
    color: "text-yellow-600",
    gradient: "from-yellow-500/20 to-orange-500/20",
  },
];

const FeaturesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="#features" className="relative py-20 px-4 overflow-hidden bg-white">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 mb-6"
          >
            <Zap className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-black/70">
              {t.features.badge}
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-4">
            {t.features.title}{" "}
            <span className="italic">{t.features.titleAccent}</span>
          </h2>
          <p className="text-lg text-black/60 max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 border border-black/10 rounded-2xl overflow-hidden">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const copy = t.features.items[feature.key];
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white p-8 hover:bg-gradient-to-br hover:from-white hover:to-gray-50 transition-all duration-300"
              >
                {/* Animated Border Line */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} blur-xl`}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:shadow-lg transition-shadow`}
                  >
                    <Icon className={`w-7 h-7 ${feature.color}`} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-black mb-3 group-hover:text-black transition-colors">
                    {copy.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-black/60 leading-relaxed group-hover:text-black/70 transition-colors">
                    {copy.description}
                  </p>

                  {/* Hover Arrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="mt-4 flex items-center gap-2 text-sm font-semibold text-black/40 group-hover:text-black transition-colors"
                  >
                    <span>{t.features.learnMore}</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${feature.gradient} blur-2xl`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-black/60 mb-6">{t.features.bottomText}</p>
          <Link href={"/dashboard"}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3.5 bg-black text-white font-semibold rounded-md shadow-xl hover:shadow-2xl transition-shadow inline-flex items-center gap-2"
          >
            {t.features.cta}
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200/30 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl opacity-50" />
    </section>
  );
};

export default FeaturesSection;
