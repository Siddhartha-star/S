"use client";

import Image from "next/image";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: number;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, size = 48, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 text-sm font-medium uppercase text-white/80",
        className
      )}
      style={{ width: size, height: size }}
      {...props}
    >
      {src ? (
        <Image src={src} alt={alt ?? "Avatar"} fill className="object-cover" />
      ) : (
        <span>{fallback?.slice(0, 2) ?? "UX"}</span>
      )}
    </div>
  )
);
Avatar.displayName = "Avatar";




