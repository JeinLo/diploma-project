// src/components/Profile/useProfileData.ts
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAllCourses } from '../../api/courses/index';
import { getUser } from '../../api/users/index';
import { deleteCourse } from '../../api/users/index';
import { getCourseProgress } from '../../api/users/index';
import type { CourseWithProgress, CourseProgress } from '../../api/types';

export function useProfileData() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseWithProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const calculateProgress = (progressData: CourseProgress | null, totalWorkouts: number): number => {
    if (!progressData || totalWorkouts === 0) return 0;
    const completed = progressData.workoutsProgress.filter(w => w.workoutCompleted).length;
    return Math.round((completed / totalWorkouts) * 100);
  };

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
        const userCoursesPromises = allCourses
          .filter((c) => userCourseIds.includes(c._id))
          .map(async (c) => {
            let progress = 0;
            let workoutsProgress: CourseProgress['workoutsProgress'] = [];

            try {
              const progressData = await getCourseProgress(c._id);
              progress = calculateProgress(progressData, c.workouts.length);
              workoutsProgress = progressData?.workoutsProgress || [];
            } catch (err) {
              console.warn(`Не удалось загрузить прогресс для курса ${c._id}`);
            }
            return { ...c, progress, workoutsProgress };
          });

        const userCourses = await Promise.all(userCoursesPromises);
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

  const refetchCourses = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const allCourses = await getAllCourses();
      const userData = await getUser();
      const userCourseIds = userData.user.selectedCourses || [];
      const userCoursesPromises = allCourses
        .filter((c) => userCourseIds.includes(c._id))
        .map(async (c) => {
          let progress = 0;
          let workoutsProgress: CourseProgress['workoutsProgress'] = [];

          try {
            const progressData = await getCourseProgress(c._id);
            progress = calculateProgress(progressData, c.workouts.length);
            workoutsProgress = progressData?.workoutsProgress || [];
          } catch (err) {
            console.warn(`Не удалось загрузить прогресс для курса ${c._id}`);
          }
          return { ...c, progress, workoutsProgress };
        });

      const userCourses = await Promise.all(userCoursesPromises);
      setCourses(userCourses);
    } catch (err) {
      console.error('Ошибка обновления курсов:', err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

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

  return { user, courses, loading, handleDelete, getButtonText, refetchCourses };
}