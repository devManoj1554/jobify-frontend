import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext.jsx';
export default function Login() {
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [err,setErr]=useState('');
  const { login } = useAuth(); const nav = useNavigate();
  const submit = async (e) => { e.preventDefault(); setErr('');
    try { const { data } = await api.post('/api/auth/login', { email, password }); login(data); nav('/'); }
    catch (e2) { setErr(e2.response?.data?.message || 'Login failed'); }
    //catch (e2) { setErr(e2.response?.data?.message); }
  };
  return (
    <div className="row justify-content-center"><div className="col-12 col-md-6 col-lg-5">
      <div className="card shadow-sm border-0"><div className="card-body p-4">
        <h3 className="mb-3">Welcome back</h3>
        {err && <div className="alert alert-danger">{err}</div>}
        <form onSubmit={submit}>
          <div className="mb-3"><label className="form-label">Email</label><input className="form-control" type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></div>
          <div className="mb-3"><label className="form-label">Password</label><input className="form-control" type="password" required value={password} onChange={e=>setPassword(e.target.value)}/></div>
          <button className="btn btn-brand w-100">Login</button>
        </form>
        <p className="mt-3 mb-0 text-center small">No account? <Link to="/register">Sign up</Link></p>
      </div></div>
    </div></div>
  );
}
