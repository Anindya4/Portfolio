import React, { useState } from 'react';
import { Turnstile } from "@marsidev/react-turnstile";
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Send, ArrowUpRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
  GmailIcon,
  LeetCodeIcon,
} from "./Icons";
import { GlowCard } from './GlowCard';

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Machine Learning",
    customRole: "",
    message: "",
  });

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  // Before submitting the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!turnstileToken) {
      setSubmitError("Please complete the verification before sending.");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          customRole: formData.customRole,
          message: formData.message,
          turnstile_token: turnstileToken,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      setFormSubmitted(true);
      setTurnstileToken("");
    } catch (error) {
      setSubmitError(
        "Something went wrong while sending your message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <GithubIcon className="w-3.5 h-3.5" />;
      case "twitter":
        return <TwitterIcon className="w-3.5 h-3.5" />;
      case "linkedin":
        return <LinkedinIcon className="w-3.5 h-3.5" />;
      case "gmail":
        return <GmailIcon className="w-3.5 h-3.5" />;
      case "leetcode":
        return <LeetCodeIcon className="w-3.5 h-3.5" />;
      default:
        return <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />;
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Direct Inquiry &bull; Let's Collaborate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-zinc-100">
            START A CONVERSATION
          </h2>
        </div>

        {/* Contact Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Bento: Quick Reach & Socials (5 cols) */}
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-between">
            <GlowCard className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-display font-semibold text-zinc-100 mb-2">
                  Let's build intelligent systems together.
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  Available for ML Engineering, AI Systems, Computer Vision, and
                  Software Engineering positions. Feel free to connect directly.
                </p>

                <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5 space-y-3">
                  <div className="text-xs font-mono text-zinc-400">
                    Direct Transmission
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-mono text-zinc-200 truncate">
                      {PERSONAL_INFO.email}
                    </span>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                      title="Copy email"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-8 pt-4 border-t border-white/5">
                <div className="text-xs font-mono text-zinc-400 mb-3">
                  Network &amp; Profiles
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(PERSONAL_INFO.social).map(
                    ([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/5 text-xs text-zinc-300 hover:text-white hover:border-white/15 transition-all uppercase font-mono"
                      >
                        {getPlatformIcon(platform)}
                        <span>{platform}</span>
                      </a>
                    ),
                  )}
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Right Bento: Inquiry Form (7 cols) */}
          <GlowCard className="col-span-12 lg:col-span-6 p-6 sm:p-8">
            {formSubmitted ? (
              <div className="h-full min-h-[380px] flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-semibold text-zinc-100">
                  Message Dispatched
                </h3>
                <p className="text-xs text-zinc-400 max-w-sm">
                  Thank you for reaching out. Your transmission has been
                  received and I typically respond within 24 business hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Recruiter or Engineering Lead"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/70 border border-white/10 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="team@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/70 border border-white/10 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Inquiry Scope / Role Selection Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">
                    Inquiry Scope / Role Category
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData({ ...formData, projectType: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/70 border border-white/10 text-xs text-zinc-200 focus:outline-none focus:border-zinc-400 transition-colors"
                  >
                    <option value="Machine Learning">
                      Machine Learning Engineer (Computer Vision / NLP)
                    </option>
                    <option value="Software Engineer">
                      Software Development Engineer (Full-Stack / Backend)
                    </option>
                    <option value="Data Engineering">
                      Data Engineer / Data Scientist
                    </option>
                    <option value="Consultation">Project Work</option>
                    <option value="Other">Other / Custom Role or Scope</option>
                  </select>
                </div>

                {/* Custom Role Input Box - Dynamically reveals when 'Other' is selected */}
                <AnimatePresence>
                  {formData.projectType === "Other" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -6 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -6 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden space-y-1.5"
                    >
                      <label className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>Specify Your Desired Role / Opportunity</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. AI Research Scientist, Computer Vision Specialist, Distributed Backend..."
                        value={formData.customRole}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            customRole: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-emerald-500/40 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-400 shadow-sm transition-colors"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">
                    Message &amp; Overview
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your role requirements, team overview, or project scope..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/70 border border-white/10 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 transition-colors resize-none"
                  />
                </div>
                {/* TurnstileToken */}
                <div className="pt-2 flex justify-center">
                  <Turnstile
                    siteKey={import.meta.env.VITE_TURNSTILE_SITEKEY}
                    onSuccess={(token) => {
                      setTurnstileToken(token);
                      setSubmitError("");
                    }}
                    onError={() => {
                      setTurnstileToken("");
                      setSubmitError("Verification failed. Please try again.");
                    }}
                    onExpire={() => {
                      setTurnstileToken("");
                      setSubmitError(
                        "Verification expired. Please verify again.",
                      );
                    }}
                  />
                </div>
                {submitError && (
                  <p className="text-xs text-red-400">{submitError}</p>
                )}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-400">
                    Response time: &lt;24 hours
                  </span>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-semibold hover:scale-105 hover:shadow-md transition-all active:scale-95"
                    disabled={isSubmitting || !turnstileToken}
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </GlowCard>
        </div>
      </div>
    </section>
  );
};;;;;;;;
