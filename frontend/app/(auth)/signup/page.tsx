"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/context/AuthContext";
import { THEME_PRESETS, ThemeToken } from "@/lib/theme";

const signupSchema = z.object({
  fullName: z.string().min(2, "Tell us how to introduce you"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Minimum eight characters required"),
  role: z.enum(["USER", "ADMIN"], {
    required_error: "Select a role"
  }),
  avatarUrl: z.string().url().optional()
});

type SignupValues = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const { signup, isAuthenticating, user } = useAuth();
  const [themeToken, setThemeToken] = useState<ThemeToken>("aurora");
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "USER",
      avatarUrl: ""
    }
  });

  if (user) {
    if (typeof window !== "undefined") {
      window.location.replace("/dashboard");
    }
    return null;
  }

  const onSubmit = async (values: SignupValues) => {
    await signup({
      ...values,
      themeToken,
      avatarUrl: values.avatarUrl || undefined
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <span className="text-xs uppercase tracking-[0.4em] text-white/50">Create your cockpit</span>
        <h1 className="text-3xl font-semibold text-white">Level up your workspace</h1>
        <p className="max-w-xl text-sm text-white/60">
          Spin up a role-based account, choose your gradient signature, and unlock a dashboard that
          feels handcrafted by a top-tier product studio.
        </p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Input placeholder="Ava Stone" floatingLabel="Full name" {...form.register("fullName")} />
            {form.formState.errors.fullName && (
              <p className="mt-1 text-sm text-rose-300">{form.formState.errors.fullName.message}</p>
            )}
          </div>
          <div>
            <Input
              type="email"
              placeholder="ava@linear.app"
              floatingLabel="Email"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-rose-300">{form.formState.errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Input
              type="password"
              placeholder="••••••••"
              floatingLabel="Password"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="mt-1 text-sm text-rose-300">{form.formState.errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Role
              <select
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-white/30 focus:outline-none"
                {...form.register("role")}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </label>
            {form.formState.errors.role && (
              <p className="mt-1 text-sm text-rose-300">{form.formState.errors.role.message}</p>
            )}
          </div>
        </div>

        <div>
          <Input
            type="url"
            placeholder="https://api.dicebear.com/7.x/bottts/svg?seed=aurora"
            floatingLabel="Avatar URL"
            {...form.register("avatarUrl")}
          />
          {form.formState.errors.avatarUrl && (
            <p className="mt-1 text-sm text-rose-300">{form.formState.errors.avatarUrl.message}</p>
          )}
        </div>

        <motion.div
          className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div>
            <p className="text-sm font-semibold text-white">Choose your starting palette</p>
            <p className="text-xs text-white/60">
              SnapSearch syncs this to your profile and replays it on every login.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {THEME_PRESETS.map((preset) => {
              const isActive = preset.token === themeToken;
              return (
                <button
                  key={preset.token}
                  type="button"
                  onClick={() => setThemeToken(preset.token)}
                  className={`
                    relative flex h-32 flex-col justify-between rounded-3xl border border-white/15 p-4 text-left transition
                    ${isActive ? "border-white/60 shadow-[0_0_45px_rgba(255,255,255,0.18)]" : "hover:border-white/30"}
                  `}
                  style={{ backgroundImage: preset.gradient }}
                >
                  <span className="text-sm font-semibold text-white">{preset.name}</span>
                  <span className="text-xs text-white/70">{preset.description}</span>
                  {isActive && (
                    <motion.span
                      layoutId="theme-dot"
                      className="absolute right-4 top-4 h-3 w-3 rounded-full bg-white"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        <Button type="submit" variant="gradient" disabled={isAuthenticating}>
          {isAuthenticating ? (
            <div className="flex items-center gap-3">
              <Loader size={24} />
              Creating your workspace...
            </div>
          ) : (
            "Launch dashboard"
          )}
        </Button>
      </form>
      <p className="text-center text-sm text-white/60">
        Already activated?{" "}
        <Link href="/login" className="text-white hover:underline">
          Jump to login
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;




