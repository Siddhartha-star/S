"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  floatingLabel?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, floatingLabel, id, ...props }, ref) => {
    return (
      <label className="relative block text-sm text-white/70">
        {floatingLabel && (
          <span className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
            <span className="h-1 w-1 rounded-full bg-white/40" />
            {floatingLabel}
          </span>
        )}
        <input
          type={type}
          id={id}
          className={cn(
            "glass-panel w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder:text-white/35 transition duration-300 ease-out focus:-translate-y-[1px] focus:border-white/30 focus:outline-none focus:ring-0 focus:shadow-[0_0_0_3px_rgba(0,145,255,0.25)]",
            className
          )}
          ref={ref}
          {...props}
        />
      </label>
    );
  }
);
Input.displayName = "Input";


