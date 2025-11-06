import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Course from './components/Course';
import Profile from './components/Profile';
import Passing from './components/Passing';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/course/:courseId" element={<Course />} />
      <Route path="/course/:courseId/workout/:workoutId" element={<Passing />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}