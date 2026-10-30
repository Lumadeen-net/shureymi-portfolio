import React, { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { useContent } from '../context/ContentContext';
import { FEATURED_BOOKS, EXPLORING_QUESTIONS } from '../data/books';
import { BookOpen, Quote, HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export default function Ideas() {
  const { quotes } = useContent();
  const [expandedBookId, setExpandedBookId] = useState<string | null>('gifted-hands');

  const toggleBook = (id: string) => {
    setExpandedBookId(prev => (prev === id ? null : id));
  };

  return (
    <PageLayout
      badgeNumber="03"
      title="The Bookshelf: Ideas I Return To"
      subtitle="Literary influences, verified philosophical maxims, and fundamental questions in development economics and public governance that guide my thinking."
      leadQuote="“We are what we repeatedly do. Excellence, then, is not an act, but a habit.” — Aristotle"
    >
      {/* Introduction */}
      <section className="max-w-3xl space-y-4">
        <p className="text-sm sm:text-base text-[#C9B9A6] leading-relaxed">
          My study desk has always been stacked with books that stretch my understanding beyond immediate school examinations. When you grow up in a borderland region like Mandera, literature provides an intellectual window into the world, offering models of resilience, mental discipline, and systems thinking.
        </p>
      </section>

      {/* Featured Books Section */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-[#D6A86A]/20 pb-3">
          <h2 className="text-2xl font-serif font-bold text-[#F5EBDD] flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#D6A86A]" />
            <span>Formative Reading</span>
          </h2>
          <span className="text-xs font-mono text-[#D6A86A]/80 uppercase">
            {FEATURED_BOOKS.length} Curated Texts
          </span>
        </div>

        <div className="space-y-4">
          {FEATURED_BOOKS.map((book) => {
            const isExpanded = expandedBookId === book.id;

            return (
              <div
                key={book.id}
                className="rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 hover:border-[#D6A86A]/45 transition-colors overflow-hidden"
              >
                {/* Book Card Summary Bar (Clickable) */}
                <button
                  type="button"
                  onClick={() => toggleBook(book.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#D6A86A]">
                      <span>{book.category}</span>
                      {book.year && <span>·</span>}
                      {book.year && <span>Published {book.year}</span>}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F5EBDD]">
                      {book.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#C9B9A6]">
                      By {book.author}
                    </p>
                  </div>

                  <div className="p-2 rounded-lg bg-[#1C1511] text-[#D6A86A] shrink-0 mt-1 sm:mt-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Core Thesis Preview */}
                <div className="px-5 sm:px-6 pb-4 -mt-2">
                  <p className="text-xs sm:text-sm text-[#C9B9A6] leading-relaxed">
                    <span className="font-semibold text-[#F5EBDD]">Core Thesis: </span>
                    {book.coreThesis}
                  </p>
                </div>

                {/* Expandable Deep Reflection */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-[#D6A86A]/15 bg-[#18110D]/50 space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D6A86A] mb-1.5">
                        Personal Reflection & Impact
                      </h4>
                      <p className="text-xs sm:text-sm text-[#C9B9A6] leading-relaxed">
                        {book.personalReflection}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20">
                      <span className="text-[11px] font-mono text-[#D6A86A] uppercase tracking-wider block mb-1">
                        Applied Takeaway
                      </span>
                      <p className="text-xs text-[#F5EBDD] font-serif italic">
                        “{book.keyTakeaway}”
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Verified Quotations & Personal Perspectives */}
      <section className="space-y-6 pt-8 border-t border-[#D6A86A]/20">
        <div className="flex items-center gap-2.5">
          <Quote className="w-5 h-5 text-[#D6A86A]" />
          <h2 className="text-2xl font-serif font-bold text-[#F5EBDD]">
            Verified Maxims & Commentary
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#C9B9A6] max-w-2xl leading-relaxed">
          Quotations with verified origin, coupled with my understanding of how they apply to leadership, discipline, and community life.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quotes.map((q) => (
            <div
              key={q.id}
              className="p-6 rounded-xl bg-[#140F0C] border border-[#D6A86A]/25 flex flex-col justify-between"
            >
              <div>
                <blockquote className="font-serif italic text-base sm:text-lg text-[#F5EBDD] leading-snug">
                  “{q.quote}”
                </blockquote>
                <div className="mt-3 text-xs text-[#D6A86A] font-semibold">
                  — {q.author}
                </div>
                <div className="text-[11px] text-[#8F7F70] mb-4">
                  {q.sourceContext}
                </div>
              </div>

              <div className="pt-4 border-t border-[#D6A86A]/15 text-xs text-[#C9B9A6] space-y-1">
                <span className="font-semibold text-[#F5EBDD] uppercase text-[10px] tracking-wider block">
                  Why It Matters to Me:
                </span>
                <p className="leading-relaxed">
                  {q.myPerspective}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Questions I'm Exploring */}
      <section className="space-y-6 pt-8 border-t border-[#D6A86A]/20">
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-5 h-5 text-[#D6A86A]" />
          <h2 className="text-2xl font-serif font-bold text-[#F5EBDD]">
            Inquiries in Development & Governance
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#C9B9A6] max-w-2xl leading-relaxed">
          Questions I am actively interrogating through reading, discussion with mentors, and software experimentation, rather than rigid conclusions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {EXPLORING_QUESTIONS.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 hover:border-[#D6A86A]/40 transition-colors space-y-2.5"
            >
              <span className="font-mono text-xs text-[#D6A86A] uppercase tracking-wider">
                {item.theme}
              </span>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#F5EBDD] leading-snug">
                {item.question}
              </h3>
              <p className="text-xs text-[#C9B9A6] leading-relaxed pt-1 border-t border-[#D6A86A]/10">
                <span className="font-semibold text-[#8F7F70]">Analytical Context: </span>
                {item.context}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
