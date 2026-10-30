import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { useContent } from '../context/ContentContext';
import { Compass, GraduationCap, MapPin } from 'lucide-react';

const cardIcons: Record<string, React.ElementType> = {
  ORIGIN: MapPin,
  'ALMA MATER': GraduationCap,
  'CORE FOCUS': Compass,
};

export default function Story() {
  const { storyData } = useContent();

  return (
    <PageLayout
      badgeNumber="01"
      title="My Story: From Mandera to Starehe"
      subtitle="A personal narrative of family, educational discipline, finding a voice in community leadership, and building software with purpose."
      leadQuote={storyData.leadQuote}
    >
      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {storyData.overviewCards.map((card) => {
          const IconComponent = cardIcons[card.label] || MapPin;

          return (
            <div key={card.id} className="p-6 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D6A86A]">
                <IconComponent className="w-4 h-4" />
                <span>{card.label}</span>
              </div>
              <h2 className="text-xl font-serif font-bold text-[#F5EBDD]">{card.title}</h2>
              <p className="text-xs text-[#C9B9A6] leading-relaxed">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Chapter 1: Growing Up in Mandera */}
      {storyData.chapters[0] && (
        <article className="space-y-4 max-w-3xl">
          <h2 className="text-2xl font-serif font-bold text-[#F5EBDD]">
            {storyData.chapters[0].title}
          </h2>
          {storyData.chapters[0].paragraphs.map((p, pIdx) => (
            <p key={pIdx} className="text-[#C9B9A6] leading-relaxed">
              {p}
            </p>
          ))}
        </article>
      )}

      {/* Pull Quote */}
      <div className="my-10 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-[#1C1511] to-[#140F0C] border border-[#D6A86A]/30">
        <p className="font-serif italic text-lg sm:text-xl text-[#F5EBDD] leading-relaxed">
          {storyData.pullQuote.quote}
        </p>
        <p className="mt-3 text-xs font-mono text-[#D6A86A]">
          {storyData.pullQuote.attribution}
        </p>
      </div>

      {/* Chapters 2, 3, 4 */}
      {storyData.chapters.slice(1, 4).map((chapter) => (
        <article key={chapter.id} className="space-y-4 max-w-3xl">
          <h2 className="text-2xl font-serif font-bold text-[#F5EBDD]">
            {chapter.title}
          </h2>
          {chapter.paragraphs.map((p, pIdx) => (
            <p key={pIdx} className="text-[#C9B9A6] leading-relaxed">
              {p}
            </p>
          ))}
        </article>
      ))}

      {/* Chronological Milestone Timeline */}
      <section className="pt-8 border-t border-[#D6A86A]/20">
        <h2 className="text-xl font-serif font-bold text-[#F5EBDD] mb-8">
          Key Milestones
        </h2>
        <div className="relative border-l border-[#D6A86A]/30 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
          {storyData.milestones.map((m) => (
            <div key={m.id} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#100C0A] border-2 border-[#D6A86A] group-hover:bg-[#D6A86A] transition-colors" />
              <div>
                <span className="font-mono text-xs font-semibold text-[#D6A86A] uppercase tracking-wider">
                  {m.year}
                </span>
                <h3 className="text-base sm:text-lg font-serif font-semibold text-[#F5EBDD] mt-0.5">
                  {m.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-[#C9B9A6] leading-relaxed max-w-2xl">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Remaining Chapters (e.g., Looking Ahead) */}
      {storyData.chapters.slice(4).map((chapter) => (
        <article key={chapter.id} className="space-y-4 max-w-3xl pt-8 border-t border-[#D6A86A]/20">
          <h2 className="text-2xl font-serif font-bold text-[#F5EBDD]">
            {chapter.title}
          </h2>
          {chapter.paragraphs.map((p, pIdx) => (
            <p key={pIdx} className="text-[#C9B9A6] leading-relaxed">
              {p}
            </p>
          ))}
        </article>
      ))}
    </PageLayout>
  );
}
