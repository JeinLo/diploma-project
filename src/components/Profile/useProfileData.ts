import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAllCourses } from '../../api/courses/index';
import { getUser } from '../../api/users/index';
import { deleteCourse } from '../../api/users/index';
import type { CourseWithProgress } from '../../api/types';

const progressMap: Record<string, number> = {
  ab1c3f: 40,
  kfpq8e: 0,
  ypox9r: 100,
  '6i67sm': 0,
  q02a6i: 0,
};

export function useProfileData() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseWithProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const load = async () => {
      try {
        const allCourses = await getAllCourses();
        const userData = await getUser();
        const userCourseIds = userData.user.selectedCourses || [];
        const userCourses: CourseWithProgress[] = allCourses
          .filter((c) => userCourseIds.includes(c._id))
          .map((c) => ({
            ...c,
            progress: progressMap[c._id] || 0,
          }));
        setCourses(userCourses);
      } catch (err) {
        console.error('Ошибка загрузки курсов:', err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token, navigate]);

  const handleDelete = async (courseId: string) => {
    if (!confirm('Удалить курс из профиля?')) return;
    try {
      await deleteCourse(courseId);
      setCourses((prev) => prev.filter((c) => c._id !== courseId));
      alert('Курс удалён');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Ошибка';
      alert('Ошибка: ' + message);
    }
  };

  const getButtonText = (progress: number) => {
    if (progress === 0) return 'Начать тренировки';
    if (progress === 100) return 'Начать заново';
    return 'Продолжить';
  };

  return { user, courses, loading, handleDelete, getButtonText };
}