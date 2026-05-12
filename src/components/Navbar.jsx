import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/"><span className="brand-gradient">Jobify</span></Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nb">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nb">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/jobs">Jobs</NavLink></li>
            {user && <li className="nav-item"><NavLink className="nav-link" to="/resume">Resume Maker</NavLink></li>}
            {user && <li className="nav-item"><NavLink className="nav-link" to="/jd-maker">JD Maker</NavLink></li>}
            {user && <li className="nav-item"><NavLink className="nav-link" to="/chat">AI Chatbot</NavLink></li>}
            {user?.role === 'RECRUITER' && <li className="nav-item"><NavLink className="nav-link" to="/post-job">Post Job</NavLink></li>}
            {user?.role === 'RECRUITER' && !user?.companyId && <li className="nav-item"><NavLink className="nav-link text-danger" to="/register-company">Register Company</NavLink></li>}
            {user && <li className="nav-item"><NavLink className="nav-link" to="/my-applications">My Applications</NavLink></li>}
          </ul>
          <ul className="navbar-nav">
            {!user ? (<>
              <li className="nav-item"><Link className="btn btn-outline-primary me-2" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="btn btn-brand" to="/register">Sign up</Link></li>
            </>) : (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#">
                  <i className="bi bi-person-circle"></i> {user.fullName || user.email}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><span className="dropdown-item-text small text-muted">{user.role}</span></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><button className="dropdown-item" onClick={() => { logout(); nav('/'); }}>Logout</button></li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
