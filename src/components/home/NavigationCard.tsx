import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  User, 
  Code, 
  Users, 
  BookOpen, 
  MapPin, 
  PenLine, 
  FileText, 
  Send,
  ArrowUpRight 
} from 'lucide-react';
import { NavCardItem } from '../../data/navigation';

const iconMap = {
  User,
  Code,
  Users,
  BookOpen,
  MapPin,
  PenLine,
  FileText,
  Send
};

interface NavigationCardProps {
  item: NavCardItem;
  index: number;
  skipAnimation?: boolean;
}

export const NavigationCard: React.FC<NavigationCardProps> = ({
  item,
}) => {
  const IconComponent = iconMap[item.iconName] || User;

  return (
    <div className="group relative flex flex-col justify-between">
      <Link
        to={item.route}
        aria-label={`${item.number}. ${item.title}: ${item.subtitle}`}
        className="block h-full p-4 sm:p-5 rounded-xl bg-[#140F0C]/85 border border-[#D6A86A]/25 hover:border-[#D6A86A]/60 hover:bg-[#1E1713] transition-all duration-200 shadow-md shadow-black/40 hover:-translate-y-1 focus:ring-2 focus:ring-[#D6A86A] focus:outline-none"
      >
        {/* Subtle interior lighting sheen on hover */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#D6A86A]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Top row: Icon + Number Index */}
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 rounded-lg bg-[#2A1F17]/60 text-[#D6A86A] border border-[#D6A86A]/20 group-hover:border-[#D6A86A]/40 transition-colors">
            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="font-mono text-xs font-semibold text-[#D6A86A]/70 tracking-widest">
            {item.number}
          </span>
        </div>

        {/* Middle: Title & Subtitle */}
        <div className="flex-1 mt-1 mb-3">
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#F5EBDD] group-hover:text-[#D6A86A] transition-colors leading-snug">
            {item.title}
          </h2>
          <p className="mt-1 text-xs text-[#C9B9A6] group-hover:text-[#F5EBDD]/90 line-clamp-2 leading-relaxed transition-colors">
            {item.subtitle}
          </p>
        </div>

        {/* Bottom row: Explore link with directional arrow */}
        <div className="pt-2 border-t border-[#D6A86A]/15 flex items-center justify-between text-[11px] text-[#C9B9A6]/80 group-hover:text-[#D6A86A] transition-colors">
          <span className="font-medium tracking-wide">Enter</span>
          <div className="w-6 h-6 rounded-full bg-[#2A1F17]/80 flex items-center justify-center border border-[#D6A86A]/20 group-hover:border-[#D6A86A]/50 group-hover:bg-[#D6A86A]/15 transition-all">
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D6A86A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    </div>
  );
};
