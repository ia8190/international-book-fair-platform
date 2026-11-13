import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import Modal from './Modal';
import './Footer.css';
export default function Footer() {
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const quickAnswers = {
    'When is the fair?': 'The fair’s listed dates are 18–22 July, with doors open from 8 am to 9 pm. A year for the next edition has not yet been confirmed on this website.',
    'Where is it held?': 'You’ll find the fair at Páirc Uí Chaoimh and Cork City Hall in Cork, Ireland. The “Plan your visit” section has links to directions for both venues.',
    'What can I do there?': 'Explore books and exhibitor stalls, join writing workshops, enjoy children’s storytelling, meet authors and listen to poetry. Browse the programme for all the listed times.',
  };
  const ask = async (question) => {
    if (!question.trim() || loading) return;
    const next = [...messages, { role: 'user', content: question.trim() }];
    setMessages(next); setInput(''); setError('');
    if (quickAnswers[question]) { setMessages([...next, { role: 'assistant', content: quickAnswers[question] }]); return; }
    setLoading(true);
    try {
      const response = await fetch('https://apibookfair.danielefarriciello.dev/api/v1/chat-bot', {
        method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: messages.map(m => `${m.role}: ${m.content}`).join('\n'), message: question.trim() }),
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) throw new Error('unavailable');
      const data = await response.json();
      const answer = data.choices?.[0]?.message?.content;
      if (!answer) throw new Error('empty');
      setMessages([...next, { role: 'assistant', content: answer }]);
    } catch { setError('Our live assistant is unavailable right now. Try one of the quick questions below, or explore the programme.'); }
    finally { setLoading(false); }
  };
  return <>
    <footer className="site-footer"><div className="section-wrap">
      <div className="footer-top"><div><Link className="brand footer-brand" to="/"><span className="brand-symbol"><Icon name="book" size={31} /></span><span>International<span>Book Fair<span className="brand-dot">.</span></span></span></Link><p>Bringing stories to life.<br />Bringing people together.</p></div>
        <div className="footer-links"><span>EXPLORE</span><Link to="/#books">The bookshelf</Link><Link to="/#programme">The programme</Link><Link to="/about">Our story</Link></div>
        <div className="footer-links"><span>BE PART OF IT</span><Link to="/visitor">Visit the fair</Link><Link to="/exhibitor">Exhibit with us</Link><Link to="/register">Create an account</Link></div>
        <div className="footer-help"><span>A LITTLE HELP?</span><h3>Curiosity is welcome.</h3><p>Ask our fair assistant about<br />what’s on and finding your way.</p><button type="button" onClick={() => setChatOpen(true)}><Icon name="chat" size={17} /> Ask the fair assistant <Icon name="arrow" size={16} /></button></div>
      </div><div className="footer-bottom"><span>© {new Date().getFullYear()} International Book Fair</span><span>Made for the love of stories. <span className="footer-flower">✳</span> Cork, Ireland</span><Link to="/visitor/rules">Visitor guidelines <span>↗</span></Link></div>
    </div></footer>
    {chatOpen && <Modal title="Your fair companion" onClose={() => setChatOpen(false)} className="chat-modal"><p className="modal-lead">A little help finding your next chapter. Ask about the fair, the programme or the venues.</p><div className="chat-log" role="log" aria-live="polite">{messages.map((m,i) => <div key={i} className={`chat-message chat-${m.role}`}><span>{m.role === 'user' ? 'YOU' : 'FAIR COMPANION'}</span><p>{m.content}</p></div>)}{loading && <p className="chat-status" role="status">Finding an answer…</p>}</div>{error && <p className="chat-error" role="alert">{error}</p>}<div className="chat-suggestions">{Object.keys(quickAnswers).map(q => <button type="button" key={q} disabled={loading} onClick={() => ask(q)}>{q}</button>)}</div><form className="fair-chat-form" onSubmit={e => { e.preventDefault(); ask(input); }}><label className="visually-hidden" htmlFor="fair-question">Your question about the fair</label><input id="fair-question" value={input} onChange={e => setInput(e.target.value)} placeholder="What would you like to know?" maxLength={1000} required /><button type="submit" className="button" disabled={loading || !input.trim()} aria-label="Send question"><Icon name="arrow" size={20} /></button></form></Modal>}
  </>;
}
