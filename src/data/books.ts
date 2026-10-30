export interface BookIdea {
  id: string;
  title: string;
  author: string;
  category: string;
  year?: string;
  coreThesis: string;
  personalReflection: string;
  keyTakeaway: string;
}

export interface QuoteItem {
  id: string;
  quote: string;
  author: string;
  sourceContext: string;
  myPerspective: string;
}

export interface InquiryQuestion {
  id: string;
  theme: string;
  question: string;
  context: string;
}

export const FEATURED_BOOKS: BookIdea[] = [
  {
    id: 'gifted-hands',
    title: 'Gifted Hands',
    author: 'Dr. Ben Carson',
    category: 'Biography & Discipline',
    year: '1990',
    coreThesis: 'Academic excellence and human capability are not predetermined by impoverished beginnings; deliberate discipline, reading, and self-belief can overcome severe structural obstacles.',
    personalReflection: 'Reading Carson\'s story while navigating schooling in Northeastern Kenya offered a tangible model of what relentless intellectual devotion can achieve. His mother\'s insistence on daily reading rather than passive media consumption struck a chord with how I approach my own study regimen at Starehe.',
    keyTakeaway: 'Circumstances may define where you begin, but personal standards and rigorous preparation determine where you can contribute.'
  },
  {
    id: 'think-big',
    title: 'Think Big',
    author: 'Dr. Ben Carson',
    category: 'Mindset & Character',
    year: '1992',
    coreThesis: 'True intellectual growth requires pairing high technical competence with humility, moral clarity, and an active commitment to helping others succeed.',
    personalReflection: 'Carson\'s T.H.I.N.K. B.I.G. framework emphasizes talent, honesty, insight, being nice, knowledge, books, in-depth thinking, and God. What resonates most is the rejection of superficial prestige in favor of deep mastery and service to the vulnerable.',
    keyTakeaway: 'Ambition without moral grounding and community responsibility quickly turns empty.'
  },
  {
    id: 'think-and-grow-rich',
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    category: 'Philosophy & Personal Agency',
    year: '1937',
    coreThesis: 'Definiteness of purpose, specialized knowledge, persistent execution, and disciplined imagination are the foundational drivers of enterprise and lasting achievement.',
    personalReflection: 'Beyond the commercial phrasing, Hill\'s true insight lies in the mechanics of sustained focus. In a world full of fleeting digital distractions, the ability to define a singular objective and work methodically towards it over years is a scarce competitive advantage.',
    keyTakeaway: 'Vague aspirations produce vague outcomes; clarity of intent turns daily effort into compound progress.'
  },
  {
    id: 'poor-economics',
    title: 'Poor Economics',
    author: 'Abhijit V. Banerjee & Esther Duflo',
    category: 'Development Economics',
    year: '2011',
    coreThesis: 'Poverty cannot be solved through grand ideological slogans; it demands empirical observation, randomized trials, and understanding the precise micro-incentives faced by low-income families.',
    personalReflection: 'Having grown up in Mandera, I have seen well-intentioned development projects stall because designers never consulted the ground reality. Banerjee and Duflo\'s insistence on testing assumptions against observable behavior informs how I think about regional interventions.',
    keyTakeaway: 'Compassion must be matched with empirical rigor; good intentions without sound economic design waste precious resources.'
  }
];

export const VERIFIED_QUOTES: QuoteItem[] = [
  {
    id: 'carson-success',
    quote: 'Success is not measured by money or power or social rank. Success is measured by your discipline and inner peace.',
    author: 'Dr. Ben Carson',
    sourceContext: 'Reflecting on the distinction between superficial status and enduring character',
    myPerspective: 'In our society, external displays of wealth or official rank are often mistaken for genuine accomplishment. To me, true success is mastering one\'s own impulses, staying loyal to principles when tested, and using whatever knowledge one possesses to elevate others.'
  },
  {
    id: 'aristotle-excellence',
    quote: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
    author: 'Aristotle',
    sourceContext: 'Nicomachean Ethics — the cultivation of virtue and human flourishing (Eudaimonia)',
    myPerspective: 'Brilliance or brief bursts of motivation rarely create lasting impact. Whether writing clean software, maintaining study discipline, or leading a school house, excellence is built through small, unglamorous daily choices repeated day after day.'
  }
];

export const EXPLORING_QUESTIONS: InquiryQuestion[] = [
  {
    id: 'q1',
    theme: 'Economic Opportunity',
    question: 'How can pastoralist and peripheral border economies build sustainable internal capital markets rather than remaining perpetual recipients of relief aid?',
    context: 'Examining trade route formalization, livestock value-addition processing, micro-finance liquidity, and digital remittance infrastructure across Northeastern Kenya.'
  },
  {
    id: 'q2',
    theme: 'Digital Leapfrogging',
    question: 'What is the most cost-effective curriculum for turning high school graduates in underserved counties into remote digital workers and technical problem-solvers?',
    context: 'Evaluating practical literacy vs. full-stack engineering tracks, community digital hubs, and low-bandwidth learning pipelines.'
  },
  {
    id: 'q3',
    theme: 'Public Leadership',
    question: 'How do aspiring leaders prepare themselves with rigorous financial and operational expertise before seeking public office, so they manage public resources with fidelity?',
    context: 'Balancing private sector competency, economic literacy, ethical resilience, and long-term electoral accountability.'
  },
  {
    id: 'q4',
    theme: 'Educational Access',
    question: 'How can the ethos and institutional discipline of schools like Starehe Boys\' Centre be adapted into sustainable day schools in remote counties?',
    context: 'Analyzing peer mentorship cultures, student responsibility systems, and alumni-supported endowment structures.'
  }
];
