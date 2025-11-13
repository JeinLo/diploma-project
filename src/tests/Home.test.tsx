import { render, screen } from '@testing-library/react';
import Home from '../components/Home/Home';

// Мокаем API
jest.mock('../api/courses', () => ({
  getAllCourses: jest.fn(),
}));
jest.mock('../api/users', () => ({
  getUser: jest.fn(),
}));

// Мокаем хук
jest.mock('../components/Home/useHomeData', () => ({
  useHomeData: () => ({
    courses: [
      { _id: '1', nameRU: 'Йога', workouts: [], durationInDays: 20, dailyDurationInMinutes: { from: 10, to: 30 } },
    ],
    loading: false,
    error: null,
  }),
}));

describe('Home', () => {
  it('renders hero title and course card', () => {
    render(<Home />);

    expect(screen.getByText(/Начните заниматься спортом/i)).toBeInTheDocument();
    expect(screen.getByText('Йога')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    jest.mock('../components/Home/useHomeData', () => ({
      useHomeData: () => ({ courses: [], loading: true, error: null }),
    }));

    render(<Home />);

    expect(screen.getByText('Загрузка курсов...')).toBeInTheDocument();
  });
});