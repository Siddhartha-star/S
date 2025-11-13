"use client";

import { motion } from "framer-motion";
import { Settings, Sparkles } from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/context/AuthContext";
import { formatGreeting } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RealtimeClock } from "./RealtimeClock";

export const DashboardHeader = () => {
  const { user, logout } = useAuth();

  return (
    <motion.header
      className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:flex-row md:items-center md:justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Badge className="bg-white/8 text-white/80">
            <Sparkles className="h-3.5 w-3.5" /> Live workspace
          </Badge>
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            {user?.role === "ADMIN" ? "⚙️" : "👋"} Welcome, {formatGreeting(user?.fullName)} (
            {user?.role === "ADMIN" ? "Admin" : "User"})
          </h1>
          <p className="mt-2 max-w-xl text-lg text-white/70">
            Command center for your AI-assisted productivity. Track stats, run quick actions, and
            fine-tune your theme — all in one vivid dashboard.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" glow={false}>
            <Link href="/profile">
              <Settings className="mr-2 h-4 w-4" />
              Personalize workspace
            </Link>
          </Button>
          <Button variant="ghost" glow={false} onClick={logout}>
            Log out
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="glass-panel relative flex items-center gap-3 rounded-3xl border border-white/10 px-5 py-4">
          <Avatar src={user?.avatarUrl} fallback={user?.fullName} size={56} />
          <div className="flex flex-col text-sm text-white/70">
            <span className="text-base font-semibold text-white">{user?.fullName}</span>
            <span className="uppercase tracking-[0.3em] text-white/40">{user?.role}</span>
          </div>
        </div>
        <RealtimeClock />
      </div>
    </motion.header>
  );
};




