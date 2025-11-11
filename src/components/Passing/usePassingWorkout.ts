// src/components/Passing/usePassingWorkout.ts

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getWorkoutById, saveWorkoutProgress } from '../../api/workouts';
import { getCourseProgress } from '../../api/users';
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
    if (!courseId || !workoutId) return;

    const loadWorkoutAndProgress = async () => {
      try {
        const workoutData = await getWorkoutById(courseId, workoutId);
        setWorkout(workoutData);

        const initial = Array(workoutData.exercises.length).fill(0);
        setProgress(initial);

        const savedProgress = await getCourseProgress(courseId);
        const current = savedProgress.workoutsProgress.find(
          (wp: WorkoutProgress) => wp.workoutId === workoutId // ✅ типизация wp
        );
        if (current) {
          setProgress(current.progressData);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Неизвестная ошибка';
        setError(message);
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
      setTimeout(() => setShowModal(false), 4000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Ошибка сохранения';
      alert(message);
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