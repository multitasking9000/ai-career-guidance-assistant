/**
 * AI Career Guidance Assistant - Data Types & Interfaces
 * Architecture: Monolithic Zero-Backend Single-Turn Engine with Simulated Tree of Thoughts (ToT)
 */

export interface UserInput {
  grade_10th: string;
  grade_12th_subjects: string;
  education_level: string;
  current_skills: string;
  interests: string;
  target_industry: string;
  wlb_preference: number; // 1 - 10 scale
  salary_range: string;
}

export interface ValidationResult {
  passed: boolean;
  missingFields: string[];
  validationNotes: string;
}

export interface KnowledgeBaseDomains {
  STEM_Engineering: string[];
  Medicine_LifeSciences: string[];
  Arts_Humanities_Design: string[];
  Law_Policy_Governance: string[];
  PureScience_Astronomy: string[];
  Languages_Linguistics: string[];
}

export interface ScoreWeights {
  academic_fit: number; // 0.35
  skills_fit: number;   // 0.25
  interest_alignment: number; // 0.20
  work_life_balance: number;  // 0.10
  compensation_match: number; // 0.10
}

export interface KnowledgeBase {
  domains: KnowledgeBaseDomains;
  score_weights: ScoreWeights;
}

export type BranchId = 'Branch A' | 'Branch B' | 'Branch C';

export interface CareerBranch {
  branchId: BranchId;
  branchType: 'Direct Fit' | 'Skill-Adjacent' | 'Emerging/Unconventional';
  roleName: string;
  domain: keyof KnowledgeBaseDomains;
  domainLabel: string;
  academicAndSkillScore: number; // 0 - 100
  academicFitScore: number;      // 0 - 100
  skillsFitScore: number;        // 0 - 100
  interestFitScore: number;      // 0 - 100
  wlbFitScore: number;           // 0 - 100
  salaryFitScore: number;        // 0 - 100
  compositeScore: number;        // Weighted composite score (0 - 100)
  fitJustification: string;
  upskillingAndBridge: string[];
  expectedWLBAndMarket: string;
  isTopSelected: boolean;
  rank: number;
}

export interface ToTExecutionProgress {
  phase: 'idle' | 'validating' | 'phase1_branching' | 'phase2_matrix' | 'phase3_guardrails' | 'completed' | 'error';
  phaseName: string;
  percent: number;
  details: string;
}

export interface CareerGuidanceResult {
  validation: ValidationResult;
  branches: CareerBranch[];
  selectedTop2: CareerBranch[];
  rawMarkdown: string;
  timestamp: string;
  engineUsed: 'prototype_tot' | 'gemini_llm';
}

export interface PresetProfile {
  id: string;
  title: string;
  description: string;
  badge: string;
  input: UserInput;
}
