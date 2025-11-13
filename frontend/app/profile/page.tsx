"use client";

import { motion } from "framer-motion";
import { Palette } from "lucide-react";

import { ThemePicker } from "@/components/theme/ThemePicker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const ProfilePage = () => {
  const { user, theme, refreshSession, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="glass-panel rounded-3xl px-6 py-4 text-sm text-white/70">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <p className="text-white/70">You need to log in to access profile settings.</p>
        <Button asChild variant="gradient">
          <a href="/login">Sign in</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 pb-16">
      <motion.section
        className="glass-panel flex flex-col gap-6 rounded-[32px] border border-white/10 p-8 md:flex-row md:items-center md:justify-between"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-5">
          <Avatar src={user?.avatarUrl} fallback={user?.fullName} size={80} />
          <div>
            <h1 className="text-3xl font-semibold text-white">Profile & Personalization</h1>
            <p className="text-sm text-white/60">
              Tune your identity, sync avatars, and experiment with immersive gradient presets.
            </p>
          </div>
        </div>
        <Button variant="outline" glow={false} onClick={refreshSession}>
          Refresh data
        </Button>
      </motion.section>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Smart Theme Engine</CardTitle>
            <CardDescription>
              Choose a gradient, and we’ll rehydrate it from MongoDB every time you return.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ThemePicker />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Current palette</CardTitle>
            <CardDescription>
              Snapshot of the colors powering your glassmorphism surface.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              <p>
                <span className="font-medium text-white">Accent:</span> {theme.accent}
              </p>
              <p>
                <span className="font-medium text-white">Highlight:</span> {theme.highlight}
              </p>
              <p>
                <span className="font-medium text-white">Glow:</span> {theme.glow}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                Preview
                <div
                  className="mt-2 h-24 rounded-2xl border border-white/10"
                  style={{ backgroundImage: `var(--theme-gradient)` }}
                />
              </label>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile metadata</CardTitle>
            <CardDescription>
              Update contact details synced across your dashboards.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input value={user?.fullName ?? ""} floatingLabel="Name" readOnly />
            <Input value={user?.email ?? ""} floatingLabel="Email" readOnly />
            <Input value={user?.role ?? ""} floatingLabel="Role" readOnly />
            <Button variant="outline" glow={false} disabled>
              Coming soon — edit profile
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Theme intelligence
            </CardTitle>
            <CardDescription>
              We remember your preferred ambience across devices, combining gradients, glass, and
              neon glow.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-white/70">
            <p>
              Each preset saves accent colors, surface tints, and glow values to MongoDB.
              Reactivation is instant thanks to the AuthProvider fetching <code>/api/theme</code>{" "}
              on load.
            </p>
            <p>
              The Smart Theme Engine updates CSS variables, animates transitions with Framer Motion,
              and syncs with Tailwind for glassmorphism depth.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;

