"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export const RouteTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
};

