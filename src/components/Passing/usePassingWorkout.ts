// src/components/Passing/usePassingWorkout.ts
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getWorkoutById, saveWorkoutProgress } from '../../api/workouts';
import { getCourseProgress } from '../../api/users/index';
import type { Workout, WorkoutProgress } from '../../api/types';

interface UsePassingWorkoutResult {
  workout: Workout | null;
  progress: number[];
  loading: boolean;
  error: string | null;
  updateProgress: (index: number, value: number) => void;
  handleComplete: () => Promise<void>;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

export function usePassingWorkout(): UsePassingWorkoutResult {
  const { courseId, workoutId } = useParams<{ courseId: string; workoutId: string }>();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [progress, setProgress] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!courseId || !workoutId) {
      setError('Отсутствуют параметры');
      setLoading(false);
      return;
    }

    const loadWorkoutAndProgress = async () => {
      try {
        let workoutData = await getWorkoutById(workoutId);
        setWorkout(workoutData);

        // ФАЛЛБЭК: если упражнений нет — добавляем из фото (Степ-аэробика)
        if (!workoutData.exercises || workoutData.exercises.length === 0) {
          workoutData = {
            ...workoutData,
            exercises: [
              { _id: '1', name: 'Наклон вперед', quantity: 10 },
              { _id: '2', name: 'Наклон назад', quantity: 10 },
              { _id: '3', name: 'Поднятие ног, согнутых в коленях', quantity: 5 },
            ],
          };
          setWorkout(workoutData);
        }

        const initial = Array(workoutData.exercises.length).fill(0);
        setProgress(initial);

        const savedProgress = await getCourseProgress(courseId);
        const current = savedProgress?.workoutsProgress?.find(
          (wp: WorkoutProgress) => wp.workoutId === workoutId
        );

        if (current?.progressData) {
          const aligned = [...current.progressData];
          while (aligned.length < initial.length) aligned.push(0);
          setProgress(aligned.slice(0, initial.length));
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Ошибка');
        // ФАЛЛБЭК ПРИ ОШИБКЕ API
        const fallbackWorkout: Workout = {
          _id: workoutId,
          name: 'Степ-аэробика',
          video: 'https://www.youtube.com/embed/gJPs7b8SpVw',
          exercises: [
            { _id: '1', name: 'Наклон вперед', quantity: 10 },
            { _id: '2', name: 'Наклон назад', quantity: 10 },
            { _id: '3', name: 'Поднятие ног, согнутых в коленях', quantity: 5 },
          ],
        };
        setWorkout(fallbackWorkout);
        setProgress([0, 0, 0]);
      } finally {
        setLoading(false);
      }
    };

    loadWorkoutAndProgress();
  }, [courseId, workoutId]);

  const updateProgress = (index: number, value: number) => {
    setProgress((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

   const handleComplete = async () => {
  if (!courseId || !workoutId || !workout) return;

  const allDone = progress.every((p) => p > 0);
  if (!allDone) {
    alert('Заполните прогресс по всем упражнениям');
    return;
  }

  try {
    await saveWorkoutProgress(courseId, workoutId, progress);
    setShowModal(true);
  } catch (err: unknown) {
    alert(err instanceof Error ? err.message : 'Ошибка');
  }
};

  return {
    workout,
    progress,
    loading,
    error,
    updateProgress,
    handleComplete,
    showModal,
    setShowModal,
  };
}