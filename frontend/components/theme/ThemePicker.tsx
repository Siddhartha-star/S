"use client";

import { motion } from "framer-motion";
import { useTransition } from "react";

import { useAuth } from "@/context/AuthContext";
import { THEME_PRESETS } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const ThemePicker = () => {
  const { theme, setThemeToken } = useAuth();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {THEME_PRESETS.map((preset) => {
        const isActive = theme.token === preset.token;
        return (
          <motion.div
            key={preset.token}
            layout
            className={cn(
              "relative rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-white/30",
              isActive && "border-white/50 bg-white/10 shadow-[0_0_35px_rgba(255,255,255,0.12)]"
            )}
            style={{ backgroundImage: preset.gradient }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="absolute inset-0 rounded-3xl bg-black/50 backdrop-blur-2xl" />
            <div className="relative z-10 flex flex-col gap-4 text-white">
              <div>
                <p className="text-lg font-semibold">{preset.name}</p>
                <p className="text-sm text-white/80">{preset.description}</p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <span className="inline-flex h-3 w-3 rounded-full" style={{ backgroundColor: preset.accent }} />
                  <span className="inline-flex h-3 w-3 rounded-full" style={{ backgroundColor: preset.highlight }} />
                </div>
                <Button
                  variant={isActive ? "gradient" : "outline"}
                  size="sm"
                  glow={false}
                  disabled={isActive || isPending}
                  onClick={() =>
                    startTransition(async () => {
                      await setThemeToken(preset.token);
                    })
                  }
                >
                  {isActive ? "Active" : isPending ? "Applying..." : "Activate"}
                </Button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};




