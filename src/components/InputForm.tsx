import React from 'react';
import { UserInput, PresetProfile, ValidationResult } from '../types';
import { PRESET_PROFILES } from '../engine/knowledgeBase';
import { Sparkles, Play, CheckCircle2, RotateCcw, AlertCircle, Bookmark, Compass } from 'lucide-react';

interface InputFormProps {
  input: UserInput;
  onChange: (field: keyof UserInput, value: any) => void;
  onApplyPreset: (preset: PresetProfile) => void;
  onSubmit: () => void;
  onValidateOnly: () => void;
  onReset: () => void;
  isProcessing: boolean;
  validationError: ValidationResult | null;
}

export const InputForm: React.FC<InputFormProps> = ({
  input,
  onChange,
  onApplyPreset,
  onSubmit,
  onValidateOnly,
  onReset,
  isProcessing,
  validationError,
}) => {
  const missing = validationError?.missingFields || [];

  const isFieldMissing = (labelMatch: string) => {
    return missing.some(m => m.toLowerCase().includes(labelMatch.toLowerCase()));
  };

  const getWlbDescriptor = (val: number) => {
    if (val <= 3) return "High-Intensity / Sprint-Driven (Willing to sacrifice WLB for rapid acceleration)";
    if (val <= 6) return "Moderate-Paced (Standard corporate / R&D operational rhythm)";
    if (val <= 8) return "Balanced Professional (Reliable 40hr/wk, hybrid flexibility, low off-hours intrusion)";
    return "High Flexibility / Lifestyle-First (Predictable self-paced cadence, strict boundaries)";
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Top Banner / Presets */}
      <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-blue-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Multi-Domain Test Presets
            </h2>
            <span className="text-[11px] text-slate-500 font-normal">
              (Load pre-validated candidate profiles)
            </span>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start sm:self-auto font-medium"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset Fields (Test Missing Error State)</span>
          </button>
        </div>

        {/* Preset Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {PRESET_PROFILES.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset)}
              className="shrink-0 text-left px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40 text-xs transition-all shadow-2xs group"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-800 group-hover:text-blue-700">
                  {preset.title}
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                  {preset.badge}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form Fields */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="p-5 sm:p-6 space-y-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. 10th Marks/Grades */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wide">
              <span className="flex items-center gap-1">
                1. 10th Marks / Grades
                <span className="text-rose-500">*</span>
              </span>
              {isFieldMissing('10th') && (
                <span className="text-rose-600 text-[11px] font-semibold flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Required
                </span>
              )}
            </label>
            <input
              type="text"
              id="input-grade-10th"
              value={input.grade_10th}
              onChange={(e) => onChange('grade_10th', e.target.value)}
              placeholder="e.g. 91% (CBSE Distinction in Science & Math) or GPA 3.9"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors ${
                isFieldMissing('10th')
                  ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500 focus:ring-rose-200'
                  : 'border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              } focus:outline-hidden focus:ring-3`}
            />
            <p className="text-[11px] text-slate-500">
              Foundational grade performance across high school STEM / Languages.
            </p>
          </div>

          {/* 2. 12th Marks & Core Subjects */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wide">
              <span className="flex items-center gap-1">
                2. 12th Marks & Core Subjects
                <span className="text-rose-500">*</span>
              </span>
              {isFieldMissing('12th') && (
                <span className="text-rose-600 text-[11px] font-semibold flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Required
                </span>
              )}
            </label>
            <input
              type="text"
              id="input-grade-12th"
              value={input.grade_12th_subjects}
              onChange={(e) => onChange('grade_12th_subjects', e.target.value)}
              placeholder="e.g. 92% in Physics, Chemistry, Mathematics & English"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors ${
                isFieldMissing('12th')
                  ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500 focus:ring-rose-200'
                  : 'border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              } focus:outline-hidden focus:ring-3`}
            />
            <p className="text-[11px] text-slate-500">
              Critical for domain alignment (e.g. Physics/Math for STEM & Astronomy).
            </p>
          </div>

          {/* 3. Education Level / Degree */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wide">
              <span className="flex items-center gap-1">
                3. Education Level / Degree
                <span className="text-rose-500">*</span>
              </span>
              {isFieldMissing('Education') && (
                <span className="text-rose-600 text-[11px] font-semibold flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Required
                </span>
              )}
            </label>
            <input
              type="text"
              id="input-education-level"
              value={input.education_level}
              onChange={(e) => onChange('education_level', e.target.value)}
              placeholder="e.g. B.Tech in Computer Science (Final Year) or B.Sc Physics"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors ${
                isFieldMissing('Education')
                  ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500 focus:ring-rose-200'
                  : 'border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              } focus:outline-hidden focus:ring-3`}
            />
            <p className="text-[11px] text-slate-500">
              Current or completed academic degree and year of study.
            </p>
          </div>

          {/* 4. Current Technical & Soft Skills */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wide">
              <span className="flex items-center gap-1">
                4. Current Technical & Soft Skills
                <span className="text-rose-500">*</span>
              </span>
              {isFieldMissing('Skills') && (
                <span className="text-rose-600 text-[11px] font-semibold flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Required
                </span>
              )}
            </label>
            <input
              type="text"
              id="input-current-skills"
              value={input.current_skills}
              onChange={(e) => onChange('current_skills', e.target.value)}
              placeholder="e.g. Python, SQL, Technical Writing, Public Speaking, Git, Figma"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors ${
                isFieldMissing('Skills')
                  ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500 focus:ring-rose-200'
                  : 'border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              } focus:outline-hidden focus:ring-3`}
            />
            <p className="text-[11px] text-slate-500">
              Multi-domain tools, programming languages, and communication skills.
            </p>
          </div>

          {/* 5. Expressed Interests & Hobbies */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wide">
              <span className="flex items-center gap-1">
                5. Expressed Interests & Hobbies
                <span className="text-rose-500">*</span>
              </span>
              {isFieldMissing('Interests') && (
                <span className="text-rose-600 text-[11px] font-semibold flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Required
                </span>
              )}
            </label>
            <input
              type="text"
              id="input-interests"
              value={input.interests}
              onChange={(e) => onChange('interests', e.target.value)}
              placeholder="e.g. Patent Law, Open Source Governance, Space Science, Creative Writing, UI Design"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors ${
                isFieldMissing('Interests')
                  ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500 focus:ring-rose-200'
                  : 'border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              } focus:outline-hidden focus:ring-3`}
            />
            <p className="text-[11px] text-slate-500">
              Powers Branch B (Cross-Disciplinary) and Branch C (Emerging/Unconventional) generation.
            </p>
          </div>

          {/* 6. Target Industry / Field */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wide">
              <span className="flex items-center gap-1">
                6. Target Industry / Field
                <span className="text-rose-500">*</span>
              </span>
              {isFieldMissing('Industry') && (
                <span className="text-rose-600 text-[11px] font-semibold flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Required
                </span>
              )}
            </label>
            <input
              type="text"
              id="input-target-industry"
              value={input.target_industry}
              onChange={(e) => onChange('target_industry', e.target.value)}
              placeholder="e.g. Legal Tech & IP Governance or Artificial Intelligence"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors ${
                isFieldMissing('Industry')
                  ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500 focus:ring-rose-200'
                  : 'border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              } focus:outline-hidden focus:ring-3`}
            />
            <p className="text-[11px] text-slate-500">
              Primary target industry anchoring Branch A (Direct Fit).
            </p>
          </div>

          {/* 8. Target Salary Expectation */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wide">
              <span className="flex items-center gap-1">
                8. Target Salary Expectation
                <span className="text-rose-500">*</span>
              </span>
              {isFieldMissing('Salary') && (
                <span className="text-rose-600 text-[11px] font-semibold flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Required
                </span>
              )}
            </label>
            <input
              type="text"
              id="input-salary-range"
              value={input.salary_range}
              onChange={(e) => onChange('salary_range', e.target.value)}
              placeholder="e.g. $95,000 - $130,000 / yr or ₹15 - 20 LPA"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors ${
                isFieldMissing('Salary')
                  ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500 focus:ring-rose-200'
                  : 'border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              } focus:outline-hidden focus:ring-3`}
            />
            <p className="text-[11px] text-slate-500">
              Target compensation benchmark for Phase 2 Evaluation Matrix (10% weight).
            </p>
          </div>

          {/* 7. Preferred Work-Life Balance (1-10 Scale) */}
          <div className="space-y-2 md:col-span-2 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <span>7. Preferred Work-Life Balance (1–10 Scale)</span>
                <span className="text-rose-500">*</span>
              </label>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                Level {input.wlb_preference} / 10
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-slate-500">1 (Intense)</span>
              <input
                type="range"
                id="input-wlb-preference"
                min="1"
                max="10"
                step="1"
                value={input.wlb_preference}
                onChange={(e) => onChange('wlb_preference', parseInt(e.target.value, 10))}
                className="flex-1 accent-blue-600 cursor-pointer"
              />
              <span className="text-xs font-semibold text-slate-500">10 (Lifestyle First)</span>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              Preference profile: <span className="text-blue-900">{getWlbDescriptor(input.wlb_preference)}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            id="validate-inputs-only-btn"
            onClick={onValidateOnly}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Check Local Validation Layer</span>
          </button>

          <button
            type="submit"
            id="execute-tot-engine-btn"
            disabled={isProcessing}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold shadow-sm transition-all cursor-pointer"
          >
            {isProcessing ? (
              <>
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Simulating Tree of Thoughts...</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-white" />
                <span>Execute Tree of Thoughts Engine</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
