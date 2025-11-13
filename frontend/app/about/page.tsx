"use client";

import { motion } from "framer-motion";
import { Calendar, Compass, Rocket } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const storyPoints = [
  {
    icon: Rocket,
    title: "Built like a YC demo",
    description:
      "SnapSearch combines premium gradients, glassmorphism, and purposeful motion to feel pitch-ready from the first render."
  },
  {
    icon: Compass,
    title: "Orchestrated for teams",
    description:
      "Role-based dashboards, AI insights, and quick actions align your entire crew around what matters."
  },
  {
    icon: Calendar,
    title: "Future-proof theming",
    description:
      "Our Smart Theme Engine syncs palettes via MongoDB so your workspace remembers its vibe every time."
  }
];

const AboutPage = () => (
  <div className="flex flex-col gap-10 pb-16">
    <motion.section
      className="glass-panel overflow-hidden rounded-[32px] border border-white/10 p-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="aurora-veil pointer-events-none" />
      <div className="relative z-10 flex flex-col gap-6">
        <span className="text-xs uppercase tracking-[0.4em] text-white/50">About SnapSearch</span>
        <h1 className="max-w-3xl text-4xl font-semibold text-white md:text-5xl">
          Designing the SaaS cockpit of tomorrow — today.
        </h1>
        <p className="max-w-2xl text-lg text-white/70">
          SnapSearch is a showcase of how thoughtful engineering, neon gradients, and motion design
          can transform a typical assignment into something that feels ready for launch. Every piece
          is crafted to mimic the polish of Vercel, Linear, or Notion.
        </p>
      </div>
    </motion.section>

    <div className="grid gap-6 md:grid-cols-3">
      {storyPoints.map((point) => (
        <Card key={point.title}>
          <CardHeader className="flex flex-col gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
              <point.icon className="h-5 w-5" />
            </span>
            <CardTitle>{point.title}</CardTitle>
            <CardDescription>{point.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>

    <motion.section
      className="grid gap-6 rounded-[32px] border border-white/10 bg-white/5 p-10 lg:grid-cols-2"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="space-y-4 text-sm text-white/70">
        <h2 className="text-2xl font-semibold text-white">Experience goals</h2>
        <p>
          🎨 <strong>Futuristic UI:</strong> Neon gradients, glass panels, and ambient animations
          make every interaction cinematic.
        </p>
        <p>
          🔐 <strong>Production-grade architecture:</strong> Role-aware authentication, protected
          dashboards, and data hydration across tabs.
        </p>
        <p>
          🌈 <strong>Smart Theme Engine:</strong> Save a gradient to MongoDB and see it replay with
          Framer Motion transitions each time you log in.
        </p>
        <p>
          ⚡ <strong>Motion-first UX:</strong> Framer Motion handles page fades, cards slide in with
          subtle parallax, and loaders feel alive.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Stack highlights</CardTitle>
          <CardDescription>
            Every tool was chosen to deliver realism, performance, and style.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm text-white/70">
          <p>
            <strong>Next.js 14 + App Router:</strong> For streaming layouts and React Server
            Components.
          </p>
          <p>
            <strong>Tailwind CSS + shadcn/ui:</strong> Lets us sculpt glassmorphism while keeping
            consistent primitives.
          </p>
          <p>
            <strong>Framer Motion:</strong> Animates transitions, modals, and gradient hover states.
          </p>
          <p>
            <strong>Axios + React Query:</strong> Manages API calls with interceptors for cookies and
            session refresh.
          </p>
        </CardContent>
      </Card>
    </motion.section>
  </div>
);

export default AboutPage;

