import React from 'react';
import { X, Database, CheckCircle2 } from 'lucide-react';
import { GROUNDING_KNOWLEDGE_BASE, DOMAIN_LABELS } from '../engine/knowledgeBase';

interface KnowledgeBaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KnowledgeBaseModal: React.FC<KnowledgeBaseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Grounding Knowledge Base (In-Memory JSON)
              </h2>
              <p className="text-xs text-slate-500">
                Embedded domain taxonomy and score weight criteria
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Weights */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Score Weights Matrix
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-center">
                <div className="text-slate-500 text-[10px]">academic_fit</div>
                <div className="text-blue-900 font-bold text-sm">35%</div>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-center">
                <div className="text-slate-500 text-[10px]">skills_fit</div>
                <div className="text-blue-900 font-bold text-sm">25%</div>
              </div>
              <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-200 text-center">
                <div className="text-slate-500 text-[10px]">interest_alignment</div>
                <div className="text-indigo-900 font-bold text-sm">20%</div>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
                <div className="text-slate-500 text-[10px]">work_life_balance</div>
                <div className="text-emerald-900 font-bold text-sm">10%</div>
              </div>
              <div className="p-2.5 rounded-lg bg-purple-50 border border-purple-200 text-center col-span-2 sm:col-span-1">
                <div className="text-slate-500 text-[10px]">compensation_match</div>
                <div className="text-purple-900 font-bold text-sm">10%</div>
              </div>
            </div>
          </div>

          {/* Domains and Careers */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Domain Mapping & Career Roles (24 Target Occupations)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {Object.entries(GROUNDING_KNOWLEDGE_BASE.domains).map(([domainKey, roles]) => (
                <div key={domainKey} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                    <span>{DOMAIN_LABELS[domainKey] || domainKey}</span>
                    <span className="text-[10px] font-mono text-slate-400">{domainKey}</span>
                  </div>
                  <ul className="space-y-1 text-slate-600">
                    {roles.map((r) => (
                      <li key={r} className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-blue-500 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Raw JSON */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Embedded JSON Definition
            </h3>
            <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-48">
              <pre>{JSON.stringify(GROUNDING_KNOWLEDGE_BASE, null, 2)}</pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close Knowledge Base
          </button>
        </div>
      </div>
    </div>
  );
};
