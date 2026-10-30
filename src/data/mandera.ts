export interface VisionPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  observedChallenge: string;
  groundworkDone: string;
  learningFocus: string;
  futureAspiration: string;
}

export const MANDERA_DATA = {
  title: 'The Mandera I Hope to See',
  subtitle: 'A grounded perspective on Northeastern Kenya\'s potential, current structural frictions, and a generational roadmap for sustainable regional prosperity.',
  
  introduction: {
    heading: 'The Place I Call Home',
    paragraphs: [
      'Mandera County occupies Kenya\'s northeastern apex, bordering both Somalia and Ethiopia along the bend of the historic River Dawa. To many who have never set foot here, the region exists only as a dateline in news headlines about droughts, border security, or infrastructural deficits.',
      'To me, Mandera is home. It is where my family lives, where my earliest values were formed, and where the resilience of pastoralist and entrepreneurial communities defies harsh climatic realities every single day.',
      'The Somali community in Mandera is characterized by profound generosity, deep oral storytelling, family solidarity, and sharp commercial instincts. Yet, for decades, geographic distance and historical underinvestment have meant that bright, eager young minds face barriers to educational attainment, digital skills, and formal capital that their peers in major metropolitan centers take for granted.'
    ]
  },

  observations: [
    {
      label: 'Educational Bottlenecks',
      observation: 'While high school enrollment has expanded under devolution, access to advanced STEM laboratories, qualified subject teachers, and university admissions coaching remains severely constrained in rural sub-counties.'
    },
    {
      label: 'Digital Divide & Cyber-Friction',
      observation: 'Young people frequently pay exorbitant fees at third-party cyber-cafes merely to print an official tax PIN or submit a bursary application because basic computer literacy and reliable connectivity remain scarce.'
    },
    {
      label: 'Pastoral Capital Volatility',
      observation: 'Local wealth is stored primarily in livestock herds vulnerable to climate-induced pasture depletion, without modern meat-processing plants, cold chains, or structured livestock exchanges to lock in asset value.'
    },
    {
      label: 'Border Trade Potential',
      observation: 'The tri-border junction between Kenya, Ethiopia, and Somalia represents one of East Africa\'s most natural trading hubs. With streamlined customs clearance and digitized trade logistics, it could power an industrial border economic zone.'
    }
  ],

  pillars: [
    {
      id: 'education',
      number: '01',
      title: 'Education & Mentorship',
      subtitle: 'Building institutional pipelines for high-achieving youth',
      observedChallenge: 'Talented students in remote primary and secondary schools lack exposure to national competition, scholarship opportunities, and structured peer mentorship.',
      groundworkDone: 'Mentored younger students through holiday study circles; shared strategies on KCSE preparation and time management learned from Starehe Boys\' Centre.',
      learningFocus: 'Studying institutional education design, endowment funding models, and hybrid digital learning platforms.',
      futureAspiration: 'Help establish enduring student mentorship networks and scholarship endowments that identify talented students across Northeastern Kenya and support their journey into premier global universities.'
    },
    {
      id: 'technology',
      number: '02',
      title: 'Technology & Digital Empowerment',
      subtitle: 'Transforming consumers of digital services into creators and remote operators',
      observedChallenge: 'Digital technology in the region is often limited to social media consumption and mobile money transfers rather than productive technical employment.',
      groundworkDone: 'Founded the Youth Digital Skills Initiative, teaching computer basics, CV design, eCitizen navigation, and foundational web concepts to local school-leavers.',
      learningFocus: 'Mastering modern full-stack web software, distributed database systems, and offline-first mobile application architectures.',
      futureAspiration: 'Establish community digital hubs in Mandera equipped with reliable solar power and satellite internet, providing structured bootcamps for remote freelance engineering and digital services.'
    },
    {
      id: 'economics',
      number: '03',
      title: 'Economics & Local Enterprise',
      subtitle: 'Modernizing pastoralist capital and border commerce',
      observedChallenge: 'Pastoralists suffer severe financial losses during dry cycles; local entrepreneurs struggle to access formal credit without traditional real estate collateral.',
      groundworkDone: 'Built Gamachu POS to streamline small retail inventory auditing; studied livestock cooperative mechanics and border trade dynamics.',
      learningFocus: 'Pursuing university education in Economics, Finance, and Enterprise Management to master quantitative macro policy and capital allocation.',
      futureAspiration: 'Promote agro-pastoral value-addition facilities, cold-chain logistics, and digital invoice financing tailored to pastoralist trade cooperatives.'
    },
    {
      id: 'leadership',
      number: '04',
      title: 'Public Leadership & Stewardship',
      subtitle: 'Preparing with competence and integrity for future civic service',
      observedChallenge: 'Public resources are too frequently managed without rigorous financial oversight or data-driven prioritization, slowing down development impact.',
      groundworkDone: 'Served in school governance as House Prefect and Mosque Captain; coordinated grassroots relief drives with Al-Muttaqeen with strict financial transparency.',
      learningFocus: 'Gaining private sector and professional mastery first, achieving financial independence, and mastering public finance management before seeking public office.',
      futureAspiration: 'Eventually serve the people of Mandera and Kenya through responsible, data-backed public leadership that treats public funds with absolute fidelity.'
    }
  ] as VisionPillar[],

  frameworkSteps: [
    {
      phase: 'Phase 1: Deep Preparation',
      focus: 'Academic excellence at Starehe, competitive university admissions in economics/computer science, mastering software and financial modeling.'
    },
    {
      phase: 'Phase 2: Professional Mastery & Enterprise',
      focus: 'Working in high-impact software engineering, finance, or economic policy; building entrepreneurial solutions; gaining financial independence.'
    },
    {
      phase: 'Phase 3: Grassroots Institutional Impact',
      focus: 'Expanding digital hubs, mentorship endowments, and supporting agricultural cooperatives in Mandera with technical and financial infrastructure.'
    },
    {
      phase: 'Phase 4: Public Service & Policy Stewardship',
      focus: 'Applying decades of private competency and uncompromised integrity toward county and national legislative and executive leadership.'
    }
  ]
};
