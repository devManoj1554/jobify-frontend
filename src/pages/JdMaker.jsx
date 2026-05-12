import { useState } from 'react';
import api from '../api/client';
export default function JdMaker() {
  const [f,setF]=useState({title:'',skills:'',experience:'2-4 years',location:'',company:''});
  const [out,setOut]=useState(''); const [busy,setBusy]=useState(false);
  const set=(k,v)=>setF({...f,[k]:v});
  const gen=async()=>{ setBusy(true);
    try{ const { data } = await api.post('/api/ai/jd', f); setOut(data.reply); } finally { setBusy(false); }
  };
  return (
    <div className="row g-3">
      <div className="col-12 col-lg-5">
        <div className="card border-0 shadow-sm"><div className="card-body p-4">
          <h4>JD Maker</h4>
          <p className="text-muted small">Generate a polished job description with AI.</p>
          <div className="mb-2"><input className="form-control" placeholder="Job title" value={f.title} onChange={e=>set('title',e.target.value)}/></div>
          <div className="mb-2"><input className="form-control" placeholder="Company" value={f.company} onChange={e=>set('company',e.target.value)}/></div>
          <div className="mb-2"><input className="form-control" placeholder="Location" value={f.location} onChange={e=>set('location',e.target.value)}/></div>
          <div className="mb-2"><input className="form-control" placeholder="Experience (e.g. 3-5 years)" value={f.experience} onChange={e=>set('experience',e.target.value)}/></div>
          <div className="mb-3"><textarea className="form-control" rows="3" placeholder="Key skills" value={f.skills} onChange={e=>set('skills',e.target.value)}/></div>
          <button className="btn btn-brand w-100" onClick={gen} disabled={busy}>{busy?'Generating...':'Generate JD'}</button>
        </div></div>
      </div>
      <div className="col-12 col-lg-7">
        <div className="card border-0 shadow-sm"><div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Generated JD</h6>
            {out && <button className="btn btn-sm btn-outline-secondary" onClick={()=>navigator.clipboard.writeText(out)}><i className="bi bi-clipboard"></i> Copy</button>}
          </div>
          <hr/>
          <pre style={{whiteSpace:'pre-wrap',fontFamily:'inherit'}}>{out || 'Fill in the details and click Generate.'}</pre>
        </div></div>
      </div>
    </div>
  );
}
