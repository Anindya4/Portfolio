import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, Send, ArrowUpRight, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, TwitterIcon, LinkedinIcon } from './Icons';

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Application',
    message: '',
  });

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <GithubIcon className="w-3.5 h-3.5" />;
      case 'twitter':
        return <TwitterIcon className="w-3.5 h-3.5" />;
      case 'linkedin':
        return <LinkedinIcon className="w-3.5 h-3.5" />;
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
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="bento-card p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-display font-semibold text-zinc-100 mb-2">
                  Let's create something enduring.
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  Whether you are planning a full-scale product launch, engineering a robust design system, or looking for high-level architectural consultation, I'm always open to discussing new opportunities.
                </p>

                <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5 space-y-3">
                  <div className="text-xs font-mono text-zinc-400">Direct Contact</div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-mono text-zinc-200 truncate">{PERSONAL_INFO.email}</span>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                      title="Copy email"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-8 pt-4 border-t border-white/5">
                <div className="text-xs font-mono text-zinc-400 mb-3">Network &amp; Profiles</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(PERSONAL_INFO.social).map(([platform, url]) => (
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
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Bento: Inquiry Form (7 cols) */}
          <div className="col-span-12 lg:col-span-7 bento-card p-6 sm:p-8">
            {formSubmitted ? (
              <div className="h-full min-h-[380px] flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-semibold text-zinc-100">Message Dispatched</h3>
                <p className="text-xs text-zinc-400 max-w-sm">
                  Thank you for reaching out. Your transmission has been received and I typically respond within 24 business hours.
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
                    <label className="text-xs font-mono text-zinc-400">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/70 border border-white/10 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/70 border border-white/10 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">Project Type / Inquiry Scope</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/70 border border-white/10 text-xs text-zinc-200 focus:outline-none focus:border-zinc-400 transition-colors"
                  >
                    <option value="Web Application">Full-Stack Web Application</option>
                    <option value="Design System">Design System &amp; UI Architecture</option>
                    <option value="Mobile App">Mobile Application (React Native)</option>
                    <option value="Performance Audit">Performance &amp; Codebase Audit</option>
                    <option value="Advisory">Technical Advisory / Consultation</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">Project Overview &amp; Timeline</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about what you are building, key milestones, or estimated start dates..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/70 border border-white/10 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-400">
                    Typical response: &lt;24 hours
                  </span>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white hover:shadow-md transition-all active:scale-95"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
