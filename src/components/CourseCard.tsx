import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import AuthModal from './AuthModal';

interface CourseCardProps {
  id: string;
  title: string;
  image: string;
  bgColor: string;
}

export default function CourseCard({ id, title, image, bgColor }: CourseCardProps) {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleCardClick = () => {
    if (!token) {
      setShowAuthModal(true);
    } else {
      navigate(`/course/${id}`);
    }
  };

  return (
    <>
      <div
        className="course-card"
        style={{ backgroundColor: bgColor }}
        onClick={handleCardClick}
      >
        <img src={image} alt={title} className="course-card__image" />
        <h3 className="course-card__title">{title}</h3>
        <button className="card__play-btn">
          <img alt="Добавить" className="plus-icon" src="/images/plus.svg" />
        </button>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}