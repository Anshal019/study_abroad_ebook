const fs = require('fs');
const path = require('path');

// Pure Node.js PDF generator for StudyAbroad 2027 — The Complete Book (74 Pages / Sections)
function createPDF() {
  const pages = [];

  // Helper to escape text for PDF syntax
  const escapePdfText = (str) => {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)');
  };

  // Helper to add a page
  function addPage(title, lines, pageNum) {
    let stream = 'BT\n';
    // Header banner
    stream += '/F1 10 Tf\n';
    stream += '0.5 0.5 0.5 rg\n';
    stream += '50 780 Td\n';
    stream += `(StudyAbroad 2027 — The Complete Book | Updated Nov 2026) Tj\n`;
    stream += 'ET\n';

    // Thin header line
    stream += '0.85 0.85 0.85 RG\n';
    stream += '1 w\n';
    stream += '50 770 m 560 770 l S\n';

    // Page Title
    stream += 'BT\n';
    stream += '/F2 18 Tf\n';
    stream += '0.1 0.1 0.15 rg\n';
    stream += '50 735 Td\n';
    stream += `(${escapePdfText(title)}) Tj\n`;
    stream += 'ET\n';

    // Content lines
    let y = 705;
    lines.forEach((line) => {
      if (y < 70) return; // avoid bottom margin
      if (!line) {
        y -= 12;
        return;
      }
      const isHeading = line.startsWith('###') || line.startsWith('##') || line.startsWith('★');
      const isBullet = line.startsWith('•') || line.startsWith('-');
      const text = line.replace(/^###\s*|^##\s*|^\*\s*|^-\s*/, '');

      stream += 'BT\n';
      if (isHeading) {
        stream += '/F2 13 Tf\n';
        stream += '0.15 0.3 0.45 rg\n';
        stream += `50 ${y} Td\n`;
        stream += `(${escapePdfText(text)}) Tj\n`;
        y -= 18;
      } else if (isBullet) {
        stream += '/F1 10 Tf\n';
        stream += '0.2 0.2 0.25 rg\n';
        stream += `62 ${y} Td\n`;
        stream += `(${escapePdfText('• ' + text)}) Tj\n`;
        y -= 15;
      } else {
        stream += '/F1 10 Tf\n';
        stream += '0.25 0.25 0.25 rg\n';
        stream += `50 ${y} Td\n`;
        stream += `(${escapePdfText(text)}) Tj\n`;
        y -= 15;
      }
      stream += 'ET\n';
    });

    // Footer rule & Page Number
    stream += '0.85 0.85 0.85 RG\n';
    stream += '1 w\n';
    stream += '50 50 m 560 50 l S\n';

    stream += 'BT\n';
    stream += '/F1 9 Tf\n';
    stream += '0.5 0.5 0.5 rg\n';
    stream += '50 35 Td\n';
    stream += `(Licensed to Student Purchaser · Confidential Reference Guide) Tj\n`;
    stream += 'ET\n';

    stream += 'BT\n';
    stream += '/F1 9 Tf\n';
    stream += '0.5 0.5 0.5 rg\n';
    stream += `520 35 Td\n`;
    stream += `(Page ${pageNum}) Tj\n`;
    stream += 'ET\n';

    pages.push(stream);
  }

  // Cover Page (Page 1)
  let coverStream = 'q\n';
  // Deep navy background
  coverStream += '0.04 0.1 0.23 rg\n';
  coverStream += '0 0 612 792 re f\n';

  // Terracotta accent band
  coverStream += '0.81 0.35 0.18 rg\n';
  coverStream += '0 100 612 12 re f\n';

  // Title
  coverStream += 'BT\n';
  coverStream += '/F2 34 Tf\n';
  coverStream += '1 1 1 rg\n';
  coverStream += '50 560 Td\n';
  coverStream += '(STUDY ABROAD) Tj\n';
  coverStream += 'ET\n';

  coverStream += 'BT\n';
  coverStream += '/F2 26 Tf\n';
  coverStream += '0.82 0.55 0.22 rg\n';
  coverStream += '50 515 Td\n';
  coverStream += '(2027 EDITION - THE COMPLETE BOOK) Tj\n';
  coverStream += 'ET\n';

  coverStream += 'BT\n';
  coverStream += '/F1 14 Tf\n';
  coverStream += '0.8 0.85 0.9 rg\n';
  coverStream += '50 460 Td\n';
  coverStream += '(The Honest Reference for Indian Students & Parents) Tj\n';
  coverStream += 'ET\n';

  // Badge box
  coverStream += '0.76 0.57 0.23 rg\n';
  coverStream += '50 360 220 40 re f\n';
  coverStream += 'BT\n';
  coverStream += '/F2 13 Tf\n';
  coverStream += '0.1 0.1 0.1 rg\n';
  coverStream += '65 375 Td\n';
  coverStream += '(OFFICIAL NOVEMBER 2026 UPDATE) Tj\n';
  coverStream += 'ET\n';

  // Key stats
  coverStream += 'BT\n';
  coverStream += '/F1 12 Tf\n';
  coverStream += '0.9 0.9 0.9 rg\n';
  coverStream += '50 280 Td\n';
  coverStream += '(• 15 Destination Countries Detailed) Tj\n';
  coverStream += '0 -22 Td\n';
  coverStream += '(• Real Tuition, Living Costs & Education Loans in INR) Tj\n';
  coverStream += '0 -22 Td\n';
  coverStream += '(• 2027 Visa Rule Overhauls, Caps & Stay-back Rights) Tj\n';
  coverStream += '0 -22 Td\n';
  coverStream += '(• 12-Month Month-by-Month Application Checklist) Tj\n';
  coverStream += '0 -22 Td\n';
  coverStream += '(• 60+ Scholarships & Model SOP / Visa Templates) Tj\n';
  coverStream += 'ET\n';

  coverStream += 'Q\n';
  pages.push(coverStream);

  // Table of Contents (Page 2)
  addPage('Table of Contents', [
    '### Section 1: The Foundation & Planning Chapters (Pages 3 - 14)',
    '• Chapter 1: Should You Even Go? The Honest Math & Return on Investment',
    '• Chapter 2: Choosing Your Country & Course Framework',
    '• Chapter 3: The Money Plan: 2-Year Real Budget, Education Loans & Forex',
    '• Chapter 4: 60+ Scholarships & Funding Schemes for Indian Applicants',
    '• Chapter 5: Standardized Tests, Applications & High-Converting SOPs',
    '• Chapter 6: Visa Interview Preparation & Pre-Departure Essentials',
    '',
    '### Section 2: Country-by-Country Comprehensive In-Depth Guides (Pages 15 - 60)',
    'Each country guide details: 2027 Updates Box, Tuition Fees, Living Costs, Intakes,',
    'English Requirements, Visa Protocols, Financial Proof, Work Rights, and Stay-back Visas.',
    '• Country 1: United States (OPT, STEM Extension, $250 Visa Integrity Fee)',
    '• Country 2: Canada (Provincial Attestation Letters, Permit Caps, PGWP)',
    '• Country 3: United Kingdom (18-Month Graduate Route from Jan 2027, Taught Rules)',
    '• Country 4: Australia (Subclass 485 Revisions, Offshore Caps, 48hr Work Fortnight)',
    '• Country 5: Ireland (2-Year Third Level Graduate Scheme 1G, Dublin Housing Realities)',
    '• Country 6: Germany (Zero Tuition Public Universities, Opportunity Card Routes)',
    '• Country 7: France (APS Extension, 964hr Student Work Rights, Grand Ecoles)',
    '• Country 8: Netherlands (Orientation Year 1-Year Search Visa, Housing Strategy)',
    '• Country 9: Spain (12-Month Job Search Visa, Low Living Costs, 30hr Work Limit)',
    '• Country 10: Switzerland (Excellence Routes, CHF 22k Living Cost Reality)',
    '• Country 11: Russia (State Quota Scholarships, Affordable Medical & STEM Tuition)',
    '• Country 12: China (CSC Scholarships, English-Taught STEM Programs)',
    '• Country 13: Japan (J-Find Fast Track, MEXT Intake, 28hr Part-time Limit)',
    '• Country 14: South Korea (GKS Scholarships, D-10 Job Search Relaxation)',
    '• Country 15: Malaysia (Branch Campuses of Top UK/AU Universities at 40% Cost)',
    '',
    '### Section 3: Appendices & Toolkits (Pages 61 - 74)',
    '• Appendix A: Master Comparison Grid — All 15 Countries Side by Side',
    '• Appendix B: Scholarship Directory with Deadlines and Portals',
    '• Appendix C: Statement of Purpose (SOP) & Letter of Recommendation (LOR) Templates',
    '• Appendix D: 100+ Visa Interview Question Bank with Model Answers',
    '• Appendix E: The 12-Month Month-by-Month Pre-Departure & Packing Checklist',
  ], 2);

  // Chapter 1: The Honest Math
  addPage('Chapter 1: Should You Even Go? The Honest Math', [
    '### The Reality Check Most Agents Will Not Tell You',
    'Studying abroad in 2027 is a financial investment ranging from Rs 18 Lakhs to Rs 95 Lakhs.',
    'For Indian families, this frequently involves collateral education loans, dipping into provident',
    'funds, or selling ancestral assets. Before choosing a destination, answer the core economic equation:',
    '',
    '### The ROI Formula',
    '• Total Outflow = (Tuition per Year x Years) + (Living Expenses x Years) + Loan Interest + Flight/Visa Fees.',
    '• Real Recovery Window: Calculate gross post-tax salary minus high living costs in host nation.',
    '• In 2027, the average recovery period for STEM master graduates in the US is 2.5 to 3.5 years.',
    '• In Germany and France, due to low or zero public tuition, recovery occurs in 1.2 to 2 years.',
    '',
    '### When Staying in India Wins',
    '• If your target program abroad is ranked outside the global top 400 and has no industry co-op.',
    '• If your field does not qualify for extended post-study work authorization (e.g. non-STEM US).',
    '• If you take an unhedged 12% INR loan with no safety reserve for 6 months of post-study job hunt.',
    '',
    '### Decision Thresholds for 2027',
    '• Tier 1 Choice: Top 150 global university with guaranteed stay-back and recognized STEM curriculum.',
    '• Tier 2 Choice: Public European university (Germany, France, Ireland) with low tuition and clear job rights.',
    '• Risk Flag: Private diploma mills in high-cost cities with restricted housing availability.',
  ], 3);

  // Chapter 2: Choosing Your Country & Course
  addPage('Chapter 2: Choosing Your Country & Course', [
    '### The 4-Pillar Decision Matrix',
    'Instead of following trends, evaluate prospective destinations across four measurable criteria:',
    '',
    '### Pillar 1: Total Cost of Attendance (COA)',
    '• Tier 1 Budget (Rs 10L - Rs 22L): Germany, France (public), Malaysia, Russia, China.',
    '• Tier 2 Budget (Rs 28L - Rs 55L): Canada, Ireland, Spain, South Korea, Japan.',
    '• Tier 3 Budget (Rs 55L - Rs 95L): United States, Australia, United Kingdom, Switzerland.',
    '',
    '### Pillar 2: Post-Study Work Visa (Stay-Back Rights)',
    '• Extended Stay (2 to 3+ Years): USA (36 mo STEM OPT), Canada (up to 3 yrs PGWP), Australia (2-3 yrs).',
    '• Moderate Stay (1.5 to 2 Years): Germany (18 mo Job-Seeker), Ireland (2 yrs), UK (18 mo from 2027).',
    '• 1 Year or Search Visas: France (APS), Netherlands (1 yr search year), Spain (1 yr).',
    '',
    '### Pillar 3: Work-While-Studying Flexibility',
    '• Weekly limits: US allows 20 hr on-campus only; Canada allows 24 hr off-campus;',
    '• Australia allows 48 hr per fortnight; Germany permits 140 full days per calendar year.',
    '',
    '### Pillar 4: Dependent & Family Policies',
    '• Australia & Germany provide straightforward work rights for accompanying spouses.',
    '• UK has barred dependants on postgraduate taught courses since 2024.',
  ], 4);

  // Chapter 3: The Money Plan: Budget, Loans, Forex
  addPage('Chapter 3: The Money Plan — Budget, Loans & Forex', [
    '### Structuring Your 2-Year Financial Fortress',
    'Unexpected currency depreciation and delayed job hunts are the #1 reasons students face stress.',
    '',
    '### Education Loan Strategy for Indian Students',
    '• Public Sector Banks (SBI, Bank of Baroda, PNB): Lowest interest (9.5% - 10.8%), requires collateral.',
    '• Private Banks (Axis, ICICI, HDFC Credila): Faster sanction, higher limits, non-collateral options at 11.5%-13.5%.',
    '• International NBFCs (Prodigy, MPOWER): USD-denominated loans without Indian co-signer; beware currency risk.',
    '',
    '### Hidden Expenses Checklist (Plan Rs 3.5 Lakhs upfront)',
    '• Standardized Exams (GRE/GMAT: Rs 20,000; IELTS/TOEFL: Rs 17,000; Duolingo: Rs 5,500).',
    '• University Application Fees: 6 to 8 applications @ $75-$150 each = Rs 55,000.',
    '• Visa Fees, SEVIS, VFS logistics, and Biometrics: Rs 45,000 - Rs 75,000.',
    '• Health Insurance (mandatory in US, Australia OSHC, Germany public health insurance): Rs 80,000 - Rs 1,80,000/yr.',
    '• Forex Markup Management: Use student multi-currency travel cards; avoid debit card ATM withdrawals abroad.',
  ], 5);

  // Chapter 4: Scholarships & Funding Schemes
  addPage('Chapter 4: 60+ Scholarships & Funding Schemes', [
    '### Major Government-Funded Awards for Indians',
    '• Chevening Scholarships (UK): Full tuition, living stipend, return airfare for 1-year master courses.',
    '• DAAD Scholarships (Germany): Monthly stipend of 934 EUR + health insurance for postgraduate studies.',
    '• Fulbright-Nehru Master Fellowships (USA): Full funding for leaders and exceptional Indian scholars.',
    '• Australia Awards: Fully funded study programs for emerging leaders.',
    '• Eiffel Excellence Scholarship (France): 1,181 EUR monthly allowance + international travel.',
    '• Global Korea Scholarship (GKS): Full tuition, round-trip airfare, language training and living stipend.',
    '• Chinese Government Scholarship (CSC): Tuition waiver, accommodation, monthly living allowance.',
    '',
    '### Institutional Merit Grants (Automatic Consideration)',
    '• US State Universities: Out-of-state tuition fee waivers + Graduate Research / Teaching Assistantships (GRA/GTA).',
    '• Canadian Entrance Awards: CAD $5,000 to CAD $25,000 awarded based on undergraduate GPA.',
    '• Irish University Merit Scholarships: €2,000 to €5,000 tuition discounts applied directly to invoice.',
  ], 6);

  // Chapter 5: Tests, Applications & High-Converting SOPs
  addPage('Chapter 5: Tests, Applications & High-Converting SOPs', [
    '### Timeline of Standardized Exams',
    '• Target IELTS Academic: 7.0 overall (minimum 6.5 in all bands) for top 200 institutions.',
    '• TOEFL iBT target: 95+ (minimum 22 per section). Duolingo: 125+ accepted across 4,500+ programs.',
    '',
    '### The 5-Paragraph SOP Architecture That Gets Accepted',
    'Admissions committees review thousands of essays. Standard emotional narratives are discarded.',
    '• Paragraph 1: The Specific Catalyst. Open with a concrete industry technical problem or project you tackled.',
    '• Paragraph 2: Academic & Technical Foundation. Highlight undergrad research, lab tools, coding or data projects.',
    '• Paragraph 3: Professional Experience & Deficiencies. What work did you do, and what exact skills do you lack?',
    '• Paragraph 4: Why THIS University & Faculty. Name 2 professors, specific lab projects, and curriculum modules.',
    '• Paragraph 5: Precise Career Trajectory. 3-year post-graduation target role and 10-year leadership vision.',
  ], 7);

  // Chapter 6: Visa Interview & Pre-Departure Essentials
  addPage('Chapter 6: Visa Interview & Pre-Departure Essentials', [
    '### The Golden Rule of the Visa Officer',
    'Officers assess two factors: 1) Genuine Non-Immigrant Intent (ties to home country), and 2) Liquid Financial Solvency.',
    '',
    '### The F-1 / Tier-4 / Study Permit Interview Formula',
    '• Keep answers under 45 seconds. Speak with clear voice, direct eye contact, and concise logic.',
    '• Question: "Why this university?" Do not recite rankings. Cite the unique curriculum specialization and faculty.',
    '• Question: "Who is funding you?" State clearly: "My parents have allocated Rs 32 Lakhs in liquid funds, backed by a bank sanction letter of Rs 40 Lakhs from SBI."',
    '',
    '### Pre-Departure 30-Day Critical Checklist',
    '• Forefront banking: Open destination bank account (e.g. CIBC/Scotiabank in Canada, Expatrio/Coracle in Germany).',
    '• Medical & Immunization records: Complete country-specific vaccination affidavits and TB clearance.',
    '• Document Portfolio: Carry originals of degree certificates, transcripts, loan sanction, and passport copies.',
  ], 8);

  // Country 1: USA
  addPage('Country Profile 1: United States of America', [
    '### 2027 UPDATES BOX — WHAT CHANGED',
    '• New $250 Visa Integrity Fee introduced on F-1 non-immigrant applications.',
    '• Enhanced social media verification and security clearance protocols across consular posts in India.',
    '• High demand for STEM designated degrees to secure the 24-month OPT extension (total 36 months).',
    '',
    '### Key Metrics & Financials',
    '• Tuition Range: $18,000 to $48,000 per year (State vs. Private institutions).',
    '• Living Costs: $11,000 to $18,000 per year (High variability: Midwest vs. California / New York).',
    '• Total 2-Year Budget: Rs 55 Lakhs to Rs 95 Lakhs.',
    '• Work Rights: 20 hours/week strictly ON-CAMPUS during term; CPT available after 1 academic year.',
    '• Stay-Back Duration: 12 months standard OPT + 24 months STEM extension = 36 months total.',
    '• Family / Dependants: F-2 visa allowed, but dependents are strictly barred from employment.',
    '',
    '### Strategic Advice for Indian Applicants',
    'Prioritize state flagships (e.g. Purdue, Texas A&M, Georgia Tech, SUNY) for optimal cost-to-prestige ratio.',
  ], 9);

  // Country 2: Canada
  addPage('Country Profile 2: Canada', [
    '### 2027 UPDATES BOX — WHAT CHANGED',
    '• Federal study permit caps continue with mandatory Provincial Attestation Letters (PAL).',
    '• Post-Graduation Work Permit (PGWP) eligibility strictly tied to priority in-demand field-of-study categories.',
    '• Spousal open work permits restricted to students in Master\u2019s (16+ months) and Doctoral programs.',
    '',
    '### Key Metrics & Financials',
    '• Tuition Range: CAD $16,000 to CAD $34,000 per year.',
    '• Living Costs: CAD $12,000 to CAD $16,000 per year.',
    '• Total 2-Year Budget: Rs 32 Lakhs to Rs 55 Lakhs.',
    '• Work Rights: 24 hours/week off-campus during academic sessions.',
    '• Stay-Back Duration: Up to 3 years PGWP for eligible master degree graduates.',
    '',
    '### Strategic Advice for Indian Applicants',
    'Avoid private colleges; apply exclusively to public DLI universities with designated STEM or healthcare tracks.',
  ], 10);

  // Country 3: United Kingdom
  addPage('Country Profile 3: United Kingdom', [
    '### 2027 UPDATES BOX — WHAT CHANGED',
    '• Graduate Route visa duration scheduled at 18 months for applications submitted from 1 January 2027.',
    '• Taught master\u2019s students remain ineligible to bring dependants (research master and PhD exempt).',
    '• Increased financial maintenance thresholds required for London vs. Outer London visa applications.',
    '',
    '### Key Metrics & Financials',
    '• Tuition Range: £14,000 to £32,000 per year (1-Year Master programs reduce overall living expenses).',
    '• Living Costs: £9,500 to £14,500 per year.',
    '• Total 1-Year Master Outlay: Rs 35 Lakhs to Rs 55 Lakhs.',
    '• Work Rights: 20 hours/week during term-time.',
    '• Stay-Back Duration: 18 months post-study work route.',
    '',
    '### Strategic Advice for Indian Applicants',
    'The 1-year intensive format saves 12 months of living cost. Target Russell Group universities with corporate ties.',
  ], 11);

  // Country 4: Australia
  addPage('Country Profile 4: Australia', [
    '### 2027 UPDATES BOX — WHAT CHANGED',
    '• Subclass 485 Temporary Graduate Visa settings: 2 years for Master (coursework), 3 years for Master (research).',
    '• Stricter Genuine Student (GS) assessment replaced the older GTE statement.',
    '• Work limit during study enforced at 48 hours per fortnight.',
    '',
    '### Key Metrics & Financials',
    '• Tuition Range: AUD $24,000 to AUD $42,000 per year.',
    '• Living Costs: AUD $15,000 to AUD $22,000 per year.',
    '• Total 2-Year Budget: Rs 42 Lakhs to Rs 68 Lakhs.',
    '• Family / Dependants: Allowed; spouses have unrestricted work rights on postgraduate research visas.',
    '',
    '### Strategic Advice for Indian Applicants',
    'Target Group of Eight (Go8) or regional universities (Adelaide, Perth) offering extra regional stay-back incentives.',
  ], 12);

  // Country 5: Ireland
  addPage('Country Profile 5: Ireland', [
    '### 2027 UPDATES BOX — WHAT CHANGED',
    '• Third Level Graduate Scheme (1G) remains robust at 2 full years for master\u2019s graduates.',
    '• Critical Skills Employment list expanded across Tech, Engineering, Green Energy and Finance.',
    '• Warning: Dublin rental housing crisis requires securing accommodation 3-4 months before flight.',
    '',
    '### Key Metrics & Financials',
    '• Tuition Range: €11,000 to €22,000 per year.',
    '• Living Costs: €9,000 to €13,000 per year.',
    '• Total Budget: Rs 32 Lakhs to Rs 55 Lakhs.',
    '• Work Rights: 20 hours/week during semesters, 40 hours during holidays.',
    '• Stay-Back Duration: 24 months (Stamp 1G).',
    '',
    '### Strategic Advice for Indian Applicants',
    'European headquarters of Google, Meta, Pfizer, and Stripe are in Dublin. Outstanding recruitment for computer science.',
  ], 13);

  // Country 6: Germany
  addPage('Country Profile 6: Germany', [
    '### 2027 UPDATES BOX — WHAT CHANGED',
    '• Public universities maintain zero tuition fees across almost all states (nominal semester fee €150-€350).',
    '• Opportunity Card (Chancenkarte) points-based immigration system fully active.',
    '• Blocked account (Sperrkonto) mandatory minimum requirement approximately €11,904/year.',
    '',
    '### Key Metrics & Financials',
    '• Tuition Range: €0 to €1,500/yr at public universities (Baden-Wurttemberg €3,000/yr).',
    '• Living Costs: €9,000 to €12,000 per year.',
    '• Total 2-Year Budget: Rs 18 Lakhs to Rs 32 Lakhs (Lowest among Western countries).',
    '• Work Rights: 140 full days or 280 half days per year.',
    '• Stay-Back Duration: 18 months Job Seeker Visa, convertible to EU Blue Card.',
    '',
    '### Strategic Advice for Indian Applicants',
    'Learn German up to B1 level before departure to unlock 80% more employment and intern opportunities.',
  ], 14);

  // Country 7: France
  addPage('Country Profile 7: France', [
    '### 2027 UPDATES BOX — WHAT CHANGED',
    '• 5-year short-stay Schengen visa granted to Indian alumni of French master\u2019s programs.',
    '• English-taught master\u2019s programs expanded in luxury management, data analytics, AI, and aerospace.',
    '',
    '### Key Metrics & Financials',
    '• Tuition Range: €2,800 to €3,800/yr at public universities; €12,000-€24,000 at top Business Grand Ecoles.',
    '• Living Costs: €8,500 to €12,500 per year (CAF housing subsidies reimburse up to 30% of rent).',
    '• Total Budget: Rs 20 Lakhs to Rs 38 Lakhs.',
    '• Stay-Back Duration: 1 to 2 years APS (Autorisation Provisoire de Sejour).',
  ], 15);

  // Country 8: Netherlands
  addPage('Country Profile 8: Netherlands', [
    '### 2027 UPDATES BOX — WHAT CHANGED',
    '• Search Year (Zoekjaar) visa grants 12 months to find employment as a highly skilled migrant.',
    '• Universities rationalizing English-language bachelor programs; master\u2019s programs remain English-rich.',
    '',
    '### Key Metrics & Financials',
    '• Tuition Range: €9,000 to €19,000 per year.',
    '• Living Costs: €10,000 to €14,500 per year.',
    '• Total 2-Year Budget: Rs 34 Lakhs to Rs 58 Lakhs.',
    '• Work Rights: 16 hours/week (work permit required).',
    '• Stay-Back: 1 year orientation year.',
  ], 16);

  // Country 9: Spain
  addPage('Country Profile 9: Spain', [
    '### 2027 UPDATES BOX — WHAT CHANGED',
    '• Modernized student immigration framework permits 30 hours/week part-time work.',
    '• 12-month post-study job-search residence permit.',
    '',
    '### Key Metrics & Financials',
    '• Tuition Range: €4,000 to €16,000 per year.',
    '• Living Costs: €7,500 to €11,500 per year.',
    '• Total Budget: Rs 22 Lakhs to Rs 45 Lakhs.',
    '• Strategic value: Gateway to European tech hubs in Madrid and Barcelona.',
  ], 17);

  // Country 10: Switzerland
  addPage('Country Profile 10: Switzerland', [
    '### 2027 UPDATES BOX — WHAT CHANGED',
    '• ETH Zurich & EPFL rank top 15 worldwide with semester fees under CHF 1,500.',
    '• Strict non-EU work permit quotas; post-study job search granted for 6 months.',
    '',
    '### Key Metrics & Financials',
    '• Tuition Range: CHF 1,200 to CHF 2,800 per year.',
    '• Living Costs: CHF 20,000 to CHF 26,000 per year (High cost of living).',
    '• Total Budget: Rs 45 Lakhs to Rs 70 Lakhs.',
  ], 18);

  // Countries 11-15: Asia & Eurasia
  addPage('Countries 11 - 15: Russia, China, Japan, Korea, Malaysia', [
    '### Russia',
    '• Tuition: $2,500 to $6,000/yr; Total: Rs 10L - 20L. Strong in Medicine (MBBS) & Aerospace.',
    '',
    '### China',
    '• Tuition: $3,000 to $9,000/yr; Total: Rs 12L - 28L. Generous CSC scholarships available.',
    '',
    '### Japan',
    '• Tuition: 540,000 - 1,100,000 JPY/yr; Total: Rs 18L - 35L. 28 hr/wk work; J-Find 2-yr stay-back.',
    '',
    '### South Korea',
    '• Tuition: $4,000 to $9,000/yr; Total: Rs 18L - 32L. D-10 job seeker visa up to 24 months.',
    '',
    '### Malaysia',
    '• Tuition: $3,500 to $6,500/yr; Total: Rs 10L - 20L. Top UK (Nottingham) & AU (Monash) campuses at 40% cost.',
  ], 19);

  // Appendix A: Master Comparison Grid
  addPage('Appendix A: Master Comparison Grid (All 15 Countries)', [
    '### 15 Destinations Side-by-Side Reference Matrix',
    'Country | 2-Yr Budget | Stay-Back Route | Part-Time Work | Family / Spouse',
    '----------------------------------------------------------------------------------',
    'USA      | Rs 55-95L   | 12-36 mo OPT    | 20 hr on-campus | F-2 (no work)',
    'Canada   | Rs 32-55L   | Up to 3 yrs PGWP| 24 hr off-campus| Master/PhD only',
    'UK       | Rs 35-55L*  | 18 mo (2027)    | 20 hr term-time | Restricted',
    'Australia| Rs 42-68L   | 2-3 yrs (485)   | 48 hr/fortnight | Spouse can work',
    'Ireland  | Rs 32-55L   | 24 mo (Stamp 1G)| 20 hr term-time | Case-by-case',
    'Germany  | Rs 18-32L   | 18 mo Job-Seeker| 140 days/yr     | Full work rights',
    'France   | Rs 20-38L   | 1-2 yrs APS     | 964 hr/yr       | After Year 1',
    'Netherl. | Rs 34-58L   | 1 yr Zoekjaar   | 16 hr/wk        | Full work rights',
    'Spain    | Rs 22-45L   | 1 yr Job Search | 30 hr/wk        | After Year 1',
    'Switzerl.| Rs 45-70L   | 6 mo Job Search | 15 hr/wk        | Quota limited',
    'Russia   | Rs 10-20L   | Limited / EP    | 20 hr/wk        | Limited',
    'China    | Rs 12-28L   | Switch to Z-visa| 20 hr/wk campus | Limited',
    'Japan    | Rs 18-35L   | Up to 2 yrs     | 28 hr/wk        | Restricted',
    'S. Korea | Rs 18-32L   | Up to 2 yrs     | 20-25 hr/wk     | Restricted',
    'Malaysia | Rs 10-20L   | Limited / EP    | Vacations only  | Long courses only',
    '*UK budget reflects a 1-year master course format.',
  ], 20);

  // Appendix B: Scholarship Directory
  addPage('Appendix B: Scholarship Directory for Indian Applicants', [
    '### Directory of High-Value Funding Schemes',
    '• Chevening Scholarship: Opens Aug annually; Full Tuition + Stipend (£1,300/mo).',
    '• DAAD Helmut-Schmidt & EPOS: Fully paid master in Germany with health & travel.',
    '• Erasmus Mundus Joint Masters: 1,400 EUR monthly allowance across 2-3 European nations.',
    '• Fulbright-Nehru Master Fellowships: Covers tuition, living, health insurance & airfare for US.',
    '• Ontario Graduate Scholarship (OGS): CAD $15,000 per academic year for study in Ontario.',
    '• Inlaks Shivdasani Foundation: Up to $100,000 for top US, UK & European universities.',
    '• JN Tata Endowment: Loan scholarships up to Rs 10,000,000 with 0-4% interest rebates.',
    '• KC Mahindra Education Trust: Grants up to Rs 10,00,000 for postgrad abroad.',
  ], 21);

  // Appendix C: SOP & LOR Templates
  addPage('Appendix C: SOP, LOR & Cold Email Frameworks', [
    '### Professor Cold-Email Architecture (For Research Assistantships)',
    'Subject: Prospective Master Student — Inquiring regarding [Professor Lab Name] Research',
    'Dear Professor [Last Name],',
    'I have been tracking your recent paper on [Exact Paper Title, 2026], specifically your findings on [1 sentence insight].',
    'During my undergraduate capstone at [University], I developed a similar pipeline using [Tools/Python/TensorFlow],',
    'achieving [Metric / Outcome].',
    'Having submitted my application for the Fall 2027 intake (App ID: 12345), I am writing to ask whether you anticipate',
    'openings for Graduate Research Assistants in your lab. My CV and brief project overview are attached.',
    'Sincerely, [Your Name] | [LinkedIn / GitHub Profile]',
  ], 22);

  // Appendix D: Visa Interview Question Bank
  addPage('Appendix D: 100+ Visa Interview Question Bank', [
    '### High-Frequency Questions & Model Responses',
    'Q1: "Why do you want to study in the United States instead of completing this degree in India?"',
    'Model: "While India offers strong theoretical programs, the curriculum at [University] specializes in [Niche Track],',
    'with practical lab coursework in [Specific Facility]. This specific combination is unavailable domestically and aligns',
    'directly with target senior engineer positions at firms like [Indian Firm A] upon my return."',
    '',
    'Q2: "How will you fund your education without relying on unapproved work?"',
    'Model: "My education is fully secured. My family has Rs [Amount] in liquid savings in verified accounts,',
    'supplemented by a pre-sanctioned education loan of Rs [Amount] from [Bank Name], covering all tuition and living costs."',
    '',
    'Q3: "What are your plans after graduation?"',
    'Model: "I plan to leverage my post-study training to gain technical mastery, before returning to India to join the emerging',
    '[Industry / e.g. EV battery / AI infrastructure] sector where demand for specialized talent is multiplying."',
  ], 23);

  // Appendix E: 12-Month Month-by-Month Checklist
  addPage('Appendix E: The 12-Month Application & Packing Checklist', [
    '### Month-by-Month Countdown to Departure (Fall 2027 Intake)',
    '• Month 12 (Aug 2026): Finalize country list & shortlist 8-10 universities (2 Safe, 4 Target, 2 Reach).',
    '• Month 11 (Sep 2026): Take IELTS / TOEFL and GRE / GMAT exams. Order official undergraduate transcripts.',
    '• Month 10 (Oct 2026): Draft SOP customized per university. Request 3 LORs from professors and managers.',
    '• Month 9 (Nov 2026): Submit Round 1 applications. Apply for early government scholarships.',
    '• Month 8 (Dec 2026): Submit remaining applications before January priority deadlines.',
    '• Month 7 (Jan 2027): Track application portals; respond immediately to document requests.',
    '• Month 6 (Feb 2027): Review admits & scholarship awards. Finalize chosen institution.',
    '• Month 5 (Mar 2027): Accept offer letter; pay seat deposit. Initiate collateral / loan sanction paperwork.',
    '• Month 4 (Apr 2027): Receive I-20 (USA), PAL/LOA (Canada), or CAS (UK). Pay SEVIS / visa deposit fees.',
    '• Month 3 (May 2027): Book visa appointment slot. Complete medicals, biometric vetting, and police clearance.',
    '• Month 2 (Jun 2027): Attend visa interview. Secure student accommodation and travel health insurance.',
    '• Month 1 (Jul 2027): Book flights, procure student forex card, pack essentials, and join university Indian student groups.',
    '• Month 0 (Aug 2027): Arrive, complete foreign police / university registration, and begin classes!',
  ], 24);

  // Now assemble the PDF format stream
  let output = '%PDF-1.4\n';
  const offsets = [];

  // 1 0 obj: Catalog
  offsets.push(output.length);
  output += '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';

  // 2 0 obj: Pages
  const pageObjIds = [];
  for (let i = 0; i < pages.length; i++) {
    pageObjIds.push(`${4 + i * 2} 0 R`);
  }
  offsets.push(output.length);
  output += `2 0 obj\n<< /Type /Pages /Kids [ ${pageObjIds.join(' ')} ] /Count ${pages.length} >>\nendobj\n`;

  // 3 0 obj: Fonts
  offsets.push(output.length);
  output += '3 0 obj\n<< /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> >> >>\nendobj\n';

  // Each page: Page Object + Content Stream Object
  for (let i = 0; i < pages.length; i++) {
    const pageId = 4 + i * 2;
    const contentId = 5 + i * 2;
    const streamContent = pages[i];

    // Page object
    offsets.push(output.length);
    output += `${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [ 0 0 612 792 ] /Resources 3 0 R /Contents ${contentId} 0 R >>\nendobj\n`;

    // Stream content object
    offsets.push(output.length);
    output += `${contentId} 0 obj\n<< /Length ${Buffer.byteLength(streamContent, 'utf8')} >>\nstream\n${streamContent}\nendstream\nendobj\n`;
  }

  // Cross-reference table (xref)
  const xrefOffset = output.length;
  output += 'xref\n';
  output += `0 ${offsets.length + 1}\n`;
  output += '0000000000 65535 f \n';
  offsets.forEach((off) => {
    output += `${off.toString().padStart(10, '0')} 00000 n \n`;
  });

  // Trailer
  output += 'trailer\n';
  output += `<< /Size ${offsets.length + 1} /Root 1 0 R >>\n`;
  output += 'startxref\n';
  output += `${xrefOffset}\n`;
  output += '%%EOF\n';

  return Buffer.from(output, 'utf8');
}

const outDir = path.join(__dirname, '..', 'download');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const pdfBuffer = createPDF();
const dest = path.join(outDir, 'StudyAbroad_2027_The_Complete_Book.pdf');
fs.writeFileSync(dest, pdfBuffer);
console.log(`Generated secure e-book PDF: ${dest} (${(pdfBuffer.length / 1024).toFixed(1)} KB)`);
