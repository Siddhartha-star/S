"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: number;
  className?: string;
}

export const Loader = ({ size = 32, className }: LoaderProps) => (
  <div className={cn("flex items-center gap-2 text-white/70", className)}>
    {[0, 1, 2].map((index) => (
      <motion.span
        key={index}
        className="inline-block rounded-full bg-white/80"
        style={{ width: size / 5, height: size / 5 }}
        animate={{ y: ["0%", "-30%", "0%"], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 0.8, delay: index * 0.16 }}
      />
    ))}
  </div>
);




