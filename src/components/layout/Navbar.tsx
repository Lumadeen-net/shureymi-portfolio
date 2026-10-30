import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

interface NavbarProps {
  isTransparent?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isTransparent = false }) => {
  const { siteMetadata } = useContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Story', path: '/story' },
    { label: 'Leadership', path: '/leadership' },
    { label: 'Ideas', path: '/ideas' },
    { label: 'Mandera', path: '/mandera' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent && !mobileMenuOpen
          ? 'bg-gradient-to-b from-[#100C0A]/85 via-[#100C0A]/40 to-transparent'
          : 'bg-[#100C0A]/90 backdrop-blur-md border-b border-[#D6A86A]/15'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <Link
          to="/"
          className="group flex items-center gap-2 text-base sm:text-lg font-serif font-bold tracking-wider text-[#F5EBDD] hover:text-[#D6A86A] transition-colors whitespace-nowrap shrink-0"
        >
          <span className="w-2 h-2 rounded-full bg-[#D6A86A]/70 group-hover:scale-125 transition-transform" />
          <span>{siteMetadata.name.toUpperCase()}</span>
        </Link>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#C9B9A6]">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b ${
                isActive(link.path)
                  ? 'text-[#D6A86A] border-[#D6A86A]'
                  : 'border-transparent hover:text-[#F5EBDD] hover:border-[#D6A86A]/40'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-[#100C0A] bg-[#D6A86A] hover:bg-[#E4BC84] rounded-md transition-all whitespace-nowrap shrink-0 shadow-sm shadow-[#D6A86A]/20"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#C9B9A6] hover:text-[#F5EBDD] hover:bg-[#1C1511] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D6A86A]/50 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#100C0A]/98 border-b border-[#D6A86A]/20 px-6 py-6 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                location.pathname === '/' ? 'text-[#D6A86A] bg-[#1C1511]' : 'text-[#C9B9A6] hover:text-[#F5EBDD]'
              }`}
            >
              Homepage
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'text-[#D6A86A] bg-[#1C1511] font-semibold'
                    : 'text-[#C9B9A6] hover:text-[#F5EBDD]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#D6A86A]/15 mt-2">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wide uppercase text-[#100C0A] bg-[#D6A86A] hover:bg-[#E4BC84] rounded-md transition-colors"
              >
                <span>Let's Connect</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
