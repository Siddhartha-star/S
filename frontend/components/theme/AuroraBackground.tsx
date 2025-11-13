"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { useAuth } from "@/context/AuthContext";

const layers = Array.from({ length: 4 }).map((_, i) => i);

export const AuroraBackground = () => {
  const { theme } = useAuth();

  const gradients = useMemo(() => {
    const palette = theme.glow ?? "rgba(0,145,255,0.4)";
    return [
      `radial-gradient(circle at 20% 20%, ${palette}, transparent 50%)`,
      `radial-gradient(circle at 80% 0%, ${theme.highlight ?? "#ff00b7"}, transparent 55%)`,
      `radial-gradient(circle at 10% 80%, ${theme.accent ?? "#0091ff"}, transparent 60%)`
    ];
  }, [theme.accent, theme.glow, theme.highlight]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {layers.map((layer) => (
        <motion.span
          key={layer}
          className="absolute inset-0 opacity-[0.12]"
          style={{
            background: gradients[layer % gradients.length],
            filter: "blur(90px)"
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 8, -8, 0]
          }}
          transition={{
            duration: 18 + layer * 4,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
      ))}
    </div>
  );
};




