import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { useContent } from '../context/ContentContext';
import { Users, HeartHandshake, ShieldCheck, Laptop, CheckCircle2, Quote } from 'lucide-react';

export default function Leadership() {
  const { leadershipData } = useContent();
  const categoryIcons = {
    'Community Organization': HeartHandshake,
    'School Leadership': ShieldCheck,
    'Youth Empowerment': Laptop,
  };

  return (
    <PageLayout
      badgeNumber="02"
      title="Leadership & Community Service"
      subtitle="Reflections on stewarding responsibility at Starehe Boys' Centre, coordinating grassroots relief with Al-Muttaqeen, and equipping youth with digital capability."
      leadQuote="“True leadership is not an exercise in authority; it is the willingness to wake up first, shoulder the unglamorous logistics, and ensure everyone in your care is supported.”"
    >
      {/* Overview Metric Row (Grounded facts, no fake stats) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20">
          <p className="font-mono text-xs text-[#D6A86A] uppercase tracking-wider">Boarding Stewardship</p>
          <p className="mt-1 text-2xl font-serif font-bold text-[#F5EBDD]">60+ Students</p>
          <p className="mt-1 text-xs text-[#C9B9A6] leading-relaxed">
            Directly overseen daily as House Prefect across academic prep, dorm hygiene, and welfare.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20">
          <p className="font-mono text-xs text-[#D6A86A] uppercase tracking-wider">Grassroots Relief</p>
          <p className="mt-1 text-2xl font-serif font-bold text-[#F5EBDD]">Al-Muttaqeen</p>
          <p className="mt-1 text-xs text-[#C9B9A6] leading-relaxed">
            Coordinated food distribution drives, orphan visits, and community welfare initiatives.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20">
          <p className="font-mono text-xs text-[#D6A86A] uppercase tracking-wider">Grassroots Skills</p>
          <p className="mt-1 text-2xl font-serif font-bold text-[#F5EBDD]">Digital Literacy</p>
          <p className="mt-1 text-xs text-[#C9B9A6] leading-relaxed">
            Hands-on workshops teaching CV design, eCitizen navigation, and computer fundamentals to youth.
          </p>
        </div>
      </div>

      {/* Leadership Roles Section */}
      <section className="space-y-6 pt-4">
        <h2 className="text-2xl font-serif font-bold text-[#F5EBDD] flex items-center gap-3">
          <span>Active Responsibilities & Service Record</span>
        </h2>

        <div className="space-y-6">
          {leadershipData.roles.map((role) => {
            const IconComponent = categoryIcons[role.category] || Users;

            return (
              <div
                key={role.id}
                className="p-6 sm:p-7 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 hover:border-[#D6A86A]/45 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D6A86A]/15 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#221711] text-[#D6A86A] border border-[#D6A86A]/25">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-[#F5EBDD]">
                        {role.role}
                      </h3>
                      <p className="text-xs text-[#D6A86A] font-medium">
                        {role.organization}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#8F7F70] self-start sm:self-center">
                    {role.period}
                  </span>
                </div>

                <p className="mt-4 text-sm text-[#C9B9A6] leading-relaxed">
                  {role.summary}
                </p>

                {/* Key Responsibilities */}
                <div className="mt-5 space-y-2.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#F5EBDD]">
                    Core Operational Duties:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#C9B9A6]">
                    {role.keyResponsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-[#1C1511]/50 p-2.5 rounded-lg border border-[#D6A86A]/10">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A86A] shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Concrete Learning */}
                <div className="mt-5 p-4 rounded-lg bg-[#1C1511] border-l-2 border-[#D6A86A] text-xs text-[#C9B9A6] space-y-1">
                  <span className="font-semibold text-[#D6A86A] uppercase tracking-wider text-[11px] block">
                    Leadership Takeaway:
                  </span>
                  <p className="leading-relaxed italic">
                    {role.concreteLearnings}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Leadership Reflections Section */}
      <section className="space-y-6 pt-8 border-t border-[#D6A86A]/20">
        <h2 className="text-2xl font-serif font-bold text-[#F5EBDD]">
          Reflections on Governance, Duty, and Patience
        </h2>
        <p className="text-sm text-[#C9B9A6] max-w-2xl leading-relaxed">
          Observations written during quiet hours in the Starehe prefects' room and following community field operations in Mandera.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadershipData.reflections.map((ref) => (
            <div
              key={ref.id}
              className="p-6 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[11px] text-[#D6A86A] uppercase tracking-wider">
                  {ref.theme}
                </span>
                <h3 className="text-lg font-serif font-bold text-[#F5EBDD] mt-1 mb-3">
                  {ref.title}
                </h3>
                <blockquote className="text-xs italic text-[#F5EBDD]/90 border-l border-[#D6A86A]/40 pl-3 py-0.5 mb-4 font-serif">
                  “{ref.quoteSnippet}”
                </blockquote>
                <p className="text-xs text-[#C9B9A6] leading-relaxed">
                  {ref.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
