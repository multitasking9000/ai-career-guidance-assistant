import React from 'react';
import { CareerBranch } from '../types';
import { Award, CheckCircle2, Info } from 'lucide-react';

interface ReasoningMatrixCardProps {
  branches: CareerBranch[];
}

export const ReasoningMatrixCard: React.FC<ReasoningMatrixCardProps> = ({ branches }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden my-6">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-200/80 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>2. REASONING MATRIX (Tree of Thoughts Evaluation)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Phase 2 multi-criteria evaluation scored on 0–100 scale using Knowledge Base weights
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200/70">
          <Info className="h-3 w-3" />
          <span>Formula: 35% Acad + 25% Skill + 20% Int + 10% WLB + 10% Sal</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Candidate Path</th>
              <th className="py-3 px-3 text-center">Academic & Skill Score (35%)</th>
              <th className="py-3 px-3 text-center">Interest Fit (20%)</th>
              <th className="py-3 px-3 text-center">WLB Fit (10%)</th>
              <th className="py-3 px-3 text-center">Salary Fit (10%)</th>
              <th className="py-3 px-4 text-right">Overall Composite Score</th>
              <th className="py-3 px-3 text-center">Guardrail 1</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {branches.map((b) => {
              const isTop = b.isTopSelected;
              return (
                <tr
                  key={b.branchId}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    isTop ? 'bg-blue-50/20' : ''
                  }`}
                >
                  {/* Candidate Path */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <span className="text-blue-700">{b.branchId}:</span>
                      <span>{b.roleName}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                      <span className="font-medium text-slate-700">{b.branchType}</span>
                      <span>•</span>
                      <span>{b.domainLabel}</span>
                    </div>
                  </td>

                  {/* Academic & Skill */}
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-md font-semibold text-xs bg-slate-100 text-slate-800">
                      {b.academicAndSkillScore}
                    </span>
                  </td>

                  {/* Interest Fit */}
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-md font-semibold text-xs bg-slate-100 text-slate-800">
                      {b.interestFitScore}
                    </span>
                  </td>

                  {/* WLB Fit */}
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-md font-semibold text-xs bg-slate-100 text-slate-800">
                      {b.wlbFitScore}
                    </span>
                  </td>

                  {/* Salary Fit */}
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-md font-semibold text-xs bg-slate-100 text-slate-800">
                      {b.salaryFitScore}
                    </span>
                  </td>

                  {/* Composite Score */}
                  <td className="py-3.5 px-4 text-right">
                    <span className={`inline-block px-2.5 py-1 rounded-lg font-bold text-xs ${
                      b.compositeScore >= 80
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        : b.compositeScore >= 70
                        ? 'bg-blue-100 text-blue-900 border border-blue-200'
                        : 'bg-amber-100 text-amber-900 border border-amber-200'
                    }`}>
                      {b.compositeScore.toFixed(1)} / 100
                    </span>
                  </td>

                  {/* Guardrail 1 Status */}
                  <td className="py-3.5 px-3 text-center">
                    {isTop ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                        <CheckCircle2 className="h-3 w-3 text-blue-600" />
                        Top 2 Selected
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium">
                        Alternative Branch
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
