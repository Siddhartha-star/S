"use client";

import { motion } from "framer-motion";
import { NotebookPen, PlusCircle, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const quickActions = [
  {
    label: "Create new item",
    description: "Spin up a fresh task with smart context.",
    icon: PlusCircle,
    href: "/dashboard?modal=create"
  },
  {
    label: "Launch AI assistant",
    description: "Ask for a summary or generate next steps.",
    icon: Sparkles,
    href: "/dashboard?assistant=open"
  },
  {
    label: "Start daily sync",
    description: "Journal progress and align with your goals.",
    icon: NotebookPen,
    href: "/profile"
  }
];

export const QuickActions = () => (
  <div className="grid gap-4 sm:grid-cols-3">
    {quickActions.map((action, index) => (
      <motion.div
        key={action.label}
        className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-white/30 hover:bg-white/10"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: index * 0.1 }}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-white/10 p-3">
            <action.icon className="h-4 w-4 text-white" />
          </span>
          <span className="text-xs uppercase tracking-[0.3em] text-white/40">Action</span>
        </div>
        <p className="text-base font-semibold text-white">{action.label}</p>
        <p className="mt-2 text-sm text-white/60">{action.description}</p>
        <Button asChild variant="outline" size="sm" className="mt-4 w-full" glow={false}>
          <Link href={action.href}>Open</Link>
        </Button>
      </motion.div>
    ))}
  </div>
);


