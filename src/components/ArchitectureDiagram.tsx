import React from 'react';
import { X, CheckCircle, ArrowDown, FileText, Cpu, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ArchitectureDiagramProps {
  isOpen: boolean;
  onClose: () => void;
  activeStage?: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  isOpen,
  onClose,
  activeStage = 'idle'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Data & Command Flow Architecture
            </h2>
            <p className="text-xs text-slate-500">
              Monolithic Zero-Backend Single-Turn Engine with Simulated Tree of Thoughts (ToT)
            </p>
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
          {/* Visual Step-by-Step Flow */}
          <div className="space-y-3 font-mono text-xs">
            {/* Step 1 */}
            <div className="p-3 rounded-lg border border-blue-200 bg-blue-50/60 flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">1</span>
              <div className="flex-1">
                <span className="font-semibold text-blue-900">[User UI Input]</span>
                <p className="text-slate-600 mt-0.5">
                  Collects 10th/12th Marks, Degree, Skills, Expressed Interests, Industry Target, WLB (1-10), and Salary Target.
                </p>
              </div>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="h-4 w-4" />
            </div>

            {/* Step 2 */}
            <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/60 flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">2</span>
              <div className="flex-1">
                <span className="font-semibold text-amber-900">[Local Validation Layer (JS Script)]</span>
                <p className="text-slate-600 mt-0.5">
                  Guards schema integrity. If critical fields (Marks, Interests, Education Level) are missing, immediately halts and routes to <strong className="text-rose-700">Error Screen & Prompt Re-entry</strong>.
                </p>
              </div>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="h-4 w-4" />
            </div>

            {/* Step 3 */}
            <div className="p-3 rounded-lg border border-indigo-200 bg-indigo-50/60 flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">3</span>
              <div className="flex-1">
                <span className="font-semibold text-indigo-900">[Prompt Injector Engine]</span>
                <p className="text-slate-600 mt-0.5">
                  Combines System Prompt + Embedded Knowledge Base JSON (6 domains & 5 score weights) + User Variables into an exact execution payload.
                </p>
              </div>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="h-4 w-4" />
            </div>

            {/* Step 4 */}
            <div className="p-3 rounded-lg border border-purple-200 bg-purple-50/60 flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">4</span>
              <div className="flex-1">
                <span className="font-semibold text-purple-900">[LLM API / Prototype Runtime] (Simulated ToT)</span>
                <div className="mt-1 space-y-1 text-slate-600">
                  <p>• <strong>Phase 1: Branching:</strong> Branch A (Direct Fit), Branch B (Skill-Adjacent), Branch C (Emerging/Unconventional)</p>
                  <p>• <strong>Phase 2: Matrix Evaluation:</strong> Academic & Skill (35%), Interest (20%), WLB (10%), Salary (10%)</p>
                  <p>• <strong>Phase 3: Guardrails:</strong> Top-2 Selection, Gap Upskilling Flagging, Responsible AI Disclaimer</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="h-4 w-4" />
            </div>

            {/* Step 5 */}
            <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/60 flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">5</span>
              <div className="flex-1">
                <span className="font-semibold text-emerald-900">[UI Render Layer]</span>
                <p className="text-slate-600 mt-0.5">
                  Renders the strict 4-section Markdown report + interactive Alternative Chips + raw Markdown copy tools.
                </p>
              </div>
            </div>
          </div>

          {/* ASCII Specification from prompt */}
          <div className="bg-slate-900 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto">
            <div className="text-slate-400 mb-2 font-semibold">// Raw System Specification Diagram</div>
            <pre className="text-emerald-400 leading-tight">
{` [User UI Input] 
       │ (Collects 10th/12th Marks, Skills, Industry, Salary, WLB)
       ▼
 [Local Validation Layer (JS/Python Script)]
       │
       ├──► (If Inputs Missing) ──► Output Error Screen & Prompt Re-entry
       │
       ▼ (If Valid Input JSON)
 [Prompt Injector Engine]
       │
       ├──► Combines System Prompt + Embedded Knowledge Base JSON + User Variables
       │
       ▼
 [LLM API / Prototype Runtime]
       │
       ├──► Phase 1: Branching (Tree of Thoughts: Path A, B, C)
       ├──► Phase 2: Matrix Evaluation & Scoring
       └──► Phase 3: Selection, Guardrails & Template Rendering
       │
       ▼
 [UI Render Layer] ──► Render Formatted Markdown Report + Alternative Chips`}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close Flow Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
