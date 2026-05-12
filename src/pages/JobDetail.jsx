import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext.jsx';
export default function JobDetail() {
  const { id } = useParams(); const { user } = useAuth(); const nav = useNavigate();
  const [job, setJob] = useState(null); const [cl, setCl] = useState(''); const [msg, setMsg] = useState('');
  useEffect(() => { api.get(`/api/jobs/${id}`).then(r => setJob(r.data)); }, [id]);
  const apply = async () => { if (!user) return nav('/login');
    try { await api.post(`/api/applications/apply/${id}`, { coverLetter: cl }); setMsg('Application submitted!'); }
    catch (e) { setMsg(e.response?.data?.message || 'Could not apply'); }
  };
  if (!job) return <p>Loading...</p>;
  return (
    <div className="row g-3">
      <div className="col-12 col-lg-8">
        <div className="card border-0 shadow-sm"><div className="card-body">
          <h3>{job.title}</h3>
          <p className="text-muted"><i className="bi bi-buildings"></i> {job.companyName} · <i className="bi bi-geo-alt"></i> {job.location}</p>
          {job.skills && <div className="mb-3">{job.skills.split(',').map((s,i)=><span key={i} className="badge bg-light text-dark me-1">{s.trim()}</span>)}</div>}
          <pre style={{whiteSpace:'pre-wrap',fontFamily:'inherit'}}>{job.description}</pre>
        </div></div>
      </div>
      <div className="col-12 col-lg-4">
        <div className="card border-0 shadow-sm"><div className="card-body">
          <h5>Apply now</h5>
          {msg && <div className="alert alert-info py-2">{msg}</div>}
          <textarea className="form-control mb-2" rows="5" placeholder="Cover letter (optional)" value={cl} onChange={e=>setCl(e.target.value)}/>
          <button className="btn btn-brand w-100" onClick={apply}>Submit Application</button>
        </div></div>
      </div>
    </div>
  );
}
