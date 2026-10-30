export interface NavCardItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  route: string;
  iconName: 'User' | 'Users' | 'BookOpen' | 'MapPin' | 'FileText' | 'Send';
  description: string;
}

export const NAVIGATION_CARDS: NavCardItem[] = [
  {
    id: 'story',
    number: '01',
    title: 'My Story',
    subtitle: 'From Mandera to Starehe and beyond',
    route: '/story',
    iconName: 'User',
    description: 'My background, upbringing in Northeastern Kenya, and personal growth through education and leadership.'
  },
  {
    id: 'leadership',
    number: '02',
    title: 'Leadership',
    subtitle: 'School, community and service',
    route: '/leadership',
    iconName: 'Users',
    description: 'Al-Muttaqeen Organisation, Starehe student leadership, and youth digital empowerment initiatives.'
  },
  {
    id: 'ideas',
    number: '03',
    title: 'Books & Ideas',
    subtitle: 'Writers, quotes and questions I live by',
    route: '/ideas',
    iconName: 'BookOpen',
    description: 'Influential literature from Ben Carson, Aristotle, Napoleon Hill, and core inquiries in economics and public policy.'
  },
  {
    id: 'mandera',
    number: '04',
    title: 'Mandera & Kenya',
    subtitle: 'The change I hope to help build',
    route: '/mandera',
    iconName: 'MapPin',
    description: 'Reflections on regional potential, institutional reform, youth digital skills, and economic development.'
  },
  {
    id: 'contact',
    number: '06',
    title: 'Contact',
    subtitle: 'Let\'s connect',
    route: '/contact',
    iconName: 'Send',
    description: 'Direct communication channels for academic opportunities, technical collaborations, and mentorship.'
  }
];

export const SITE_METADATA = {
  name: 'Shureymi Haji',
  tagline: 'CURIOSITY · SERVICE · LEADERSHIP',
  vision: '“The measure of a life is not how far one rises, but how many others rise because of it.”.',
  email: 'shureymimohamednur@gmail.com',
  github: 'https://github.com/Lumadeen-net',
  linkedin: 'https://linkedin.com',
  location: 'Nairobi & Mandera, Kenya',
  school: 'Starehe Boys\' Centre & School'
};
