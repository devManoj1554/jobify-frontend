import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api/client';
export default function Jobs() {
  const [sp, setSp] = useSearchParams();
  const [q, setQ] = useState(sp.get('q')||''); const [loc, setLoc] = useState(sp.get('location')||'');
  const [jobs, setJobs] = useState([]); const [loading, setLoading] = useState(true);
  const fetchJobs = async () => { setLoading(true);
    const { data } = await api.get('/api/jobs', { params: { q, location: loc } });
    setJobs(data); setLoading(false);
  };
  useEffect(() => { fetchJobs(); /* eslint-disable-next-line */ }, []);
  const search = (e) => { e.preventDefault(); setSp({ q, location: loc }); fetchJobs(); };
  return (
    <>
      <form onSubmit={search} className="row g-2 mb-4">
        <div className="col-12 col-md-5"><input className="form-control" placeholder="Title or skill" value={q} onChange={e=>setQ(e.target.value)}/></div>
        <div className="col-12 col-md-4"><input className="form-control" placeholder="Location" value={loc} onChange={e=>setLoc(e.target.value)}/></div>
        <div className="col-12 col-md-3 d-grid"><button className="btn btn-brand"><i className="bi bi-search"></i> Search</button></div>
      </form>
      {loading ? <p>Loading...</p> :
        jobs.length === 0 ? <div className="alert alert-info">No jobs found.</div> :
        <div className="row g-3">{jobs.map(j => (
          <div key={j.id} className="col-12 col-md-6">
            <Link to={`/jobs/${j.id}`} className="text-decoration-none text-dark">
              <div className="card border-0 shadow-sm job-card h-100"><div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  {j.companyLogo ? <img src={j.companyLogo} alt="" style={{height:40,width:40,objectFit:'cover'}} className="rounded me-2"/> :
                    <div className="rounded bg-light d-flex align-items-center justify-content-center me-2" style={{height:40,width:40}}><i className="bi bi-buildings"></i></div>}
                  <div><h6 className="mb-0">{j.title}</h6><small className="text-muted">{j.companyName || 'Company'}</small></div>
                </div>
                <p className="text-muted mb-2 small"><i className="bi bi-geo-alt"></i> {j.location || 'Remote'} · <i className="bi bi-briefcase"></i> {j.employmentType || 'Full time'}</p>
                {j.skills && <div className="mb-2">{j.skills.split(',').slice(0,4).map((s,i)=><span key={i} className="badge bg-light text-dark me-1">{s.trim()}</span>)}</div>}
                <p className="mb-0 small">{(j.description||'').slice(0,120)}...</p>
              </div></div>
            </Link>
          </div>
        ))}</div>}
    </>
  );
}
