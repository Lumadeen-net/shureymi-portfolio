import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { NavigationGrid } from './NavigationGrid';
import { Settings } from 'lucide-react';

export const CinematicHero: React.FC = () => {
  const { siteMetadata } = useContent();

  return (
    <div className="w-full min-h-[100vh] bg-[#100C0A] text-[#F5EBDD] py-4 sm:py-6 lg:py-8">
      
      {/* Website Branding Header */}
      <header className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 mb-3 sm:mb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-[#D6A86A]/20">
          {/* Left: Full Name */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D6A86A] shadow-sm shadow-[#D6A86A]/50" />
            <h1 className="text-base sm:text-lg lg:text-xl font-serif font-bold tracking-widest text-[#F5EBDD] uppercase">
              {siteMetadata.name}
            </h1>
          </div>

          {/* Right: Tagline */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium tracking-widest text-[#C9B9A6] uppercase">
            <span>{siteMetadata.tagline}</span>
          </div>
        </div>
      </header>

      {/* SECTION 1 — CINEMATIC IMAGE (reduced height so the navigation cards can sit within the first viewport) */}
      <section className="w-full max-w-[1500px] mx-auto px-2 sm:px-4 lg:px-6">
        <div 
          className="w-full overflow-hidden bg-black/40"
          style={{ borderRadius: 0 }}
        >
          <img
            src="/cinematic-bg.png"
            alt="Shureymi Haji in his study environment in Mandera surrounded by books, dual displays, notebooks, and golden hour sunset view"
            className="block w-full h-[42vh] sm:h-[48vh] lg:h-[54vh] xl:h-[58vh] object-cover object-top select-none"
            style={{ borderRadius: 0 }}
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </section>

      {/* SECTION 2 — NAVIGATION CARDS (closer to the hero so more appear above the fold) */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 mt-4 sm:mt-5">
        
        {/* Six Navigation Cards Grid */}
        <NavigationGrid />

        {/* Vision Statement & Subtle Admin Access */}
        <div className="pt-8 sm:pt-10 text-center max-w-3xl mx-auto">
          <p className="font-serif italic text-sm sm:text-base md:text-lg text-[#F5EBDD]/90 tracking-wide leading-relaxed">
            {siteMetadata.vision}
          </p>
          {/* Delicate gold accent bar */}
          <div className="w-14 h-[2px] bg-gradient-to-r from-transparent via-[#D6A86A] to-transparent mx-auto mt-3" />

          {/* Subtle copyright & admin gear link */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#8F7F70]/50 tracking-wider">
            <span>© {new Date().getFullYear()} Shureymi Haji. Crafted with purpose and discipline.</span>
            <Link
              to="/admin"
              title="Editorial Control Panel"
              aria-label="Editorial Control Panel"
              className="p-1 rounded text-[#8F7F70]/40 hover:text-[#D6A86A] transition-colors inline-flex items-center"
            >
              <Settings className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
