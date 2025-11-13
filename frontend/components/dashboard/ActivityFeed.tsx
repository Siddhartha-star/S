"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Palette, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activity = [
  {
    icon: CheckCircle2,
    title: "Item marked complete",
    time: "2 minutes ago",
    description: "Finalized the onboarding workflow automation."
  },
  {
    icon: Palette,
    title: "Theme switched to Galaxy",
    time: "25 minutes ago",
    description: "Updated the dashboard with cosmic gradients."
  },
  {
    icon: Sparkles,
    title: "AI assistant summary",
    time: "1 hour ago",
    description: "Synthesized your daily recap and surfaced priority actions."
  }
];

export const ActivityFeed = () => (
  <Card>
    <CardHeader>
      <CardTitle>Recent activity</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-5">
      {activity.map((item, index) => (
        <motion.div
          key={item.title}
          className="flex items-start gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <span className="rounded-full bg-white/10 p-3 text-white">
            <item.icon className="h-4 w-4" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{item.title}</p>
            <p className="text-xs text-white/60">{item.description}</p>
          </div>
          <span className="text-xs text-white/40">{item.time}</span>
        </motion.div>
      ))}
    </CardContent>
  </Card>
);




