/**
 * AI Career Guidance Assistant (Prototype Engine)
 * Architecture Strategy: Monolithic Zero-Backend Single-Turn Engine
 * Reasoning Engine: Simulated Tree of Thoughts (ToT)
 * Grounding Strategy: Embedded In-Memory Knowledge Base
 * Primary Target: High-Accuracy Multi-Domain Career Mapping
 */

import React, { useState, useEffect } from 'react';
import { UserInput, ValidationResult, CareerGuidanceResult, ToTExecutionProgress, PresetProfile } from './types';
import { PRESET_PROFILES } from './engine/knowledgeBase';
import { validateCareerInput } from './engine/validator';
import { constructInjectedPrompt, formatStrictMarkdownReport } from './engine/promptInjector';
import { executeSimulatedTreeOfThoughts } from './engine/totEngine';
import { Header } from './components/Header';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { KnowledgeBaseModal } from './components/KnowledgeBaseModal';
import { InputForm } from './components/InputForm';
import { ErrorScreen } from './components/ErrorScreen';
import { ToTVisualTimeline } from './components/ToTVisualTimeline';
import { ReasoningMatrixCard } from './components/ReasoningMatrixCard';
import { ReportViewer } from './components/ReportViewer';
import { ShieldCheck, Info, CheckCircle2, Database, Layers } from 'lucide-react';

export default function App() {
  // Input state pre-initialized with the first realistic cross-disciplinary preset
  const [input, setInput] = useState<UserInput>(PRESET_PROFILES[0].input);
  const [engineMode, setEngineMode] = useState<'prototype_tot' | 'gemini_llm'>('prototype_tot');
  const [hasGeminiKey, setHasGeminiKey] = useState<boolean>(false);

  // Modals
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const [isKBModalOpen, setIsKBModalOpen] = useState(false);

  // Execution & Validation States
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [showErrorScreen, setShowErrorScreen] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [progress, setProgress] = useState<ToTExecutionProgress>({
    phase: 'idle',
    phaseName: 'Idle',
    percent: 0,
    details: 'Awaiting execution trigger'
  });

  const [guidanceResult, setGuidanceResult] = useState<CareerGuidanceResult | null>(null);

  // Check backend health on mount
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data?.hasGeminiKey) {
          setHasGeminiKey(true);
        }
      })
      .catch(() => {
        // Pure zero-backend standalone client mode
      });
  }, []);

  const handleInputChange = (field: keyof UserInput, value: any) => {
    setInput(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear validation error if user is typing
    if (validationResult && !validationResult.passed) {
      setValidationResult(null);
      setShowErrorScreen(false);
    }
  };

  const handleApplyPreset = (preset: PresetProfile) => {
    setInput(preset.input);
    setValidationResult(null);
    setShowErrorScreen(false);
    setGuidanceResult(null);
    setProgress({
      phase: 'idle',
      phaseName: 'Idle',
      percent: 0,
      details: `Loaded preset: ${preset.title}`
    });
  };

  const handleReset = () => {
    // Clear fields to easily trigger and test the mandated Error Screen state
    setInput({
      grade_10th: '',
      grade_12th_subjects: '',
      education_level: '',
      current_skills: '',
      interests: '',
      target_industry: '',
      wlb_preference: 7,
      salary_range: ''
    });
    setValidationResult(null);
    setShowErrorScreen(false);
    setGuidanceResult(null);
    setProgress({
      phase: 'idle',
      phaseName: 'Idle',
      percent: 0,
      details: 'Form reset. Critical schema fields empty.'
    });
  };

  // Local Validation Layer Check Only
  const handleValidateOnly = () => {
    const vResult = validateCareerInput(input);
    setValidationResult(vResult);
    if (!vResult.passed) {
      setShowErrorScreen(true);
    } else {
      setShowErrorScreen(false);
    }
  };

  // Execute Simulated Tree of Thoughts (ToT) Engine
  const handleExecuteEngine = async () => {
    setIsProcessing(true);
    setGuidanceResult(null);

    // STEP 1: Local Validation Layer (JS Script)
    setProgress({
      phase: 'validating',
      phaseName: 'Input Schema Validation',
      percent: 15,
      details: 'Checking 10th/12th marks, education level, skills, and interests against schema...'
    });

    const vResult = validateCareerInput(input);
    setValidationResult(vResult);

    if (!vResult.passed) {
      // Prompt specification: "If any critical fields (Academic Marks, Interests, Education Level) are missing or invalid, immediately halt processing and render the missing input error state."
      setIsProcessing(false);
      setShowErrorScreen(true);
      setProgress({
        phase: 'error',
        phaseName: 'Validation Halted',
        percent: 0,
        details: 'Halted: Critical schema inputs missing or incomplete.'
      });
      return;
    }

    setShowErrorScreen(false);

    // STEP 2: Phase 1 - Thought Tree Generation (Branch A, Branch B, Branch C)
    setProgress({
      phase: 'phase1_branching',
      phaseName: 'Phase 1: Thought Tree Generation',
      percent: 45,
      details: 'Generating Branch A (Direct Fit), Branch B (Skill-Adjacent), and Branch C (Emerging/Unconventional)...'
    });

    await new Promise(r => setTimeout(r, 450));

    // STEP 3: Phase 2 - Candidate Evaluation Matrix
    setProgress({
      phase: 'phase2_matrix',
      phaseName: 'Phase 2: Candidate Evaluation Matrix',
      percent: 75,
      details: 'Scoring candidates on 0–100 scale: Academic (35%), Skills (25%), Interest (20%), WLB (10%), Salary (10%)...'
    });

    await new Promise(r => setTimeout(r, 400));

    // Execute local ToT calculations
    const { branches, selectedTop2 } = executeSimulatedTreeOfThoughts(input);

    // STEP 4: Phase 3 - Selection & Guardrails
    setProgress({
      phase: 'phase3_guardrails',
      phaseName: 'Phase 3: Selection & Guardrails',
      percent: 90,
      details: 'Enforcing Guardrail 1 (Top-2 Selection), Guardrail 2 (Upskilling gap analysis), and Guardrail 3 (Decision Support disclaimer)...'
    });

    let finalMarkdown = formatStrictMarkdownReport(vResult, branches, selectedTop2);
    let engineUsed: 'prototype_tot' | 'gemini_llm' = 'prototype_tot';

    // If Gemini mode is selected, try server-side LLM route
    if (engineMode === 'gemini_llm') {
      try {
        const injectedPrompt = constructInjectedPrompt(input);
        const res = await fetch('/api/gemini-tot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: injectedPrompt })
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.markdown) {
            finalMarkdown = data.markdown;
            engineUsed = 'gemini_llm';
          }
        }
      } catch (err) {
        console.warn('Falling back to local prototype ToT engine:', err);
      }
    }

    await new Promise(r => setTimeout(r, 300));

    const resultData: CareerGuidanceResult = {
      validation: vResult,
      branches,
      selectedTop2,
      rawMarkdown: finalMarkdown,
      timestamp: new Date().toLocaleTimeString(),
      engineUsed
    };

    setGuidanceResult(resultData);
    setIsProcessing(false);
    setProgress({
      phase: 'completed',
      phaseName: 'Execution Complete',
      percent: 100,
      details: 'Reasoning Matrix generated & Guardrails successfully applied.'
    });

    // Smooth scroll down to results
    setTimeout(() => {
      document.getElementById('career-report-container')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handlePromptReEntry = () => {
    setShowErrorScreen(false);
    // Focus first input field
    const el = document.getElementById('input-grade-10th');
    el?.focus();
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const injectedPromptText = constructInjectedPrompt(input);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      {/* App Header */}
      <Header
        engineMode={engineMode}
        setEngineMode={setEngineMode}
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
        hasGeminiKey={hasGeminiKey}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Strategy Meta Header */}
        <div className="mb-6 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
              ToT
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span>Architecture: Monolithic Zero-Backend Single-Turn Engine</span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700">Simulated Tree of Thoughts (ToT)</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Multi-domain career mapping across STEM, Medicine, Design, Law, Astronomy, and Linguistics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsKBModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 transition-colors border border-slate-200"
            >
              <Database className="h-3.5 w-3.5 text-blue-600" />
              <span>Grounding KB JSON</span>
            </button>
            <button
              onClick={() => setIsArchitectureModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 transition-colors border border-slate-200"
            >
              <Layers className="h-3.5 w-3.5 text-slate-600" />
              <span>Command Flow</span>
            </button>
          </div>
        </div>

        {/* Local Validation Layer Passed Banner (when checked without full submit) */}
        {validationResult && validationResult.passed && !guidanceResult && !isProcessing && (
          <div className="mb-6 p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 text-xs text-emerald-900 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Validation Status: PASSED.</strong> All required schema fields verified and ready for Tree of Thoughts execution.
              </span>
            </div>
            <button
              onClick={handleExecuteEngine}
              className="px-3 py-1 bg-emerald-700 text-white rounded-md font-semibold hover:bg-emerald-800 transition-colors text-xs"
            >
              Run ToT Engine Now
            </button>
          </div>
        )}

        {/* Missing Input Error State (Mandated Screen) */}
        {showErrorScreen && validationResult && !validationResult.passed && (
          <ErrorScreen
            validation={validationResult}
            onReEntry={handlePromptReEntry}
          />
        )}

        {/* Input Schema Form */}
        <InputForm
          input={input}
          onChange={handleInputChange}
          onApplyPreset={handleApplyPreset}
          onSubmit={handleExecuteEngine}
          onValidateOnly={handleValidateOnly}
          onReset={handleReset}
          isProcessing={isProcessing}
          validationError={validationResult}
        />

        {/* Simulated Tree of Thoughts Timeline Progress */}
        <ToTVisualTimeline progress={progress} />

        {/* Output Specification Results View */}
        {guidanceResult && (
          <div className="space-y-6">
            {/* Phase 2 Reasoning Matrix Visual Table */}
            <ReasoningMatrixCard branches={guidanceResult.branches} />

            {/* Strict Markdown Report Viewer + Alternative Chips */}
            <ReportViewer
              validation={guidanceResult.validation}
              branches={guidanceResult.branches}
              selectedTop2={guidanceResult.selectedTop2}
              rawMarkdown={guidanceResult.rawMarkdown}
              injectedPrompt={injectedPromptText}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AI Career Guidance Assistant • Monolithic Zero-Backend Single-Turn Engine</span>
          <span className="flex items-center gap-1.5 font-medium text-slate-600">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
            Educational Decision-Support Prototype Engine
          </span>
        </div>
      </footer>

      {/* Data & Command Flow Architecture Modal */}
      <ArchitectureDiagram
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
        activeStage={progress.phase}
      />

      {/* Grounding Knowledge Base Modal */}
      <KnowledgeBaseModal
        isOpen={isKBModalOpen}
        onClose={() => setIsKBModalOpen(false)}
      />
    </div>
  );
}
