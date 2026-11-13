import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
export default function Modal({ title, onClose, children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, []);
  return <dialog ref={ref} className={`fair-modal ${className}`} aria-labelledby="modal-title" onCancel={onClose} onClick={e => {
    if (e.target === e.currentTarget) { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose(); }
  }}><div className="modal-heading"><h2 id="modal-title">{title}</h2><button type="button" className="icon-button" aria-label="Close dialog" onClick={onClose}><Icon name="close" /></button></div>{children}</dialog>;
}
Modal.propTypes = { title: PropTypes.string.isRequired, onClose: PropTypes.func.isRequired, children: PropTypes.node, className: PropTypes.string };
