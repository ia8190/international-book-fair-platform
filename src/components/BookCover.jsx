import PropTypes from 'prop-types';
export default function BookCover({ book, decorative = false }) {
  return <div className={`cover-art cover-${book.theme}`} aria-hidden={decorative || undefined}>
    <span className="cover-edition">THE FAIR COLLECTION</span><span className="cover-name">{book.title}</span>
    <svg className="cover-illustration" viewBox="0 0 240 190" fill="none" aria-hidden="true">
      {book.theme === 'green' && <g stroke="currentColor" strokeWidth="1.4"><circle cx="120" cy="94" r="65" /><circle cx="120" cy="94" r="49" /><path d="M55 94h130M120 29v130M75 49l90 90M75 139l90-90" /><path d="m120 50 18 44-18 44-18-44Z" fill="currentColor" /></g>}
      {book.theme === 'red' && <g stroke="currentColor" strokeWidth="2"><path d="M45 148c-2-42 18-69 63-96-8 50-23 82-63 96Z" /><path d="M47 147 108 52M75 124l-2-43M88 105l-1-39M60 138l-2-31M75 122l31-1M88 103l27-1" /><circle cx="164" cy="109" r="34" /><path d="M164 65v88M120 109h88M133 78l62 62M133 140l62-62" /><path d="M162 67c-10-20 4-34 24-32-3 18-12 26-24 32Z" fill="currentColor" /></g>}
      {book.theme === 'gold' && <g stroke="currentColor" strokeWidth="1.6"><circle cx="171" cy="50" r="27" fill="currentColor" opacity=".7" /><path d="M30 159h180M68 159V95h104v64M45 95h150l-30-18H75ZM75 77h90l-28-20h-34ZM103 57h34l-17-21ZM104 159v-38h32v38M80 105h12M148 105h12M120 21v15M30 172h180M24 185h192" /></g>}
      {book.theme === 'blue' && <g stroke="currentColor" strokeWidth="1.5"><ellipse cx="120" cy="95" rx="82" ry="30" transform="rotate(-45 120 95)" /><ellipse cx="120" cy="95" rx="82" ry="30" transform="rotate(45 120 95)" /><ellipse cx="120" cy="95" rx="82" ry="30" transform="rotate(90 120 95)" /><circle cx="120" cy="95" r="10" fill="currentColor" /><circle cx="177" cy="39" r="5" fill="currentColor" /></g>}
    </svg><span className="cover-author">{book.author}</span><span className="cover-spine" />
  </div>;
}
BookCover.propTypes = { book: PropTypes.object.isRequired, decorative: PropTypes.bool };
