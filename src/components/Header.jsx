import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from './Icon';
import './Header.css';
export default function Header({ role, onLogout }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location]);
  const dashboard = ['admin', 'visitor', 'exhibitor'].includes(role) ? `/${role}-dashboard` : '/';
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="announcement"><span>A celebration of books, people & possibility.</span><span>Cork, Ireland <span className="announcement-star">✳</span> 18—22 July</span></div>
    <header className="site-header"><div className="site-header-inner">
      <Link className="brand" to="/" aria-label="International Book Fair home"><span className="brand-symbol"><Icon name="book" size={31} /></span><span>International<span>Book Fair<span className="brand-dot">.</span></span></span></Link>
      <button type="button" className="mobile-menu-toggle icon-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
      <nav id="primary-nav" className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation" onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }}>
        <NavLink to="/" end>Discover</NavLink><Link to="/#programme" onClick={() => setOpen(false)}>The programme</Link><NavLink to="/about">Our story</NavLink><span className="nav-divider" />
        {onLogout ? <><NavLink to={dashboard}>My dashboard</NavLink><button type="button" className="button button-small" onClick={onLogout}>Log out <Icon name="arrow" size={16} /></button></> : <><NavLink to="/login">Log in</NavLink><Link className="button button-small" to="/register">Join the fair <Icon name="arrow" size={16} /></Link></>}
      </nav>
    </div></header>
  </>;
}
Header.propTypes = { role: PropTypes.string, onLogout: PropTypes.func };
