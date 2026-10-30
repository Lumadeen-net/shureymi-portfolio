export interface LeadershipRole {
  id: string;
  role: string;
  organization: string;
  period: string;
  category: 'Community Organization' | 'School Leadership' | 'Youth Empowerment';
  summary: string;
  keyResponsibilities: string[];
  concreteLearnings: string;
}

export interface LeadershipReflection {
  id: string;
  title: string;
  theme: string;
  quoteSnippet: string;
  body: string;
}

export interface LeadershipData {
  roles: LeadershipRole[];
  reflections: LeadershipReflection[];
}

export const LEADERSHIP_ROLES: LeadershipRole[] = [
  {
    id: 'al-muttaqeen',
    role: 'Chairperson  & Youth Member',
    organization: 'Al-Muttaqeen Organisation',
    period: '2025 – Present',
    category: 'Community Organization',
    summary: 'A youth-led community organization focused on orphanage visits, charitable activities, food distributions, youth mentorship, and strengthening community bonds through volunteer service.',
    keyResponsibilities: [
      'Organized logistical preparation and door-to-door distribution for food hamper drives serving vulnerable families during Ramadan and dry seasons',
      'Coordinated weekend visitation, academic coaching, and companionship programs for local children\'s orphanages',
      'Assisted in transparent fundraising tracking, expense documentation, and community reporting for donor accountability',
      'Mobilized secondary school peers and neighborhood youth to take active ownership of neighborhood cleanups and welfare tasks'
    ],
    concreteLearnings: 'Real community work is logistical and unglamorous. It is not about grand speeches; it is about verifying whether the flour and cooking oil arrived at the right household, and listening with quiet respect to elders whose dignity must always be preserved.'
  },
  {
    id: 'youth-digital-empowerment',
    role: 'Founder & Instructor',
    organization: 'Youth Digital Skills Initiative',
    period: '2025 – Present',
    category: 'Youth Empowerment',
    summary: 'Voluntary community workshops teaching practical digital skills to youth and school-leavers in underserved neighborhoods and holiday sessions.',
    keyResponsibilities: [
      'Designed a modular, jargon-free curriculum covering computer fundamentals, keyboard typing, and file management',
      'Taught professional email etiquette, online safety, and professional CV formatting using modern productivity tools',
      'Guided participants on navigating government digital platforms (eCitizen, KRA portal, student portal applications)',
      'Introduced motivated students to foundational web technologies (HTML, CSS) and self-learning resources for tech careers'
    ],
    concreteLearnings: 'Digital poverty is rarely a lack of curiosity; it is a lack of accessible hardware and patient guidance. When you demystify a computer and show a young person how to generate their first CV or submit an official application independently, their sense of personal agency permanently changes.'
  },
  {
    id: 'starehe-mosque-captain',
    role: 'Mosque Captain & Deputy Chairperson, Muslim Society',
    organization: 'Starehe Boys\' Centre Muslim Community',
    period: '2023 – 2024',
    category: 'School Leadership',
    summary: 'Spiritual and cultural leadership, organizing daily congregational prayers, Friday Khutbahs, interfaith harmony, and welfare for Muslim students on campus.',
    keyResponsibilities: [
      'Coordinated the daily running, cleaning, and scheduling of the campus mosque facilities for hundreds of students and staff',
      'Organized weekly study circles, Qur\'an recitation classes, and guest speaker sessions focused on character, academic ethics, and civic duty',
      'Represented the Muslim student body during school interfaith council meetings, promoting mutual respect and cooperative service across all faith groups',
      'Mentored younger students facing academic strain or homesickness, providing a safe and supportive listening space'
    ],
    concreteLearnings: 'Spiritual leadership must never be exclusive or arrogant. Leading the mosque taught me how to cultivate calm, ensure that every student felt welcome regardless of their background, and embody faith through quiet service.'
  },
  {
    id: 'starehe-house-prefect',
    role: 'House Prefect',
    organization: 'Starehe Boys\' Centre & School',
    period: '2022– 2023',
    category: 'School Leadership',
    summary: 'Residential leadership responsibility in one of Kenya\'s most renowned academic boarding institutions, overseeing student welfare, discipline, and daily routines.',
    keyResponsibilities: [
      'Oversaw morning inspections, evening preps, and residential welfare for over 60 junior and senior boarding students',
      'Mediated interpersonal peer conflicts and guided new students adapting from remote counties to Starehe\'s rigorous boarding environment',
      'Acted as a constructive liaison between the boarding master, teaching faculty, and student body to voice genuine welfare concerns',
      'Enforced timekeeping, academic quiet hours, and personal hygiene standards through consistent example rather than arbitrary punishment'
    ],
    concreteLearnings: 'Authority derived solely from a title is fragile and creates resentment. Lasting authority is built when your peers see you wake up earlier than them, clean alongside them, and treat junior students with the same dignity you accord senior teachers.'
  }
];

export const LEADERSHIP_REFLECTIONS: LeadershipReflection[] = [
  {
    id: 'ref-1',
    title: 'On Listening Before Directing',
    theme: 'Listening & Humility',
    quoteSnippet: 'People do not care what you know until they know you are willing to listen.',
    body: 'When I was first appointed to student leadership at Starehe, my instinctive reaction was to think about rules, enforcement, and standards. I quickly learned that the most difficult challenges — a homesick boy from a distant rural town falling behind in grades, or two dorm mates in conflict — could never be solved with a reprimand. They required sitting down after dinner, in the quiet corridor, and listening without interrupting for twenty minutes. Most people already know what is wrong; they need to feel heard and respected before they can accept advice.'
  },
  {
    id: 'ref-2',
    title: 'The Weight of Responsibility',
    theme: 'Accountability',
    quoteSnippet: 'Leadership is taking the blame when things falter, and passing the credit when things succeed.',
    body: 'During Al-Muttaqeen\'s community outreach activities, we often travel together by bus, carrying food and other supplies for distribution. As chairperson, I help coordinate members, organize supplies, and ensure our visits run smoothly. These experiences have taught me that accountability means taking responsibility when plans fall short, addressing challenges rather than assigning blame, and recognizing the collective effort behind every successful activity.'
  },
  {
    id: 'ref-3',
    title: 'Service as Character Formation',
    theme: 'Service',
    quoteSnippet: 'Service is the rent we pay for living on this earth.',
    body: 'At Starehe Boys\' Centre, the school motto is "Natulenge Juu" (Let us aim high), but the core tradition is built around voluntary service — cleaning compound paths, washing dining hall tables, and looking out for younger peers. It stripped away whatever private ego one brought through the gates. You understand that intellectual talent without a spirit of service is simply refined selfishness.'
  }
];

export const DEFAULT_LEADERSHIP_DATA: LeadershipData = {
  roles: LEADERSHIP_ROLES,
  reflections: LEADERSHIP_REFLECTIONS
};
