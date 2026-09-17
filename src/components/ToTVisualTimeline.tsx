import React from 'react';
import { GitBranch, Table, ShieldAlert, CheckCircle, ArrowRight } from 'lucide-react';
import { ToTExecutionProgress } from '../types';

interface ToTVisualTimelineProps {
  progress: ToTExecutionProgress;
}

export const ToTVisualTimeline: React.FC<ToTVisualTimelineProps> = ({ progress }) => {
  if (progress.phase === 'idle') return null;

  const phases = [
    {
      id: 'phase1_branching',
      num: '1',
      title: 'Phase 1: Thought Tree Generation',
      desc: 'Branch A (Direct Fit), Branch B (Cross-Disciplinary), Branch C (Emerging)',
      icon: GitBranch,
      isDone: ['phase2_matrix', 'phase3_guardrails', 'completed'].includes(progress.phase),
      isCurrent: progress.phase === 'phase1_branching'
    },
    {
      id: 'phase2_matrix',
      num: '2',
      title: 'Phase 2: Candidate Evaluation Matrix',
      desc: 'Weighted scoring: Academic/Skills (35%), Interest (20%), WLB (10%), Salary (10%)',
      icon: Table,
      isDone: ['phase3_guardrails', 'completed'].includes(progress.phase),
      isCurrent: progress.phase === 'phase2_matrix'
    },
    {
      id: 'phase3_guardrails',
      num: '3',
      title: 'Phase 3: Selection & Guardrails',
      desc: 'Top 2 selection, upskilling gap flagging, and responsible AI disclosures',
      icon: ShieldAlert,
      isDone: progress.phase === 'completed',
      isCurrent: progress.phase === 'phase3_guardrails'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs my-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Simulated Tree of Thoughts (ToT) Workflow
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-500 font-medium">
          {progress.percent}% Completed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-blue-600 transition-all duration-300 rounded-full"
          style={{ width: `${progress.percent}%` }}
        />
      </div>

      {/* Phase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {phases.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.id}
              className={`p-3.5 rounded-xl border text-xs transition-all ${
                p.isCurrent
                  ? 'border-blue-400 bg-blue-50/50 ring-2 ring-blue-100'
                  : p.isDone
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : 'border-slate-200 bg-slate-50/50 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Icon className={`h-4 w-4 ${p.isCurrent ? 'text-blue-600 animate-spin-slow' : p.isDone ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{p.title}</span>
                </div>
                {p.isDone && <CheckCircle className="h-4 w-4 text-emerald-600" />}
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Live status label */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
        <span>Current Execution Note:</span>
        <span className="text-blue-700 font-semibold">{progress.details}</span>
      </div>
    </div>
  );
};
