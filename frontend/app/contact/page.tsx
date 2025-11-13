"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

type ContactValues = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (values: ContactValues) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitted(true);
    reset();
    console.info("Contact submission", values);
  };

  return (
    <div className="flex flex-col gap-10 pb-16">
      <motion.section
        className="glass-panel rounded-[32px] border border-white/10 p-10"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-semibold text-white">Let’s build something luminous</h1>
        <p className="mt-3 max-w-2xl text-sm text-white/70">
          Drop a note and we’ll show you how to transform a simple idea into a cinematic product
          experience.
        </p>
      </motion.section>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Write to the studio</CardTitle>
            <CardDescription>
              Your message will be parsed by the AI assistant for fast follow-up.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div>
                <Input placeholder="Sasha Keene" floatingLabel="Name" {...register("name")} />
                {errors.name && <p className="mt-1 text-sm text-rose-300">{errors.name.message}</p>}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="hello@futurefounders.ai"
                  floatingLabel="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-rose-300">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Textarea placeholder="Tell us about your idea..." {...register("message")} />
                {errors.message && (
                  <p className="mt-1 text-sm text-rose-300">{errors.message.message}</p>
                )}
              </div>
              <Button type="submit" variant="gradient" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <Loader size={24} />
                    Sending
                  </div>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Beam it over
                  </>
                )}
              </Button>
              {submitted && (
                <motion.p
                  className="text-sm text-emerald-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Message received — the AI assistant is typing a reply.
                </motion.p>
              )}
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Studio coordinates</CardTitle>
            <CardDescription>
              Signals we monitor to stay ahead of the next product wave.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-white/70">
            <p>
              <strong>Address:</strong> 500 Mission St, San Francisco, CA
            </p>
            <p>
              <strong>Availability:</strong> 9am — 7pm PT · Monday through Saturday
            </p>
            <p>
              <strong>Quick chat:</strong> dashboards@snapsearch.app
            </p>
            <p>
              <strong>Newsletter:</strong> Subscribed founders get motion design blueprints and
              theme recipes every month.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;




