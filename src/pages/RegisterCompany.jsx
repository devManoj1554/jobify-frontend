import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext.jsx';
export default function RegisterCompany() {
  const { refresh } = useAuth(); const nav = useNavigate();
  const [f, setF] = useState({
    name:'', gstin:'', pan:'', cin:'', description:'', industry:'', companySize:'1-10',
    website:'', logoUrl:'', email:'', phone:'',
    addressLine1:'', addressLine2:'', city:'', state:'', country:'India', pincode:'', foundedYear:''
  });
  const [err,setErr]=useState('');
  const set=(k,v)=>setF({...f,[k]:v.toUpperCase ? (['gstin','pan','cin'].includes(k) ? v.toUpperCase() : v) : v});
  const submit=async(e)=>{e.preventDefault(); setErr('');
    try { await api.post('/api/companies', f); await refresh(); nav('/post-job'); }
    catch (e2) { setErr(e2.response?.data?.message || 'Failed to register company'); }
  };
  return (
    <div className="card border-0 shadow-sm"><div className="card-body p-4">
      <h3 className="mb-1">Register your company</h3>
      <p className="text-muted">Provide your business details to start posting jobs on Jobify.</p>
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={submit} className="row g-3">
        <div className="col-md-6"><label className="form-label">Company Name*</label><input className="form-control" required value={f.name} onChange={e=>set('name',e.target.value)}/></div>
        <div className="col-md-6"><label className="form-label">Industry</label>
          <select className="form-select" value={f.industry} onChange={e=>set('industry',e.target.value)}>
            <option value="">Select...</option>
            {['IT Services','Software Product','Banking & Finance','Healthcare','Education','Manufacturing','Retail','E-commerce','Consulting','Other'].map(x=><option key={x}>{x}</option>)}
          </select></div>

        <div className="col-12"><h6 className="mt-3 mb-0"><i className="bi bi-shield-check"></i> Business Verification</h6><small className="text-muted">Required for verified employer status.</small></div>
        <div className="col-md-4"><label className="form-label">GSTIN</label>
          <input className="form-control text-uppercase" maxLength="15" placeholder="22AAAAA0000A1Z5" value={f.gstin} onChange={e=>set('gstin',e.target.value)}/>
          <small className="text-muted">15-character GSTIN</small></div>
        <div className="col-md-4"><label className="form-label">PAN</label>
          <input className="form-control text-uppercase" maxLength="10" placeholder="AAAAA0000A" value={f.pan} onChange={e=>set('pan',e.target.value)}/></div>
        <div className="col-md-4"><label className="form-label">CIN</label>
          <input className="form-control text-uppercase" maxLength="21" placeholder="L12345AB1234ABC123456" value={f.cin} onChange={e=>set('cin',e.target.value)}/></div>

        <div className="col-md-4"><label className="form-label">Company Size</label>
          <select className="form-select" value={f.companySize} onChange={e=>set('companySize',e.target.value)}>
            {['1-10','11-50','51-200','201-500','501-1000','1000+'].map(x=><option key={x}>{x}</option>)}
          </select></div>
        <div className="col-md-4"><label className="form-label">Founded Year</label><input className="form-control" placeholder="2015" value={f.foundedYear} onChange={e=>set('foundedYear',e.target.value)}/></div>
        <div className="col-md-4"><label className="form-label">Website</label><input className="form-control" placeholder="https://..." value={f.website} onChange={e=>set('website',e.target.value)}/></div>

        <div className="col-md-6"><label className="form-label">Company Email</label><input type="email" className="form-control" value={f.email} onChange={e=>set('email',e.target.value)}/></div>
        <div className="col-md-6"><label className="form-label">Company Phone</label><input className="form-control" value={f.phone} onChange={e=>set('phone',e.target.value)}/></div>
        <div className="col-12"><label className="form-label">Logo URL</label><input className="form-control" placeholder="https://.../logo.png" value={f.logoUrl} onChange={e=>set('logoUrl',e.target.value)}/></div>

        <div className="col-12"><h6 className="mt-3 mb-0"><i className="bi bi-geo-alt"></i> Registered Address</h6></div>
        <div className="col-12"><input className="form-control" placeholder="Address line 1" value={f.addressLine1} onChange={e=>set('addressLine1',e.target.value)}/></div>
        <div className="col-12"><input className="form-control" placeholder="Address line 2" value={f.addressLine2} onChange={e=>set('addressLine2',e.target.value)}/></div>
        <div className="col-md-4"><input className="form-control" placeholder="City" value={f.city} onChange={e=>set('city',e.target.value)}/></div>
        <div className="col-md-4"><input className="form-control" placeholder="State" value={f.state} onChange={e=>set('state',e.target.value)}/></div>
        <div className="col-md-2"><input className="form-control" placeholder="Pincode" value={f.pincode} onChange={e=>set('pincode',e.target.value)}/></div>
        <div className="col-md-2"><input className="form-control" placeholder="Country" value={f.country} onChange={e=>set('country',e.target.value)}/></div>

        <div className="col-12"><label className="form-label">About the Company</label>
          <textarea className="form-control" rows="4" value={f.description} onChange={e=>set('description',e.target.value)}/></div>

        <div className="col-12"><button className="btn btn-brand">Register Company</button></div>
      </form>
    </div></div>
  );
}
