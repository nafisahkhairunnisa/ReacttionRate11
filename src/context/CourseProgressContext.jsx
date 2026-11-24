import { useState, useEffect } from 'react';
import { CourseProgressContext } from './courseContext';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';
import { COURSE_CHAPTERS } from '../data/courseChapters';

const defaultProgress = {
  currentChapterId: 'bab1',
  completedChapters: [],
  milestoneProgress: {}
};

/**
 * Validasi bahwa data dari storage memiliki bentuk yang benar.
 * Pulihkan ke defaultProgress jika tidak valid (fix S2-05-03: JSON null crash).
 */
function validateProgress(data) {
  if (
    data === null ||
    typeof data !== 'object' ||
    Array.isArray(data) ||
    typeof data.milestoneProgress !== 'object' ||
    data.milestoneProgress === null
  ) {
    return defaultProgress;
  }
  return data;
}

export function CourseProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    const raw = getStorageItem(STORAGE_KEYS.PROGRESS, defaultProgress);
    return validateProgress(raw);
  });

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
