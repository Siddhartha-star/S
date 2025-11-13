"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      window.location.replace("/dashboard");
    }
  }, [user]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
      <Badge className="bg-white/10 text-white/80">
        Futuristic SaaS · Immersive motion · Smart theming
      </Badge>
      <motion.div
        className="flex flex-col gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
          Build your next-gen control center with
          <span className="bg-gradient-to-r from-[#0091ff] via-[#ff00b7] to-[#ffa94d] bg-clip-text text-transparent">
            {" "}
            SnapSearch
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-white/70 md:text-xl">
          From dynamic dashboards to AI-assisted actions, SnapSearch gives your team everything it
          needs to feel like a YC-ready product demo — right inside your browser.
        </p>
      </motion.div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button asChild variant="gradient">
          <Link href="/signup">Create elite workspace</Link>
        </Button>
        <Button asChild variant="outline" glow={false}>
          <Link href="/login">I already have access</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;




