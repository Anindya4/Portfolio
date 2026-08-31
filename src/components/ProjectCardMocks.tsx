import React, { useState } from 'react';
import { Activity, Bot, Video } from 'lucide-react';

export const FootballVisionMock = () => {
  return (
    <div className="w-full h-full rounded-xl bg-zinc-950/80 border border-white/10 p-3.5 flex flex-col justify-between text-xs font-mono select-none overflow-hidden">
      {/* Titlebar */}
      <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[11px] text-zinc-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse" />
          <span className="text-zinc-300 font-sans font-medium">YOLOv5 &bull; Match Vision Engine</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-400 text-[10px]">32.4 FPS &bull; CUDA</span>
      </div>

      {/* Visual Pitch Frame with Bounding Boxes */}
      <div className="relative my-2 h-28 sm:h-32 bg-[#0d1512] rounded-lg border border-emerald-950/60 p-2.5 flex flex-col justify-between overflow-hidden">
        {/* Tactical pitch markings */}
        <div className="absolute inset-0 opacity-15 border border-dashed border-emerald-400/40 m-2 rounded pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-emerald-400/20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-1/2 border-r border-emerald-400/20 pointer-events-none" />

        {/* Entity Bounding Box 1: Team A Player */}
        <div className="absolute top-4 left-6 border border-emerald-400 bg-emerald-500/15 rounded p-1 text-[9px] shadow-sm">
          <span className="text-emerald-300 font-bold block">Player #08 [Team A]</span>
          <span className="text-emerald-400/80 text-[8px]">conf: 0.984 &bull; speed: 21km/h</span>
        </div>

        {/* Entity Bounding Box 2: Ball Track */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 border border-amber-300 bg-amber-400/20 rounded p-1 text-[9px]">
          <span className="text-amber-200 font-bold block">Ball [Possession: Team A]</span>
          <span className="text-amber-300/80 text-[8px]">coord: (104.2, 45.8)</span>
        </div>

        {/* Entity Bounding Box 3: Team B Defender */}
        <div className="absolute top-6 right-8 border border-sky-400 bg-sky-500/15 rounded p-1 text-[9px]">
          <span className="text-sky-300 font-bold block">Player #04 [Team B]</span>
          <span className="text-sky-400/80 text-[8px]">conf: 0.971 &bull; K-Means: #2</span>
        </div>

        <div className="z-10 flex items-center justify-between text-[10px] text-zinc-400 bg-black/60 px-2 py-1 rounded backdrop-blur-sm mt-auto border border-white/5">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> K-Means Color Signature: Active
          </span>
          <span className="text-zinc-300">22 Players Tracked</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1.5 border-t border-white/5">
        <span>PyTorch / OpenCV / YOLOv5</span>
        <span className="text-zinc-400">Click to inspect</span>
      </div>
    </div>
  );
};

export const PlantDiseaseMock = () => {
  return (
    <div className="w-full h-full rounded-xl bg-zinc-950/80 border border-white/10 p-3.5 flex flex-col justify-between select-none">
      <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-zinc-400 border-b border-white/5 pb-2 uppercase">
        <span className="flex items-center gap-1.5 text-zinc-200">
          <Activity className="w-3.5 h-3.5 text-amber-400" />
          <span>EFFICIENTNET-B4 DIAGNOSTICS</span>
        </span>
        <span className="text-emerald-400 font-bold">98.17% ACC</span>
      </div>

      <div className="my-2 space-y-2">
        <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-white/5">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-zinc-200 font-medium font-sans">Tomato Early Blight</span>
            <span className="text-emerald-400 font-mono text-xs font-bold">98.2% conf</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[98.2%]" />
          </div>
        </div>

        <div className="p-2 rounded-lg bg-zinc-900/40 border border-white/5 space-y-1 text-[11px] font-mono">
          <div className="flex justify-between text-zinc-400">
            <span>Model Backbone:</span>
            <span className="text-zinc-200">Transfer Learning (B4)</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Loss Metric:</span>
            <span className="text-emerald-400">Cross-Entropy 0.042</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1.5 border-t border-white/5">
        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-300 text-[10px]">PyTorch / TorchVision</span>
        <span className="text-zinc-500 text-[10px]">38+ Crop Categories</span>
      </div>
    </div>
  );
};

export const ScraperMock = () => {
  return (
    <div className="w-full h-full rounded-xl bg-zinc-950/85 border border-white/10 p-3.5 flex flex-col justify-between font-mono text-xs select-none">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[11px]">
        <div className="flex items-center gap-1.5 text-zinc-300">
          <Bot className="w-3.5 h-3.5 text-sky-400" />
          <span>LANGCHAIN &bull; AI EXTRACTOR</span>
        </div>
        <span className="text-sky-400 text-[10px]">Dynamic Selenium DOM</span>
      </div>

      <div className="my-2 bg-black/50 rounded-lg p-2.5 border border-white/5 text-[11px] space-y-1">
        <div className="text-zinc-500">$ python scraper.py --target dynamic-source</div>
        <div className="text-sky-300">&bull; Selenium headless browser spawned</div>
        <div className="text-emerald-400">&bull; BeautifulSoup parsed 142 DOM nodes</div>
        <div className="text-zinc-300">&bull; LangChain parsed JSON schema &rarr; <span className="text-amber-200">output.json</span></div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1.5 border-t border-white/5">
        <span>Selenium / BeautifulSoup / LangChain</span>
        <span className="text-zinc-400">Structured JSON Engine</span>
      </div>
    </div>
  );
};

export const YouTubeChatbotMock = () => {
  return (
    <div className="w-full h-full rounded-xl bg-zinc-950/80 border border-white/10 p-3.5 flex flex-col justify-between font-mono text-xs select-none">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[11px]">
        <div className="flex items-center gap-2">
          <Video className="w-3.5 h-3.5 text-red-400" />
          <span className="text-zinc-200 font-sans font-medium">YouTube RAG &bull; Transcript Q&amp;A</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-400">Streamlit + LangChain</span>
      </div>

      <div className="my-2 space-y-2 bg-black/40 p-2.5 rounded-lg border border-white/5">
        {/* User Query */}
        <div className="flex items-start gap-2 text-[11px]">
          <span className="text-zinc-500 font-bold">User:</span>
          <span className="text-zinc-300">"Summarize the attention mechanism explained at 04:12"</span>
        </div>

        {/* AI Answer */}
        <div className="flex items-start gap-2 text-[11px] bg-zinc-900/60 p-2 rounded border border-white/5">
          <Bot className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-zinc-300 leading-snug">
            <span className="text-emerald-400 font-semibold">[04:12 - 06:45]</span> Query, Key, Value dot-product computes scaled attention weights across sequences.
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1.5 border-t border-white/5">
        <span>deep-translator &bull; 50+ languages</span>
        <span className="text-zinc-400">&lt;1.2s Semantic Latency</span>
      </div>
    </div>
  );
};
