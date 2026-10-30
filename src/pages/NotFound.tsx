import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#100C0A] text-[#F5EBDD] px-4">
      <div className="max-w-md w-full text-center p-8 rounded-2xl bg-[#140F0C] border border-[#D6A86A]/25 space-y-5">
        <div className="w-12 h-12 rounded-full bg-[#1C1511] text-[#D6A86A] mx-auto flex items-center justify-center border border-[#D6A86A]/30">
          <Compass className="w-6 h-6 animate-pulse" />
        </div>
        <div className="space-y-1">
          <p className="font-mono text-xs text-[#D6A86A] uppercase tracking-widest">
            Coordinate Uncharted · 404
          </p>
          <h1 className="text-3xl font-serif font-bold text-[#F5EBDD]">
            Page Not Found
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#C9B9A6] leading-relaxed">
          The destination you requested does not exist within this portfolio. Return to the cinematic study or explore the eight core chapters.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D6A86A] text-[#100C0A] font-semibold text-xs tracking-wider uppercase hover:bg-[#E4BC84] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
