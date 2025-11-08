import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import Course from './components/Course';
import { AuthProvider } from './context/AuthContext';
import './index.css';

export default function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/course/:id" element={<Course />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}