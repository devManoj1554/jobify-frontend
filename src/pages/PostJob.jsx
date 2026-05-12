import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext.jsx';
export default function PostJob() {
  const { user } = useAuth(); const nav = useNavigate();
  const [f, setF] = useState({ title:'', description:'', location:'', employmentType:'FULL_TIME',
    experienceLevel:'MID', minExperience:0, maxExperience:5, minSalary:'', maxSalary:'', skills:'' });
  const [msg,setMsg]=useState('');
  if (!user?.companyId) return <div className="alert alert-warning">Please <a href="/register-company">register your company</a> before posting jobs.</div>;
  const set=(k,v)=>setF({...f,[k]:v});
  const submit=async(e)=>{e.preventDefault();
    try { await api.post('/api/jobs', f); nav('/jobs'); }
    catch (e2) { setMsg(e2.response?.data?.message || 'Failed'); }
  };
  return (
    <div className="card border-0 shadow-sm"><div className="card-body p-4">
      <h3 className="mb-3">Post a Job</h3>
      {msg && <div className="alert alert-danger">{msg}</div>}
      <form onSubmit={submit} className="row g-3">
        <div className="col-12"><label className="form-label">Job Title*</label><input className="form-control" required value={f.title} onChange={e=>set('title',e.target.value)}/></div>
        <div className="col-md-6"><label className="form-label">Location</label><input className="form-control" value={f.location} onChange={e=>set('location',e.target.value)}/></div>
        <div className="col-md-3"><label className="form-label">Type</label>
          <select className="form-select" value={f.employmentType} onChange={e=>set('employmentType',e.target.value)}>
            <option>FULL_TIME</option><option>PART_TIME</option><option>CONTRACT</option><option>INTERNSHIP</option>
          </select></div>
        <div className="col-md-3"><label className="form-label">Level</label>
          <select className="form-select" value={f.experienceLevel} onChange={e=>set('experienceLevel',e.target.value)}>
            <option>ENTRY</option><option>MID</option><option>SENIOR</option>
          </select></div>
        <div className="col-md-3"><label className="form-label">Min Exp (yrs)</label><input type="number" className="form-control" value={f.minExperience} onChange={e=>set('minExperience',+e.target.value)}/></div>
        <div className="col-md-3"><label className="form-label">Max Exp (yrs)</label><input type="number" className="form-control" value={f.maxExperience} onChange={e=>set('maxExperience',+e.target.value)}/></div>
        <div className="col-md-3"><label className="form-label">Min Salary</label><input type="number" className="form-control" value={f.minSalary} onChange={e=>set('minSalary',+e.target.value)}/></div>
        <div className="col-md-3"><label className="form-label">Max Salary</label><input type="number" className="form-control" value={f.maxSalary} onChange={e=>set('maxSalary',+e.target.value)}/></div>
        <div className="col-12"><label className="form-label">Skills (comma separated)</label><input className="form-control" value={f.skills} onChange={e=>set('skills',e.target.value)}/></div>
        <div className="col-12"><label className="form-label">Description*</label><textarea className="form-control" rows="8" required value={f.description} onChange={e=>set('description',e.target.value)}/></div>
        <div className="col-12 d-flex gap-2">
          <button className="btn btn-brand">Publish Job</button>
          <a className="btn btn-outline-secondary" href="/jd-maker">Need help? Use JD Maker</a>
        </div>
      </form>
    </div></div>
  );
}
