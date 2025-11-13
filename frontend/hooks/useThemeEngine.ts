"use client";

import { useEffect, useMemo } from "react";
import { useTheme } from "next-themes";

import { useAuth } from "@/context/AuthContext";
import { resolveThemePreset } from "@/lib/theme";

export const useThemeEngine = () => {
  const { theme: themeState } = useAuth();
  const { setTheme } = useTheme();

  const preset = useMemo(() => resolveThemePreset(themeState.token), [themeState.token]);

  useEffect(() => {
    setTheme(themeState.mode === "light" ? "light" : "dark");
  }, [setTheme, themeState.mode]);

  return {
    preset,
    themeState
  };
};




