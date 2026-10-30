export interface EducationEntry {
  institution: string;
  degreeOrCertificate: string;
  period: string;
  location: string;
  details: string[];
}

export interface ExperienceEntry {
  role: string;
  organization: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface HonorAward {
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export const RESUME_DATA = {
  name: 'Shureymi Haji',
  location: 'Nairobi & Mandera, Kenya',
  email: 'hajishureymi31@gmail.com',
  summary: 'Kenyan secondary school student at Starehe Boys\' Centre & School, frontend software developer, and grassroots community organizer. Passionate about software architecture, development economics, youth digital literacy, and long-term public service in Northeastern Kenya.',
  
  education: [
    {
      institution: 'Starehe Boys\' Centre & School',
      degreeOrCertificate: 'Kenya Certificate of Secondary Education (KCSE Candidate)',
      period: '2022 – 2025/2026',
      location: 'Nairobi, Kenya',
      details: [
        'Selected into Kenya\'s premier academic boarding and character-formation institution for high-achieving students',
        'Academic focus in Mathematics, Physics, Chemistry, Biology, Economics & Business, English, and Humanities',
        'Active leadership in student governance, interfaith harmony council, and community volunteer programs'
      ]
    },
    {
      institution: 'Primary Education',
      degreeOrCertificate: 'Kenya Certificate of Primary Education (KCPE)',
      period: 'Graduated with Distinction',
      location: 'Mandera, Northeastern Kenya',
      details: [
        'Top-tier county performance qualifying for national secondary school admission to Starehe Boys\' Centre'
      ]
    }
  ] as EducationEntry[],

  technicalSkills: [
    {
      title: 'Languages & Core Web',
      skills: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'SQL (PostgreSQL)']
    },
    {
      title: 'Frameworks & Libraries',
      skills: ['React', 'Vite', 'Tailwind CSS', 'Motion / Framer Motion', 'React Router']
    },
    {
      title: 'Backend & Data Services',
      skills: ['Supabase', 'Firebase (Auth & Firestore)', 'Node.js / Express basics', 'REST API Integration']
    },
    {
      title: 'Tools & Development Practices',
      skills: ['Git & GitHub', 'VS Code', 'Responsive Web Design', 'Browser DevTools', 'Linux/Bash Basics']
    }
  ] as SkillCategory[],

  experience: [
    {
      role: 'Frontend Engineering Intern',
      organization: 'UrbanTech Dev Company',
      period: '2025',
      location: 'Nairobi, Kenya',
      bullets: [
        'Collaborated with development team to build responsive client interfaces using React and Tailwind CSS',
        'Resolved cross-browser layout bugs and optimized component re-render performance across customer portals',
        'Conducted QA testing cycles, document review, and supported production software deployments'
      ]
    },
    {
      role: 'Founder & Instructor',
      organization: 'Youth Digital Skills Initiative',
      period: '2024 – Present',
      location: 'Mandera & Nairobi, Kenya',
      bullets: [
        'Conducted hands-on digital literacy workshops for local youth covering computer basics, email etiquette, and CV preparation',
        'Assisted job-seekers in applying for government services on eCitizen and navigating online student portals',
        'Taught foundational web development (HTML/CSS) to motivated high school leavers'
      ]
    },
    {
      role: 'Community Service Coordinator',
      organization: 'Al-Muttaqeen Organisation',
      period: '2023 – Present',
      location: 'Mandera & Community Hubs',
      bullets: [
        'Led logistical planning and distribution teams for seasonal food relief hampers serving hundreds of vulnerable households',
        'Coordinated academic tutoring and weekend visits for local children\'s orphanages',
        'Maintained transparent records of distributed provisions and supported community donor reporting'
      ]
    }
  ] as ExperienceEntry[],

  leadership: [
    {
      role: 'House Prefect',
      organization: 'Starehe Boys\' Centre & School',
      period: '2024 – 2025',
      location: 'Nairobi, Kenya',
      bullets: [
        'Managed daily operational routines, inspections, and discipline for 60+ boarding house students',
        'Mentored junior students transitioning from remote counties into the Starehe culture'
      ]
    },
    {
      role: 'Mosque Captain & Deputy Chairperson',
      organization: 'Starehe Muslim Society',
      period: '2023 – 2025',
      location: 'Nairobi, Kenya',
      bullets: [
        'Supervised daily operations and maintenance of campus mosque facilities serving hundreds of worshippers',
        'Organized weekly character study circles and represented Muslim students on the interfaith student council'
      ]
    }
  ] as ExperienceEntry[],

  honorsAndAwards: [
    {
      title: 'Starehe Boys\' Centre Merit Admission',
      issuer: 'Starehe Boys\' Centre & School Management',
      year: '2022',
      description: 'Awarded full national merit admission based on academic excellence and leadership potential.'
    },
    {
      title: 'Leadership Recognition Certificate',
      issuer: 'Starehe Student Governance Body',
      year: '2025',
      description: 'Recognized for dedicated service as House Prefect and Mosque Captain with exemplary character.'
    },
    {
      title: 'Community Service Commendation',
      issuer: 'Al-Muttaqeen Organisation',
      year: '2024',
      description: 'Commended for outstanding logistical coordination of Ramadan food relief distributions.'
    }
  ] as HonorAward[]
};
