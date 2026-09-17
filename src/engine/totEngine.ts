/**
 * AI Career Guidance Assistant - Simulated Tree of Thoughts (ToT) Engine
 * Implements Phase 1 (Thought Tree Generation), Phase 2 (Candidate Evaluation Matrix),
 * and Phase 3 (Selection & Guardrail Enforcement)
 */

import { UserInput, CareerBranch, KnowledgeBaseDomains } from '../types';
import { GROUNDING_KNOWLEDGE_BASE, ROLE_PROFILES, DOMAIN_LABELS, RoleKnowledgeProfile } from './knowledgeBase';

interface ScoredRole {
  role: RoleKnowledgeProfile;
  academicFit: number;
  skillsFit: number;
  academicAndSkillCombined: number;
  interestFit: number;
  wlbFit: number;
  salaryFit: number;
  compositeScore: number;
  fitReasons: string[];
  skillGaps: string[];
}

export function executeSimulatedTreeOfThoughts(input: UserInput): {
  branches: CareerBranch[];
  selectedTop2: CareerBranch[];
} {
  const normTargetIndustry = input.target_industry.toLowerCase();
  const normEducation = input.education_level.toLowerCase();
  const normSkills = input.current_skills.toLowerCase();
  const normInterests = input.interests.toLowerCase();
  const norm12th = input.grade_12th_subjects.toLowerCase();
  const norm10th = input.grade_10th.toLowerCase();
  const userWlb = Math.min(10, Math.max(1, Number(input.wlb_preference) || 7));

  // Score all 24 roles in the knowledge base
  const scoredRoles: ScoredRole[] = Object.values(ROLE_PROFILES).map((role) => {
    // 1. Academic Fit (0 - 100)
    let academicScore = 65; // base baseline
    const matchedSubjects: string[] = [];

    // Check 12th subjects and 10th against core subjects
    role.coreSubjects.forEach((sub) => {
      const subLower = sub.toLowerCase();
      if (norm12th.includes(subLower) || norm10th.includes(subLower) || normEducation.includes(subLower)) {
        academicScore += 12;
        matchedSubjects.push(sub);
      }
    });

    // Check education level relevance
    const roleDomainLower = role.domain.toLowerCase();
    if (
      (roleDomainLower.includes('stem') && (normEducation.includes('tech') || normEducation.includes('eng') || normEducation.includes('science') || normEducation.includes('cs'))) ||
      (roleDomainLower.includes('medicine') && (normEducation.includes('bio') || normEducation.includes('med') || normEducation.includes('pharma'))) ||
      (roleDomainLower.includes('arts') && (normEducation.includes('des') || normEducation.includes('art') || normEducation.includes('comm') || normEducation.includes('humanities'))) ||
      (roleDomainLower.includes('law') && (normEducation.includes('law') || normEducation.includes('pol') || normEducation.includes('legal'))) ||
      (roleDomainLower.includes('pure') && (normEducation.includes('phys') || normEducation.includes('math') || normEducation.includes('astro') || normEducation.includes('sci'))) ||
      (roleDomainLower.includes('lang') && (normEducation.includes('ling') || normEducation.includes('lang') || normEducation.includes('eng') || normEducation.includes('lit')))
    ) {
      academicScore += 15;
    }
    academicScore = Math.min(98, Math.max(40, academicScore));

    // 2. Skills Fit (0 - 100)
    let skillsScore = 50;
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];

    role.keySkills.forEach((skill) => {
      const sLower = skill.toLowerCase();
      // Test words in skill
      const keywords = sLower.split(/[/ ()]+/).filter(k => k.length > 2);
      const isMatch = keywords.some(k => normSkills.includes(k));
      if (isMatch || normSkills.includes(sLower)) {
        skillsScore += 9;
        matchedSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    });
    skillsScore = Math.min(96, Math.max(35, skillsScore));

    // Combined Academic & Skill Score (normalized 0-100)
    // Formula matching the 35% / 25% distribution
    const academicAndSkillCombined = Math.round(
      (academicScore * (GROUNDING_KNOWLEDGE_BASE.score_weights.academic_fit / (0.35 + 0.25))) +
      (skillsScore * (GROUNDING_KNOWLEDGE_BASE.score_weights.skills_fit / (0.35 + 0.25)))
    );

    // 3. Interest Alignment (0 - 100)
    let interestScore = 50;
    const matchedInterests: string[] = [];
    role.typicalInterests.forEach((interest) => {
      const iLower = interest.toLowerCase();
      if (normInterests.includes(iLower)) {
        interestScore += 15;
        matchedInterests.push(interest);
      }
    });
    if (normInterests.includes(role.title.toLowerCase()) || normInterests.includes(role.domain.toLowerCase())) {
      interestScore += 20;
    }
    interestScore = Math.min(98, Math.max(30, interestScore));

    // 4. Work-Life Balance Feasibility (0 - 100)
    // Calculate distance between user WLB and role typical WLB
    const wlbDiff = Math.abs(userWlb - role.wlbScoreDefault);
    let wlbScore = 100 - (wlbDiff * 14);
    wlbScore = Math.min(95, Math.max(40, wlbScore));

    // 5. Salary Expectation Match (0 - 100)
    let salaryScore = 75;
    const normSalary = input.salary_range.toLowerCase();
    const hasSalaryKeyword = role.salaryFitKeywords.some(k => normSalary.includes(k));
    if (hasSalaryKeyword) {
      salaryScore += 18;
    } else {
      salaryScore -= 5;
    }
    salaryScore = Math.min(95, Math.max(45, salaryScore));

    // Compute Weighted Composite Score:
    // (academic_fit: 0.35, skills_fit: 0.25, interest_alignment: 0.20, work_life_balance: 0.10, compensation_match: 0.10)
    const compositeScore = Math.round(
      (academicScore * GROUNDING_KNOWLEDGE_BASE.score_weights.academic_fit +
       skillsScore * GROUNDING_KNOWLEDGE_BASE.score_weights.skills_fit +
       interestScore * GROUNDING_KNOWLEDGE_BASE.score_weights.interest_alignment +
       wlbScore * GROUNDING_KNOWLEDGE_BASE.score_weights.work_life_balance +
       salaryScore * GROUNDING_KNOWLEDGE_BASE.score_weights.compensation_match) * 10
    ) / 10;

    const fitReasons: string[] = [];
    if (matchedSubjects.length > 0) {
      fitReasons.push(`Grounding in ${matchedSubjects.join(", ")} from academic coursework`);
    }
    if (matchedSkills.length > 0) {
      fitReasons.push(`Proven skills in ${matchedSkills.slice(0, 3).join(", ")}`);
    }
    if (matchedInterests.length > 0) {
      fitReasons.push(`Deep intrinsic motivation toward ${matchedInterests.join(", ")}`);
    }

    return {
      role,
      academicFit: academicScore,
      skillsFit: skillsScore,
      academicAndSkillCombined,
      interestFit: interestScore,
      wlbFit: Math.round(wlbScore),
      salaryFit: Math.round(salaryScore),
      compositeScore,
      fitReasons,
      skillGaps: missingSkills.slice(0, 3)
    };
  });

  // PHASE 1: THOUGHT TREE GENERATION
  // Branch A: Direct fit to explicit target industry and educational background
  let branchACandidates = scoredRoles.filter(sr => {
    const dLower = sr.role.domain.toLowerCase();
    const tLower = sr.role.title.toLowerCase();
    return normTargetIndustry.includes(dLower) ||
           normTargetIndustry.includes(tLower) ||
           (normTargetIndustry.includes('tech') && sr.role.domain === 'STEM_Engineering') ||
           (normTargetIndustry.includes('legal') && sr.role.domain === 'Law_Policy_Governance') ||
           (normTargetIndustry.includes('space') && sr.role.domain === 'PureScience_Astronomy') ||
           (normTargetIndustry.includes('bio') && sr.role.domain === 'Medicine_LifeSciences') ||
           (normTargetIndustry.includes('ling') && sr.role.domain === 'Languages_Linguistics') ||
           (normTargetIndustry.includes('design') && sr.role.domain === 'Arts_Humanities_Design');
  });

  if (branchACandidates.length === 0) {
    branchACandidates = [...scoredRoles].sort((a, b) => b.academicAndSkillCombined - a.academicAndSkillCombined);
  }
  branchACandidates.sort((a, b) => b.compositeScore - a.compositeScore);
  const selectedRoleA = branchACandidates[0];

  // Branch B: Skill-adjacent path leveraging cross-disciplinary strengths
  // (e.g. STEM + Law -> IP Law, Language + Tech -> NLP, Bio + Tech -> Bioinformatics, Arts + Tech -> UI/UX)
  const remainingForB = scoredRoles.filter(sr => sr.role.title !== selectedRoleA.role.title);
  let branchBCandidates = remainingForB.filter(sr => {
    const isAdjacentDomain = selectedRoleA.role.crossoverDomains.includes(sr.role.domain);
    const hasSkillOrInterestOverlap = sr.skillsFit >= 60 || sr.interestFit >= 60;
    return isAdjacentDomain && hasSkillOrInterestOverlap;
  });

  if (branchBCandidates.length === 0) {
    branchBCandidates = remainingForB.filter(sr => sr.role.domain !== selectedRoleA.role.domain);
  }
  branchBCandidates.sort((a, b) => b.compositeScore - a.compositeScore);
  const selectedRoleB = branchBCandidates[0] || remainingForB[0];

  // Branch C: Emerging or unconventional path based on expressed interests and skills
  const remainingForC = scoredRoles.filter(
    sr => sr.role.title !== selectedRoleA.role.title && sr.role.title !== selectedRoleB.role.title
  );
  let branchCCandidates = [...remainingForC].sort((a, b) => {
    // Prioritize high interest fit + unconventional domain
    const interestBoostA = a.interestFit * 1.5 + (a.role.domain !== selectedRoleA.role.domain ? 20 : 0);
    const interestBoostB = b.interestFit * 1.5 + (b.role.domain !== selectedRoleA.role.domain ? 20 : 0);
    return interestBoostB - interestBoostA;
  });
  const selectedRoleC = branchCCandidates[0] || remainingForC[0];

  // Build CareerBranch objects
  function createBranch(
    branchId: 'Branch A' | 'Branch B' | 'Branch C',
    branchType: 'Direct Fit' | 'Skill-Adjacent' | 'Emerging/Unconventional',
    scored: ScoredRole
  ): CareerBranch {
    const role = scored.role;
    let justification = "";

    if (branchType === 'Direct Fit') {
      justification = `Direct alignment with your declared target industry (${input.target_industry}) and educational profile in ${input.education_level}. Your academic record in ${input.grade_12th_subjects} establishes foundational rigor, reinforced by demonstrable competencies in ${input.current_skills.split(',').slice(0, 3).join(', ')}.`;
    } else if (branchType === 'Skill-Adjacent') {
      justification = `Synthesizes your primary technical/academic strengths with high-value domain adjacency. Bridges your background in ${input.education_level} and skills (${input.current_skills.split(',').slice(0, 2).join(', ')}) into the cross-cutting ${DOMAIN_LABELS[role.domain]} sector.`;
    } else {
      justification = `Emerging, high-potential pathway directly anchored to your expressed personal interests in ${input.interests}. Capitalizes on unconventional combinations between your core academic background and fast-evolving market opportunities.`;
    }

    const bridgeRequirements = [
      ...role.bridgeUpskilling.slice(0, 3),
      ...(scored.skillGaps.length > 0 ? [`Targeted mastery of: ${scored.skillGaps.join(", ")}`] : [])
    ];

    const expectedWLB = `Rated ${role.wlbScoreDefault}/10 on standard operational intensity (user preference: ${userWlb}/10). ${role.wlbDescription} Market salary benchmark: ${role.salaryTier}, matching user range target of ${input.salary_range}.`;

    return {
      branchId,
      branchType,
      roleName: role.title,
      domain: role.domain,
      domainLabel: DOMAIN_LABELS[role.domain],
      academicAndSkillScore: scored.academicAndSkillCombined,
      academicFitScore: scored.academicFit,
      skillsFitScore: scored.skillsFit,
      interestFitScore: scored.interestFit,
      wlbFitScore: scored.wlbFit,
      salaryFitScore: scored.salaryFit,
      compositeScore: scored.compositeScore,
      fitJustification: justification,
      upskillingAndBridge: bridgeRequirements,
      expectedWLBAndMarket: expectedWLB,
      isTopSelected: false,
      rank: 0
    };
  }

  const branchA = createBranch('Branch A', 'Direct Fit', selectedRoleA);
  const branchB = createBranch('Branch B', 'Skill-Adjacent', selectedRoleB);
  const branchC = createBranch('Branch C', 'Emerging/Unconventional', selectedRoleC);

  const branches = [branchA, branchB, branchC];

  // PHASE 3: SELECTION & GUARDRAIL ENFORCEMENT
  // Guardrail 1 (Multi-Option Safety): Select the top 2 scored candidates to avoid single-option bias.
  const sorted = [...branches].sort((a, b) => b.compositeScore - a.compositeScore);
  sorted.forEach((b, idx) => {
    b.rank = idx + 1;
    b.isTopSelected = idx < 2;
  });

  const selectedTop2 = sorted.slice(0, 2);

  return {
    branches,
    selectedTop2
  };
}
