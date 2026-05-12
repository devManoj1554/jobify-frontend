import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext.jsx';
export default function Register() 
{
  const [f, setF] = useState({ email:'', password:'', fullName:'', phone:'', role:'JOB_SEEKER' });
  const [err,setErr]=useState('');
  const { login } = useAuth(); const nav = useNavigate();
  const set = (k,v) => setF({...f,[k]:v});
  const submit = async (e) => { e.preventDefault(); setErr('');

    try {
       const { data } = await api.post('/api/auth/register', f); login(data);
       nav(f.role === 'RECRUITER' ? '/register-company' : '/'); 
    }
    catch (e2) {
    const msg =
        e2.response?.data?.error ||
        e2.response?.data?.message || // fallback if any future API uses it
        e2.message ||
        'Registration failed';

        setErr(msg);
    }
    //catch (e2) { 
             // setErr(e2.response?.data?.message || 'Registration failed'); 
           //   setErr(e2.response?.data?.message); 
        //  }
  };
  return (
    <div className="row justify-content-center"><div className="col-12 col-md-7">
      <div className="card shadow-sm border-0"><div className="card-body p-4">
        <h3 className="mb-3">Create your Jobify account</h3>
        {err && <div className="alert alert-danger">{err}</div>}
        <form onSubmit={submit} className="row g-3">
          <div className="col-md-6"><label className="form-label">Full name</label><input className="form-control" required value={f.fullName} onChange={e=>set('fullName',e.target.value)}/></div>
          <div className="col-md-6"><label className="form-label">Phone</label><input className="form-control" value={f.phone} onChange={e=>set('phone',e.target.value)}/></div>
          <div className="col-md-6"><label className="form-label">Email</label><input type="email" className="form-control" required value={f.email} onChange={e=>set('email',e.target.value)}/></div>
          <div className="col-md-6"><label className="form-label">Password</label><input type="password" className="form-control" required value={f.password} onChange={e=>set('password',e.target.value)}/></div>
          <div className="col-12"><label className="form-label">I am a</label>
            <select className="form-select" value={f.role} onChange={e=>set('role',e.target.value)}>
              <option value="JOB_SEEKER">Job Seeker</option><option value="RECRUITER">Recruiter / Employer</option>
            </select>
          </div>
          <div className="col-12"><button className="btn btn-brand w-100">Create account</button></div>
        </form>
        <p className="mt-3 mb-0 text-center small">Already have an account? <Link to="/login">Login</Link></p>
      </div></div>
    </div></div>
  );
}
