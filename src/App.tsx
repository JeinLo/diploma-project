import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from './components/Header';
import { AuthProvider, useAuth } from './context/AuthContext';
import Passing from './components/Passing/Passing';
import './index.css';
import Course from './components/Course/Course';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';

const PrivateRoute = () => {
  const user = useAuth();
  return user.token ? <Outlet /> : <Navigate to="/" />;
};

export default function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/course/:id" element={<Course />} />
            {/* добавить еще роут курс/воркаут */}
            {/* <Route path="/passing/:workoutId" element={<Passing />} /> */}
            <Route path="/course/:courseId/workout/:workoutId" element={<Passing />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}