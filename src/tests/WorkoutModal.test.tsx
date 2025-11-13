import { render, screen, fireEvent } from '@testing-library/react';
import WorkoutModal from '../components/Profile/WorkoutModal';
import { getCourseWorkouts } from '../api/workouts';

// Мокаем API
jest.mock('../api/workouts', () => ({
  getCourseWorkouts: jest.fn(),
}));

// Мокаем навигацию
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('WorkoutModal', () => {
  const mockWorkouts = [
    { _id: 'w1', name: 'Урок 1. Основы', video: '', exercises: [] },
    { _id: 'w2', name: 'Урок 2. Продвинутый', video: '', exercises: [] },
  ];

  beforeEach(() => {
    (getCourseWorkouts as jest.Mock).mockResolvedValue(mockWorkouts);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders workout list when open', async () => {
    render(
      <WorkoutModal
        isOpen={true}
        onClose={() => {}}
        courseId="course1"
        completedWorkouts={['w1']}
        courseName="Йога"
      />
    );

    // Ожидаем, что загрузка завершится и появятся тренировки
    expect(await screen.findByText('Урок 1. Основы')).toBeInTheDocument();
    expect(screen.getByText('Урок 2. Продвинутый')).toBeInTheDocument();
  });

  it('shows checkmark for completed workouts', async () => {
    render(
      <WorkoutModal
        isOpen={true}
        onClose={() => {}}
        courseId="course1"
        completedWorkouts={['w1']}
        courseName="Йога"
      />
    );

    expect(await screen.findByText('Урок 1. Основы')).toBeInTheDocument();
    // В DOM должна быть галочка (через ✓ или изображение)
    // В коде для завершённого — <div className="check-done">✓</div>
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('calls navigate on "Начать" button click', async () => {
    const onClose = jest.fn();
    
    render(
      <WorkoutModal
        isOpen={true}
        onClose={onClose}
        courseId="course1"
        completedWorkouts={[]}
        courseName="Йога"
      />
    );

    await screen.findByText('Урок 1. Основы');
    fireEvent.click(screen.getByRole('button', { name: /Начать/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/course/course1/workout/w1');
    expect(onClose).toHaveBeenCalled();
  });

  it('does not render when closed', () => {
    const { container } = render(
      <WorkoutModal
        isOpen={false}
        onClose={() => {}}
        courseId="course1"
        completedWorkouts={[]}
        courseName="Йога"
      />
    );

    expect(container).toBeEmptyDOMElement();
  });
});