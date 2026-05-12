import { useEffect, useState } from 'react';
import api from '../api/client';
export default function MyApplications() {
  const [apps,setApps]=useState([]);
  useEffect(()=>{ api.get('/api/applications/me').then(r=>setApps(r.data)); },[]);
  const cls = { APPLIED:'bg-secondary', SHORTLISTED:'bg-info', INTERVIEW:'bg-warning text-dark', REJECTED:'bg-danger', HIRED:'bg-success' };
  return (
    <>
      <h3 className="mb-3">My Applications</h3>
      {apps.length === 0 ? <div className="alert alert-info">You haven't applied to any jobs yet.</div> :
        <div className="list-group">{apps.map(a => (
          <div key={a.id} className="list-group-item d-flex justify-content-between align-items-start">
            <div><h6 className="mb-1">{a.job?.title}</h6>
              <small className="text-muted">Applied {new Date(a.appliedAt).toLocaleDateString()}</small></div>
            <span className={`badge ${cls[a.status]||'bg-secondary'}`}>{a.status}</span>
          </div>
        ))}</div>}
    </>
  );
}
