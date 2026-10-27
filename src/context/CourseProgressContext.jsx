import { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';
import { COURSE_CHAPTERS } from '../data/courseChapters';

const defaultProgress = {
  currentChapterId: 'bab1',
  completedChapters: [],
  milestoneProgress: {}
};

const CourseProgressContext = createContext(null);

export function CourseProgressProvider({ children }) {
  const [progress, setProgress] = useState(() =>
    getStorageItem(STORAGE_KEYS.PROGRESS, defaultProgress)
  );

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.PROGRESS, progress);
  }, [progress]);

  const selectChapter = (chapterId) => {
    setProgress((prev) => ({
      ...prev,
      currentChapterId: chapterId
    }));
  };

  const toggleSubchapter = (subchapterId) => {
    setProgress((prev) => {
      const nextMilestones = {
        ...prev.milestoneProgress,
        [subchapterId]: !prev.milestoneProgress[subchapterId]
      };
      return {
        ...prev,
        milestoneProgress: nextMilestones
      };
    });
  };

  // Calculate overall progress percentage
  const totalSubchapters = COURSE_CHAPTERS.reduce(
    (acc, chap) => acc + chap.subchapters.length,
    0
  );
  const completedSubchaptersCount = Object.values(progress.milestoneProgress || {}).filter(Boolean).length;
  const progressPercent = totalSubchapters > 0
    ? Math.round((completedSubchaptersCount / totalSubchapters) * 100)
    : 0;

  return (
    <CourseProgressContext.Provider
      value={{
        progress,
        currentChapterId: progress.currentChapterId,
        selectChapter,
        toggleSubchapter,
        isSubchapterComplete: (id) => !!progress.milestoneProgress?.[id],
        progressPercent,
        completedSubchaptersCount,
        totalSubchapters
      }}
    >
      {children}
    </CourseProgressContext.Provider>
  );
}

export function useCourseProgress() {
  const context = useContext(CourseProgressContext);
  if (!context) {
    throw new Error('useCourseProgress must be used within a CourseProgressProvider');
  }
  return context;
}
