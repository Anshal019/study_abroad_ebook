// ─────────────────────────────────────────────────────────────
// StudyAbroad 2027 — single source of truth for all page copy.
// Facts verified against official/announced rules (Nov 2026):
//  - UK Graduate Route: 18 months for applications from 1 Jan 2027 (gov.uk)
//  - US: $250 Visa Integrity Fee on most nonimmigrant visas incl. F-1
//  - Canada: study-permit caps + PAL; PGWP field-of-study lists
//  - Australia: subclass 485 = 2–3 yrs; offshore applications from Oct 2026
// ─────────────────────────────────────────────────────────────

export type Country = {
  code: string // flag file name in /public/flags
  name: string
  tuition: string // per year, international student
  living: string // per year
  stayBack: string
  work: string // part-time work while studying
  family: string // dependants / family
  total: string // typical total for a 2-year programme
  change: string // what changed for 2027
}

export const COUNTRIES: Country[] = [
  {
    code: 'us',
    name: 'USA',
    tuition: '$18k–45k / yr',
    living: '$10k–17k / yr',
    stayBack: '12 mo OPT (+24 mo STEM)',
    work: '20 hr/wk on-campus',
    family: 'F-2 visa (spouse cannot work)',
    total: '₹55–95 L',
    change: 'New $250 Visa Integrity Fee on F-1 visas; expanded social-media vetting',
  },
  {
    code: 'ca',
    name: 'Canada',
    tuition: 'CAD 16k–32k / yr',
    living: 'CAD 10k–15k / yr',
    stayBack: 'PGWP up to 3 yrs',
    work: '24 hr/wk off-campus',
    family: 'Spouse open permit: master\u2019s / PhD only',
    total: '₹32–55 L',
    change: 'Permit caps + PAL letters continue; PGWP tied to field-of-study lists',
  },
  {
    code: 'gb',
    name: 'UK',
    tuition: '£14k–30k / yr',
    living: '£9k–14k / yr',
    stayBack: '18 mo Graduate Route (from 1 Jan 2027)',
    work: '20 hr/wk term-time',
    family: 'No dependants on taught courses',
    total: '₹40–70 L',
    change: 'Graduate Route cut from 2 yrs to 18 months for 2027 applicants',
  },
  {
    code: 'au',
    name: 'Australia',
    tuition: 'AUD 22k–40k / yr',
    living: 'AUD 14k–21k / yr',
    stayBack: '2–3 yrs (subclass 485)',
    work: '48 hr / fortnight',
    family: 'Dependants allowed (partner can work)',
    total: '₹40–65 L',
    change: 'Apply from offshore from Oct 2026; planning caps + stricter screening',
  },
  {
    code: 'ie',
    name: 'Ireland',
    tuition: '€10k–22k / yr',
    living: '€8k–12k / yr',
    stayBack: '2 yrs (Third Level 1G)',
    work: '20 hr/wk term-time',
    family: 'Spouse schemes: limited cases',
    total: '₹32–55 L',
    change: '2-yr stay-back unchanged; Dublin housing remains the key risk',
  },
  {
    code: 'de',
    name: 'Germany',
    tuition: '€0–500 / yr (public)',
    living: '€9k–12k / yr',
    stayBack: '18 mo job-seeker permit',
    work: '140 full days / yr',
    family: 'Spouse can work full-time',
    total: '₹18–32 L',
    change: 'Opportunity Card points route expands; public tuition still €0',
  },
  {
    code: 'fr',
    name: 'France',
    tuition: '€2.8k–3.8k / yr (public)',
    living: '€8k–12k / yr',
    stayBack: '1–2 yrs APS',
    work: '964 hr / yr part-time',
    family: 'Spouse joins after year 1',
    total: '₹20–35 L',
    change: 'APS stay-back being extended for master\u2019s graduates',
  },
  {
    code: 'nl',
    name: 'Netherlands',
    tuition: '€8k–18k / yr',
    living: '€10k–14k / yr',
    stayBack: '1 yr orientation year',
    work: '16 hr/wk part-time',
    family: 'Spouse can work full-time',
    total: '₹32–55 L',
    change: 'Orientation year unchanged; housing shortage stays issue #1',
  },
  {
    code: 'es',
    name: 'Spain',
    tuition: '€4k–15k / yr',
    living: '€8k–12k / yr',
    stayBack: '12 mo job-search visa',
    work: '30 hr/wk part-time',
    family: 'Family reunification after year 1',
    total: '₹22–45 L',
    change: 'Job-search visa continues; part-time market keeps growing',
  },
  {
    code: 'ch',
    name: 'Switzerland',
    tuition: 'CHF 1.2k–2.4k / sem',
    living: 'CHF 20k–26k / yr',
    stayBack: '6 mo job-search permit',
    work: '15 hr/wk during term',
    family: 'Spouse: case-by-case',
    total: '₹45–70 L',
    change: 'Work-permit quotas unchanged; semester fees rise slightly',
  },
  {
    code: 'ru',
    name: 'Russia',
    tuition: '$2k–6k / yr',
    living: '$3k–5k / yr',
    stayBack: 'Limited (case-by-case)',
    work: '20 hr/wk',
    family: 'Limited',
    total: '₹10–20 L',
    change: 'Government quota scholarships for Indian students continue',
  },
  {
    code: 'cn',
    name: 'China',
    tuition: '$3k–9k / yr',
    living: '$4k–8k / yr',
    stayBack: 'Limited (switch to Z visa)',
    work: '20 hr/wk campus rules',
    family: 'Limited',
    total: '₹12–28 L',
    change: 'CSC scholarship intake widens; STEM & MBA seats grow',
  },
  {
    code: 'jp',
    name: 'Japan',
    tuition: '¥540k–1.1M / yr',
    living: '¥900k–1.4M / yr',
    stayBack: 'Job-hunt visa up to 2 yrs',
    work: '28 hr/wk',
    family: 'Dependants: limited',
    total: '₹18–35 L',
    change: 'J-Find pathway open for top-100 university graduates',
  },
  {
    code: 'kr',
    name: 'South Korea',
    tuition: '$4k–9k / yr',
    living: '$6k–10k / yr',
    stayBack: 'D-10 job-seeker up to 2 yrs',
    work: '20–25 hr/wk',
    family: 'F-3 dependants: limited',
    total: '₹18–32 L',
    change: 'GKS scholarship intake widens; D-10 rules relaxed',
  },
  {
    code: 'my',
    name: 'Malaysia',
    tuition: '$3k–6k / yr',
    living: '$3k–5k / yr',
    stayBack: 'Limited (EP route)',
    work: 'Part-time in breaks',
    family: 'Dependants on long courses',
    total: '₹10–20 L',
    change: 'EMGS processing digitised; UK/AU branch campuses grow',
  },
]

export const FLAG_MARQUEE = COUNTRIES // exact 15, in order, no duplicates

// ── What's inside ────────────────────────────────────────────

export const START_CHAPTERS = [
  { n: 1, title: 'Should you even go? The honest math', desc: 'Cost vs. outcome, return on investment, and when staying back in India wins.' },
  { n: 2, title: 'Choosing your country & course', desc: 'A decision framework that weighs cost, stay-back, work rights and family.' },
  { n: 3, title: 'The money plan: budget, loans, forex', desc: 'Build a realistic 2-year budget and pick the right education loan.' },
  { n: 4, title: 'Scholarships & funding for Indians', desc: '60+ schemes: university awards, CSC, GKS, DAAD, Chevening and more.' },
  { n: 5, title: 'Tests, applications & SOPs', desc: 'IELTS / TOEFL / PTE / Duolingo targets, timelines and SOP structure.' },
  { n: 6, title: 'Visa interview & pre-departure', desc: 'Financial proof, interview question bank, forex, insurance, packing.' },
]

export const APPENDICES = [
  { n: 'A', title: 'Master comparison table — all 15 countries', desc: 'One table: tuition, living cost, work rights, stay-back, family rules.' },
  { n: 'B', title: 'Scholarship directory for Indian students', desc: 'Deadlines, amounts and eligibility for 60+ funding schemes.' },
  { n: 'C', title: 'SOP, LOR & email templates', desc: 'Copy-paste frameworks that admissions officers actually read.' },
  { n: 'D', title: 'Visa interview question bank', desc: '100+ real questions with model answers, country by country.' },
  { n: 'E', title: 'Pre-departure & packing checklist', desc: 'A 12-month, month-by-month checklist from offer letter to landing.' },
]

export const COUNTRY_TOPICS = [
  '2027 UPDATES box — what changed',
  'Why choose this country',
  'Tuition fees & scholarships',
  'Living costs by city',
  'Intakes & application timeline',
  'English tests & minimum scores',
  'Documents, SOP & LORs',
  'Student visa step-by-step',
  'Financial proof & funds',
  'Part-time work rules',
  'Stay-back & work visa routes',
  'Top universities & courses',
]

// ── Pick the right country ───────────────────────────────────

export type ChipKey = 'cost' | 'stayback' | 'work' | 'family'

export const CHIPS: { key: ChipKey; label: string }[] = [
  { key: 'cost', label: 'Lowest cost' },
  { key: 'stayback', label: 'Best stay-back' },
  { key: 'work', label: 'Work while studying' },
  { key: 'family', label: 'Family can join' },
]

// Ranked recommendation per filter (first = strongest pick)
export const CHIP_RANKS: Record<ChipKey, string[]> = {
  cost: ['Germany', 'Malaysia', 'France', 'Russia', 'China', 'South Korea'],
  stayback: ['Canada', 'USA', 'Australia', 'Germany', 'UK'],
  work: ['Germany', 'Canada', 'Australia', 'France', 'Ireland'],
  family: ['Germany', 'Australia', 'Netherlands', 'Canada', 'Spain'],
}

export function factFor(c: Country, key: ChipKey): string {
  switch (key) {
    case 'cost':
      return `≈ ${c.total} total · ${c.tuition}`
    case 'stayback':
      return c.stayBack
    case 'work':
      return c.work
    case 'family':
      return c.family
  }
}

// ── Preview tables ───────────────────────────────────────────

export const PREVIEW_VISIBLE = 5 // rows shown before the frosted overlay

// ── Who is this for ──────────────────────────────────────────

export const AUDIENCES = [
  {
    icon: 'student',
    title: 'Students',
    line: 'Planning a 2027–28 intake and want one clear plan — not 50 confusing YouTube videos.',
  },
  {
    icon: 'parent',
    title: 'Parents',
    line: 'Want to verify costs, safety and stay-back rules before committing family savings.',
  },
  {
    icon: 'comparer',
    title: 'Comparers',
    line: 'Torn between 2–3 countries and need honest side-by-side numbers to decide.',
  },
]

// ── Pricing ──────────────────────────────────────────────────

export const PRICING_CHECKLIST = [
  '74-page PDF — instant download after payment',
  '15 country chapters, each with a 2027 UPDATES box',
  '12-month month-by-month application checklist',
  'Budget worksheets + total-cost calculator',
  'Scholarship directory for Indian students',
  'SOP, LOR & visa-interview templates',
]

// ── FAQ ──────────────────────────────────────────────────────

export const FAQS = [
  {
    q: 'Is this a printed book?',
    a: 'No. It\u2019s a 74-page PDF ebook. You download it instantly after payment and can read it on your phone, laptop or tablet — or print it if you prefer.',
  },
  {
    q: 'Which countries are covered?',
    a: 'Fifteen: USA, Canada, UK, Australia, Ireland, Germany, France, Netherlands, Spain, Switzerland, Russia, China, Japan, South Korea and Malaysia. Each gets a full chapter with the same 12-topic structure.',
  },
  {
    q: 'How current is the data?',
    a: 'The book was updated in November 2026. Every country chapter opens with a 2027 UPDATES box covering the latest fee changes, visa-rule changes and scholarship deadlines.',
  },
  {
    q: 'How do I receive the book after paying?',
    a: 'You get an instant download link on the payment success page, and a backup copy is emailed to you within minutes.',
  },
  {
    q: 'Is Rs 251 the final price?',
    a: 'Yes — a one-time payment, no subscription and no hidden charges. Rs 251 is the launch price; the regular price is Rs 999.',
  },
  {
    q: 'What if the book isn\u2019t useful for me?',
    a: 'Email us within 7 days of purchase and we\u2019ll refund you in full. No questions asked.',
  },
  {
    q: 'Do you help with admissions or visas?',
    a: 'No. StudyAbroad 2027 is an independent information guide. We don\u2019t file applications, work with agents, or promise admission or visa outcomes.',
  },
]

// ── Disclaimer ───────────────────────────────────────────────

export const DISCLAIMER =
  'StudyAbroad 2027 is an independent planning guide for Indian students and parents. It is not affiliated with any government, embassy or university, and it does not provide admission, visa or immigration services. Tuition ranges, living costs and visa rules change frequently — always confirm details on official government and university websites before you pay any application, tuition or visa fee. Figures in the book are typical ranges compiled in November 2026; your actual costs will vary with city, course and exchange rates. Nothing in this book guarantees admission, a scholarship or a visa.'
