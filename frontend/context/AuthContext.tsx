"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";

import api from "@/lib/api";
import { THEME_PRESETS, ThemeToken, resolveThemePreset } from "@/lib/theme";

interface ThemePayload {
  accent: string;
  highlight: string;
  base: string;
  surface: string;
  glow?: string;
  mode: "dark" | "light" | "system";
  token?: ThemeToken;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: "USER" | "ADMIN";
  avatarUrl?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  theme: ThemePayload;
  isLoading: boolean;
  isAuthenticating: boolean;
  login: (input: { email: string; password: string }) => Promise<void>;
  signup: (input: {
    fullName: string;
    email: string;
    password: string;
    role: "USER" | "ADMIN";
    avatarUrl?: string;
    themeToken?: ThemeToken;
  }) => Promise<void>;
  logout: () => Promise<void>;
  setThemeToken: (token: ThemeToken) => Promise<void>;
  refreshSession: () => Promise<void>;
}

const defaultTheme = resolveThemePreset("aurora");

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const mapBackendThemeToPreset = (theme?: Partial<ThemePayload>): ThemePayload => {
  if (!theme) {
    return {
      accent: defaultTheme.accent,
      highlight: defaultTheme.highlight,
      base: "rgba(17, 24, 39, 0.78)",
      surface: "rgba(30, 41, 59, 0.66)",
      glow: "rgba(0, 145, 255, 0.45)",
      mode: "dark",
      token: "aurora"
    };
  }

  const preset = THEME_PRESETS.find(
    (candidate) =>
      candidate.accent.toLowerCase() === theme.accent?.toLowerCase() &&
      candidate.highlight.toLowerCase() === theme.highlight?.toLowerCase()
  );

  return {
    accent: theme.accent ?? defaultTheme.accent,
    highlight: theme.highlight ?? defaultTheme.highlight,
    base: theme.base ?? "rgba(17, 24, 39, 0.78)",
    surface: theme.surface ?? "rgba(30, 41, 59, 0.66)",
    glow: theme.glow ?? "rgba(0, 145, 255, 0.45)",
    mode: theme.mode ?? "dark",
    token: preset?.token ?? defaultTheme.token
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [theme, setTheme] = useState<ThemePayload>(mapBackendThemeToPreset());
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const applyThemeToDocument = useCallback((themePayload: ThemePayload) => {
    if (typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    const preset = resolveThemePreset(themePayload.token);
    root.classList.remove("theme-aurora", "theme-sunset", "theme-galaxy");
    root.classList.add(`theme-${themePayload.token ?? "aurora"}`);

    root.style.setProperty("--theme-gradient", preset.gradient);
    root.style.setProperty("--accent-start", preset.accent);
    root.style.setProperty("--accent-end", preset.highlight);
    root.style.setProperty("--accent", preset.accent);
    root.style.setProperty("--highlight", preset.highlight);
    root.style.setProperty("--surface-color", themePayload.surface);
    root.style.setProperty("--base-color", themePayload.base);
    if (themePayload.glow) {
      root.style.setProperty("--glow-color", themePayload.glow);
    }
  }, []);

  const hydrateSession = useCallback(async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser({
        id: data.user.id,
        fullName: data.user.fullName,
        email: data.user.email,
        role: data.user.role,
        avatarUrl: data.user.avatarUrl
      });

      const themePayload = mapBackendThemeToPreset(data.theme);
      setTheme(themePayload);
      applyThemeToDocument(themePayload);
    } catch {
      setUser(null);
      const fallback = mapBackendThemeToPreset();
      setTheme(fallback);
      applyThemeToDocument(fallback);
    } finally {
      setIsLoading(false);
    }
  }, [applyThemeToDocument]);

  useEffect(() => {
    hydrateSession();
  }, [hydrateSession]);

  useEffect(() => {
    const handler = () => {
      setUser(null);
      const fallback = mapBackendThemeToPreset();
      setTheme(fallback);
      applyThemeToDocument(fallback);
      router.push("/login");
    };

    window.addEventListener("snapsearch:unauthorized", handler);
    return () => window.removeEventListener("snapsearch:unauthorized", handler);
  }, [applyThemeToDocument, router]);

  const login = useCallback(
    async (input: { email: string; password: string }) => {
      setIsAuthenticating(true);
      try {
        const { data } = await api.post("/auth/login", input);
        setUser({
          id: data.user.id,
          fullName: data.user.fullName,
          email: data.user.email,
          role: data.user.role,
          avatarUrl: data.user.avatarUrl
        });

        const themePayload = mapBackendThemeToPreset(data.theme);
        setTheme(themePayload);
        applyThemeToDocument(themePayload);

        toast.success("Welcome back!");
        router.push("/dashboard");
      } catch (error: unknown) {
        toast.error("Unable to sign in. Please verify your credentials.");
        throw error;
      } finally {
        setIsAuthenticating(false);
      }
    },
    [applyThemeToDocument, router]
  );

  const signup = useCallback(
    async (input: {
      fullName: string;
      email: string;
      password: string;
      role: "USER" | "ADMIN";
      avatarUrl?: string;
      themeToken?: ThemeToken;
    }) => {
      setIsAuthenticating(true);
      try {
        const preset = resolveThemePreset(input.themeToken);
        const payload = {
          fullName: input.fullName,
          email: input.email,
          password: input.password,
          role: input.role,
          avatarUrl: input.avatarUrl,
          theme: {
            accent: preset.accent,
            highlight: preset.highlight,
            base: "rgba(17, 24, 39, 0.78)",
            surface: "rgba(30, 41, 59, 0.66)",
            glow: "rgba(0, 145, 255, 0.45)",
            mode: "dark"
          }
        };

        const { data } = await api.post("/auth/signup", payload);
        setUser({
          id: data.user.id,
          fullName: data.user.fullName,
          email: data.user.email,
          role: data.user.role,
          avatarUrl: data.user.avatarUrl
        });

        const themePayload = mapBackendThemeToPreset({
          ...data.theme,
          accent: preset.accent,
          highlight: preset.highlight
        });
        setTheme(themePayload);
        applyThemeToDocument(themePayload);

        toast.success("Account created! Redirecting to dashboard...");
        router.push("/dashboard");
      } catch (error: unknown) {
        toast.error("We couldn’t create your account. Please try again.");
        throw error;
      } finally {
        setIsAuthenticating(false);
      }
    },
    [applyThemeToDocument, router]
  );

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      const fallback = mapBackendThemeToPreset();
      setTheme(fallback);
      applyThemeToDocument(fallback);
      toast.message("Session closed");
      router.push("/login");
    } catch {
      toast.error("We couldn’t log you out. Try again.");
    }
  }, [applyThemeToDocument, router]);

  const setThemeToken = useCallback(
    async (token: ThemeToken) => {
      if (!user) {
        toast.error("Please log in to personalize your theme.");
        return;
      }

      const preset = resolveThemePreset(token);
      const payload = {
        accent: preset.accent,
        highlight: preset.highlight,
        base: token === "galaxy" ? "rgba(24, 20, 37, 0.78)" : token === "sunset" ? "rgba(31, 24, 19, 0.78)" : "rgba(17, 24, 39, 0.78)",
        surface: token === "galaxy" ? "rgba(42, 27, 74, 0.6)" : token === "sunset" ? "rgba(44, 30, 24, 0.6)" : "rgba(30, 41, 59, 0.66)",
        glow: token === "galaxy" ? "rgba(170, 86, 240, 0.55)" : token === "sunset" ? "rgba(255, 126, 95, 0.45)" : "rgba(0, 145, 255, 0.45)",
        mode: "dark" as const
      };

      try {
        await api.post("/theme", payload);
        setTheme({ ...payload, token });
        applyThemeToDocument({ ...payload, token });
        toast.success(`Theme updated to ${preset.name}`);
      } catch {
        toast.error("We couldn’t save your theme. Try again in a moment.");
      }
    },
    [applyThemeToDocument, user]
  );

  const refreshSession = useCallback(async () => {
    await hydrateSession();
  }, [hydrateSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      theme,
      isLoading,
      isAuthenticating,
      login,
      signup,
      logout,
      setThemeToken,
      refreshSession
    }),
    [user, theme, isLoading, isAuthenticating, login, signup, logout, setThemeToken, refreshSession]
  );

  return (
    <AuthContext.Provider value={value}>
      <motion.div
        key={theme.token}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};

