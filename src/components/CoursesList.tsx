import CourseCard from './CourseCard';

const courses = [
  { id: 'yoga', title: 'Йога', image: '/images/image_1.svg', bgColor: '#FFC700' },
  { id: 'stretching', title: 'Стретчинг', image: '/images/image_2.svg', bgColor: '#FF6B6B' },
  { id: 'fitness', title: 'Фитнес', image: '/images/image_3.svg', bgColor: '#4ECDC4' },
  { id: 'step', title: 'Степ-аэробика', image: '/images/image_4.svg', bgColor: '#45B7D1' },
  { id: 'bodyflex', title: 'Бодифлекс', image: '/images/image_5.svg', bgColor: '#96CEB4' },
];

export default function CoursesList() {
  return (
    <section className="courses">
      <h2 className="section-title">Выберите курс</h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
}