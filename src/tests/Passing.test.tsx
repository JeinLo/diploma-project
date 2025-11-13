import { render, screen} from '@testing-library/react';
import Passing from '../components/Passing/Passing';


// Мокаем навигацию
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

// Мокаем хук
jest.mock('../components/Passing/usePassingWorkout', () => ({
  usePassingWorkout: () => ({
    workout: {
      _id: 'w1',
      name: 'Урок 1. Основы',
      video: 'https://youtube.com/embed/123',
      exercises: [
        { _id: 'e1', name: 'Наклон вперед', quantity: 10 }
      ],
    },
    progress: [0],
    loading: false,
    error: null,
    updateProgress: jest.fn(),
    handleComplete: jest.fn(),
    showSuccessModal: false,
    setShowSuccessModal: jest.fn(),
  }),
}));

describe('Passing', () => {
  it('renders workout name, video, and buttons', () => {
    render(<Passing />);

    expect(screen.getByText('Урок 1. Основы')).toBeInTheDocument();
    expect(screen.getByTitle('Тренировка')).toBeInTheDocument(); // iframe имеет title
    expect(screen.getByText('Заполнить результат')).toBeInTheDocument();
    expect(screen.getByText('Завершить тренировку')).toBeInTheDocument();
  });

  it('shows success modal after saving', () => {
    jest.mock('../components/Passing/usePassingWorkout', () => ({
      usePassingWorkout: () => ({
        workout: { _id: 'w1', name: 'Урок', video: '...', exercises: [{ _id: 'e1', name: 'Наклон', quantity: 10 }] },
        progress: [10],
        loading: false,
        error: null,
        updateProgress: jest.fn(),
        handleComplete: jest.fn(),
        showSuccessModal: true,
        setShowSuccessModal: jest.fn(),
      }),
    }));

    render(<Passing />);

    expect(screen.getByText('Ваш прогресс засчитан!')).toBeInTheDocument();
  });

  it('handles loading state', () => {
    jest.mock('../components/Passing/usePassingWorkout', () => ({
      usePassingWorkout: () => ({
        workout: null,
        progress: [],
        loading: true,
        error: null,
        updateProgress: jest.fn(),
        handleComplete: jest.fn(),
        showSuccessModal: false,
        setShowSuccessModal: jest.fn(),
      }),
    }));

    render(<Passing />);

    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });
});