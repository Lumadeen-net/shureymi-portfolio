import React, { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { useContent } from '../context/ContentContext';
import { Download, Printer, CheckCircle2, Award, GraduationCap, Briefcase, Code, ShieldCheck } from 'lucide-react';

export default function Resume() {
  const { resumeData, siteMetadata } = useContent();
  const [showDownloadNotice, setShowDownloadNotice] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <PageLayout
      badgeNumber="05"
      title="Curriculum Vitae & Qualifications"
      subtitle="Comprehensive record of secondary education at Starehe Boys' Centre, technical competencies, commercial software experience, and community stewardship."
      leadQuote="“Competence precedes influence. Before you ask to govern resources, demonstrate that you can execute small tasks with absolute fidelity.”"
    >
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-[#140F0C] border border-[#D6A86A]/25">
        <div className="space-y-1">
          <p className="text-xs font-mono text-[#D6A86A] uppercase tracking-wider">
            Verified Academic & Technical Dossier
          </p>
          <p className="text-xs text-[#C9B9A6]">
            Updated for University Admissions and Technical Collaborations · 2026 Edition
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg bg-[#1C1511] text-[#C9B9A6] hover:text-[#F5EBDD] hover:bg-[#251C17] border border-[#D6A86A]/20 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#D6A86A]" />
            <span>Print View</span>
          </button>

          <button
            onClick={() => setShowDownloadNotice(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#D6A86A] text-[#100C0A] hover:bg-[#E4BC84] transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Summary Box */}
      {resumeData.summary && (
        <div className="p-5 sm:p-6 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 text-xs sm:text-sm text-[#C9B9A6] leading-relaxed">
          <span className="font-mono text-xs text-[#D6A86A] uppercase tracking-wider block mb-1">
            Executive Summary
          </span>
          <p>{resumeData.summary}</p>
        </div>
      )}

      {/* Download Placeholder Modal */}
      {showDownloadNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#140F0C] border border-[#D6A86A]/40 text-[#F5EBDD] space-y-4">
            <h3 className="font-serif font-bold text-xl text-[#F5EBDD]">
              Formal PDF Résumé Request
            </h3>
            <p className="text-xs text-[#C9B9A6] leading-relaxed">
              To ensure all recent KCSE candidate milestones, references, and verified test certificates are accurate, current PDF copies are shared directly with admissions officers and academic advisors upon request.
            </p>
            <div className="p-3 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs font-mono text-[#D6A86A]">
              Direct contact: {resumeData.email || siteMetadata.email}
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDownloadNotice(false)}
                className="px-4 py-2 text-xs font-semibold bg-[#D6A86A] text-[#100C0A] rounded-lg hover:bg-[#E4BC84]"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Résumé Container */}
      <div className="space-y-10">
        {/* Education Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-[#F5EBDD] flex items-center gap-2.5 border-b border-[#D6A86A]/20 pb-2">
            <GraduationCap className="w-5 h-5 text-[#D6A86A]" />
            <span>Academic Background</span>
          </h2>

          <div className="space-y-4">
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#F5EBDD]">
                      {edu.institution}
                    </h3>
                    <p className="text-xs text-[#D6A86A] font-medium">
                      {edu.degreeOrCertificate}
                    </p>
                  </div>
                  <div className="text-[11px] font-mono text-[#8F7F70] self-start sm:self-center">
                    {edu.period} · {edu.location}
                  </div>
                </div>

                <ul className="mt-2 space-y-1.5 text-xs text-[#C9B9A6]">
                  {edu.details.map((d, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="text-[#D6A86A] mt-0.5">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-[#F5EBDD] flex items-center gap-2.5 border-b border-[#D6A86A]/20 pb-2">
            <Code className="w-5 h-5 text-[#D6A86A]" />
            <span>Technical Competencies</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resumeData.technicalSkills.map((category, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 space-y-2.5">
                <h3 className="font-mono text-xs font-semibold text-[#D6A86A] uppercase tracking-wider">
                  {category.title}
                </h3>
                <ul className="space-y-1.5 text-xs text-[#C9B9A6]">
                  {category.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D6A86A]/60" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Engineering & Service Experience */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-[#F5EBDD] flex items-center gap-2.5 border-b border-[#D6A86A]/20 pb-2">
            <Briefcase className="w-5 h-5 text-[#D6A86A]" />
            <span>Technical & Community Experience</span>
          </h2>

          <div className="space-y-4">
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#F5EBDD]">
                      {exp.role}
                    </h3>
                    <p className="text-xs text-[#D6A86A] font-medium">
                      {exp.organization}
                    </p>
                  </div>
                  <div className="text-[11px] font-mono text-[#8F7F70] self-start sm:self-center">
                    {exp.period} · {exp.location}
                  </div>
                </div>

                <ul className="mt-2 space-y-1.5 text-xs text-[#C9B9A6]">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A86A] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Student Governance & Leadership */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-[#F5EBDD] flex items-center gap-2.5 border-b border-[#D6A86A]/20 pb-2">
            <ShieldCheck className="w-5 h-5 text-[#D6A86A]" />
            <span>Institutional Leadership</span>
          </h2>

          <div className="space-y-4">
            {resumeData.leadership.map((lead, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#F5EBDD]">
                      {lead.role}
                    </h3>
                    <p className="text-xs text-[#D6A86A] font-medium">
                      {lead.organization}
                    </p>
                  </div>
                  <div className="text-[11px] font-mono text-[#8F7F70] self-start sm:self-center">
                    {lead.period} · {lead.location}
                  </div>
                </div>

                <ul className="mt-2 space-y-1.5 text-xs text-[#C9B9A6]">
                  {lead.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="text-[#D6A86A] mt-0.5">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Honors & Awards */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-[#F5EBDD] flex items-center gap-2.5 border-b border-[#D6A86A]/20 pb-2">
            <Award className="w-5 h-5 text-[#D6A86A]" />
            <span>Honors & Commendations</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {resumeData.honorsAndAwards.map((award, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 space-y-1.5">
                <span className="font-mono text-[11px] text-[#D6A86A] uppercase">{award.year}</span>
                <h3 className="font-serif font-bold text-sm text-[#F5EBDD]">
                  {award.title}
                </h3>
                <p className="text-[11px] text-[#8F7F70]">
                  Issued by {award.issuer}
                </p>
                <p className="text-xs text-[#C9B9A6] leading-relaxed pt-1">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
