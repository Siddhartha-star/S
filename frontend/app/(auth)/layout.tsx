"use client";

import { motion } from "framer-motion";

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex min-h-[80vh] items-center justify-center">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="glass-panel relative w-full max-w-3xl overflow-hidden rounded-[40px] border border-white/10 px-10 py-12 shadow-[0_60px_120px_rgba(2,6,23,0.65)]"
    >
      <div className="aurora-veil pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  </div>
);

export default AuthLayout;




