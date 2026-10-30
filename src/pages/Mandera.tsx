import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { MANDERA_DATA } from '../data/mandera';
import { MapPin, Compass, Eye, CheckCircle2, BookOpen, Target, Milestone } from 'lucide-react';

export default function Mandera() {
  return (
    <PageLayout
      badgeNumber="04"
      title={MANDERA_DATA.title}
      subtitle={MANDERA_DATA.subtitle}
      leadQuote="“A more educated, empowered and prosperous Mandera. A stronger, fairer Kenya.”"
    >
      {/* Introduction Narrative */}
      <section className="space-y-4 max-w-3xl">
        <h2 className="text-2xl font-serif font-bold text-[#F5EBDD] flex items-center gap-2.5">
          <MapPin className="w-5 h-5 text-[#D6A86A]" />
          <span>{MANDERA_DATA.introduction.heading}</span>
        </h2>
        {MANDERA_DATA.introduction.paragraphs.map((p, idx) => (
          <p key={idx} className="text-sm sm:text-base text-[#C9B9A6] leading-relaxed">
            {p}
          </p>
        ))}
      </section>

      {/* Grounded Observations */}
      <section className="space-y-6 pt-6 border-t border-[#D6A86A]/20">
        <div className="flex items-center gap-2.5">
          <Eye className="w-5 h-5 text-[#D6A86A]" />
          <h2 className="text-2xl font-serif font-bold text-[#F5EBDD]">
            What I Have Observed on the Ground
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#C9B9A6] max-w-2xl leading-relaxed">
          Ground-level realities observed firsthand in local neighborhoods, schools, markets, and regional transit hubs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MANDERA_DATA.observations.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 space-y-2"
            >
              <h3 className="font-serif font-bold text-base text-[#F5EBDD]">
                {item.label}
              </h3>
              <p className="text-xs sm:text-sm text-[#C9B9A6] leading-relaxed">
                {item.observation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The Four Strategic Pillars */}
      <section className="space-y-6 pt-8 border-t border-[#D6A86A]/20">
        <div className="flex items-center gap-2.5">
          <Compass className="w-5 h-5 text-[#D6A86A]" />
          <h2 className="text-2xl font-serif font-bold text-[#F5EBDD]">
            Four Strategic Pillars for Regional Transformation
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#C9B9A6] max-w-2xl leading-relaxed">
          Each pillar establishes clear accountability: distinguishing what has been observed, what small groundwork is already completed, what I must master academically, and what I hope to pursue long-term.
        </p>

        <div className="space-y-8">
          {MANDERA_DATA.pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#140F0C] border border-[#D6A86A]/25 space-y-6"
            >
              {/* Header */}
              <div className="border-b border-[#D6A86A]/15 pb-4">
                <span className="font-mono text-xs text-[#D6A86A] uppercase tracking-wider block mb-1">
                  Pillar {pillar.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F5EBDD]">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#C9B9A6] mt-1">
                  {pillar.subtitle}
                </p>
              </div>

              {/* 4-Zone Matrix Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                {/* Zone 1: Observed Bottleneck */}
                <div className="p-4 rounded-xl bg-[#1C1511] border border-[#D6A86A]/10 space-y-1.5">
                  <span className="font-mono text-[11px] text-[#D6A86A] uppercase tracking-wider block">
                    1. Observed Bottleneck
                  </span>
                  <p className="text-[#C9B9A6] leading-relaxed">
                    {pillar.observedChallenge}
                  </p>
                </div>

                {/* Zone 2: Groundwork Done */}
                <div className="p-4 rounded-xl bg-[#1C1511] border border-[#D6A86A]/10 space-y-1.5">
                  <span className="font-mono text-[11px] text-[#D6A86A] uppercase tracking-wider block">
                    2. Groundwork Already Done
                  </span>
                  <p className="text-[#C9B9A6] leading-relaxed">
                    {pillar.groundworkDone}
                  </p>
                </div>

                {/* Zone 3: Academic & Professional Learning Focus */}
                <div className="p-4 rounded-xl bg-[#1C1511] border border-[#D6A86A]/10 space-y-1.5">
                  <span className="font-mono text-[11px] text-[#D6A86A] uppercase tracking-wider block">
                    3. Knowledge I Must Acquire
                  </span>
                  <p className="text-[#C9B9A6] leading-relaxed">
                    {pillar.learningFocus}
                  </p>
                </div>

                {/* Zone 4: Long-Term Generational Aspiration */}
                <div className="p-4 rounded-xl bg-[#1C1511] border border-[#D6A86A]/20 space-y-1.5">
                  <span className="font-mono text-[11px] text-[#D6A86A] uppercase tracking-wider block">
                    4. Long-Term Aspiration
                  </span>
                  <p className="text-[#F5EBDD] font-medium leading-relaxed">
                    {pillar.futureAspiration}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Generational Roadmap */}
      <section className="space-y-6 pt-8 border-t border-[#D6A86A]/20">
        <div className="flex items-center gap-2.5">
          <Milestone className="w-5 h-5 text-[#D6A86A]" />
          <h2 className="text-2xl font-serif font-bold text-[#F5EBDD]">
            My Long-Term Pathway: Preparation Before Public Leadership
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#C9B9A6] max-w-2xl leading-relaxed">
          I do not view public office as an entry-level job or a prestige prize. Meaningful public leadership requires decades of preparation, financial independence, and operational mastery.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MANDERA_DATA.frameworkSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[11px] text-[#D6A86A] uppercase tracking-wider block mb-1">
                  0{idx + 1}
                </span>
                <h3 className="font-serif font-bold text-sm text-[#F5EBDD]">
                  {step.phase}
                </h3>
              </div>
              <p className="text-xs text-[#C9B9A6] leading-relaxed pt-2 border-t border-[#D6A86A]/10">
                {step.focus}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
