/**
 * AI Career Guidance Assistant - Input Schema Validation Layer
 * Enforces critical field requirements and validates user input against payload schema.
 */

import { UserInput, ValidationResult } from '../types';

export function validateCareerInput(input: Partial<UserInput>): ValidationResult {
  const missingFields: string[] = [];
  const criticalFieldsMissing: string[] = [];

  // Critical field checks as mandated by the prompt:
  // (Academic Marks, Interests, Education Level)
  if (!input.grade_10th || input.grade_10th.trim().length === 0) {
    criticalFieldsMissing.push("10th Marks/Grades (Critical)");
    missingFields.push("10th Marks/Grades");
  }

  if (!input.grade_12th_subjects || input.grade_12th_subjects.trim().length === 0) {
    criticalFieldsMissing.push("12th Marks & Core Subjects (Critical)");
    missingFields.push("12th Marks & Core Subjects");
  }

  if (!input.education_level || input.education_level.trim().length === 0) {
    criticalFieldsMissing.push("Education Level / Degree (Critical)");
    missingFields.push("Education Level / Degree");
  }

  if (!input.interests || input.interests.trim().length === 0) {
    criticalFieldsMissing.push("Expressed Interests & Hobbies (Critical)");
    missingFields.push("Expressed Interests & Hobbies");
  }

  // Supporting required payload fields
  if (!input.current_skills || input.current_skills.trim().length === 0) {
    missingFields.push("Current Technical & Soft Skills");
  }

  if (!input.target_industry || input.target_industry.trim().length === 0) {
    missingFields.push("Target Industry / Field");
  }

  if (
    input.wlb_preference === undefined ||
    input.wlb_preference === null ||
    Number.isNaN(Number(input.wlb_preference)) ||
    Number(input.wlb_preference) < 1 ||
    Number(input.wlb_preference) > 10
  ) {
    missingFields.push("Preferred Work-Life Balance (1-10 Scale)");
  }

  if (!input.salary_range || input.salary_range.trim().length === 0) {
    missingFields.push("Target Salary Expectation");
  }

  const passed = missingFields.length === 0;

  let validationNotes = "";
  if (passed) {
    validationNotes = "All 8 required schema fields received, validated, and normalized successfully (10th/12th academic markers, education level, multi-domain skills, interests, industry target, WLB 1-10 rating, and salary expectations).";
  } else {
    const criticalList = criticalFieldsMissing.length > 0 ? ` Critical Missing: ${criticalFieldsMissing.join(", ")}.` : "";
    validationNotes = `Validation halted. Missing or incomplete schema fields: ${missingFields.join(", ")}.${criticalList}`;
  }

  return {
    passed,
    missingFields,
    validationNotes
  };
}
