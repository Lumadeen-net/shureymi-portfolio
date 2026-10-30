import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { QuoteItem } from '../data/books';
import { MilestoneItem, StoryChapter } from '../data/story';
import { EducationEntry, ExperienceEntry, HonorAward } from '../data/resume';
import { LeadershipRole, LeadershipReflection } from '../data/leadership';
import { 
  ArrowLeft, 
  Settings, 
  Quote, 
  Globe, 
  Database, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Milestone,
  FileText,
  Download, 
  Upload, 
  RotateCcw,
  Eye,
  X,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export default function Admin() {
  const {
    siteMetadata,
    quotes,
    storyData,
    resumeData,
    leadershipData,
    updateSiteMetadata,
    updateQuote,
    createQuote,
    deleteQuote,
    updateStoryData,
    updateMilestone,
    createMilestone,
    deleteMilestone,
    reorderMilestones,
    updateStoryChapter,
    updateLeadershipRole,
    addLeadershipRole,
    deleteLeadershipRole,
    reorderLeadershipRoles,
    updateLeadershipReflection,
    addLeadershipReflection,
    deleteLeadershipReflection,
    reorderLeadershipReflections,
    updateResumeData,
    updateEducation,
    addEducation,
    deleteEducation,
    updateExperience,
    addExperience,
    deleteExperience,
    updateLeadershipItem,
    addLeadershipItem,
    deleteLeadershipItem,
    updateSkillCategory,
    addSkillCategory,
    deleteSkillCategory,
    updateHonorAward,
    addHonorAward,
    deleteHonorAward,
    saveContent,
    resetToDefaults,
    exportJSON,
    importJSON
  } = useContent();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('shureymi_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active section tab
  const [activeTab, setActiveTab] = useState<'story' | 'leadership' | 'resume' | 'vision' | 'quotes' | 'backup'>('story');

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // -------------------------------------------------------------
  // MILESTONES STATE
  // -------------------------------------------------------------
  const [editingMilestone, setEditingMilestone] = useState<MilestoneItem | null>(null);
  const [isCreatingMilestone, setIsCreatingMilestone] = useState(false);
  const [milestoneForm, setMilestoneForm] = useState({
    year: '',
    title: '',
    description: ''
  });

  // -------------------------------------------------------------
  // STORY CHAPTER EDITING
  // -------------------------------------------------------------
  const [editingChapter, setEditingChapter] = useState<StoryChapter | null>(null);
  const [chapterForm, setChapterForm] = useState({
    title: '',
    paragraphsRaw: ''
  });

  // -------------------------------------------------------------
  // RESUME MODAL / EDITORS
  // -------------------------------------------------------------
  const [resumeSubTab, setResumeSubTab] = useState<'summary' | 'education' | 'experience' | 'skills' | 'honors'>('summary');

  // Education edit
  const [editingEduIndex, setEditingEduIndex] = useState<number | null>(null);
  const [isCreatingEdu, setIsCreatingEdu] = useState(false);
  const [eduForm, setEduForm] = useState<EducationEntry>({
    institution: '',
    degreeOrCertificate: '',
    period: '',
    location: '',
    details: []
  });
  const [eduDetailsRaw, setEduDetailsRaw] = useState('');

  // Experience edit
  const [editingExpIndex, setEditingExpIndex] = useState<number | null>(null);
  const [isCreatingExp, setIsCreatingExp] = useState(false);
  const [expForm, setExpForm] = useState<ExperienceEntry>({
    role: '',
    organization: '',
    period: '',
    location: '',
    bullets: []
  });
  const [expBulletsRaw, setExpBulletsRaw] = useState('');

  // Skills edit
  const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(null);
  const [isCreatingSkill, setIsCreatingSkill] = useState(false);
  const [skillForm, setSkillForm] = useState<{ title: string; skillsRaw: string }>({
    title: '',
    skillsRaw: ''
  });

  // Honors edit
  const [editingHonorIndex, setEditingHonorIndex] = useState<number | null>(null);
  const [isCreatingHonor, setIsCreatingHonor] = useState(false);
  const [honorForm, setHonorForm] = useState<HonorAward>({
    title: '',
    issuer: '',
    year: '',
    description: ''
  });

  // -------------------------------------------------------------
  // QUOTES STATE
  // -------------------------------------------------------------
  const [editingQuote, setEditingQuote] = useState<QuoteItem | null>(null);
  const [isCreatingQuote, setIsCreatingQuote] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    quote: '',
    author: '',
    sourceContext: '',
    myPerspective: ''
  });

  // Backup / Import state
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'shureymi2026' || passcode === 'admin' || passcode === 'mandera') {
      setIsAuthenticated(true);
      sessionStorage.setItem('shureymi_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect access key. (Default passcode: shureymi2026)');
    }
  };

  const handleDirectUnlock = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('shureymi_admin_auth', 'true');
  };

  const handleSaveAll = () => {
    saveContent();
    showToast('Changes saved locally in this browser.');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('shureymi_admin_auth');
  };

  // --- Milestone Handlers ---
  const openEditMilestone = (m: MilestoneItem) => {
    setEditingMilestone(m);
    setIsCreatingMilestone(false);
    setMilestoneForm({
      year: m.year,
      title: m.title,
      description: m.description
    });
  };

  const openNewMilestone = () => {
    setEditingMilestone(null);
    setIsCreatingMilestone(true);
    setMilestoneForm({
      year: '2026',
      title: '',
      description: ''
    });
  };

  const handleSaveMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreatingMilestone) {
      createMilestone(milestoneForm);
      showToast('New milestone added.');
    } else if (editingMilestone) {
      updateMilestone(editingMilestone.id, milestoneForm);
      showToast('Milestone updated.');
    }
    setEditingMilestone(null);
    setIsCreatingMilestone(false);
  };

  // --- Story Chapter Handlers ---
  const openEditChapter = (chapter: StoryChapter) => {
    setEditingChapter(chapter);
    setChapterForm({
      title: chapter.title,
      paragraphsRaw: chapter.paragraphs.join('\n\n')
    });
  };

  const handleSaveChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChapter) return;
    const paragraphs = chapterForm.paragraphsRaw
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    updateStoryChapter(editingChapter.id, {
      title: chapterForm.title,
      paragraphs
    });
    setEditingChapter(null);
    showToast('Story chapter updated.');
  };

  // --- Quote Handlers ---
  const openEditQuote = (quote: QuoteItem) => {
    setEditingQuote(quote);
    setIsCreatingQuote(false);
    setQuoteForm({
      quote: quote.quote,
      author: quote.author,
      sourceContext: quote.sourceContext,
      myPerspective: quote.myPerspective
    });
  };

  const openNewQuote = () => {
    setEditingQuote(null);
    setIsCreatingQuote(true);
    setQuoteForm({
      quote: '',
      author: '',
      sourceContext: '',
      myPerspective: ''
    });
  };

  const handleSaveQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreatingQuote) {
      createQuote(quoteForm);
      showToast('New maxim / quote added.');
    } else if (editingQuote) {
      updateQuote(editingQuote.id, quoteForm);
      showToast('Quote updated and saved.');
    }
    setEditingQuote(null);
    setIsCreatingQuote(false);
  };

  // If not authenticated, render login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#100C0A] text-[#F5EBDD] flex flex-col justify-between selection:bg-[#D6A86A]/30">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-[#C9B9A6] hover:text-[#D6A86A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto px-4 py-8">
          <div className="p-8 rounded-2xl bg-[#140F0C] border border-[#D6A86A]/25 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-[#1C1511] border border-[#D6A86A]/30 flex items-center justify-center mx-auto text-[#D6A86A]">
                <Settings className="w-6 h-6 animate-[spin_10s_linear_infinite]" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-[#F5EBDD]">
                Editorial Console
              </h1>
              <p className="text-xs text-[#C9B9A6]">
                Manage Story chapters, leadership reflections, and core vision statements.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {authError && (
                <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/50 text-xs text-red-200">
                  {authError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#F5EBDD]">
                  Access Key
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter editorial key..."
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#1C1511] border border-[#D6A86A]/25 text-xs text-[#F5EBDD] placeholder-[#8F7F70] focus:border-[#D6A86A] focus:outline-none font-mono"
                  />
                  <Lock className="w-4 h-4 text-[#8F7F70] absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-[#D6A86A] hover:bg-[#E4BC84] text-[#100C0A] font-semibold text-xs tracking-wider uppercase transition-colors"
              >
                Unlock Console
              </button>
            </form>

            <div className="pt-4 border-t border-[#D6A86A]/15 text-center space-y-2">
              <p className="text-[11px] text-[#8F7F70]">
                Author fast-track:
              </p>
              <button
                onClick={handleDirectUnlock}
                className="text-xs text-[#D6A86A] hover:underline inline-flex items-center gap-1.5 font-medium"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Enter as Shureymi Haji</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center py-6 text-xs text-[#8F7F70]">
          © {new Date().getFullYear()} Shureymi Haji · Personal Editorial System
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#100C0A] text-[#F5EBDD] flex flex-col selection:bg-[#D6A86A]/30">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1C1511] border border-[#D6A86A] text-xs text-[#F5EBDD] shadow-xl animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-[#D6A86A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar */}
      <header className="border-b border-[#D6A86A]/20 bg-[#140F0C] sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-1.5 rounded-lg bg-[#1C1511] text-[#C9B9A6] hover:text-[#D6A86A] border border-[#D6A86A]/15 transition-colors"
              title="Return to website"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-base font-serif font-bold text-[#F5EBDD] flex items-center gap-2">
                <span>Editorial Control Panel</span>
                <span className="text-[11px] font-mono text-[#D6A86A] bg-[#221711] px-2 py-0.5 rounded border border-[#D6A86A]/20">
                  Live Sync
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/story"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#C9B9A6] hover:text-[#F5EBDD] bg-[#1C1511] rounded-lg border border-[#D6A86A]/20 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-[#D6A86A]" />
              <span>Preview Story</span>
            </Link>

            <Link
              to="/leadership"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#C9B9A6] hover:text-[#F5EBDD] bg-[#1C1511] rounded-lg border border-[#D6A86A]/20 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#D6A86A]" />
              <span>Preview Leadership</span>
            </Link>

            <button
              type="button"
              onClick={handleSaveAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D6A86A] text-[#100C0A] hover:bg-[#E4BC84] text-xs font-semibold transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-[#1C1511] text-[#8F7F70] hover:text-[#F5EBDD] text-xs border border-[#D6A86A]/15 transition-colors flex items-center gap-1.5"
              title="Lock Console"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 border-b border-[#D6A86A]/15 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('story')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'story'
                ? 'bg-[#D6A86A] text-[#100C0A]'
                : 'text-[#C9B9A6] hover:text-[#F5EBDD] hover:bg-[#1C1511]'
            }`}
          >
            <Milestone className="w-3.5 h-3.5" />
            <span>Story & Milestones ({storyData.milestones.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('leadership')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'leadership'
                ? 'bg-[#D6A86A] text-[#100C0A]'
                : 'text-[#C9B9A6] hover:text-[#F5EBDD] hover:bg-[#1C1511]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Leadership ({leadershipData.roles.length + leadershipData.reflections.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'resume'
                ? 'bg-[#D6A86A] text-[#100C0A]'
                : 'text-[#C9B9A6] hover:text-[#F5EBDD] hover:bg-[#1C1511]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Résumé ({resumeData.education.length + resumeData.experience.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('vision')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'vision'
                ? 'bg-[#D6A86A] text-[#100C0A]'
                : 'text-[#C9B9A6] hover:text-[#F5EBDD] hover:bg-[#1C1511]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Vision & Identity</span>
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'quotes'
                ? 'bg-[#D6A86A] text-[#100C0A]'
                : 'text-[#C9B9A6] hover:text-[#F5EBDD] hover:bg-[#1C1511]'
            }`}
          >
            <Quote className="w-3.5 h-3.5" />
            <span>Quotes ({quotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'backup'
                ? 'bg-[#D6A86A] text-[#100C0A]'
                : 'text-[#C9B9A6] hover:text-[#F5EBDD] hover:bg-[#1C1511]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Backup & Data</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: MY STORY & KEY MILESTONES */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'story' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#F5EBDD]">
                My Story & Key Milestones
              </h2>
              <p className="text-xs text-[#C9B9A6]">
                Control the narrative chapters, pull quotes, overview cards, and chronological milestones displayed on /story.
              </p>
            </div>

            {/* Sub-section A: Key Milestones */}
            <div className="space-y-4 p-6 rounded-2xl bg-[#140F0C] border border-[#D6A86A]/25">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D6A86A]/15 pb-4">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#F5EBDD] flex items-center gap-2">
                    <Milestone className="w-4 h-4 text-[#D6A86A]" />
                    <span>Chronological Key Milestones ({storyData.milestones.length})</span>
                  </h3>
                  <p className="text-xs text-[#C9B9A6]">
                    Timeline points shown on the My Story page.
                  </p>
                </div>

                {!isCreatingMilestone && !editingMilestone && (
                  <button
                    onClick={openNewMilestone}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#D6A86A] text-[#100C0A] hover:bg-[#E4BC84] rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Milestone</span>
                  </button>
                )}
              </div>

              {/* Edit / Create Milestone Form */}
              {(isCreatingMilestone || editingMilestone) ? (
                <form onSubmit={handleSaveMilestone} className="p-5 rounded-xl bg-[#1C1511] border border-[#D6A86A]/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-serif font-bold text-[#F5EBDD]">
                      {isCreatingMilestone ? 'New Milestone' : `Edit Milestone (${editingMilestone?.year})`}
                    </h4>
                    <button
                      type="button"
                      onClick={() => { setEditingMilestone(null); setIsCreatingMilestone(false); }}
                      className="p-1 rounded text-[#8F7F70] hover:text-[#F5EBDD]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#F5EBDD] block">Year / Period *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 2024 – 2025"
                        value={milestoneForm.year}
                        onChange={(e) => setMilestoneForm({ ...milestoneForm, year: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none font-mono"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-[#F5EBDD] block">Milestone Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Leadership & Community Service"
                        value={milestoneForm.title}
                        onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#F5EBDD] block">Description *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Details of the accomplishment, context, or transition..."
                      value={milestoneForm.description}
                      onChange={(e) => setMilestoneForm({ ...milestoneForm, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => { setEditingMilestone(null); setIsCreatingMilestone(false); }}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#140F0C] text-[#C9B9A6]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#D6A86A] text-[#100C0A] hover:bg-[#E4BC84]"
                    >
                      Save Milestone
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  {storyData.milestones.map((m) => (
                    <div
                      key={m.id}
                      className="p-4 rounded-xl bg-[#1C1511]/70 border border-[#D6A86A]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#D6A86A]">{m.year}</span>
                          <span className="text-[#8F7F70]">·</span>
                          <h4 className="text-sm font-serif font-bold text-[#F5EBDD]">{m.title}</h4>
                        </div>
                        <p className="text-xs text-[#C9B9A6] leading-relaxed line-clamp-2">
                          {m.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              const index = storyData.milestones.findIndex(item => item.id === m.id);
                              if (index > 0) reorderMilestones(index, index - 1);
                            }}
                            className="p-1.5 rounded-lg bg-[#140F0C] text-[#D6A86A] hover:bg-[#2A1F17] border border-[#D6A86A]/20 disabled:opacity-40 disabled:cursor-not-allowed"
                            disabled={storyData.milestones.findIndex(item => item.id === m.id) === 0}
                            title="Move up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const index = storyData.milestones.findIndex(item => item.id === m.id);
                              if (index < storyData.milestones.length - 1) reorderMilestones(index, index + 1);
                            }}
                            className="p-1.5 rounded-lg bg-[#140F0C] text-[#D6A86A] hover:bg-[#2A1F17] border border-[#D6A86A]/20 disabled:opacity-40 disabled:cursor-not-allowed"
                            disabled={storyData.milestones.findIndex(item => item.id === m.id) === storyData.milestones.length - 1}
                            title="Move down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => openEditMilestone(m)}
                          className="p-1.5 rounded-lg bg-[#140F0C] text-[#D6A86A] hover:bg-[#2A1F17] border border-[#D6A86A]/20"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete milestone "${m.title}"?`)) {
                              deleteMilestone(m.id);
                              showToast('Milestone removed.');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-[#140F0C] text-[#8F7F70] hover:text-red-400 border border-red-900/20"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sub-section B: Quotes in Story */}
            <div className="p-6 rounded-2xl bg-[#140F0C] border border-[#D6A86A]/25 space-y-4">
              <h3 className="text-base font-serif font-bold text-[#F5EBDD]">
                Story Lead Quote & Journal Reflection
              </h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#F5EBDD] block">
                    Page Lead Quote (Top of /story)
                  </label>
                  <textarea
                    rows={2}
                    value={storyData.leadQuote}
                    onChange={(e) => updateStoryData({ leadQuote: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none font-serif italic"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#F5EBDD] block">
                      Pull Quote Text
                    </label>
                    <textarea
                      rows={2}
                      value={storyData.pullQuote.quote}
                      onChange={(e) => updateStoryData({
                        pullQuote: { ...storyData.pullQuote, quote: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none font-serif italic"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#F5EBDD] block">
                      Pull Quote Attribution
                    </label>
                    <input
                      type="text"
                      value={storyData.pullQuote.attribution}
                      onChange={(e) => updateStoryData({
                        pullQuote: { ...storyData.pullQuote, attribution: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-section C: Story Chapters / Essays */}
            <div className="space-y-4 p-6 rounded-2xl bg-[#140F0C] border border-[#D6A86A]/25">
              <h3 className="text-base font-serif font-bold text-[#F5EBDD]">
                Story Chapters ({storyData.chapters.length})
              </h3>
              <p className="text-xs text-[#C9B9A6]">
                Edit the text of chapters like "Growing Up in Mandera", "My Journey to Starehe", etc.
              </p>

              {editingChapter ? (
                <form onSubmit={handleSaveChapter} className="p-5 rounded-xl bg-[#1C1511] border border-[#D6A86A]/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-serif font-bold text-[#F5EBDD]">
                      Editing: {editingChapter.title}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingChapter(null)}
                      className="p-1 rounded text-[#8F7F70] hover:text-[#F5EBDD]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#F5EBDD] block">Chapter Title</label>
                    <input
                      type="text"
                      required
                      value={chapterForm.title}
                      onChange={(e) => setChapterForm({ ...chapterForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#F5EBDD] block">
                      Chapter Content (Separate paragraphs with double newlines)
                    </label>
                    <textarea
                      required
                      rows={8}
                      value={chapterForm.paragraphsRaw}
                      onChange={(e) => setChapterForm({ ...chapterForm, paragraphsRaw: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none font-sans leading-relaxed"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingChapter(null)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#140F0C] text-[#C9B9A6]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#D6A86A] text-[#100C0A] hover:bg-[#E4BC84]"
                    >
                      Save Chapter
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  {storyData.chapters.map((ch) => (
                    <div
                      key={ch.id}
                      className="p-4 rounded-xl bg-[#1C1511]/70 border border-[#D6A86A]/15 flex items-center justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-sm font-serif font-bold text-[#F5EBDD]">{ch.title}</h4>
                        <p className="text-xs text-[#C9B9A6] line-clamp-1 mt-0.5">
                          {ch.paragraphs[0]}
                        </p>
                      </div>
                      <button
                        onClick={() => openEditChapter(ch)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#140F0C] text-[#D6A86A] border border-[#D6A86A]/20 hover:bg-[#2A1F17]"
                      >
                        Edit Chapter
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: LEADERSHIP & COMMUNITY SERVICE */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'leadership' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#F5EBDD]">
                Leadership & Community Service
              </h2>
              <p className="text-xs text-[#C9B9A6]">
                Edit the core leadership responsibilities and the reflection pieces shown in the public Leadership page.
              </p>
            </div>

            <div className="space-y-5 p-6 rounded-2xl bg-[#140F0C] border border-[#D6A86A]/25">
              <div className="flex items-center justify-between gap-3 border-b border-[#D6A86A]/15 pb-4">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#F5EBDD]">Leadership Roles ({leadershipData.roles.length})</h3>
                </div>
                <button
                  type="button"
                  onClick={() => addLeadershipRole({
                    id: `role-${Date.now()}`,
                    role: 'New Leadership Role',
                    organization: 'Organization Name',
                    period: '2026 – Present',
                    category: 'Community Organization',
                    summary: 'Add a short overview of this responsibility here.',
                    keyResponsibilities: ['Add your first responsibility.'],
                    concreteLearnings: 'Add the leadership learning or principle this role reinforced.'
                  })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#D6A86A] text-[#100C0A] rounded-lg hover:bg-[#E4BC84]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Role
                </button>
              </div>

              <div className="space-y-4">
                {leadershipData.roles.map((role, index) => (
                  <div key={role.id} className="p-4 rounded-xl bg-[#1C1511]/70 border border-[#D6A86A]/15 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[11px] font-semibold uppercase tracking-wide text-[#F5EBDD]">Role Title</label>
                        <input
                          type="text"
                          value={role.role}
                          onChange={(e) => updateLeadershipRole(index, { role: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase tracking-wide text-[#F5EBDD]">Organization</label>
                        <input
                          type="text"
                          value={role.organization}
                          onChange={(e) => updateLeadershipRole(index, { organization: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase tracking-wide text-[#F5EBDD]">Period</label>
                        <input
                          type="text"
                          value={role.period}
                          onChange={(e) => updateLeadershipRole(index, { period: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                        />
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[11px] font-semibold uppercase tracking-wide text-[#F5EBDD]">Category</label>
                        <select
                          value={role.category}
                          onChange={(e) => updateLeadershipRole(index, { category: e.target.value as LeadershipRole['category'] })}
                          className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                        >
                          <option value="Community Organization">Community Organization</option>
                          <option value="School Leadership">School Leadership</option>
                          <option value="Youth Empowerment">Youth Empowerment</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold uppercase tracking-wide text-[#F5EBDD]">Summary</label>
                      <textarea
                        rows={3}
                        value={role.summary}
                        onChange={(e) => updateLeadershipRole(index, { summary: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold uppercase tracking-wide text-[#F5EBDD]">Key Responsibilities (one per line)</label>
                      <textarea
                        rows={5}
                        value={role.keyResponsibilities.join('\n')}
                        onChange={(e) => updateLeadershipRole(index, {
                          keyResponsibilities: e.target.value
                            .split('\n')
                            .map((item) => item.trim())
                            .filter(Boolean)
                        })}
                        className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold uppercase tracking-wide text-[#F5EBDD]">Leadership Takeaway</label>
                      <textarea
                        rows={3}
                        value={role.concreteLearnings}
                        onChange={(e) => updateLeadershipRole(index, { concreteLearnings: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => reorderLeadershipRoles(index, index - 1)}
                          className="p-1.5 rounded-lg bg-[#140F0C] text-[#D6A86A] border border-[#D6A86A]/20 hover:bg-[#2A1F17] disabled:opacity-40 disabled:cursor-not-allowed"
                          disabled={index === 0}
                          title="Move up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => reorderLeadershipRoles(index, index + 1)}
                          className="p-1.5 rounded-lg bg-[#140F0C] text-[#D6A86A] border border-[#D6A86A]/20 hover:bg-[#2A1F17] disabled:opacity-40 disabled:cursor-not-allowed"
                          disabled={index === leadershipData.roles.length - 1}
                          title="Move down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteLeadershipRole(index)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#1C1511] text-[#D6A86A] border border-[#D6A86A]/20 hover:bg-[#2A1F17]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete Role
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5 p-6 rounded-2xl bg-[#140F0C] border border-[#D6A86A]/25">
              <div className="flex items-center justify-between gap-3 border-b border-[#D6A86A]/15 pb-4">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#F5EBDD]">Leadership Reflections ({leadershipData.reflections.length})</h3>
                </div>
                <button
                  type="button"
                  onClick={() => addLeadershipReflection({
                    id: `reflection-${Date.now()}`,
                    title: 'New Reflection',
                    theme: 'Leadership',
                    quoteSnippet: 'Add a quote here.',
                    body: 'Add the reflective paragraph for this new leadership insight.'
                  })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#D6A86A] text-[#100C0A] rounded-lg hover:bg-[#E4BC84]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Reflection
                </button>
              </div>

              <div className="space-y-4">
                {leadershipData.reflections.map((reflection, index) => (
                  <div key={reflection.id} className="p-4 rounded-xl bg-[#1C1511]/70 border border-[#D6A86A]/15 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase tracking-wide text-[#F5EBDD]">Title</label>
                        <input
                          type="text"
                          value={reflection.title}
                          onChange={(e) => updateLeadershipReflection(index, { title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold uppercase tracking-wide text-[#F5EBDD]">Theme</label>
                        <input
                          type="text"
                          value={reflection.theme}
                          onChange={(e) => updateLeadershipReflection(index, { theme: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold uppercase tracking-wide text-[#F5EBDD]">Quote Snippet</label>
                      <input
                        type="text"
                        value={reflection.quoteSnippet}
                        onChange={(e) => updateLeadershipReflection(index, { quoteSnippet: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold uppercase tracking-wide text-[#F5EBDD]">Body</label>
                      <textarea
                        rows={5}
                        value={reflection.body}
                        onChange={(e) => updateLeadershipReflection(index, { body: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => reorderLeadershipReflections(index, index - 1)}
                          className="p-1.5 rounded-lg bg-[#140F0C] text-[#D6A86A] border border-[#D6A86A]/20 hover:bg-[#2A1F17] disabled:opacity-40 disabled:cursor-not-allowed"
                          disabled={index === 0}
                          title="Move up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => reorderLeadershipReflections(index, index + 1)}
                          className="p-1.5 rounded-lg bg-[#140F0C] text-[#D6A86A] border border-[#D6A86A]/20 hover:bg-[#2A1F17] disabled:opacity-40 disabled:cursor-not-allowed"
                          disabled={index === leadershipData.reflections.length - 1}
                          title="Move down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteLeadershipReflection(index)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#1C1511] text-[#D6A86A] border border-[#D6A86A]/20 hover:bg-[#2A1F17]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete Reflection
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: RÉSUMÉ & EXPERIENCE */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'resume' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#F5EBDD]">
                Résumé, Education & Qualifications
              </h2>
              <p className="text-xs text-[#C9B9A6]">
                Adjust academic entries, software roles, institutional leadership records, and technical skills shown on /resume.
              </p>
            </div>

            {/* Sub-tabs within Resume */}
            <div className="flex items-center gap-2 border-b border-[#D6A86A]/15 pb-2">
              {(['summary', 'education', 'experience', 'skills', 'honors'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setResumeSubTab(st)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                    resumeSubTab === st
                      ? 'bg-[#1C1511] text-[#D6A86A] border border-[#D6A86A]/30'
                      : 'text-[#C9B9A6] hover:text-[#F5EBDD]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Sub-Tab 1: Summary */}
            {resumeSubTab === 'summary' && (
              <div className="p-6 rounded-2xl bg-[#140F0C] border border-[#D6A86A]/25 space-y-4 max-w-3xl">
                <h3 className="text-base font-serif font-bold text-[#F5EBDD]">
                  Executive Profile Summary
                </h3>
                <textarea
                  rows={4}
                  value={resumeData.summary}
                  onChange={(e) => updateResumeData({ summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none leading-relaxed"
                />
                <button
                  onClick={() => showToast('Résumé summary saved.')}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#D6A86A] text-[#100C0A] hover:bg-[#E4BC84]"
                >
                  Save Summary
                </button>
              </div>
            )}

            {/* Sub-Tab 2: Education */}
            {resumeSubTab === 'education' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-serif font-bold text-[#F5EBDD]">
                    Academic Background ({resumeData.education.length})
                  </h3>
                  {!isCreatingEdu && editingEduIndex === null && (
                    <button
                      onClick={() => {
                        setIsCreatingEdu(true);
                        setEditingEduIndex(null);
                        setEduForm({
                          institution: '',
                          degreeOrCertificate: '',
                          period: '',
                          location: '',
                          details: []
                        });
                        setEduDetailsRaw('');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#D6A86A] text-[#100C0A] rounded-lg"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Education</span>
                    </button>
                  )}
                </div>

                {(isCreatingEdu || editingEduIndex !== null) ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const details = eduDetailsRaw.split('\n').map(s => s.trim()).filter(Boolean);
                      if (isCreatingEdu) {
                        addEducation({ ...eduForm, details });
                        showToast('Education record added.');
                      } else if (editingEduIndex !== null) {
                        updateEducation(editingEduIndex, { ...eduForm, details });
                        showToast('Education record updated.');
                      }
                      setIsCreatingEdu(false);
                      setEditingEduIndex(null);
                    }}
                    className="p-5 rounded-xl bg-[#1C1511] border border-[#D6A86A]/30 space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#F5EBDD] block">Institution *</label>
                        <input
                          type="text"
                          required
                          value={eduForm.institution}
                          onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#F5EBDD] block">Degree / Certificate *</label>
                        <input
                          type="text"
                          required
                          value={eduForm.degreeOrCertificate}
                          onChange={(e) => setEduForm({ ...eduForm, degreeOrCertificate: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#F5EBDD] block">Period *</label>
                        <input
                          type="text"
                          required
                          value={eduForm.period}
                          onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#F5EBDD] block">Location *</label>
                        <input
                          type="text"
                          required
                          value={eduForm.location}
                          onChange={(e) => setEduForm({ ...eduForm, location: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#F5EBDD] block">
                        Bullet Details (1 bullet per line)
                      </label>
                      <textarea
                        rows={3}
                        value={eduDetailsRaw}
                        onChange={(e) => setEduDetailsRaw(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => { setIsCreatingEdu(false); setEditingEduIndex(null); }}
                        className="px-3 py-1.5 text-xs bg-[#140F0C] rounded-lg text-[#C9B9A6]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#D6A86A] text-[#100C0A]"
                      >
                        Save Education
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-3">
                    {resumeData.education.map((edu, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <h4 className="font-serif font-bold text-sm text-[#F5EBDD]">{edu.institution}</h4>
                          <p className="text-xs text-[#D6A86A]">{edu.degreeOrCertificate}</p>
                          <p className="text-[11px] font-mono text-[#8F7F70]">{edu.period} · {edu.location}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingEduIndex(idx);
                              setIsCreatingEdu(false);
                              setEduForm(edu);
                              setEduDetailsRaw(edu.details.join('\n'));
                            }}
                            className="p-1.5 rounded-lg bg-[#1C1511] text-[#D6A86A] border border-[#D6A86A]/20"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${edu.institution}?`)) {
                                deleteEducation(idx);
                                showToast('Education removed.');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-[#1C1511] text-[#8F7F70] hover:text-red-400 border border-red-900/20"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Sub-Tab 3: Experience */}
            {resumeSubTab === 'experience' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-serif font-bold text-[#F5EBDD]">
                    Experience Roles ({resumeData.experience.length})
                  </h3>
                  {!isCreatingExp && editingExpIndex === null && (
                    <button
                      onClick={() => {
                        setIsCreatingExp(true);
                        setEditingExpIndex(null);
                        setExpForm({
                          role: '',
                          organization: '',
                          period: '',
                          location: '',
                          bullets: []
                        });
                        setExpBulletsRaw('');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#D6A86A] text-[#100C0A] rounded-lg"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Role</span>
                    </button>
                  )}
                </div>

                {(isCreatingExp || editingExpIndex !== null) ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const bullets = expBulletsRaw.split('\n').map(s => s.trim()).filter(Boolean);
                      if (isCreatingExp) {
                        addExperience({ ...expForm, bullets });
                        showToast('Role added.');
                      } else if (editingExpIndex !== null) {
                        updateExperience(editingExpIndex, { ...expForm, bullets });
                        showToast('Role updated.');
                      }
                      setIsCreatingExp(false);
                      setEditingExpIndex(null);
                    }}
                    className="p-5 rounded-xl bg-[#1C1511] border border-[#D6A86A]/30 space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#F5EBDD] block">Role Title *</label>
                        <input
                          type="text"
                          required
                          value={expForm.role}
                          onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#F5EBDD] block">Organization *</label>
                        <input
                          type="text"
                          required
                          value={expForm.organization}
                          onChange={(e) => setExpForm({ ...expForm, organization: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#F5EBDD] block">Period *</label>
                        <input
                          type="text"
                          required
                          value={expForm.period}
                          onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#F5EBDD] block">Location *</label>
                        <input
                          type="text"
                          required
                          value={expForm.location}
                          onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#F5EBDD] block">
                        Bullet Achievements (1 bullet per line)
                      </label>
                      <textarea
                        rows={3}
                        value={expBulletsRaw}
                        onChange={(e) => setExpBulletsRaw(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => { setIsCreatingExp(false); setEditingExpIndex(null); }}
                        className="px-3 py-1.5 text-xs bg-[#140F0C] rounded-lg text-[#C9B9A6]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#D6A86A] text-[#100C0A]"
                      >
                        Save Role
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-3">
                    {resumeData.experience.map((exp, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <h4 className="font-serif font-bold text-sm text-[#F5EBDD]">{exp.role}</h4>
                          <p className="text-xs text-[#D6A86A]">{exp.organization}</p>
                          <p className="text-[11px] font-mono text-[#8F7F70]">{exp.period} · {exp.location}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingExpIndex(idx);
                              setIsCreatingExp(false);
                              setExpForm(exp);
                              setExpBulletsRaw(exp.bullets.join('\n'));
                            }}
                            className="p-1.5 rounded-lg bg-[#1C1511] text-[#D6A86A] border border-[#D6A86A]/20"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${exp.role}?`)) {
                                deleteExperience(idx);
                                showToast('Role removed.');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-[#1C1511] text-[#8F7F70] hover:text-red-400 border border-red-900/20"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Sub-Tab 4: Skills */}
            {resumeSubTab === 'skills' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-serif font-bold text-[#F5EBDD]">
                    Technical Skills Categories ({resumeData.technicalSkills.length})
                  </h3>
                  {!isCreatingSkill && editingSkillIndex === null && (
                    <button
                      onClick={() => {
                        setIsCreatingSkill(true);
                        setEditingSkillIndex(null);
                        setSkillForm({ title: '', skillsRaw: '' });
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#D6A86A] text-[#100C0A] rounded-lg"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Category</span>
                    </button>
                  )}
                </div>

                {(isCreatingSkill || editingSkillIndex !== null) ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const skills = skillForm.skillsRaw.split(',').map(s => s.trim()).filter(Boolean);
                      if (isCreatingSkill) {
                        addSkillCategory({ title: skillForm.title, skills });
                        showToast('Skill category added.');
                      } else if (editingSkillIndex !== null) {
                        updateSkillCategory(editingSkillIndex, { title: skillForm.title, skills });
                        showToast('Skill category updated.');
                      }
                      setIsCreatingSkill(false);
                      setEditingSkillIndex(null);
                    }}
                    className="p-5 rounded-xl bg-[#1C1511] border border-[#D6A86A]/30 space-y-4"
                  >
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#F5EBDD] block">Category Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Frameworks & Libraries"
                        value={skillForm.title}
                        onChange={(e) => setSkillForm({ ...skillForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#F5EBDD] block">
                        Skills (Comma-separated) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="React, TypeScript, Tailwind CSS, Vite"
                        value={skillForm.skillsRaw}
                        onChange={(e) => setSkillForm({ ...skillForm, skillsRaw: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => { setIsCreatingSkill(false); setEditingSkillIndex(null); }}
                        className="px-3 py-1.5 text-xs bg-[#140F0C] rounded-lg text-[#C9B9A6]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#D6A86A] text-[#100C0A]"
                      >
                        Save Category
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {resumeData.technicalSkills.map((cat, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 flex items-start justify-between gap-3"
                      >
                        <div>
                          <h4 className="font-mono text-xs font-semibold text-[#D6A86A] uppercase">{cat.title}</h4>
                          <p className="text-xs text-[#C9B9A6] mt-1">{cat.skills.join(', ')}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingSkillIndex(idx);
                              setIsCreatingSkill(false);
                              setSkillForm({ title: cat.title, skillsRaw: cat.skills.join(', ') });
                            }}
                            className="p-1 rounded bg-[#1C1511] text-[#D6A86A]"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${cat.title}?`)) {
                                deleteSkillCategory(idx);
                                showToast('Skill category deleted.');
                              }
                            }}
                            className="p-1 rounded bg-[#1C1511] text-[#8F7F70] hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Sub-Tab 5: Honors */}
            {resumeSubTab === 'honors' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-serif font-bold text-[#F5EBDD]">
                    Honors & Awards ({resumeData.honorsAndAwards.length})
                  </h3>
                  {!isCreatingHonor && editingHonorIndex === null && (
                    <button
                      onClick={() => {
                        setIsCreatingHonor(true);
                        setEditingHonorIndex(null);
                        setHonorForm({ title: '', issuer: '', year: '2025', description: '' });
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#D6A86A] text-[#100C0A] rounded-lg"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Honor</span>
                    </button>
                  )}
                </div>

                {(isCreatingHonor || editingHonorIndex !== null) ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (isCreatingHonor) {
                        addHonorAward(honorForm);
                        showToast('Honor added.');
                      } else if (editingHonorIndex !== null) {
                        updateHonorAward(editingHonorIndex, honorForm);
                        showToast('Honor updated.');
                      }
                      setIsCreatingHonor(false);
                      setEditingHonorIndex(null);
                    }}
                    className="p-5 rounded-xl bg-[#1C1511] border border-[#D6A86A]/30 space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-xs font-semibold text-[#F5EBDD] block">Honor Title *</label>
                        <input
                          type="text"
                          required
                          value={honorForm.title}
                          onChange={(e) => setHonorForm({ ...honorForm, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#F5EBDD] block">Year *</label>
                        <input
                          type="text"
                          required
                          value={honorForm.year}
                          onChange={(e) => setHonorForm({ ...honorForm, year: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#F5EBDD] block">Issuer *</label>
                      <input
                        type="text"
                        required
                        value={honorForm.issuer}
                        onChange={(e) => setHonorForm({ ...honorForm, issuer: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#F5EBDD] block">Description *</label>
                      <textarea
                        rows={2}
                        required
                        value={honorForm.description}
                        onChange={(e) => setHonorForm({ ...honorForm, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#140F0C] border border-[#D6A86A]/20 text-xs text-[#F5EBDD]"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => { setIsCreatingHonor(false); setEditingHonorIndex(null); }}
                        className="px-3 py-1.5 text-xs bg-[#140F0C] rounded-lg text-[#C9B9A6]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#D6A86A] text-[#100C0A]"
                      >
                        Save Honor
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {resumeData.honorsAndAwards.map((h, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 flex items-start justify-between gap-3"
                      >
                        <div>
                          <span className="font-mono text-[10px] text-[#D6A86A] uppercase">{h.year}</span>
                          <h4 className="font-serif font-bold text-sm text-[#F5EBDD]">{h.title}</h4>
                          <p className="text-[11px] text-[#8F7F70]">Issuer: {h.issuer}</p>
                          <p className="text-xs text-[#C9B9A6] mt-1">{h.description}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingHonorIndex(idx);
                              setIsCreatingHonor(false);
                              setHonorForm(h);
                            }}
                            className="p-1 rounded bg-[#1C1511] text-[#D6A86A]"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${h.title}?`)) {
                                deleteHonorAward(idx);
                                showToast('Honor removed.');
                              }
                            }}
                            className="p-1 rounded bg-[#1C1511] text-[#8F7F70] hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: VISION & IDENTITY */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'vision' && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#F5EBDD]">
                Site Identity & Vision Statements
              </h2>
              <p className="text-xs text-[#C9B9A6]">
                Adjust core statements appearing on the cinematic homepage and destination headers.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#140F0C] border border-[#D6A86A]/25 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F5EBDD] block">Author Display Name</label>
                <input
                  type="text"
                  value={siteMetadata.name}
                  onChange={(e) => updateSiteMetadata({ name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F5EBDD] block">Header Values Tagline</label>
                <input
                  type="text"
                  value={siteMetadata.tagline}
                  onChange={(e) => updateSiteMetadata({ tagline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F5EBDD] block">
                  Personal Vision Statement (Homepage & Footer)
                </label>
                <textarea
                  rows={3}
                  value={siteMetadata.vision}
                  onChange={(e) => updateSiteMetadata({ vision: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none font-serif italic"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#F5EBDD] block">Contact Email</label>
                  <input
                    type="email"
                    value={siteMetadata.email}
                    onChange={(e) => updateSiteMetadata({ email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#F5EBDD] block">Location</label>
                  <input
                    type="text"
                    value={siteMetadata.location}
                    onChange={(e) => updateSiteMetadata({ location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F5EBDD] block">Alma Mater / School</label>
                <input
                  type="text"
                  value={siteMetadata.school}
                  onChange={(e) => updateSiteMetadata({ school: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none"
                />
              </div>

              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={() => showToast('Site identity successfully updated.')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#D6A86A] text-[#100C0A] hover:bg-[#E4BC84] rounded-lg transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Identity</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: QUOTES & MAXIMS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#F5EBDD]">
                  Verified Quotations & Personal Perspectives
                </h2>
                <p className="text-xs text-[#C9B9A6]">
                  Curate the verified maxims and your commentary displayed on the Books & Ideas page.
                </p>
              </div>

              {!isCreatingQuote && !editingQuote && (
                <button
                  onClick={openNewQuote}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#D6A86A] text-[#100C0A] hover:bg-[#E4BC84] rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Quote</span>
                </button>
              )}
            </div>

            {(isCreatingQuote || editingQuote) ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#140F0C] border border-[#D6A86A]/30 space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-[#D6A86A]/20 pb-4">
                  <h3 className="text-lg font-serif font-bold text-[#F5EBDD]">
                    {isCreatingQuote ? 'Add New Quotation' : `Edit Quote by ${editingQuote?.author}`}
                  </h3>
                  <button
                    onClick={() => { setEditingQuote(null); setIsCreatingQuote(false); }}
                    className="p-1.5 rounded-lg bg-[#1C1511] text-[#C9B9A6] hover:text-[#F5EBDD]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSaveQuote} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#F5EBDD] block">Quotation Text *</label>
                    <textarea
                      required
                      rows={2}
                      value={quoteForm.quote}
                      onChange={(e) => setQuoteForm({ ...quoteForm, quote: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none font-serif italic"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#F5EBDD] block">Author *</label>
                      <input
                        type="text"
                        required
                        value={quoteForm.author}
                        onChange={(e) => setQuoteForm({ ...quoteForm, author: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#F5EBDD] block">Source Context</label>
                      <input
                        type="text"
                        value={quoteForm.sourceContext}
                        onChange={(e) => setQuoteForm({ ...quoteForm, sourceContext: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#F5EBDD] block">Why It Matters to Me *</label>
                    <textarea
                      required
                      rows={3}
                      value={quoteForm.myPerspective}
                      onChange={(e) => setQuoteForm({ ...quoteForm, myPerspective: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] focus:border-[#D6A86A] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#D6A86A]/15">
                    <button
                      type="button"
                      onClick={() => { setEditingQuote(null); setIsCreatingQuote(false); }}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#1C1511] text-[#C9B9A6] hover:text-[#F5EBDD]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-lg bg-[#D6A86A] text-[#100C0A] hover:bg-[#E4BC84]"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isCreatingQuote ? 'Add Quote' : 'Save Changes'}</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quotes.map((q) => (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl bg-[#140F0C] border border-[#D6A86A]/20 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <blockquote className="font-serif italic text-sm text-[#F5EBDD]">“{q.quote}”</blockquote>
                      <p className="mt-2 text-xs text-[#D6A86A] font-semibold">
                        — {q.author} <span className="text-[#8F7F70] font-normal">({q.sourceContext})</span>
                      </p>
                      <p className="mt-2 text-xs text-[#C9B9A6] line-clamp-3">{q.myPerspective}</p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#D6A86A]/10">
                      <button
                        onClick={() => openEditQuote(q)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#1C1511] text-[#D6A86A] hover:bg-[#2A1F17] border border-[#D6A86A]/20"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete quote by ${q.author}?`)) {
                            deleteQuote(q.id);
                            showToast('Quote deleted.');
                          }
                        }}
                        className="p-1.5 rounded-lg bg-[#1C1511] text-[#8F7F70] hover:text-red-400 border border-red-900/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: BACKUP & DATA */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'backup' && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#F5EBDD]">
                Data Portability & Reset
              </h2>
              <p className="text-xs text-[#C9B9A6]">
                Export all milestones, résumé entries, and vision statements to JSON, or restore default values.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#140F0C] border border-[#D6A86A]/20 space-y-4">
              <h3 className="text-base font-serif font-bold text-[#F5EBDD] flex items-center gap-2">
                <Download className="w-4 h-4 text-[#D6A86A]" />
                <span>Export Content Archive</span>
              </h3>
              <p className="text-xs text-[#C9B9A6]">
                Generates a JSON file of all edited milestones, chapters, résumé records, and quotes.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const json = exportJSON();
                    navigator.clipboard.writeText(json);
                    showToast('Data copied to clipboard.');
                  }}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#1C1511] text-[#D6A86A] border border-[#D6A86A]/25 hover:bg-[#2A1F17]"
                >
                  Copy JSON to Clipboard
                </button>

                <button
                  onClick={() => {
                    const json = exportJSON();
                    const blob = new Blob([json], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `shureymi-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                    showToast('Backup downloaded.');
                  }}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#D6A86A] text-[#100C0A] hover:bg-[#E4BC84]"
                >
                  Download .json File
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#140F0C] border border-[#D6A86A]/20 space-y-4">
              <h3 className="text-base font-serif font-bold text-[#F5EBDD] flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#D6A86A]" />
                <span>Import Archive JSON</span>
              </h3>
              <textarea
                rows={4}
                placeholder="Paste valid backup JSON here..."
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-[#1C1511] border border-[#D6A86A]/20 text-xs text-[#F5EBDD] font-mono focus:border-[#D6A86A] focus:outline-none"
              />
              {importStatus && <p className="text-xs text-[#D6A86A]">{importStatus}</p>}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    if (!importText.trim()) return;
                    const ok = importJSON(importText);
                    if (ok) {
                      setImportStatus('Backup restored successfully!');
                      showToast('Content restored from JSON.');
                      setImportText('');
                    } else {
                      setImportStatus('Invalid JSON format.');
                    }
                  }}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#1C1511] text-[#F5EBDD] hover:bg-[#251C17] border border-[#D6A86A]/25"
                >
                  Apply Imported Data
                </button>

                <label className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#1C1511] text-[#D6A86A] border border-[#D6A86A]/25 hover:bg-[#2A1F17]">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import JSON File</span>
                  <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={async (event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;

                      try {
                        const text = await file.text();
                        const ok = importJSON(text);
                        if (ok) {
                          setImportStatus(`Imported ${file.name} successfully.`);
                          showToast('Content restored from JSON file.');
                        } else {
                          setImportStatus('The selected file is not valid portfolio JSON.');
                        }
                      } catch {
                        setImportStatus('The selected file could not be read.');
                      } finally {
                        event.target.value = '';
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#140F0C] border border-red-900/30 space-y-4">
              <h3 className="text-base font-serif font-bold text-red-200 flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-red-400" />
                <span>Reset to Factory Defaults</span>
              </h3>
              <p className="text-xs text-[#C9B9A6]">
                Clears any local adjustments and restores the default milestones, story chapters, and résumé data.
              </p>
              <button
                onClick={() => {
                  if (window.confirm('Reset all edited content back to default values?')) {
                    resetToDefaults();
                    showToast('Reset to original default content.');
                  }
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-red-950/40 text-red-300 border border-red-800/40 hover:bg-red-900/40 transition-colors"
              >
                Reset All Content
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
