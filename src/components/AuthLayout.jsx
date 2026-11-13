import PropTypes from 'prop-types';
import BookCover from './BookCover';
import { books } from '../data/fair';
import './AuthLayout.css';
export default function AuthLayout({ children, register = false }) {
  return <div className="auth-layout section-wrap"><aside className="auth-story"><p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h1>Good stories.<br />Even better<br /><em>connections.</em></h1><p>A world of books and a community of curious minds. There’s a place for you at the fair.</p><div className="auth-book"><BookCover book={books[0]} decorative /></div><span className="auth-star" aria-hidden="true">✳</span><span className="auth-caption">Cork, Ireland · 18—22 July</span></aside><div className={`auth-panel ${register ? 'auth-register' : ''}`}>{children}</div></div>;
}
AuthLayout.propTypes = { children: PropTypes.node, register: PropTypes.bool };
