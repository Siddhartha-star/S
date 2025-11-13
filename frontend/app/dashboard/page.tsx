"use client";

import { useEffect, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "@/components/ui/loader";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickActions } from "@/components/dashboard/QuickActions";

type ItemStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

interface Item {
  id: string;
  title: string;
  description?: string;
  status: ItemStatus;
  dueDate?: string;
  xpReward: number;
  createdAt: string;
}

const DashboardPage = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, startCreate] = useTransition();

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("/items");
      setItems(data.items);
    } catch (error) {
      console.error("Failed to load items", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchItems();
    }
  }, [user]);

  const handleCreate = (formData: FormData) => {
    startCreate(async () => {
      try {
        await api.post("/items", {
          title: formData.get("title"),
          description: formData.get("description"),
          status: "PENDING",
          xpReward: 10
        });
        await fetchItems();
      } catch (error) {
        console.error("Failed to create item", error);
      }
    });
  };

  if (isAuthLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader size={36} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center text-white/70">
        <p>Your session expired. Please log in again to access the dashboard.</p>
        <Button asChild variant="gradient">
          <a href="/login">Return to login</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 pb-16">
      <DashboardHeader />

      <StatsGrid />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <PerformanceChart />
        <ActivityFeed />
      </div>

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Items in motion</CardTitle>
            <CardDescription>
              Track everything your {user?.role === "ADMIN" ? "organization" : "flow"} is shaping
              this week.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Loader size={32} />
              </div>
            ) : items.length === 0 ? (
              <motion.div
                className="rounded-3xl border border-dashed border-white/20 p-6 text-center text-sm text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                You don’t have any items yet. Spin up your first one with the form on the right.
              </motion.div>
            ) : (
              <div className="grid gap-4">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    className="glass-panel rounded-3xl border border-white/10 p-5"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-sm text-white/70">{item.description}</p>
                      </div>
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
                        {item.status.replace("_", " ")}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-white/50">
                      <span>
                        Created {new Date(item.createdAt).toLocaleDateString()} · XP {item.xpReward}
                      </span>
                      {item.dueDate && <span>Due {new Date(item.dueDate).toLocaleDateString()}</span>}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick create item</CardTitle>
            <CardDescription>
              Give it a compelling title and the assistant will take it from there.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={handleCreate}
              className="flex flex-col gap-4"
            >
              <Input name="title" placeholder="Design AI onboarding flow" floatingLabel="Title" required />
              <Textarea name="description" placeholder="Add context for your future self..." />
              <Button type="submit" variant="gradient" disabled={isCreating}>
                {isCreating ? (
                  <div className="flex items-center gap-3">
                    <Loader size={24} />
                    Generating...
                  </div>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add to pipeline
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-white">AI Quick Actions</h2>
          <p className="text-sm text-white/60">
            Accelerate your day with one-tap boosters. Each action syncs with the assistant for live
            suggestions.
          </p>
        </div>
        <QuickActions />
      </section>
    </div>
  );
};

export default DashboardPage;

