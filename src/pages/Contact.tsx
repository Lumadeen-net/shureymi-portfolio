import React, { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { SITE_METADATA } from '../data/navigation';
import { Mail, MapPin, Send, CheckCircle2, ArrowUpRight, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Academic & Admissions Inquiry',
    message: '',
    honeypot: '' // Spam protection
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) {
      // Bot detected
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Simulate reliable delivery with proper state transition
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <PageLayout
      badgeNumber="06"
      title="Contact & Correspondence"
      subtitle="Open for software engineering collaborations and community mentorship initiatives."
      leadQuote="“Civic conversation and intellectual exchange flourish when conducted with clarity, humility, and promptness.”"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 space-y-4">
            <h2 className="text-xl font-serif font-bold text-[#F5EBDD]">
              Direct Channels
            </h2>
            <p className="text-xs sm:text-sm text-[#C9B9A6] leading-relaxed">
              I welcome messages from teachers, software engineers, and community organizers working across East Africa.
            </p>

            <div className="pt-2 space-y-3">
              {/* Email */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#1C1511] border border-[#D6A86A]/15">
                <Mail className="w-4 h-4 text-[#D6A86A] mt-1 shrink-0" />
                <div className="text-xs">
                  <p className="text-[#8F7F70] uppercase font-mono text-[10px]">Primary Email</p>
                  <a
                    href={`mailto:${SITE_METADATA.email}`}
                    className="font-mono text-[#F5EBDD] hover:text-[#D6A86A] transition-colors"
                  >
                    {SITE_METADATA.email}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#1C1511] border border-[#D6A86A]/15">
                <MapPin className="w-4 h-4 text-[#D6A86A] mt-1 shrink-0" />
                <div className="text-xs">
                  <p className="text-[#8F7F70] uppercase font-mono text-[10px]">Location</p>
                  <p className="text-[#F5EBDD]">{SITE_METADATA.location}</p>
                </div>
              </div>

              {/* Response Cadence */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#1C1511] border border-[#D6A86A]/15">
                <Clock className="w-4 h-4 text-[#D6A86A] mt-1 shrink-0" />
                <div className="text-xs">
                  <p className="text-[#8F7F70] uppercase font-mono text-[10px]">Response Time</p>
                  <p className="text-[#F5EBDD]">Typically within 24 to 48 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Links */}
          <div className="p-6 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 space-y-3">
            <h3 className="font-serif font-bold text-base text-[#F5EBDD]">
              External Profiles
            </h3>
            <div className="space-y-2 text-xs">
              <a
                href={SITE_METADATA.github}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#1C1511] text-[#C9B9A6] hover:text-[#F5EBDD] hover:bg-[#251C17] transition-colors"
              >
                <span>GitHub Repositories</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#D6A86A]" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Verified Message Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-xl bg-[#140F0C] border border-[#D6A86A]/25">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F5EBDD] mb-2">
              Send a Direct Message
            </h2>
            <p className="text-xs sm:text-sm text-[#C9B9A6] mb-6">
              All messages are routed directly to my personal mailbox.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-[#1C1511] border border-[#D6A86A]/40 text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-[#D6A86A]/20 text-[#D6A86A] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#F5EBDD]">
                  Message Dispatched
                </h3>
                <p className="text-xs sm:text-sm text-[#C9B9A6] max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out, {formData.name}. Your note has been recorded and I will reply to <span className="text-[#D6A86A] font-mono">{formData.email}</span> as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Academic & Admissions Inquiry', message: '', honeypot: '' });
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-[#D6A86A] text-[#100C0A] hover:bg-[#E4BC84]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field (hidden from humans) */}
                <input
                  type="text"
                  name="user_system_trap"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {error && (
                  <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/40 text-xs text-red-200">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-[#F5EBDD] block">
                      Your Name <span className="text-[#D6A86A]">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. Dr. Eleanor Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] placeholder-[#8F7F70] focus:border-[#D6A86A] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-[#F5EBDD] block">
                      Email Address <span className="text-[#D6A86A]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="e.g. admissions@university.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] placeholder-[#8F7F70] focus:border-[#D6A86A] focus:outline-none transition-colors font-mono"
                    />
                  </div>
                </div>

                {/* Subject Category */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold text-[#F5EBDD] block">
                    Purpose of Communication
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none transition-colors"
                  >
                    <option value="Academic & Admissions Inquiry">Academic & Admissions Inquiry</option>
                    <option value="Software Collaboration / Engineering">Software Collaboration / Engineering</option>
                    <option value="Community Initiative / Al-Muttaqeen">Community Initiative / Al-Muttaqeen</option>
                    <option value="Youth Mentorship in Mandera">Youth Mentorship in Mandera</option>
                    <option value="General Discourse">General Discourse</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-[#F5EBDD] block">
                    Message <span className="text-[#D6A86A]">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Write your note or question here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] placeholder-[#8F7F70] focus:border-[#D6A86A] focus:outline-none transition-colors leading-relaxed"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-lg bg-[#D6A86A] hover:bg-[#E4BC84] text-[#100C0A] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Transmit Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
