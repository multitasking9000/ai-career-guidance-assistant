import React, { useState } from 'react';
import { CareerBranch, ValidationResult } from '../types';
import Markdown from 'react-markdown';
import {
  Copy,
  Check,
  FileText,
  Code2,
  Terminal,
  Compass,
  AlertTriangle,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface ReportViewerProps {
  validation: ValidationResult;
  branches: CareerBranch[];
  selectedTop2: CareerBranch[];
  rawMarkdown: string;
  injectedPrompt: string;
  onSelectBranchChip?: (branch: CareerBranch) => void;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({
  validation,
  branches,
  selectedTop2,
  rawMarkdown,
  injectedPrompt
}) => {
  const [activeTab, setActiveTab] = useState<'formatted' | 'raw_markdown' | 'prompt_payload'>('formatted');
  const [copied, setCopied] = useState(false);
  const [activeChipBranch, setActiveChipBranch] = useState<CareerBranch>(selectedTop2[0] || branches[0]);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const opt1 = selectedTop2[0] || branches[0];
  const opt2 = selectedTop2[1] || branches[1];

  return (
    <div id="career-report-container" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden my-6">
      {/* Header with Tabs & Copy button */}
      <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              AI Career Guidance Report
            </h2>
            <p className="text-xs text-slate-500">
              Generated via Simulated Tree of Thoughts (ToT) Architecture
            </p>
          </div>
        </div>

        {/* View Switcher Tabs & Copy */}
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center bg-slate-200/70 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('formatted')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeTab === 'formatted'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Formatted Report
            </button>
            <button
              onClick={() => setActiveTab('raw_markdown')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeTab === 'raw_markdown'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Raw Strict Markdown
            </button>
            <button
              onClick={() => setActiveTab('prompt_payload')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeTab === 'prompt_payload'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Injected Payload
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 shadow-2xs transition-colors"
            title="Copy strict markdown to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-500" />
                <span>Copy Markdown</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Alternative Chips Bar */}
      <div className="px-5 py-3 bg-slate-100/60 border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide shrink-0 flex items-center gap-1">
          <Compass className="h-3.5 w-3.5 text-blue-600" />
          Alternative Chips:
        </span>
        <div className="flex items-center gap-2">
          {branches.map((b) => {
            const isSelected = activeChipBranch.branchId === b.branchId;
            return (
              <button
                key={b.branchId}
                onClick={() => setActiveChipBranch(b)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <span className="font-bold">{b.branchId}:</span>
                <span>{b.roleName}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {b.compositeScore.toFixed(1)}
                </span>
                {b.isTopSelected && (
                  <span className={`text-[10px] font-bold ${isSelected ? 'text-blue-100' : 'text-blue-600'}`}>
                    ★ Top 2
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {activeTab === 'formatted' && (
          <div className="space-y-8">
            {/* Section 1: Input Validation Status */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-600" />
                  1. Input Validation Status
                </h3>
                <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  PASSED
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-2 font-mono leading-relaxed">
                <strong>Validation Notes:</strong> {validation.validationNotes}
              </p>
            </div>

            {/* Section 2: Reasoning Matrix Table Render */}
            <div>
              <div className="mb-2">
                <h3 className="text-base font-bold text-slate-900">
                  2. REASONING MATRIX (Tree of Thoughts Evaluation)
                </h3>
                <p className="text-xs text-slate-500">
                  Candidate branches mapped against multi-domain weights
                </p>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="py-2.5 px-3">Candidate Path</th>
                      <th className="py-2.5 px-3 text-center">Academic & Skill Score (35%)</th>
                      <th className="py-2.5 px-3 text-center">Interest Fit (20%)</th>
                      <th className="py-2.5 px-3 text-center">WLB Fit (10%)</th>
                      <th className="py-2.5 px-3 text-center">Salary Fit (10%)</th>
                      <th className="py-2.5 px-3 text-right">Overall Composite Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {branches.map((b) => (
                      <tr key={b.branchId} className={b.isTopSelected ? 'bg-blue-50/30' : ''}>
                        <td className="py-2.5 px-3 font-semibold text-slate-800">
                          <span className="text-blue-700 font-bold">{b.branchId}:</span> {b.roleName}
                          <span className="text-slate-400 font-normal ml-1">({b.branchType})</span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono">{b.academicAndSkillScore}</td>
                        <td className="py-2.5 px-3 text-center font-mono">{b.interestFitScore}</td>
                        <td className="py-2.5 px-3 text-center font-mono">{b.wlbFitScore}</td>
                        <td className="py-2.5 px-3 text-center font-mono">{b.salaryFitScore}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-blue-900 font-mono">
                          {b.compositeScore.toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 3: Recommended Career Options */}
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  3. RECOMMENDED CAREER OPTIONS
                </h3>
                <p className="text-xs text-slate-500">
                  Top 2 candidates selected under Guardrail 1 (Multi-Option Safety to avoid single-option bias)
                </p>
              </div>

              {/* Option 1 */}
              <div className="p-5 rounded-2xl border-2 border-blue-200 bg-blue-50/20 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-600 text-white uppercase">
                        Option 1 (Primary)
                      </span>
                      <h4 className="text-lg font-bold text-slate-900">
                        {opt1.roleName}
                      </h4>
                    </div>
                    <span className="text-xs font-semibold text-blue-700 mt-0.5 inline-block">
                      Domain: {opt1.domainLabel} ({opt1.branchType})
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-medium">Composite Score: </span>
                    <span className="text-base font-extrabold text-blue-900 font-mono">
                      {opt1.compositeScore.toFixed(1)} / 100
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div>
                    <strong className="text-slate-900 font-bold block mb-0.5">Fit Justification:</strong>
                    <p className="leading-relaxed text-slate-600">{opt1.fitJustification}</p>
                  </div>

                  <div>
                    <strong className="text-slate-900 font-bold block mb-0.5">
                      Upskilling & Bridge Requirements:
                    </strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600">
                      {opt1.upskillingAndBridge.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <strong className="text-slate-900 font-bold block mb-0.5">
                      Expected WLB & Market Alignment:
                    </strong>
                    <p className="leading-relaxed text-slate-600">{opt1.expectedWLBAndMarket}</p>
                  </div>
                </div>
              </div>

              {/* Option 2 */}
              <div className="p-5 rounded-2xl border-2 border-indigo-200 bg-indigo-50/20 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-600 text-white uppercase">
                        Option 2 (Alternative)
                      </span>
                      <h4 className="text-lg font-bold text-slate-900">
                        {opt2.roleName}
                      </h4>
                    </div>
                    <span className="text-xs font-semibold text-indigo-700 mt-0.5 inline-block">
                      Domain: {opt2.domainLabel} ({opt2.branchType})
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-medium">Composite Score: </span>
                    <span className="text-base font-extrabold text-indigo-900 font-mono">
                      {opt2.compositeScore.toFixed(1)} / 100
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div>
                    <strong className="text-slate-900 font-bold block mb-0.5">Fit Justification:</strong>
                    <p className="leading-relaxed text-slate-600">{opt2.fitJustification}</p>
                  </div>

                  <div>
                    <strong className="text-slate-900 font-bold block mb-0.5">
                      Upskilling & Bridge Requirements:
                    </strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600">
                      {opt2.upskillingAndBridge.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <strong className="text-slate-900 font-bold block mb-0.5">
                      Expected WLB & Market Alignment:
                    </strong>
                    <p className="leading-relaxed text-slate-600">{opt2.expectedWLBAndMarket}</p>
                  </div>
                </div>
              </div>

              {/* Active Chip Detail (if user selected branch C or another) */}
              {activeChipBranch.branchId === 'Branch C' && (
                <div className="p-5 rounded-2xl border border-purple-200 bg-purple-50/20 space-y-3">
                  <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-600 text-white uppercase">
                        Branch C (Emerging)
                      </span>
                      <h4 className="text-base font-bold text-slate-900">
                        {activeChipBranch.roleName}
                      </h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-purple-900">
                      Score: {activeChipBranch.compositeScore.toFixed(1)} / 100
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-700">
                    <p><strong>Domain:</strong> {activeChipBranch.domainLabel}</p>
                    <p><strong>Fit Justification:</strong> {activeChipBranch.fitJustification}</p>
                    <p><strong>Upskilling Requirements:</strong> {activeChipBranch.upskillingAndBridge.join("; ")}</p>
                    <p><strong>WLB & Market:</strong> {activeChipBranch.expectedWLBAndMarket}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Section 4: Responsible AI & Guardrail Disclosures */}
            <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-2 text-xs text-slate-700">
              <h3 className="font-bold text-amber-900 uppercase tracking-wide text-xs flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-amber-700" />
                4. RESPONSIBLE AI & GUARDRAIL DISCLOSURES
              </h3>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>
                    <strong>Decision Support Disclaimer:</strong> This guidance is generated by an automated AI model for informational purposes only and does not constitute formal career counseling or guaranteed career success.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>
                    <strong>Human Verification Required:</strong> Please review these options with a qualified academic advisor or career professional before making financial or educational commitments.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Raw Strict Markdown View */}
        {activeTab === 'raw_markdown' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>// Output complies strictly with requested Markdown template</span>
              <span>{rawMarkdown.length} characters</span>
            </div>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed whitespace-pre-wrap">
              {rawMarkdown}
            </div>
          </div>
        )}

        {/* Tab 3: Injected Prompt Payload */}
        {activeTab === 'prompt_payload' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>// Injected Prompt: System Instructions + Embedded KB JSON + User Variables</span>
              <span>Prompt Injector Engine</span>
            </div>
            <div className="bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed whitespace-pre-wrap">
              {injectedPrompt}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
