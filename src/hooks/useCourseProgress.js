import { useContext } from 'react';
import { CourseProgressContext } from '../context/courseContext';

export function useCourseProgress() {
  const context = useContext(CourseProgressContext);
  if (!context) {
    throw new Error('useCourseProgress must be used within a CourseProgressProvider');
  }
  return context;
}
