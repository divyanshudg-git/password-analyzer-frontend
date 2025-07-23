// Modern, polished, full layout with hero, side banners (left only), footer, and FAQs — now in dark sci-fi style
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, AlertTriangle, ChevronDown } from "lucide-react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [personalInfo, setPersonalInfo] = useState("");
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const handleCheckStrength = async () => {
    if (!password) return;
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, personal_info: personalInfo }),
      });
      if (!response.ok) throw new Error("Network error");
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  const getColor = prediction === "Strong" ? "text-green-500" : "text-red-500";
  const getBar = prediction === "Strong" ? "100%" : "40%";
  const getIcon = prediction === "Strong" ? <ShieldCheck size={20} /> : <AlertTriangle size={20} />;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 to-black text-white">
      {/* Hero Section */}
      <header className="text-center py-20 px-4">
        <motion.h1
          className="text-6xl font-extrabold tracking-tight mb-4 text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          Ultimate Password Strength Analyzer
        </motion.h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Stop guessing. Start testing. Real-time AI-based strength evaluation with deep security insights.
        </p>
      </header>

      {/* Main Grid */}
      <main className="flex flex-col lg:flex-row items-start justify-between gap-6 px-6 pb-20">
        {/* Left Banner */}
        <div className="hidden lg:flex h-[330px] w-[747px] mr-4">
          <Image
            src="/123.png"
            alt="Hacker Left"
            width={747}
            height={330}
            className="rounded-xl shadow-2xl object-cover h-full w-full"
          />
        </div>

        {/* Password Card */}
        <motion.div
          className="w-full max-w-lg ml-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 shadow-2xl rounded-2xl bg-black/50 backdrop-blur-md border-2 border-cyan-400 shadow-[0_4px_20px_rgba(0,255,255,0.2)]">
            <CardContent className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-cyan-400">Try it below</h2>
                <p className="text-gray-500 text-sm mt-2">Put your password to the test.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Password</label>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 bg-black/30 border border-cyan-500 text-white shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Personal Info (optional)</label>
                  <Input
                    placeholder="e.g. name, birth year"
                    value={personalInfo}
                    onChange={(e) => setPersonalInfo(e.target.value)}
                    className="mt-1 bg-black/30 border border-cyan-500 text-white shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                  />
                </div>

                <Button onClick={handleCheckStrength} disabled={loading} className="w-full bg-cyan-600 hover:bg-cyan-500">
                  {loading ? "Checking..." : "Check Strength"}
                </Button>
              </div>

              {prediction && (
                <motion.div
                  key={prediction}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-2"
                >
                  <div className={`flex items-center justify-center gap-2 font-semibold ${getColor}`}>
                    {getIcon} <span>{prediction} Password</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded overflow-hidden">
                    <motion.div
                      className={`h-full ${prediction === "Strong" ? "bg-green-400" : "bg-red-400"}`}
                      initial={{ width: 0 }}
                      animate={{ width: getBar }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    {prediction === "Strong"
                      ? "Looks solid. Still, don’t reuse it."
                      : "Weak sauce. Add length, symbols, avoid patterns."}
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Intermediary Banner */}
      <div className="relative w-full h-[500px] bg-[url('/cyber-banner.png')] bg-cover bg-center bg-no-repeat my-12 border-y border-cyan-900 shadow-inner">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h3 className="text-3xl md:text-4xl font-bold text-cyan-300 tracking-wide text-center px-4">
            Protect Smarter. Defend Harder.
          </h3>
        </div>
      </div>

      {/* FAQs */}
      <section className="bg-black py-16 px-6 border-t border-gray-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400">FAQs</h2>
          <ul className="space-y-4">
            {[
              "Is my password stored?",
              "What makes a password strong?",
              "How is the strength determined?",
            ].map((q, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full flex justify-between items-center px-4 py-3 bg-gray-900 text-left border border-cyan-800 rounded-md hover:bg-gray-800 transition"
                >
                  <span className="text-sm font-medium text-white">{q}</span>
                  <ChevronDown
                    size={18}
                    className={`transform transition-transform ${openFAQ === idx ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
                {openFAQ === idx && (
                  <div className="px-4 pt-2 text-sm text-gray-400">
                    {idx === 0 && "No. We don’t store anything. Ever."}
                    {idx === 1 && "Length, randomness, symbols, no personal info, and no patterns."}
                    {idx === 2 && "Machine learning. Trained on 14M+ samples."}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center pb-6 mt-auto">
        <p className="text-white text-sm font-semibold animate-pulse drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
          Made by Divyansh Aggarwal and Divyanshu with ❤
        </p>
      </footer>
    </div>
  );
}