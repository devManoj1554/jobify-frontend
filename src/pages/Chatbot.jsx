import { useEffect, useRef, useState } from 'react';
import api from '../api/client';
export default function Chatbot() {
  const [msgs,setMsgs]=useState([{role:'assistant',content:"Hi! I'm Jobify AI. Ask me about jobs, resumes, or interview prep."}]);
  const [input,setInput]=useState(''); const [busy,setBusy]=useState(false);
  const ref = useRef(null);
  useEffect(() => { ref.current?.scrollTo(0, ref.current.scrollHeight); }, [msgs]);
  const send = async () => { if (!input.trim()) return;
    const next = [...msgs, {role:'user', content: input}]; setMsgs(next); setInput(''); setBusy(true);
    try {
      const { data } = await api.post('/api/ai/chat', { message: input, history: msgs });
      setMsgs([...next, { role:'assistant', content: data.reply }]);
    } catch { setMsgs([...next, { role:'assistant', content: 'Sorry, something went wrong.' }]); }
    finally { setBusy(false); }
  };
  return (
    <div className="row justify-content-center"><div className="col-12 col-lg-8">
      <h4 className="mb-3"><i className="bi bi-robot brand-gradient"></i> Jobify AI Chatbot</h4>
      <div className="chat-window shadow-sm" ref={ref}>
        {msgs.map((m,i)=>(
          <div key={i} className={`chat-bubble ${m.role==='user'?'chat-user':'chat-bot'}`}>
            <div style={{whiteSpace:'pre-wrap'}}>{m.content}</div>
          </div>
        ))}
        {busy && <div className="chat-bubble chat-bot"><i>Thinking...</i></div>}
      </div>
      <div className="input-group mt-3">
        <input className="form-control" placeholder="Type your question..." value={input}
          onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} disabled={busy}/>
        <button className="btn btn-brand" onClick={send} disabled={busy}><i className="bi bi-send"></i></button>
      </div>
      <small className="text-muted d-block mt-2">Tip: Set OPENAI_API_KEY on the backend to enable advanced AI replies.</small>
    </div></div>
  );
}
