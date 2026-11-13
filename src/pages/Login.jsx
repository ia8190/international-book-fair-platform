import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthLayout from '../components/AuthLayout';
import Icon from '../components/Icon';
export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async e => {
    e.preventDefault(); setLoading(true); setMessage('');
    try {
      const response = await fetch('https://apibookfair.danielefarriciello.dev/api/v1/login', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }), signal: AbortSignal.timeout(20000) });
      if (!response.ok) { setMessage('We couldn’t log you in. Please check your email and password.'); return; }
      const data = await response.json();
      const userResponse = await fetch('https://apibookfair.danielefarriciello.dev/api/v1/me', { credentials: 'include', signal: AbortSignal.timeout(20000) });
      if (!userResponse.ok) { setMessage('We couldn’t load your account. Please try again.'); return; }
      const user = await userResponse.json();
      const role = { 1: 'admin', 2: 'exhibitor', 3: 'visitor' }[user.type_user_id];
      if (!role || !data.token) { setMessage('Your account details couldn’t be verified. Please try again.'); return; }
      localStorage.setItem('authToken', data.token); localStorage.setItem('userRole', role); localStorage.setItem('isLoggedIn', 'true');
      onLogin(role); navigate(`/${role}-dashboard`);
    } catch { setMessage('We can’t reach the sign-in service right now. Please try again shortly.'); }
    finally { setLoading(false); }
  };
  return <AuthLayout><p className="eyebrow">A FAMILIAR FACE</p><h2 className="auth-heading">Welcome back.</h2><p className="auth-description">Log in and pick up where your story left off.</p><form className="auth-form" onSubmit={handleLogin}>
    <div className="form-group"><label htmlFor="login-email">Email address</label><input id="login-email" type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></div>
    <div className="form-group"><div className="password-label"><label htmlFor="login-password">Password</label><button type="button" className="password-toggle" aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button></div><input id="login-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" required /></div>
    <button type="submit" className="button" disabled={loading}>{loading ? 'Logging you in…' : 'Log in'}<Icon name="arrow" size={18} /></button>
  </form>{message && <p className="auth-message" role="alert">{message}</p>}<p className="auth-bottom">New to the fair? <Link to="/register">Start your story here</Link></p></AuthLayout>;
}
Login.propTypes = { onLogin: PropTypes.func.isRequired };
