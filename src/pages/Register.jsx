import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import AuthLayout from '../components/AuthLayout';
import Icon from '../components/Icon';
export default function Register() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', company: '', booth: '' });
  const [role, setRole] = useState(params.get('role') === 'exhibitor' ? 'Exhibitor' : 'Visitor');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async e => {
    e.preventDefault(); setMessage(''); setSuccess(false); setLoading(true);
    const payload = { first_name: form.firstName, last_name: form.lastName, email: form.email, password: form.password, type_user_id: role === 'Visitor' ? 3 : role === 'Admin' ? 1 : 2, ...(role === 'Exhibitor' && { company: form.company, booth: form.booth }) };
    try {
      const response = await api.post('/register-user', payload, { timeout: 20000 });
      if (response.status >= 200 && response.status < 300) { setSuccess(true); setMessage('Your account is ready. Log in to begin exploring.'); }
    } catch (error) {
      const detail = error.response?.data?.message;
      setMessage(typeof detail === 'string' ? detail : 'We couldn’t create your account. Please check your details and try again shortly.');
    } finally { setLoading(false); }
  };
  return <AuthLayout register><p className="eyebrow">COME AS YOU ARE</p><h2 className="auth-heading">Be part of the story.</h2><p className="auth-description">Join our community of readers, writers and book lovers.</p><form className="auth-form" onSubmit={submit}>
    <div className="auth-name-row"><div className="form-group"><label htmlFor="firstName">First name</label><input id="firstName" name="firstName" autoComplete="given-name" value={form.firstName} onChange={change} required /></div><div className="form-group"><label htmlFor="lastName">Last name</label><input id="lastName" name="lastName" autoComplete="family-name" value={form.lastName} onChange={change} required /></div></div>
    <div className="form-group"><label htmlFor="register-email">Email address</label><input id="register-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={change} required /></div>
    <div className="form-group"><label htmlFor="register-password">Password</label><input id="register-password" name="password" type="password" autoComplete="new-password" value={form.password} onChange={change} required /></div>
    <div className="form-group"><label htmlFor="role">I’m joining as a</label><select id="role" value={role} onChange={e => setRole(e.target.value)}><option>Visitor</option><option>Exhibitor</option><option>Admin</option></select></div>
    {role === 'Exhibitor' && <><div className="form-group"><label htmlFor="company">Company name</label><input id="company" name="company" autoComplete="organization" value={form.company} onChange={change} required /></div><div className="form-group"><label htmlFor="booth">Booth preference</label><input id="booth" name="booth" value={form.booth} onChange={change} /></div></>}
    <button type="submit" className="button" disabled={loading || success}>{loading ? 'Creating your account…' : success ? 'Account created' : 'Create an account'}<Icon name="arrow" size={18} /></button>
  </form>{message && <p role="status" className={`auth-message ${success ? 'success' : ''}`}>{message}{success && <> <Link to="/login">Log in →</Link></>}</p>}<p className="auth-bottom">Already part of the fair? <Link to="/login">Welcome back</Link></p></AuthLayout>;
}
