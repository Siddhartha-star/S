"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),transparent_65%)] border border-white/10 text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_25px_45px_rgba(0,0,0,0.35)] hover:scale-[1.01]",
        outline:
          "border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur",
        ghost: "text-white/80 hover:text-white hover:bg-white/10",
        gradient:
          "text-white bg-[linear-gradient(135deg,var(--accent-start),var(--accent-end))] shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:scale-[1.015]"
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  glow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, glow = true, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot className={cn(buttonVariants({ variant, size }), className)}>
          {children}
        </Slot>
      );
    }

    const Comp = "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {glow && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 opacity-70 blur-3xl"
            style={{
              background: "var(--theme-gradient, linear-gradient(135deg,#0091ff,#ff00b7))"
            }}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.45, 0.75, 0.45] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </Comp>
    );
  }
);
Button.displayName = "Button";


