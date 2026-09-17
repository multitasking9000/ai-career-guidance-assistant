/**
 * AI Career Guidance Assistant - Grounding Knowledge Base
 * Architecture: Monolithic Zero-Backend Single-Turn Engine
 * Embedded In-Memory Knowledge Base JSON & Domain Taxonomy
 */

import { KnowledgeBase, PresetProfile } from '../types';

export const GROUNDING_KNOWLEDGE_BASE: KnowledgeBase = {
  domains: {
    STEM_Engineering: ["Software Engineer", "Data Scientist", "Robotics Engineer", "Civil Engineer"],
    Medicine_LifeSciences: ["Biomedical Researcher", "Clinical Analyst", "Pharmacologist", "Bioinformatician"],
    Arts_Humanities_Design: ["UI/UX Designer", "Technical Writer", "Digital Content Strategist", "Industrial Designer"],
    Law_Policy_Governance: ["Legal Data Analyst", "Corporate Compliance Specialist", "Policy Researcher", "IP Specialist"],
    PureScience_Astronomy: ["Astrophysicist", "Data Analyst (Observational Data)", "Space Systems Engineer", "Lab Research Assistant"],
    Languages_Linguistics: ["Computational Linguist", "Localization Specialist", "Translator/Interpreter", "NLP Corpus Specialist"]
  },
  score_weights: {
    academic_fit: 0.35,
    skills_fit: 0.25,
    interest_alignment: 0.20,
    work_life_balance: 0.10,
    compensation_match: 0.10
  }
};

export const DOMAIN_LABELS: Record<string, string> = {
  STEM_Engineering: "STEM & Engineering",
  Medicine_LifeSciences: "Medicine & Life Sciences",
  Arts_Humanities_Design: "Arts, Humanities & Design",
  Law_Policy_Governance: "Law, Policy & Governance",
  PureScience_Astronomy: "Pure Science & Astronomy",
  Languages_Linguistics: "Languages & Linguistics"
};

export interface RoleKnowledgeProfile {
  title: string;
  domain: keyof typeof GROUNDING_KNOWLEDGE_BASE.domains;
  coreSubjects: string[];
  keySkills: string[];
  bridgeUpskilling: string[];
  wlbScoreDefault: number; // 1-10
  wlbDescription: string;
  salaryTier: string;
  salaryFitKeywords: string[];
  typicalInterests: string[];
  crossoverDomains: string[];
}

export const ROLE_PROFILES: Record<string, RoleKnowledgeProfile> = {
  "Software Engineer": {
    title: "Software Engineer",
    domain: "STEM_Engineering",
    coreSubjects: ["Mathematics", "Computer Science", "Physics"],
    keySkills: ["Python", "Java", "Data Structures", "Algorithms", "Git", "Problem Solving", "Web Development"],
    bridgeUpskilling: ["System Design & Distributed Systems", "Modern Cloud Architecture (GCP/AWS)", "CI/CD & DevOps Automation", "Open Source Code Contributions"],
    wlbScoreDefault: 7,
    wlbDescription: "Moderate to high flexibility with hybrid/remote options; occasional on-call shifts or sprint deadlines.",
    salaryTier: "$90,000 - $140,000 / yr (Entry to Mid-Level)",
    salaryFitKeywords: ["high", "tech", "90k", "100k", "120k", "150k", "15 lpa", "20 lpa", "competitive"],
    typicalInterests: ["coding", "gaming", "building software", "open source", "algorithms", "automation"],
    crossoverDomains: ["Languages_Linguistics", "Arts_Humanities_Design", "Law_Policy_Governance"]
  },
  "Data Scientist": {
    title: "Data Scientist",
    domain: "STEM_Engineering",
    coreSubjects: ["Mathematics", "Statistics", "Computer Science"],
    keySkills: ["Python", "SQL", "Machine Learning", "Statistical Modeling", "Data Analysis", "Pandas", "Scikit-Learn"],
    bridgeUpskilling: ["Deep Learning Frameworks (PyTorch/TensorFlow)", "Production ML Deployment (MLOps)", "Advanced Bayesian Statistics", "Domain-Specific Data Storytelling"],
    wlbScoreDefault: 8,
    wlbDescription: "Good work-life balance with standard analytical sprints; remote-friendly project cadence.",
    salaryTier: "$95,000 - $145,000 / yr",
    salaryFitKeywords: ["high", "data", "analytics", "100k", "120k", "18 lpa", "24 lpa"],
    typicalInterests: ["data puzzles", "modeling", "math", "predictive analytics", "finance", "research"],
    crossoverDomains: ["Law_Policy_Governance", "PureScience_Astronomy", "Medicine_LifeSciences"]
  },
  "Robotics Engineer": {
    title: "Robotics Engineer",
    domain: "STEM_Engineering",
    coreSubjects: ["Physics", "Mathematics", "Mechanics", "Computer Science"],
    keySkills: ["C++", "ROS (Robot Operating System)", "Embedded Systems", "Control Theory", "Kinematics", "Hardware-Software Integration"],
    bridgeUpskilling: ["ROS2 & Real-Time Linux", "Computer Vision for Autonomous Systems (OpenCV)", "PCB Design & Sensor Calibration", "Simulation Tools (Gazebo/NVIDIA Isaac)"],
    wlbScoreDefault: 6,
    wlbDescription: "Lab and hardware prototyping intensive; may require on-site presence for physical test rigs.",
    salaryTier: "$85,000 - $135,000 / yr",
    salaryFitKeywords: ["hardware", "engineering", "robotics", "100k", "automation"],
    typicalInterests: ["robotics", "electronics", "drones", "3d printing", "mechatronics"],
    crossoverDomains: ["PureScience_Astronomy", "Arts_Humanities_Design"]
  },
  "Civil Engineer": {
    title: "Civil Engineer",
    domain: "STEM_Engineering",
    coreSubjects: ["Mathematics", "Physics", "Chemistry"],
    keySkills: ["AutoCAD", "Structural Analysis", "Geotechnical Surveying", "Project Management", "Site Supervision"],
    bridgeUpskilling: ["BIM (Building Information Modeling) Revit Certification", "LEED Green Associate Credential", "GIS Spatial Mapping Software", "Advanced Primavera / MS Project Scheduling"],
    wlbScoreDefault: 6,
    wlbDescription: "Standard daytime construction/field hours with site visits and weather dependency.",
    salaryTier: "$70,000 - $110,000 / yr",
    salaryFitKeywords: ["infrastructure", "civil", "construction", "75k", "90k"],
    typicalInterests: ["architecture", "bridges", "infrastructure", "urban planning", "construction"],
    crossoverDomains: ["Arts_Humanities_Design", "Law_Policy_Governance"]
  },
  "Biomedical Researcher": {
    title: "Biomedical Researcher",
    domain: "Medicine_LifeSciences",
    coreSubjects: ["Biology", "Chemistry", "Physics", "Mathematics"],
    keySkills: ["Cell Culture", "PCR", "Molecular Biology", "Experimental Design", "Data Logging", "Scientific Writing"],
    bridgeUpskilling: ["CRISPR & Gene Editing Methodologies", "Bio-statistical Analysis in R/GraphPad", "Good Laboratory Practice (GLP) Protocols", "Clinical Trial Protocol Design"],
    wlbScoreDefault: 7,
    wlbDescription: "Structured laboratory experimental cycles; occasional weekend incubation monitoring.",
    salaryTier: "$65,000 - $105,000 / yr",
    salaryFitKeywords: ["biotech", "research", "lab", "pharma", "clinical"],
    typicalInterests: ["medicine", "biology", "genetics", "health sciences", "disease research"],
    crossoverDomains: ["STEM_Engineering", "PureScience_Astronomy"]
  },
  "Clinical Analyst": {
    title: "Clinical Analyst",
    domain: "Medicine_LifeSciences",
    coreSubjects: ["Biology", "Information Technology", "Statistics"],
    keySkills: ["Electronic Health Records (EHR)", "Health Informatics", "Data Cleaning", "HIPAA Compliance", "Clinical Workflow"],
    bridgeUpskilling: ["Epic / Cerner Certified EHR Analyst", "HL7 / FHIR Health Data Interoperability", "Healthcare SQL & PowerBI Visualizations", "Medical Terminology & Coding Standards"],
    wlbScoreDefault: 8,
    wlbDescription: "Predictable healthcare enterprise hours with low shift volatility.",
    salaryTier: "$75,000 - $115,000 / yr",
    salaryFitKeywords: ["healthcare", "hospital", "clinical data", "informatics", "80k"],
    typicalInterests: ["patient outcomes", "hospital systems", "medical tech", "public health"],
    crossoverDomains: ["STEM_Engineering", "Law_Policy_Governance"]
  },
  "Pharmacologist": {
    title: "Pharmacologist",
    domain: "Medicine_LifeSciences",
    coreSubjects: ["Chemistry", "Biology", "Physiology"],
    keySkills: ["Pharmacokinetics", "Toxicology", "Drug Assay Screening", "Chemical Synthesis", "FDA Regulatory Documentation"],
    bridgeUpskilling: ["Computational Drug Design & Molecular Docking", "FDA IND/NDA Regulatory Affairs Certification", "High-Throughput Assay Automation", "Clinical Pharmacokinetics Modeling"],
    wlbScoreDefault: 7,
    wlbDescription: "Pharma corporate and research schedule; steady R&D timelines.",
    salaryTier: "$85,000 - $130,000 / yr",
    salaryFitKeywords: ["pharma", "drugs", "chemistry", "90k", "110k"],
    typicalInterests: ["chemistry", "drug discovery", "therapeutics", "biomedical"],
    crossoverDomains: ["STEM_Engineering", "Law_Policy_Governance"]
  },
  "Bioinformatician": {
    title: "Bioinformatician",
    domain: "Medicine_LifeSciences",
    coreSubjects: ["Biology", "Computer Science", "Mathematics", "Statistics"],
    keySkills: ["Python", "R", "Next-Gen Sequencing (NGS)", "Genomic Data Pipelines", "Bioconductor", "Linux CLI"],
    bridgeUpskilling: ["Cloud Genomic Workflows (Nextflow / WDL)", "Single-Cell RNA-Seq Analysis", "Variant Calling & Annotation Tools", "Structural Biology AI (AlphaFold tooling)"],
    wlbScoreDefault: 8,
    wlbDescription: "Computational desk-based workflow with high autonomy and flexible hybrid schedules.",
    salaryTier: "$90,000 - $140,000 / yr",
    salaryFitKeywords: ["genomics", "bioinformatics", "python", "biotech", "100k"],
    typicalInterests: ["genetics", "computational biology", "dna data", "algorithms in nature"],
    crossoverDomains: ["STEM_Engineering", "PureScience_Astronomy"]
  },
  "UI/UX Designer": {
    title: "UI/UX Designer",
    domain: "Arts_Humanities_Design",
    coreSubjects: ["Design", "Computer Science", "Psychology", "Fine Arts"],
    keySkills: ["Figma", "User Research", "Wireframing", "Interaction Design", "Prototyping", "Information Architecture"],
    bridgeUpskilling: ["Design Systems Architecture (Tokens & Component Libraries)", "Quantitative UX Usability Testing", "Basic HTML/CSS/Tailwind UI Implementation", "Accessibility (WCAG AA/AAA) Auditing"],
    wlbScoreDefault: 8,
    wlbDescription: "Strong collaborative autonomy, remote friendly, agile design sprint cycles.",
    salaryTier: "$80,000 - $130,000 / yr",
    salaryFitKeywords: ["design", "ui", "ux", "product design", "figma", "90k"],
    typicalInterests: ["visual design", "human psychology", "aesthetics", "typography", "digital art"],
    crossoverDomains: ["STEM_Engineering", "Languages_Linguistics"]
  },
  "Technical Writer": {
    title: "Technical Writer",
    domain: "Arts_Humanities_Design",
    coreSubjects: ["English Literature", "Linguistics", "Computer Science", "Communications"],
    keySkills: ["Markdown", "API Documentation", "Copywriting", "Developer Guides", "Docs-as-Code", "Information Structuring"],
    bridgeUpskilling: ["Git & Docs-as-Code Static Site Generators (Docusaurus)", "Swagger/OpenAPI Specification Authoring", "Basic Python/Curl API Request Testing", "Software Architecture Comprehension"],
    wlbScoreDefault: 9,
    wlbDescription: "Exceptional work-life balance with self-paced documentation deliverables.",
    salaryTier: "$75,000 - $120,000 / yr",
    salaryFitKeywords: ["writing", "documentation", "authoring", "technical communication", "80k"],
    typicalInterests: ["reading", "editing", "explaining complex ideas", "clarity", "publishing"],
    crossoverDomains: ["STEM_Engineering", "Languages_Linguistics", "Law_Policy_Governance"]
  },
  "Digital Content Strategist": {
    title: "Digital Content Strategist",
    domain: "Arts_Humanities_Design",
    coreSubjects: ["Media Studies", "Marketing", "English", "Sociology"],
    keySkills: ["Content Strategy", "SEO", "Analytics", "Audience Segmentation", "Brand Messaging", "Editorial Planning"],
    bridgeUpskilling: ["Data-Driven SEO Auditing (Ahrefs / Google Search Console)", "Conversion Rate Optimization (CRO)", "Interactive Multimedia Content Creation", "Omnichannel Content Ops Governance"],
    wlbScoreDefault: 7,
    wlbDescription: "Campaign-driven milestones; creative and collaborative team environment.",
    salaryTier: "$65,000 - $105,000 / yr",
    salaryFitKeywords: ["content", "media", "strategy", "creative", "70k", "90k"],
    typicalInterests: ["storytelling", "social media trends", "creative branding", "journalism"],
    crossoverDomains: ["Languages_Linguistics", "Law_Policy_Governance"]
  },
  "Industrial Designer": {
    title: "Industrial Designer",
    domain: "Arts_Humanities_Design",
    coreSubjects: ["Design", "Physics", "Geometry", "Mechanical Engineering"],
    keySkills: ["3D CAD (SolidWorks/Rhino)", "Ergonomics", "Rendering (KeyShot)", "Rapid Prototyping", "Design for Manufacturing"],
    bridgeUpskilling: ["Circular Design & Sustainable Material Selection", "DFM (Design for Manufacturing) Injection Molding", "Surface Modeling & Generative Design", "Physical Prototyping Workshop Safety"],
    wlbScoreDefault: 7,
    wlbDescription: "Studio-based prototyping with collaborative client review cycles.",
    salaryTier: "$70,000 - $115,000 / yr",
    salaryFitKeywords: ["product design", "industrial", "hardware", "cad", "prototyping"],
    typicalInterests: ["industrial products", "gadgets", "sculpting", "ergonomics", "craft"],
    crossoverDomains: ["STEM_Engineering"]
  },
  "Legal Data Analyst": {
    title: "Legal Data Analyst",
    domain: "Law_Policy_Governance",
    coreSubjects: ["Political Science", "Law", "Mathematics", "Computer Science"],
    keySkills: ["Legal Informatics", "SQL", "E-Discovery Systems", "Regulatory Compliance", "Data Privacy (GDPR/CCPA)", "Contract Analytics"],
    bridgeUpskilling: ["Relativity Certified E-Discovery Specialist", "Legal Tech & Automated Contract Review Tooling", "Privacy Engineering (CIPP/E / CIPM)", "Data Visualization for Legal Briefs"],
    wlbScoreDefault: 8,
    wlbDescription: "Predictable corporate legal operations; significantly better WLB than traditional courtroom litigation.",
    salaryTier: "$80,000 - $125,000 / yr",
    salaryFitKeywords: ["legal tech", "data", "compliance", "law", "privacy", "90k"],
    typicalInterests: ["legal systems", "data justice", "contracts", "privacy rights", "logic"],
    crossoverDomains: ["STEM_Engineering", "Languages_Linguistics"]
  },
  "Corporate Compliance Specialist": {
    title: "Corporate Compliance Specialist",
    domain: "Law_Policy_Governance",
    coreSubjects: ["Business Law", "Economics", "Commerce", "Public Administration"],
    keySkills: ["Risk Assessment", "Internal Auditing", "Anti-Money Laundering (AML)", "Ethics Frameworks", "Policy Drafting"],
    bridgeUpskilling: ["CCEP (Certified Compliance and Ethics Professional)", "ESG (Environmental, Social, Governance) Reporting", "FinTech Regulatory Standards & KYC Systems", "Enterprise Risk Management (COSO/ISO 31000)"],
    wlbScoreDefault: 8,
    wlbDescription: "Stable 9-to-5 enterprise corporate schedule with clear regulatory milestones.",
    salaryTier: "$75,000 - $120,000 / yr",
    salaryFitKeywords: ["compliance", "governance", "audit", "risk", "corporate", "85k"],
    typicalInterests: ["ethics", "corporate governance", "regulations", "fair practice"],
    crossoverDomains: ["Arts_Humanities_Design", "Languages_Linguistics"]
  },
  "Policy Researcher": {
    title: "Policy Researcher",
    domain: "Law_Policy_Governance",
    coreSubjects: ["Public Policy", "Economics", "Political Science", "Sociology"],
    keySkills: ["Quantitative Policy Evaluation", "Literature Review", "Stakeholder Interviews", "White Paper Drafting", "Econometrics"],
    bridgeUpskilling: ["Econometric Modeling in Stata or R", "Cost-Benefit Policy Impact Analysis", "Grant Writing & Think-Tank Project Management", "Public Policy Deliberation & Briefing"],
    wlbScoreDefault: 8,
    wlbDescription: "Think-tank and academic pace; intellectual work with flexible research blocks.",
    salaryTier: "$65,000 - $105,000 / yr",
    salaryFitKeywords: ["policy", "government", "research", "think tank", "public sector"],
    typicalInterests: ["governance", "civic welfare", "climate policy", "economics", "education"],
    crossoverDomains: ["PureScience_Astronomy", "Languages_Linguistics"]
  },
  "IP Specialist": {
    title: "IP Specialist",
    domain: "Law_Policy_Governance",
    coreSubjects: ["Engineering / Pure Science", "Law", "Technical Writing"],
    keySkills: ["Patent Landscaping", "Prior Art Search", "Claim Drafting", "Patent Prosecution", "IP Portfolio Management"],
    bridgeUpskilling: ["Patent Bar / Trademark Agent Certification", "Patent Database Analytics (Derwent, PatBase)", "Cross-border WIPO Filing Procedures", "Technical Writing for Complex Inventions"],
    wlbScoreDefault: 8,
    wlbDescription: "High-paying boutique or corporate legal department pace; very structured case management.",
    salaryTier: "$95,000 - $160,000 / yr",
    salaryFitKeywords: ["patent", "ip", "intellectual property", "law", "high pay", "110k", "130k"],
    typicalInterests: ["inventions", "patents", "deep tech innovation", "legal drafting", "IP strategy"],
    crossoverDomains: ["STEM_Engineering", "PureScience_Astronomy", "Medicine_LifeSciences"]
  },
  "Astrophysicist": {
    title: "Astrophysicist",
    domain: "PureScience_Astronomy",
    coreSubjects: ["Physics", "Mathematics", "Astronomy", "Computer Science"],
    keySkills: ["Astrophysical Modeling", "Python (Astropy)", "Statistical Mechanics", "Spectroscopy", "Numerical Simulation"],
    bridgeUpskilling: ["High-Performance Computing (HPC) & GPU Parallelism", "Astropy / CASA Radio Astronomy Tools", "Astronomical Data Archives (JWST / ESA / NASA Open Data)", "Academic Grant Proposal Writing"],
    wlbScoreDefault: 7,
    wlbDescription: "Research and observatory driven; occasional nighttime telescope runs or international colloquiums.",
    salaryTier: "$75,000 - $125,000 / yr",
    salaryFitKeywords: ["space", "astronomy", "physics", "universe", "research", "science"],
    typicalInterests: ["cosmos", "stars", "black holes", "quantum physics", "telescopes", "space"],
    crossoverDomains: ["STEM_Engineering"]
  },
  "Data Analyst (Observational Data)": {
    title: "Data Analyst (Observational Data)",
    domain: "PureScience_Astronomy",
    coreSubjects: ["Physics", "Statistics", "Computer Science", "Mathematics"],
    keySkills: ["Python", "Signal Processing", "Noise Reduction", "Time-Series Analysis", "FITS Format Processing", "SQL"],
    bridgeUpskilling: ["Fourier Analysis & Wavelet Transforms for Sensor Data", "Distributed Big Data Processing (Apache Spark)", "Sensor Calibration & Telemetry Pipelines", "Machine Learning for Anomaly Detection"],
    wlbScoreDefault: 8,
    wlbDescription: "Computational laboratory or mission control cadence; very high data hygiene standards.",
    salaryTier: "$80,000 - $130,000 / yr",
    salaryFitKeywords: ["observational data", "space data", "satellite", "signal processing", "data"],
    typicalInterests: ["satellite telemetry", "astronomy data", "signal analysis", "data cleaning"],
    crossoverDomains: ["STEM_Engineering", "Medicine_LifeSciences"]
  },
  "Space Systems Engineer": {
    title: "Space Systems Engineer",
    domain: "PureScience_Astronomy",
    coreSubjects: ["Aerospace / Physics", "Mathematics", "Systems Engineering"],
    keySkills: ["Orbital Mechanics", "Thermal Analysis", "Payload Integration", "Mission Architecture", "Risk & Reliability Engineering"],
    bridgeUpskilling: ["Systems Engineering Professional (INCOSE ASEP/CSEP)", "STK (Systems Tool Kit) Satellite Orbit Simulation", "Radiation-Hardened Electronics Standards", "CubeSat / SmallSat Design Lifecycle"],
    wlbScoreDefault: 6,
    wlbDescription: "Mission launch windows and hardware qualification cycles can involve intensive testing milestones.",
    salaryTier: "$90,000 - $150,000 / yr",
    salaryFitKeywords: ["space tech", "satellites", "rockets", "aerospace", "100k", "120k"],
    typicalInterests: ["space exploration", "rocketry", "payloads", "orbital mechanics", "satellites"],
    crossoverDomains: ["STEM_Engineering"]
  },
  "Lab Research Assistant": {
    title: "Lab Research Assistant",
    domain: "PureScience_Astronomy",
    coreSubjects: ["Physics", "Chemistry", "Mathematics"],
    keySkills: ["Lab Safety", "Spectrometry", "Sample Preparation", "Cryogenics", "Data Logging", "Cleanroom Protocols"],
    bridgeUpskilling: ["Vacuum Systems & Cryogenic Equipment Certification", "Cleanroom Class 100/1000 Standards", "Automated Instrument Interfacing (LabVIEW)", "Research Protocol Documentation"],
    wlbScoreDefault: 8,
    wlbDescription: "Fixed laboratory operating hours, very low off-hours intrusion.",
    salaryTier: "$50,000 - $80,000 / yr",
    salaryFitKeywords: ["lab", "assistant", "science", "entry level", "physics lab"],
    typicalInterests: ["hands-on experiments", "optics", "lasers", "vacuum chambers", "science labs"],
    crossoverDomains: ["Medicine_LifeSciences"]
  },
  "Computational Linguist": {
    title: "Computational Linguist",
    domain: "Languages_Linguistics",
    coreSubjects: ["Linguistics", "Computer Science", "Cognitive Science", "Mathematics"],
    keySkills: ["Python", "Morphological Parsing", "Syntax & Semantics Analysis", "NLP Pipelines (NLTK/SpaCy)", "Regular Expressions"],
    bridgeUpskilling: ["Transformer LLM Architecture & Prompt Tuning", "Vector Embeddings & Semantic Search (FAISS/Pinecone)", "Multilingual Tokenization & Cross-Lingual Alignment", "Corpus Annotation Frameworks (CoNLL/Universal Dependencies)"],
    wlbScoreDefault: 8,
    wlbDescription: "High-flexibility tech/AI research schedule; intellectual, language-centric problem solving.",
    salaryTier: "$90,000 - $145,000 / yr",
    salaryFitKeywords: ["nlp", "linguistics", "language ai", "python", "100k", "120k"],
    typicalInterests: ["grammar", "languages", "speech technology", "syntax", "etymology", "ai models"],
    crossoverDomains: ["STEM_Engineering", "Arts_Humanities_Design"]
  },
  "Localization Specialist": {
    title: "Localization Specialist",
    domain: "Languages_Linguistics",
    coreSubjects: ["Languages", "Intercultural Communication", "Translation Studies"],
    keySkills: ["CAT Tools (Trados/MemoQ)", "Localization Engineering", "Cultural Adaptation", "Glossary Management", "TMS Workflow"],
    bridgeUpskilling: ["L10n Project Management Certification", "Software String Extraction & Pseudo-Localization", "AI Post-Editing & MTPE Quality Assurance", "Internationalization (i18n) Code Standards"],
    wlbScoreDefault: 8,
    wlbDescription: "Structured release sprints with international client collaboration; remote friendly.",
    salaryTier: "$60,000 - $95,000 / yr",
    salaryFitKeywords: ["translation", "localization", "languages", "international", "global"],
    typicalInterests: ["foreign languages", "world cultures", "media dubbing", "global gaming"],
    crossoverDomains: ["Arts_Humanities_Design"]
  },
  "Translator/Interpreter": {
    title: "Translator/Interpreter",
    domain: "Languages_Linguistics",
    coreSubjects: ["Languages", "Literature", "International Relations"],
    keySkills: ["Bilingual Fluency", "Simultaneous Interpretation", "Terminological Precision", "Cultural Nuance", "Legal/Medical Translation"],
    bridgeUpskilling: ["Court / Healthcare Certified Medical Interpreter Credential", "Simultaneous Conference Booth Technique", "Computer-Assisted Translation Speed Mastery", "Specialized Technical Translation Glossary"],
    wlbScoreDefault: 7,
    wlbDescription: "Event-based or per-project freelance/agency schedule; high autonomy.",
    salaryTier: "$55,000 - $90,000 / yr",
    salaryFitKeywords: ["interpreter", "translator", "fluency", "diplomacy", "freelance"],
    typicalInterests: ["speaking languages", "diplomatic affairs", "literature", "multilingual exchange"],
    crossoverDomains: ["Law_Policy_Governance"]
  },
  "NLP Corpus Specialist": {
    title: "NLP Corpus Specialist",
    domain: "Languages_Linguistics",
    coreSubjects: ["Linguistics", "Data Science", "Information Science"],
    keySkills: ["Corpus Linguistics", "Data Curation", "Annotation Guidelines", "Python", "POS Tagging", "Bias Auditing in Text"],
    bridgeUpskilling: ["RLHF & Instruction Fine-Tuning Annotation Guidelines", "Data Pipeline Scrubbing for Toxicity & PII", "Synthetic Data Generation for NLU Models", "Crowdsourced Annotation Quality Control"],
    wlbScoreDefault: 8,
    wlbDescription: "Predictable data operations within AI research labs and tech firms.",
    salaryTier: "$80,000 - $125,000 / yr",
    salaryFitKeywords: ["corpus", "dataset", "nlp", "ai training data", "linguistics data", "85k"],
    typicalInterests: ["dictionaries", "corpus analysis", "training datasets", "language variations"],
    crossoverDomains: ["STEM_Engineering", "Arts_Humanities_Design"]
  }
};

export const PRESET_PROFILES: PresetProfile[] = [
  {
    id: "stem-policy-ip",
    title: "Tech + Law / IP Specialist",
    badge: "Cross-Disciplinary",
    description: "Computer science student with strong debate skills interested in tech regulation and patent strategy.",
    input: {
      grade_10th: "91% (CBSE Board, Distinction in Science & Math)",
      grade_12th_subjects: "92% in Physics, Chemistry, Mathematics & English",
      education_level: "B.Tech in Computer Science & Engineering (Final Year)",
      current_skills: "Python, SQL, Technical Writing, Public Speaking, Logic & Argumentation, Data Structures",
      interests: "Patent Law, Intellectual Property, Tech Policy, Software Licensing, Open Source Governance",
      target_industry: "Legal Tech & IP Governance",
      wlb_preference: 8,
      salary_range: "$95,000 - $130,000 / yr"
    }
  },
  {
    id: "lang-tech-nlp",
    title: "Linguistics + AI / Computational Linguist",
    badge: "Multi-Domain",
    description: "Language graduate with coding skills eager to bridge human speech and large language models.",
    input: {
      grade_10th: "88% (State Board, Top marks in English & Regional Language)",
      grade_12th_subjects: "89% in English Literature, Mathematics, Computer Science & History",
      education_level: "B.A. in Linguistics with Minor in Computer Science",
      current_skills: "Phonetics, Syntax Trees, Python, Regex, French (B2), Latin Etymology, Git",
      interests: "Natural Language Processing, Large Language Models, Dialect Preservation, Speech Synthesis",
      target_industry: "Artificial Intelligence & Computational Linguistics",
      wlb_preference: 8,
      salary_range: "$90,000 - $125,000 / yr"
    }
  },
  {
    id: "pure-science-astro",
    title: "Physics + Data / Space Systems",
    badge: "Pure Science",
    description: "Passionate astrophysics enthusiast with analytical data modeling background.",
    input: {
      grade_10th: "94% (ICSE Board, Mathematics & Science 98%)",
      grade_12th_subjects: "95% in Physics, Mathematics, Chemistry & Computer Science",
      education_level: "B.Sc (Hons) in Physics (3rd Year Undergraduate)",
      current_skills: "Mathematical Modeling, Python (NumPy/SciPy), Observational Astronomy, Differential Equations, LaTeX",
      interests: "Exoplanet Detection, Radio Astronomy, Orbital Mechanics, NASA/ESA Open Data, Satellite Sensors",
      target_industry: "Space Technology & Observational Science",
      wlb_preference: 7,
      salary_range: "$80,000 - $115,000 / yr"
    }
  },
  {
    id: "bio-informatics",
    title: "Life Sciences + Informatics",
    badge: "Bio & Tech",
    description: "Biotech major exploring genomic data pipelines and computational pharmacology.",
    input: {
      grade_10th: "89% (Biology & Mathematics 92%)",
      grade_12th_subjects: "91% in Biology, Chemistry, Physics & Mathematics",
      education_level: "B.Sc in Biotechnology & Molecular Biology",
      current_skills: "Molecular Biology, PCR, Python Basics, Statistical Analysis in R, Scientific Literature Review",
      interests: "Genomics, Personalized Medicine, Cancer Genetics, Computational Drug Discovery",
      target_industry: "Biomedical & Life Sciences",
      wlb_preference: 7,
      salary_range: "$85,000 - $120,000 / yr"
    }
  },
  {
    id: "arts-uiux-tech",
    title: "Design + Software / UI/UX Designer",
    badge: "Creative Tech",
    description: "Creative visual thinker with psychology background moving toward software user experience.",
    input: {
      grade_10th: "85% (Fine Arts & English 92%)",
      grade_12th_subjects: "87% in Psychology, English, Multimedia Design & Computer Science",
      education_level: "B.Des in Visual Communication (Graduate)",
      current_skills: "Figma, User Research, Wireframing, Adobe Creative Cloud, Basic HTML/CSS, Typography",
      interests: "Digital Product Design, Cognitive Ergonomics, Human-Computer Interaction, Design Systems",
      target_industry: "Design & Technology",
      wlb_preference: 9,
      salary_range: "$75,000 - $110,000 / yr"
    }
  }
];
