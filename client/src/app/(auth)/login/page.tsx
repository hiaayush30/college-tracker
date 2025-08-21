"use client";

import { motion, Variants } from "framer-motion";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

// Variants for Framer Motion animations
const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.0, 0.0, 0.58, 1.0] },
  },
};

const formVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: 0.3, ease: [0.0, 0.0, 0.58, 1.0] },
  },
};

const inputVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.0, 0.0, 0.58, 1.0] },
  },
};

const buttonVariants: Variants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
    alert("Logged in Successfully");
    setLoading(false);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center justify-center p-4">
      <motion.div
        className="bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md text-center border border-gray-700"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <motion.h1
          className="text-4xl font-extrabold text-slate-300 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Welcome Back!
        </motion.h1>
        <p className="text-gray-300 mb-8">
          Log in to continue your fitness journey.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          variants={formVariants}
        >
          <motion.div variants={inputVariants}>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              required
            />
          </motion.div>
          <motion.div variants={inputVariants}>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              required
            />
          </motion.div>

          <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
            <Button
              disabled={loading}
              type="submit"
              className="w-full flex items-center justify-center text-lg py-6"
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                "Log In"
              )}
            </Button>
          </motion.div>
        </motion.form>

        <motion.p className="mt-8 text-gray-400 text-md">
          Don&apos;t have an account?{" "}
          <Link href="/signup" passHref legacyBehavior>
            <motion.a
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.a>
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
