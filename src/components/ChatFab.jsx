import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
export default function ChatFab() {
  const { user } = useAuth();
  const loc = useLocation();
  if (!user || loc.pathname === '/chat') return null;
  return <Link to="/chat" className="btn btn-brand fab-chat px-3 py-2"><i className="bi bi-robot"></i> Ask AI</Link>;
}
