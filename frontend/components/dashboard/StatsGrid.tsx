"use client";

import { motion } from "framer-motion";
import { Activity, BarChart3, Flame, Zap } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    label: "Focus Score",
    value: "92%",
    delta: "+6.4%",
    icon: Zap,
    description: "AI-calculated flow based on your completed actions."
  },
  {
    label: "Recent Wins",
    value: "18",
    delta: "+3",
    icon: Flame,
    description: "Confetti-worthy tasks you closed this week."
  },
  {
    label: "Active Automations",
    value: "5",
    delta: "Realtime",
    icon: Activity,
    description: "Workflows currently optimizing your day."
  },
  {
    label: "Insights Generated",
    value: "27",
    delta: "+12%",
    icon: BarChart3,
    description: "Personalized recommendations delivered today."
  }
];

export const StatsGrid = () => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
    {stats.map((stat) => (
      <Card key={stat.label}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>{stat.label}</CardTitle>
            <CardDescription>{stat.description}</CardDescription>
          </div>
          <motion.span
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10"
            whileHover={{ scale: 1.1 }}
          >
            <stat.icon className="h-5 w-5 text-white" />
          </motion.span>
        </CardHeader>
        <CardContent className="flex items-end justify-between">
          <p className="text-3xl font-semibold text-white">{stat.value}</p>
          <p className="text-sm text-green-300">{stat.delta}</p>
        </CardContent>
      </Card>
    ))}
  </div>
);




