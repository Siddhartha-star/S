"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export const AppNav = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <motion.nav
      className="glass-panel sticky top-6 z-30 mb-4 flex items-center justify-between gap-6 rounded-full border border-white/10 px-8 py-3 backdrop-blur"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link href="/dashboard" className="text-sm font-semibold text-white">
        SnapSearch
      </Link>
      <div className="flex items-center gap-4 text-sm">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3 py-2 text-white/70 transition hover:text-white",
                active && "text-white"
              )}
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-x-0 top-[calc(100%+6px)] mx-auto h-[2px] w-2/3 rounded-full bg-white"
                />
              )}
              {item.label}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};




