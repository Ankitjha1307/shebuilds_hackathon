"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Heart,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="relative bg-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{t.common.appName}</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex gap-3 pt-2">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {([
                { key: "features", href: "#features" },
                { key: "howItWorks", href: "#how-it-works" },
                { key: "pricing", href: "/pricing" },
                { key: "successStories", href: "#testimonials" },
                { key: "aboutUs", href: "/about" },
              ] as const).map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {t.footer[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t.footer.resources}
            </h4>
            <ul className="space-y-3">
              {([
                { key: "learningHub", href: "/learn" },
                { key: "blog", href: "/blog" },
                { key: "helpCenter", href: "/help" },
                { key: "community", href: "/community" },
                { key: "contactUs", href: "/contact" },
              ] as const).map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {t.footer[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t.footer.getInTouch}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <Mail className="w-5 h-5 shrink-0 mt-0.5" />
                <a
                  href="mailto:support@shecan.in"
                  className="hover:text-white transition-colors"
                >
                  support@shecan.in
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <Phone className="w-5 h-5 shrink-0 mt-0.5" />
                <a
                  href="tel:+911234567890"
                  className="hover:text-white transition-colors"
                >
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{t.footer.location}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-white/40 text-sm text-center sm:text-left">
              {t.footer.copyright(currentYear)}
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-white/40 hover:text-white transition-colors"
              >
                {t.footer.privacy}
              </Link>
              <Link
                href="/terms"
                className="text-white/40 hover:text-white transition-colors"
              >
                {t.footer.terms}
              </Link>
            </div>
          </div>

          {/* Made with love */}
          <div className="flex items-center justify-center gap-2 text-white/40 text-sm mt-4">
            <span>{t.footer.madeWith}</span>
            <Heart className="w-4 h-4 fill-red-500 text-red-500 animate-pulse" />
            <span>{t.footer.forWomen}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
