import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import Passing from './components/Passing/Passing';
import './index.css';
import Course from './components/Course/Course';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';

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
          <Route path="/passing" element={<Passing />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}