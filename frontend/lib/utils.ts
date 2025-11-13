import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatGreeting = (fullName?: string) => {
  if (!fullName) return "there";
  const [first] = fullName.split(" ");
  return first ?? fullName;
};




