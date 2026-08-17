"use client";
import { motion } from "framer-motion";

export default function FairyFooter() {
  return (
    <footer className="mt-4 sm:mt-8 text-center text-xs sm:text-sm text-pink-400 pb-[env(safe-area-inset-bottom)]">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      ></motion.div>
    </footer>
  );
}
