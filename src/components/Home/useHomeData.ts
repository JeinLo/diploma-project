// src/components/Home/useHomeData.ts
import { useState, useEffect } from 'react';
import { getAllCourses } from '../../api/courses';
import type { Course } from '../../api/types';
import { fallbackCourses } from '../../data/fallbackCourses';

export function useHomeData() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllCourses();
        const sorted = [...data].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
        setCourses(sorted);
      } catch (err) {
        setError('Сервер недоступен. Показываем заглушку.');
        setCourses(fallbackCourses);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { courses, loading, error };
}