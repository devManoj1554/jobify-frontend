import { useEffect, useState } from 'react';
import api from '../api/client';
export default function ResumeMaker() {
  const empty = { name:'', title:'', email:'', phone:'', location:'', summary:'',
    skills:'', experience:[{role:'',company:'',period:'',details:''}],
    education:[{degree:'',school:'',period:''}], projects:'' };
  const [r, setR] = useState(empty); 
  const [saving, setSaving] = useState(false); 
  const [aiBusy, setAiBusy] = useState(false);
  useEffect(() => { api.get('/api/resume').then(res => {
    try { const d = JSON.parse(res.data.dataJson || '{}'); if (d && d.name !== undefined) setR({...empty, ...d}); } catch {}
  }); /* eslint-disable-next-line */ }, []);
    
  const set = (k,v) => setR({...r,[k]:v});
  const setExp = (i,k,v) => { const a=[...r.experience]; a[i]={...a[i],[k]:v}; setR({...r, experience:a}); };
  const addExp = () => setR({...r, experience:[...r.experience, {role:'',company:'',period:'',details:''}]});
  const setEdu = (i,k,v) => { const a=[...r.education]; a[i]={...a[i],[k]:v}; setR({...r, education:a}); };
  const addEdu = () => setR({...r, education:[...r.education, {degree:'',school:'',period:''}]});
  const save = async () => { setSaving(true);
    await api.post('/api/resume', { dataJson: JSON.stringify(r) }); setSaving(false);
  };
  const aiSummary = async () => { setAiBusy(true);
    try { const { data } = await api.post('/api/ai/resume-summary',
      { name:r.name, role:r.title, skills:r.skills, experience:`${r.experience.length} roles` });
      setR({...r, summary: data.reply});
    } finally { setAiBusy(false); }
  };
  const print = () => window.print();
  return (
    <div className="row g-3">
      <div className="col-12 col-lg-7">
        <div className="card border-0 shadow-sm"><div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Resume Maker</h4>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary btn-sm" onClick={aiSummary} disabled={aiBusy}>
                <i className="bi bi-stars"></i> {aiBusy?'Writing...':'AI Summary'}
              </button>
              <button className="btn btn-brand btn-sm" onClick={save} disabled={saving}>{saving?'Saving...':'Save'}</button>
            </div>
          </div>
          <div className="row g-2">
            <div className="col-md-6"><input className="form-control" placeholder="Full name" value={r.name} onChange={e=>set('name',e.target.value)}/></div>
            <div className="col-md-6"><input className="form-control" placeholder="Title (e.g. Senior Backend Engineer)" value={r.title} onChange={e=>set('title',e.target.value)}/></div>
            <div className="col-md-4"><input className="form-control" placeholder="Email" value={r.email} onChange={e=>set('email',e.target.value)}/></div>
            <div className="col-md-4"><input className="form-control" placeholder="Phone" value={r.phone} onChange={e=>set('phone',e.target.value)}/></div>
            <div className="col-md-4"><input className="form-control" placeholder="Location" value={r.location} onChange={e=>set('location',e.target.value)}/></div>
            <div className="col-12"><textarea className="form-control" rows="3" placeholder="Professional summary" value={r.summary} onChange={e=>set('summary',e.target.value)}/></div>
            <div className="col-12"><input className="form-control" placeholder="Skills (comma-separated)" value={r.skills} onChange={e=>set('skills',e.target.value)}/></div>
          </div>
          <h6 className="mt-3">Experience</h6>
          {r.experience.map((x,i)=>(
            <div key={i} className="row g-2 mb-2">
              <div className="col-md-4"><input className="form-control" placeholder="Role" value={x.role} onChange={e=>setExp(i,'role',e.target.value)}/></div>
              <div className="col-md-4"><input className="form-control" placeholder="Company" value={x.company} onChange={e=>setExp(i,'company',e.target.value)}/></div>
              <div className="col-md-4"><input className="form-control" placeholder="Period (Jan 2022 - Present)" value={x.period} onChange={e=>setExp(i,'period',e.target.value)}/></div>
              <div className="col-12"><textarea className="form-control" rows="2" placeholder="Achievements" value={x.details} onChange={e=>setExp(i,'details',e.target.value)}/></div>
            </div>
          ))}
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addExp}>+ Add Experience</button>

          <h6 className="mt-3">Education</h6>
          {r.education.map((x,i)=>(
            <div key={i} className="row g-2 mb-2">
              <div className="col-md-5"><input className="form-control" placeholder="Degree" value={x.degree} onChange={e=>setEdu(i,'degree',e.target.value)}/></div>
              <div className="col-md-5"><input className="form-control" placeholder="School / University" value={x.school} onChange={e=>setEdu(i,'school',e.target.value)}/></div>
              <div className="col-md-2"><input className="form-control" placeholder="Year" value={x.period} onChange={e=>setEdu(i,'period',e.target.value)}/></div>
            </div>
          ))}
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addEdu}>+ Add Education</button>

          <h6 className="mt-3">Projects</h6>
          <textarea className="form-control" rows="3" value={r.projects} onChange={e=>set('projects',e.target.value)}/>
        </div></div>
      </div>
      <div className="col-12 col-lg-5">
        <div className="card border-0 shadow-sm"><div className="card-body p-4" id="resume-preview">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="text-muted mb-0">Preview</h6>
            <button className="btn btn-sm btn-outline-dark" onClick={print}><i className="bi bi-printer"></i> Print</button>
          </div>
          <hr/>
          <h3 className="mb-0">{r.name || 'Your name'}</h3>
          <p className="text-muted mb-1">{r.title}</p>
          <small>{r.email} · {r.phone} · {r.location}</small>
          {r.summary && <><h6 className="mt-3">Summary</h6><p>{r.summary}</p></>}
          {r.skills && <><h6>Skills</h6><p>{r.skills}</p></>}
          <h6>Experience</h6>
          {r.experience.filter(x=>x.role||x.company).map((x,i)=>(
            <div key={i} className="mb-2"><strong>{x.role}</strong> · {x.company} <span className="text-muted small">({x.period})</span>
              <div className="small">{x.details}</div></div>
          ))}
          <h6>Education</h6>
          {r.education.filter(x=>x.degree||x.school).map((x,i)=>(
            <div key={i} className="small">{x.degree}, {x.school} <span className="text-muted">({x.period})</span></div>
          ))}
          {r.projects && <><h6 className="mt-2">Projects</h6><p className="small">{r.projects}</p></>}
        </div></div>
      </div>
    </div>
  );
}
