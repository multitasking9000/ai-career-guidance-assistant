import React from 'react';
import { Cpu, BookOpen, ShieldCheck, Layers, GitBranch, Sparkles } from 'lucide-react';

interface HeaderProps {
  engineMode: 'prototype_tot' | 'gemini_llm';
  setEngineMode: (mode: 'prototype_tot' | 'gemini_llm') => void;
  onOpenArchitecture: () => void;
  hasGeminiKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  engineMode,
  setEngineMode,
  onOpenArchitecture,
  hasGeminiKey,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Brand & System Metadata */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  AI Career Guidance Assistant
                </h1>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                  Prototype Engine v1.0
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-2 mt-0.5">
                <span>Simulated Tree of Thoughts (ToT)</span>
                <span className="text-slate-300">•</span>
                <span>Monolithic Zero-Backend Single-Turn Engine</span>
              </p>
            </div>
          </div>

          {/* Controls & Engine Switcher */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Architecture Flow Button */}
            <button
              id="view-architecture-btn"
              onClick={onOpenArchitecture}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 transition-colors border border-slate-200"
              title="View Data & Command Flow Architecture"
            >
              <Layers className="h-3.5 w-3.5 text-slate-500" />
              <span>Data & Flow Arch</span>
            </button>

            {/* Knowledge Base Info Tag */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/70">
              <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
              <span>Embedded KB: 6 Domains</span>
            </div>

            {/* Engine Selector */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                id="select-prototype-engine-btn"
                onClick={() => setEngineMode('prototype_tot')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  engineMode === 'prototype_tot'
                    ? 'bg-white text-blue-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="flex items-center gap-1">
                  <GitBranch className="h-3 w-3" />
                  Prototype ToT
                </span>
              </button>
              <button
                id="select-gemini-engine-btn"
                onClick={() => setEngineMode('gemini_llm')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  engineMode === 'gemini_llm'
                    ? 'bg-white text-blue-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title={hasGeminiKey ? 'Run live via Gemini 2.5 Flash' : 'Gemini API Key active on server'}
              >
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-amber-500" />
                  Gemini LLM
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
