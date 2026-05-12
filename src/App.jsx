import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ChatFab from './components/ChatFab.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Jobs from './pages/Jobs.jsx';
import JobDetail from './pages/JobDetail.jsx';
import PostJob from './pages/PostJob.jsx';
import RegisterCompany from './pages/RegisterCompany.jsx';
import MyApplications from './pages/MyApplications.jsx';
import ResumeMaker from './pages/ResumeMaker.jsx';
import JdMaker from './pages/JdMaker.jsx';
import Chatbot from './pages/Chatbot.jsx';
import { useAuth } from './context/AuthContext.jsx';

const Private = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role && user.role !== 'ADMIN') return <Navigate to="/" />;
  return children;
};

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/post-job" element={<Private role="RECRUITER"><PostJob /></Private>} />
          <Route path="/register-company" element={<Private role="RECRUITER"><RegisterCompany /></Private>} />
          <Route path="/my-applications" element={<Private><MyApplications /></Private>} />
          <Route path="/resume" element={<Private><ResumeMaker /></Private>} />
          <Route path="/jd-maker" element={<Private><JdMaker /></Private>} />
          <Route path="/chat" element={<Private><Chatbot /></Private>} />
        </Routes>
      </div>
      <ChatFab />
    </>
  );
}
