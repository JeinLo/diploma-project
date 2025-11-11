import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../../api/courses';
import type { Course } from '../../api/types';
import { fallbackCourses, fallbackImages } from '../../data/fallbackCourseData';

const bgColors: Record<string, string> = {
  ab1c3f: '#FFC700',
  kfpq8e: '#2491D2',
  ypox9r: '#F7A012',
  '6i67sm': '#FF7E65',
  q02a6i: '#7D458C',
};

export function useCourseData() {
  const { id: courseId = 'ab1c3f' } = useParams<{ id?: string }>();
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(courseId);
        setCourseData(data);
      } catch (err) {
        console.warn('Не удалось загрузить курс, используем заглушку');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  const course = courseData || (fallbackCourses[courseId] as Course) || fallbackCourses.ab1c3f;
  const bgColor = bgColors[courseId] || '#BCEC30';
  const imageSrc = courseData?.image || fallbackImages[courseId] || '/images/image_1.svg';

  return { course, bgColor, imageSrc, loading, courseId };
}