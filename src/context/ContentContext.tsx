import React, { createContext, useContext, useState, useEffect } from 'react';
import { SITE_METADATA } from '../data/navigation';
import { VERIFIED_QUOTES, QuoteItem } from '../data/books';
import { DEFAULT_STORY_DATA, StoryData, MilestoneItem, StoryChapter, StoryOverviewCard } from '../data/story';
import { RESUME_DATA, EducationEntry, ExperienceEntry, SkillCategory, HonorAward } from '../data/resume';
import { DEFAULT_LEADERSHIP_DATA, LeadershipData, LeadershipRole, LeadershipReflection } from '../data/leadership';

export interface SiteMetadataState {
  name: string;
  tagline: string;
  vision: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  school: string;
}

export type ResumeDataType = typeof RESUME_DATA;

interface ContentContextType {
  siteMetadata: SiteMetadataState;
  quotes: QuoteItem[];
  storyData: StoryData;
  resumeData: ResumeDataType;
  leadershipData: LeadershipData;
  
  // Site metadata
  updateSiteMetadata: (newMetadata: Partial<SiteMetadataState>) => void;

  // Quotes
  updateQuote: (id: string, updatedFields: Partial<QuoteItem>) => void;
  createQuote: (newQuote: Omit<QuoteItem, 'id'>) => void;
  deleteQuote: (id: string) => void;

  // Story & Milestones
  updateStoryData: (updated: Partial<StoryData>) => void;
  updateMilestone: (id: string, updatedFields: Partial<MilestoneItem>) => void;
  createMilestone: (newMilestone: Omit<MilestoneItem, 'id'>) => void;
  deleteMilestone: (id: string) => void;
  reorderMilestones: (fromIndex: number, toIndex: number) => void;
  updateStoryChapter: (id: string, updatedFields: Partial<StoryChapter>) => void;
  updateStoryOverviewCard: (id: string, updatedFields: Partial<StoryOverviewCard>) => void;

  // Leadership
  updateLeadershipRole: (index: number, updatedFields: Partial<LeadershipRole>) => void;
  addLeadershipRole: (newRole: LeadershipRole) => void;
  deleteLeadershipRole: (index: number) => void;
  reorderLeadershipRoles: (fromIndex: number, toIndex: number) => void;
  updateLeadershipReflection: (index: number, updatedFields: Partial<LeadershipReflection>) => void;
  addLeadershipReflection: (newReflection: LeadershipReflection) => void;
  deleteLeadershipReflection: (index: number) => void;
  reorderLeadershipReflections: (fromIndex: number, toIndex: number) => void;

  // Résumé
  updateResumeData: (updated: Partial<ResumeDataType>) => void;
  updateEducation: (index: number, updatedFields: Partial<EducationEntry>) => void;
  addEducation: (newEntry: EducationEntry) => void;
  deleteEducation: (index: number) => void;
  updateExperience: (index: number, updatedFields: Partial<ExperienceEntry>) => void;
  addExperience: (newEntry: ExperienceEntry) => void;
  deleteExperience: (index: number) => void;
  updateLeadershipItem: (index: number, updatedFields: Partial<ExperienceEntry>) => void;
  addLeadershipItem: (newEntry: ExperienceEntry) => void;
  deleteLeadershipItem: (index: number) => void;
  updateSkillCategory: (index: number, updatedFields: Partial<SkillCategory>) => void;
  addSkillCategory: (newCategory: SkillCategory) => void;
  deleteSkillCategory: (index: number) => void;
  updateHonorAward: (index: number, updatedFields: Partial<HonorAward>) => void;
  addHonorAward: (newAward: HonorAward) => void;
  deleteHonorAward: (index: number) => void;

  // Global actions
  saveContent: () => void;
  resetToDefaults: () => void;
  exportJSON: () => string;
  importJSON: (jsonString: string) => boolean;
}

const STORAGE_KEY_METADATA = 'shureymi_site_metadata_v1';
const STORAGE_KEY_QUOTES = 'shureymi_quotes_v1';
const STORAGE_KEY_STORY = 'shureymi_story_v1';
const STORAGE_KEY_RESUME = 'shureymi_resume_v1';
const STORAGE_KEY_LEADERSHIP = 'shureymi_leadership_v1';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteMetadata, setSiteMetadata] = useState<SiteMetadataState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_METADATA);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return SITE_METADATA;
  });

  const [quotes, setQuotes] = useState<QuoteItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUOTES);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return VERIFIED_QUOTES;
  });

  const [storyData, setStoryData] = useState<StoryData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STORY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return DEFAULT_STORY_DATA;
  });

  const [resumeData, setResumeData] = useState<ResumeDataType>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RESUME);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return RESUME_DATA;
  });

  const [leadershipData, setLeadershipData] = useState<LeadershipData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LEADERSHIP);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return DEFAULT_LEADERSHIP_DATA;
  });

  const saveContent = () => {
    try {
      localStorage.setItem(STORAGE_KEY_METADATA, JSON.stringify(siteMetadata));
      localStorage.setItem(STORAGE_KEY_QUOTES, JSON.stringify(quotes));
      localStorage.setItem(STORAGE_KEY_STORY, JSON.stringify(storyData));
      localStorage.setItem(STORAGE_KEY_RESUME, JSON.stringify(resumeData));
      localStorage.setItem(STORAGE_KEY_LEADERSHIP, JSON.stringify(leadershipData));
    } catch {
      // Ignore storage write failures in locked-down browsers.
    }
  };

  // Sync state to localStorage whenever content changes.
  useEffect(() => {
    saveContent();
  }, [siteMetadata, quotes, storyData, resumeData, leadershipData]);

  // Site metadata
  const updateSiteMetadata = (newMetadata: Partial<SiteMetadataState>) => {
    setSiteMetadata(prev => ({ ...prev, ...newMetadata }));
  };

  // Quotes
  const updateQuote = (id: string, updatedFields: Partial<QuoteItem>) => {
    setQuotes(prev =>
      prev.map(q => (q.id === id ? { ...q, ...updatedFields } : q))
    );
  };

  const createQuote = (newQuoteData: Omit<QuoteItem, 'id'>) => {
    const newId = `quote-${Date.now()}`;
    const created: QuoteItem = {
      ...newQuoteData,
      id: newId
    };
    setQuotes(prev => [...prev, created]);
  };

  const deleteQuote = (id: string) => {
    setQuotes(prev => prev.filter(q => q.id !== id));
  };

  // Story & Milestones
  const updateStoryData = (updated: Partial<StoryData>) => {
    setStoryData(prev => ({ ...prev, ...updated }));
  };

  const updateMilestone = (id: string, updatedFields: Partial<MilestoneItem>) => {
    setStoryData(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => (m.id === id ? { ...m, ...updatedFields } : m))
    }));
  };

  const createMilestone = (newMilestone: Omit<MilestoneItem, 'id'>) => {
    const newId = `ms-${Date.now()}`;
    const created: MilestoneItem = {
      ...newMilestone,
      id: newId
    };
    setStoryData(prev => ({
      ...prev,
      milestones: [...prev.milestones, created]
    }));
  };

  const deleteMilestone = (id: string) => {
    setStoryData(prev => ({
      ...prev,
      milestones: prev.milestones.filter(m => m.id !== id)
    }));
  };

  const reorderMilestones = (fromIndex: number, toIndex: number) => {
    setStoryData(prev => {
      const next = [...prev.milestones];
      const [moved] = next.splice(fromIndex, 1);
      if (!moved) return prev;
      next.splice(toIndex, 0, moved);
      return { ...prev, milestones: next };
    });
  };

  const updateStoryChapter = (id: string, updatedFields: Partial<StoryChapter>) => {
    setStoryData(prev => ({
      ...prev,
      chapters: prev.chapters.map(c => (c.id === id ? { ...c, ...updatedFields } : c))
    }));
  };

  const updateStoryOverviewCard = (id: string, updatedFields: Partial<StoryOverviewCard>) => {
    setStoryData(prev => ({
      ...prev,
      overviewCards: prev.overviewCards.map(c => (c.id === id ? { ...c, ...updatedFields } : c))
    }));
  };

  // Leadership
  const updateLeadershipRole = (index: number, updatedFields: Partial<LeadershipRole>) => {
    setLeadershipData(prev => {
      const next = [...prev.roles];
      next[index] = { ...next[index], ...updatedFields };
      return { ...prev, roles: next };
    });
  };

  const addLeadershipRole = (newRole: LeadershipRole) => {
    setLeadershipData(prev => ({
      ...prev,
      roles: [newRole, ...prev.roles]
    }));
  };

  const deleteLeadershipRole = (index: number) => {
    setLeadershipData(prev => ({
      ...prev,
      roles: prev.roles.filter((_, i) => i !== index)
    }));
  };

  const reorderLeadershipRoles = (fromIndex: number, toIndex: number) => {
    setLeadershipData(prev => {
      const next = [...prev.roles];
      const [moved] = next.splice(fromIndex, 1);
      if (!moved) return prev;
      next.splice(toIndex, 0, moved);
      return { ...prev, roles: next };
    });
  };

  const updateLeadershipReflection = (index: number, updatedFields: Partial<LeadershipReflection>) => {
    setLeadershipData(prev => {
      const next = [...prev.reflections];
      next[index] = { ...next[index], ...updatedFields };
      return { ...prev, reflections: next };
    });
  };

  const addLeadershipReflection = (newReflection: LeadershipReflection) => {
    setLeadershipData(prev => ({
      ...prev,
      reflections: [newReflection, ...prev.reflections]
    }));
  };

  const deleteLeadershipReflection = (index: number) => {
    setLeadershipData(prev => ({
      ...prev,
      reflections: prev.reflections.filter((_, i) => i !== index)
    }));
  };

  const reorderLeadershipReflections = (fromIndex: number, toIndex: number) => {
    setLeadershipData(prev => {
      const next = [...prev.reflections];
      const [moved] = next.splice(fromIndex, 1);
      if (!moved) return prev;
      next.splice(toIndex, 0, moved);
      return { ...prev, reflections: next };
    });
  };

  // Résumé
  const updateResumeData = (updated: Partial<ResumeDataType>) => {
    setResumeData(prev => ({ ...prev, ...updated }));
  };

  const updateEducation = (index: number, updatedFields: Partial<EducationEntry>) => {
    setResumeData(prev => {
      const next = [...prev.education];
      next[index] = { ...next[index], ...updatedFields };
      return { ...prev, education: next };
    });
  };

  const addEducation = (newEntry: EducationEntry) => {
    setResumeData(prev => ({
      ...prev,
      education: [newEntry, ...prev.education]
    }));
  };

  const deleteEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const updateExperience = (index: number, updatedFields: Partial<ExperienceEntry>) => {
    setResumeData(prev => {
      const next = [...prev.experience];
      next[index] = { ...next[index], ...updatedFields };
      return { ...prev, experience: next };
    });
  };

  const addExperience = (newEntry: ExperienceEntry) => {
    setResumeData(prev => ({
      ...prev,
      experience: [newEntry, ...prev.experience]
    }));
  };

  const deleteExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const updateLeadershipItem = (index: number, updatedFields: Partial<ExperienceEntry>) => {
    setResumeData(prev => {
      const next = [...prev.leadership];
      next[index] = { ...next[index], ...updatedFields };
      return { ...prev, leadership: next };
    });
  };

  const addLeadershipItem = (newEntry: ExperienceEntry) => {
    setResumeData(prev => ({
      ...prev,
      leadership: [newEntry, ...prev.leadership]
    }));
  };

  const deleteLeadershipItem = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      leadership: prev.leadership.filter((_, i) => i !== index)
    }));
  };

  const updateSkillCategory = (index: number, updatedFields: Partial<SkillCategory>) => {
    setResumeData(prev => {
      const next = [...prev.technicalSkills];
      next[index] = { ...next[index], ...updatedFields };
      return { ...prev, technicalSkills: next };
    });
  };

  const addSkillCategory = (newCategory: SkillCategory) => {
    setResumeData(prev => ({
      ...prev,
      technicalSkills: [...prev.technicalSkills, newCategory]
    }));
  };

  const deleteSkillCategory = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      technicalSkills: prev.technicalSkills.filter((_, i) => i !== index)
    }));
  };

  const updateHonorAward = (index: number, updatedFields: Partial<HonorAward>) => {
    setResumeData(prev => {
      const next = [...prev.honorsAndAwards];
      next[index] = { ...next[index], ...updatedFields };
      return { ...prev, honorsAndAwards: next };
    });
  };

  const addHonorAward = (newAward: HonorAward) => {
    setResumeData(prev => ({
      ...prev,
      honorsAndAwards: [newAward, ...prev.honorsAndAwards]
    }));
  };

  const deleteHonorAward = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      honorsAndAwards: prev.honorsAndAwards.filter((_, i) => i !== index)
    }));
  };

  const resetToDefaults = () => {
    setSiteMetadata(SITE_METADATA);
    setQuotes(VERIFIED_QUOTES);
    setStoryData(DEFAULT_STORY_DATA);
    setResumeData(RESUME_DATA);
    setLeadershipData(DEFAULT_LEADERSHIP_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY_METADATA);
      localStorage.removeItem(STORAGE_KEY_QUOTES);
      localStorage.removeItem(STORAGE_KEY_STORY);
      localStorage.removeItem(STORAGE_KEY_RESUME);
      localStorage.removeItem(STORAGE_KEY_LEADERSHIP);
    } catch {
      // Ignore
    }
  };

  const exportJSON = () => {
    return JSON.stringify(
      {
        siteMetadata,
        quotes,
        storyData,
        resumeData,
        leadershipData,
        exportedAt: new Date().toISOString()
      },
      null,
      2
    );
  };

  const importJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') return false;

      const hasPortfolioContent =
        parsed.siteMetadata ||
        Array.isArray(parsed.quotes) ||
        parsed.storyData ||
        parsed.resumeData ||
        parsed.leadershipData;

      if (!hasPortfolioContent) return false;

      if (parsed.siteMetadata && typeof parsed.siteMetadata === 'object') {
        setSiteMetadata({ ...SITE_METADATA, ...parsed.siteMetadata });
      }
      if (Array.isArray(parsed.quotes)) setQuotes(parsed.quotes);
      if (parsed.storyData && typeof parsed.storyData === 'object') setStoryData(parsed.storyData);
      if (parsed.resumeData && typeof parsed.resumeData === 'object') setResumeData(parsed.resumeData);
      if (parsed.leadershipData && typeof parsed.leadershipData === 'object') setLeadershipData(parsed.leadershipData);

      return true;
    } catch {
      return false;
    }
  };

  return (
    <ContentContext.Provider
      value={{
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
        updateStoryOverviewCard,
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
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
