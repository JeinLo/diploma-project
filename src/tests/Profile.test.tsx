import { render, screen } from '@testing-library/react';
import Profile from '../components/Profile/Profile';

// Мокаем контекст
jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({ logout: jest.fn() }),
}));

// Мокаем хук
jest.mock('../components/Profile/useProfileData', () => ({
  useProfileData: () => ({
    user: { email: 'user@example.com' },
    courses: [
      {
        _id: '1',
        nameRU: 'Йога',
        workouts: ['w1'],
        durationInDays: 20,
        dailyDurationInMinutes: { from: 10, to: 30 },
        progress: 40,
        workoutsProgress: [{ workoutId: 'w1', workoutCompleted: false, progressData: [] }],
      },
    ],
    loading: false,
    handleDelete: jest.fn(),
    getButtonText: () => 'Продолжить',
    refetchCourses: jest.fn(),
  }),
}));

describe('Profile', () => {
  it('renders user email and course', () => {
    render(<Profile />);

    expect(screen.getByText('user@example.com')).toBeInTheDocument();
    expect(screen.getByText('Йога')).toBeInTheDocument();
    expect(screen.getByText('Прогресс 40%')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    jest.mock('../components/Profile/useProfileData', () => ({
      useProfileData: () => ({
        user: { email: 'user@example.com' },
        courses: [],
        loading: false,
        handleDelete: jest.fn(),
        getButtonText: () => 'Начать',
        refetchCourses: jest.fn(),
      }),
    }));

    render(<Profile />);

    expect(screen.getByText(/У вас пока нет курсов/i)).toBeInTheDocument();
  });
});