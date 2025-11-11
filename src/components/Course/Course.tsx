import { useAuth } from '../../context/AuthContext';
import { useCourseData } from './useCourseData';
import { HeroSection } from './HeroSection';
import { BenefitsSection } from './BenefitsSection';
import { DirectionsSection } from './DirectionsSection';
import { CtaSection } from './CtaSection';

export default function Course() {
  const { user } = useAuth();
  const { course, bgColor, imageSrc, loading, courseId } = useCourseData();

  if (loading) {
    return (
      <main className="main">
        <div className="container">
          <div className="loading">Загрузка курса...</div>
        </div>
      </main>
    );
  }

  const isCourseAdded = (user?.selectedCourses || []).includes(courseId);

  return (
    <main className="main">
      <div className="container">
        <HeroSection
          courseName={course.nameRU || 'Курс'}
          imageSrc={imageSrc}
          bgColor={bgColor}
        />
        <BenefitsSection />
        <DirectionsSection directions={course.directions || []} />
        <CtaSection courseId={courseId} isCourseAdded={isCourseAdded} />
      </div>
    </main>
  );
}