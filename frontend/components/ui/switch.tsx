"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full border border-white/20 bg-white/10 transition hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 translate-x-1 rounded-full bg-white shadow-lg ring-0 transition data-[state=checked]:translate-x-6",
        "bg-[radial-gradient(circle,_rgba(0,145,255,0.9),rgba(255,0,183,0.7))]"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = "Switch";




