"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60 backdrop-blur transition hover:border-white/40 hover:text-white",
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge };




