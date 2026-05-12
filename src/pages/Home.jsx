import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function Home() {
  const nav = useNavigate();
  const [q, setQ] = useState(''); const [loc, setLoc] = useState('');
  const search = (e) => { e.preventDefault(); nav(`/jobs?q=${encodeURIComponent(q)}&location=${encodeURIComponent(loc)}`); };
  return (
    <>
      <section className="hero text-center">
        <h1 className="display-5 fw-bold">Find your <span className="brand-gradient">dream job</span> with Jobify</h1>
        <p className="lead text-muted">AI-powered job search, resume builder, and career chatbot - all in one place.</p>
        <form onSubmit={search} className="row g-2 justify-content-center mt-4">
          <div className="col-12 col-md-4"><input className="form-control form-control-lg" placeholder="Job title or skill" value={q} onChange={e=>setQ(e.target.value)} /></div>
          <div className="col-12 col-md-3"><input className="form-control form-control-lg" placeholder="Location" value={loc} onChange={e=>setLoc(e.target.value)} /></div>
          <div className="col-12 col-md-2 d-grid"><button className="btn btn-brand btn-lg"><i className="bi bi-search"></i> Search</button></div>
        </form>
      </section>
      <div className="row mt-5 g-3">
        {[
          {i:'bi-robot',t:'AI Career Chatbot',d:'Get instant career advice, interview tips and personalized guidance.',l:'/chat'},
          {i:'bi-file-earmark-person',t:'Resume Maker',d:'Build a polished resume with AI-generated summaries.',l:'/resume'},
          {i:'bi-megaphone',t:'JD Maker',d:'Generate professional job descriptions in seconds.',l:'/jd-maker'},
          {i:'bi-buildings',t:'Company Registration',d:'Register your company with full GST & business details.',l:'/register-company'},
        ].map((c,i)=>(
          <div className="col-12 col-sm-6 col-lg-3" key={i}>
            <Link to={c.l} className="text-decoration-none text-dark">
              <div className="card h-100 border-0 shadow-sm job-card">
                <div className="card-body">
                  <i className={`bi ${c.i} fs-1 brand-gradient`}></i>
                  <h5 className="mt-2">{c.t}</h5><p className="text-muted">{c.d}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
