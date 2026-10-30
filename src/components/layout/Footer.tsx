import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Settings } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const Footer: React.FC = () => {
  const { siteMetadata } = useContent();

  return (
    <footer className="border-t border-[#D6A86A]/20 bg-[#0C0907] text-[#C9B9A6] relative overflow-hidden">
      {/* Subtle warm glow at top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[#D6A86A]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          {/* Identity & Personal Vision */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-block text-lg font-serif font-bold tracking-wider text-[#F5EBDD] hover:text-[#D6A86A] transition-colors">
              {siteMetadata.name.toUpperCase()}
            </Link>
            <p className="text-sm text-[#C9B9A6] leading-relaxed max-w-md">
              Student at {siteMetadata.school}, software developer, and community volunteer from {siteMetadata.location}.
            </p>
            <div className="pt-2">
              <blockquote className="text-xs italic text-[#D6A86A]/90 font-serif border-l border-[#D6A86A]/40 pl-3 py-0.5">
                {siteMetadata.vision}
              </blockquote>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-semibold text-[#F5EBDD] tracking-wider uppercase mb-3 text-[11px]">Exploration</p>
              <ul className="space-y-2">
                <li><Link to="/story" className="hover:text-[#D6A86A] transition-colors">01. My Story</Link></li>
                <li><Link to="/leadership" className="hover:text-[#D6A86A] transition-colors">02. Leadership</Link></li>
                <li><Link to="/ideas" className="hover:text-[#D6A86A] transition-colors">03. Books & Ideas</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-[#F5EBDD] tracking-wider uppercase mb-3 text-[11px]">Perspectives</p>
              <ul className="space-y-2">
                <li><Link to="/mandera" className="hover:text-[#D6A86A] transition-colors">04. Mandera & Kenya</Link></li>
                <li><Link to="/contact" className="hover:text-[#D6A86A] transition-colors">05. Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Direct Contact & Details */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <p className="font-semibold text-[#F5EBDD] tracking-wider uppercase text-[11px]">Direct Reach</p>
            <p className="text-[#C9B9A6]">
              Available for academic discussions, software initiatives, and youth mentorship.
            </p>
            <div>
              <a
                href={`mailto:${siteMetadata.email}`}
                className="inline-flex items-center gap-1.5 text-xs text-[#D6A86A] hover:underline font-mono"
              >
                <span>{siteMetadata.email}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            <p className="text-[11px] text-[#8F7F70]">
              Based in {siteMetadata.location}
            </p>
          </div>
        </div>

        {/* Bottom copyright & Editorial Gear Icon */}
        <div className="mt-12 pt-6 border-t border-[#D6A86A]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8F7F70]">
          <div className="flex items-center gap-2">
            <p>© {new Date().getFullYear()} Shureymi Haji. Crafted with purpose and discipline.</p>
            <Link
              to="/admin"
              title="Editorial Control Panel"
              aria-label="Editorial Control Panel"
              className="p-1 rounded text-[#8F7F70]/60 hover:text-[#D6A86A] hover:bg-[#1C1511] transition-colors inline-flex items-center justify-center"
            >
              <Settings className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Northeastern Kenya</span>
            <span>·</span>
            <span>Starehe Boys' Centre</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
