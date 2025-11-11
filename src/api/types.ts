export interface Course {
  _id: string;
  nameRU: string;
  nameEN: string;
  image?: string;
  durationInDays: number;
  dailyDurationInMinutes: { from: number; to: number };
  description: string;
  directions: string[];
  fitting: string[];
  order?: number;
  difficulty: string;
  workouts: string[];
  __v: number;
}

export interface User {
  email: string;
  selectedCourses: string[];
}

export interface UserResponse {
  user: User;
}

export interface UserCourse {
  courseId: string;
}

export interface ProgressData {
  progressData: number[];
}

export interface Workout {
  _id: string;
  name: string;
  video: string;
  exercises: {
    _id: string;
    name: string;
    quantity: number;
  }[];
}

export interface CourseProgress {
  courseId: string;
  courseCompleted: boolean;
  workoutsProgress: {
    workoutId: string;
    workoutCompleted: boolean;
    progressData: number[];
  }[];
}

export interface WorkoutProgress {
  workoutId: string;
  workoutCompleted: boolean;
  progressData: number[];
}

export interface CourseWithProgress extends Course {
  progress: number;
}