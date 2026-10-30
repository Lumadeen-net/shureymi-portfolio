import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Home } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  badgeNumber?: string;
  leadQuote?: string;
  transparentNav?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
  badgeNumber,
  leadQuote,
  transparentNav = false,
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#100C0A] text-[#F5EBDD] relative selection:bg-[#D6A86A]/30 selection:text-[#F5EBDD]">
      <Navbar isTransparent={transparentNav} />

      <main className="flex-1 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Top Breadcrumb / Return home link */}
          <div className="mb-8 flex items-center justify-between text-xs text-[#C9B9A6] border-b border-[#D6A86A]/15 pb-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-1.5 hover:text-[#D6A86A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to World</span>
            </Link>

            <div className="flex items-center gap-2 font-mono text-[11px] text-[#D6A86A]/80">
              {badgeNumber && <span>SECTION {badgeNumber}</span>}
              {badgeNumber && <span>·</span>}
              <span className="uppercase tracking-wider">Shureymi Haji</span>
            </div>
          </div>

          {/* Editorial Header */}
          <header className="mb-12 max-w-3xl">
            {badgeNumber && (
              <p className="text-xs font-mono uppercase tracking-widest text-[#D6A86A] mb-2">
                Chapter {badgeNumber}
              </p>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-[#F5EBDD] leading-[1.15]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-base sm:text-lg text-[#C9B9A6] leading-relaxed">
                {subtitle}
              </p>
            )}
            {leadQuote && (
              <div className="mt-6 p-4 border-l-2 border-[#D6A86A] bg-[#1C1511]/50 rounded-r-lg">
                <p className="font-serif italic text-sm text-[#F5EBDD]/90">
                  {leadQuote}
                </p>
              </div>
            )}
          </header>

          {/* Main Page Content */}
          <div className="space-y-12">
            {children}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};
