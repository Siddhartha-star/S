"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type LoginValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { login, isAuthenticating, user } = useAuth();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  useEffect(() => {
    if (user) {
      window.location.replace("/dashboard");
    }
  }, [user]);

  const onSubmit = async (values: LoginValues) => {
    await login(values);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3 text-left">
        <span className="text-xs uppercase tracking-[0.4em] text-white/50">Enter Snap Mode</span>
        <h1 className="text-3xl font-semibold text-white">Welcome back</h1>
        <p className="max-w-md text-sm text-white/60">
          Continue your flow inside a neon-lit cockpit. Your session is sealed with secure cookies —
          just enter your credentials to unlock the dashboard.
        </p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input
          type="email"
          placeholder="alex@notion.so"
          floatingLabel="Email address"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-rose-300">{form.formState.errors.email.message}</p>
        )}

        <Input
          type="password"
          placeholder="•••••••"
          floatingLabel="Password"
          {...form.register("password")}
        />
        {form.formState.errors.password && (
          <p className="text-sm text-rose-300">{form.formState.errors.password.message}</p>
        )}

        <Button type="submit" variant="gradient" disabled={isAuthenticating}>
          {isAuthenticating ? (
            <div className="flex items-center gap-3">
              <Loader size={24} />
              Authenticating...
            </div>
          ) : (
            "Access dashboard"
          )}
        </Button>
      </form>
      <motion.div
        className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 text-white">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
            Demo access
          </span>
        </div>
        <p>
          Admin: <span className="font-medium text-white">admin@example.com</span> /{" "}
          <span className="font-mono text-white/80">password123</span>
        </p>
        <p>
          User: <span className="font-medium text-white">user@example.com</span> /{" "}
          <span className="font-mono text-white/80">password123</span>
        </p>
        <p className="text-xs text-white/50">
          Cookies are HTTP-only — sign out from the dashboard avatar menu when you’re done.
        </p>
      </motion.div>
      <p className="text-center text-sm text-white/60">
        Need an account?{" "}
        <Link href="/signup" className="text-white hover:underline">
          Activate your seat
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;

