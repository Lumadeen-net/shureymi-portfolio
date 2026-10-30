export interface MilestoneItem {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface StoryChapter {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface StoryOverviewCard {
  id: string;
  label: string;
  title: string;
  description: string;
}

export interface StoryData {
  leadQuote: string;
  pullQuote: {
    quote: string;
    attribution: string;
  };
  overviewCards: StoryOverviewCard[];
  chapters: StoryChapter[];
  milestones: MilestoneItem[];
}

export const DEFAULT_STORY_DATA: StoryData = {
  leadQuote: "“Circumstances may define where you begin, but personal standards and rigorous preparation determine where you can contribute.”",
  pullQuote: {
    quote: "“Talent is distributed evenly across humanity, but access to resources, mentorship, and quiet study spaces is not. Closing that distance is the defining moral challenge of our generation.”",
    attribution: "— Shureymi Haji, Personal Journal Reflection"
  },
  overviewCards: [
    {
      id: 'origin',
      label: 'ORIGIN',
      title: 'Mandera County',
      description: 'Northeastern Kenya’s vibrant border capital. A region rich in entrepreneurial courage, family solidarity, and untapped human potential.'
    },
    {
      id: 'alma-mater',
      label: 'ALMA MATER',
      title: "Starehe Boys' Centre",
      description: 'Kenya’s historic institution of character formation and excellence, where voluntary service and peer accountability shape daily life.'
    },
    {
      id: 'core-focus',
      label: 'CORE FOCUS',
      title: 'Technology & Economics',
      description: 'Full-stack engineering, financial literacy, and grassroots community empowerment as instruments of sustainable regional progress.'
    }
  ],
  chapters: [
    {
      id: 'growing-up',
      title: 'Growing Up in Mandera',
      paragraphs: [
        'When people unfamiliar with Northeastern Kenya hear about Mandera, they tend to imagine a place defined solely by drought, isolation, or hardship. That picture is incomplete. To grow up in Mandera is to witness intense human warmth, entrepreneurial grit, and a community where neighbors treat one another’s children as their own.',
        'My early years were shaped by this environment. Along the bustling market stalls and dusty trade routes connecting Kenya with Ethiopia and Somalia, I saw small shopkeepers managing complex inventories with nothing more than pocket notebooks, and families pooling resources to support relatives in university.',
        'At the same time, the inequalities in educational infrastructure were undeniable. Textbooks were scarce, qualified STEM teachers were often overstretched, and access to a reliable computer with an internet connection was a rare luxury. Rather than feeling discouraged, those gaps instilled in me a stubborn curiosity: why should where a child is born dictate the ceiling of what they are allowed to learn?'
      ]
    },
    {
      id: 'journey-starehe',
      title: "My Journey to Starehe Boys' Centre",
      paragraphs: [
        "Gaining admission to Starehe Boys' Centre & School was a turning point. Founded in 1959 by Dr. Geoffrey William Griffin, Geoffrey Gatama Geturo, and Joseph Kamiru Gikubu, Starehe was built on a revolutionary principle: that talented boys from needy backgrounds should receive an education second to none, grounded in discipline and voluntary service.",
        "Arriving on the Nairobi campus was humbling. I was surrounded by peers who were county toppers, brilliant mathematicians, eloquent debaters, and gifted athletes. The pace was relentless: morning runs, rigorous academic preps, house inspections, and manual duties that kept everyone grounded.",
        "Adapting to Starehe required letting go of complacency. It taught me how to manage my hours meticulously, how to study with quiet focus when everyone else was asleep, and how to hold myself accountable to the highest personal standards."
      ]
    },
    {
      id: 'finding-voice',
      title: 'Finding My Voice',
      paragraphs: [
        'I did not enter secondary school as an outspoken leader. By nature, I was observant and reflective, preferring to listen and analyze before speaking. But leadership at Starehe is not about loud charisma; it is about dependability and willingness to shoulder responsibility.',
        'When I was appointed House Prefect and later Mosque Captain, I had to learn how to guide peers who had strong personalities of their own. I discovered that real influence comes from consistency: showing up first, treating younger boys with genuine fairness, and resolving conflicts with patience rather than intimidation.',
        'Outside school, joining the Al-Muttaqeen Organisation gave that leadership a broader canvas. Coordinating food relief packages, organizing visits to orphanages, and seeing the direct relief on a grandmother’s face taught me that service is not a line on a CV — it is an ongoing moral obligation.'
      ]
    },
    {
      id: 'beyond-classroom',
      title: 'Beyond the Classroom: Code, Economics, and Practical Building',
      paragraphs: [
        'My academic fascination naturally drifted toward the intersection of economics and technology. Technology provides the tools to build leverage rapidly; economics provides the conceptual lens to understand incentives, capital allocation, and market failures.',
        'I began writing software: first basic scripts, then interactive web applications, and eventually full-stack systems like Gamachu POS and logistics trackers. Building software taught me intellectual honesty: a compiler does not care about your intentions; your code either works or it does not.',
        'During holiday breaks in Mandera, I launched the Youth Digital Skills Initiative, teaching computer fundamentals, email communication, and online government portal navigation to high school leavers. Witnessing a teenager format their first resume and apply for their national ID independently reinforced my belief that small, practical interventions compound into profound personal agency.'
      ]
    },
    {
      id: 'looking-ahead',
      title: 'Looking Ahead',
      paragraphs: [
        'My immediate priority is to pursue rigorous undergraduate studies in economics, finance, or computer science at a world-class university. I want to surround myself with brilliant mentors, master quantitative economic modeling, and contribute to cutting-edge software systems.',
        'In the long run, my aspiration is to gain deep professional competence, build financial independence, and eventually dedicate my energy to public stewardship and economic policy in Kenya. The goal is simple: to help build an educated, empowered, and prosperous Mandera within a stronger, fairer Kenya.'
      ]
    }
  ],
  milestones: [
    {
      id: 'ms-early',
      year: 'Early Years',
      title: 'Roots in Mandera',
      description: 'Raised along the border triangle where Kenya meets Somalia and Ethiopia. Surrounded by tight-knit family values, oral storytelling, pastoral commerce, and a deep reverence for faith and elder wisdom.'
    },
    {
      id: 'ms-2021',
      year: '2020',
      title: 'Primary School Milestone',
      description: 'Excelling in the Kenya Certificate of Primary Education (KCPE) through deliberate self-study and family encouragement, earning national competitive selection into Starehe Boys\' Centre & School.'
    },
    {
      id: 'ms-2022',
      year: '2021 - 2022',
      title: "Arrival at Starehe Boys' Centre",
      description: 'Transitioning from the borderland to Nairobi. Adapting to the legendary Starehe discipline, boarding house responsibilities, manual voluntary service, and intense academic competition among peers from all 47 counties.'
    },
    {
      year: '2022–2023',
      title: 'House Prefect | Learning to Lead',
      description: 'Served as House Prefect at Starehe Boys\' Centre & School, helping maintain discipline, coordinate house responsibilities, and support fellow students. The experience taught me how to balance authority with understanding and approach disagreements with patience.',
      id: 'ms-1793356732671'
    },
    {
      id: 'ms-2023',
      year: '2023',
      title: 'First Lines of Code & Curiosity',
      description: 'Discovering programming beyond the classroom syllabus. Learning JavaScript, modern web technologies, and realizing software could solve practical logistical problems in underserved communities.'
    },
    {
      id: 'ms-2024-2025',
      year: '2024',
      title: 'Mosque Captain | Leadership Through Service',
      description: 'Served as Mosque Captain at Starehe, coordinating mosque activities, supporting fellow students, and overseeing responsibilities within the school Muslim community. This role strengthened my understanding of leadership as a responsibility to the people who place their trust in you.'
    },
    {
      year: '2025 - PRESENT',
      title: ' Community Leadership & Youth Empowerment',
      description: 'Coordinated orphanage visits, food distributions, and fundraising through Al-Muttaqeen Organisation. Trained 30+ youth in Mandera in digital literacy, CV preparation, and online services.',
      id: 'ms-1793356994031'
    },
    {
      id: 'ms-2026',
      year: '2026 & Beyond',
      title: 'The Road Ahead',
      description: 'Preparing for higher education in economics, computer science, and finance. Building technical systems, gaining professional expertise, and working toward generational economic transformation.'
    }
  ]
};
