import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import BookCover from '../components/BookCover';
import Modal from '../components/Modal';
import { books, events } from '../data/fair';
import './Home.css';
export default function Home() {
  const [category, setCategory] = useState('All books');
  const [selectedBook, setSelectedBook] = useState(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const filteredBooks = books.filter(book => category === 'All books' || book.category === category);
  return <div className="fair-home">
    <section className="hero section-wrap" aria-labelledby="hero-title">
      <div className="hero-copy"><p className="eyebrow"><span className="little-line" /> FOR THE LOVE OF A GOOD STORY</p>
        <h1 id="hero-title">A world of stories.<br />A place to <em>belong.</em></h1>
        <p className="hero-description">Some stories stay with you. Others bring you together.<br className="desktop-break" /> Discover both at Cork’s International Book Fair.</p>
        <div className="hero-actions"><Link className="button" to="/register">Find your next chapter <Icon name="arrow" size={18} /></Link><a className="text-link" href="#programme">Explore the programme <span>↗</span></a></div>
        <div className="hero-note"><span className="note-flower">✳</span><p>For the curious. The dreamers.<br /><strong>And everyone who’s ever loved a book.</strong></p></div>
      </div>
      <div className="hero-art" role="img" aria-label="Illustrated books in terracotta and golden yellow, celebrating a world of stories">
        <div className="art-arch" /><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><span className="art-small-label">OPEN A BOOK. OPEN YOUR WORLD.</span><span className="art-sun">✳</span>
        <div className="hero-book hero-book-back"><BookCover book={books[2]} decorative /></div><div className="hero-book hero-book-front"><BookCover book={books[1]} decorative /></div>
        <div className="art-stamp"><span>MEET ME</span><Icon name="book" size={28} /><span>AT THE FAIR</span></div><span className="art-caption">A little curiosity. A whole new world.</span>
        <svg className="art-sprig" viewBox="0 0 120 180" fill="none" aria-hidden="true"><path d="M25 170C90 120 55 49 98 8" stroke="currentColor" strokeWidth="2" /><path d="M59 131C17 131 20 96 22 92c30 0 39 17 37 39ZM70 104c35 1 39-26 35-36-29 0-39 18-35 36ZM70 77c-28-4-31-29-27-39 26 3 33 22 27 39ZM81 46c25 0 32-20 30-30-25 0-34 16-30 30Z" fill="currentColor" /></svg>
      </div>
    </section>
    <div className="event-strip section-wrap" aria-label="Fair at a glance">
      <div><Icon name="calendar" size={23} /><p><span>MARK YOUR CALENDAR</span><strong>18—22 July</strong></p></div><div><Icon name="pin" size={23} /><p><span>TWO PLACES, ONE CELEBRATION</span><strong>In the heart of Cork</strong></p></div><div><Icon name="clock" size={23} /><p><span>MAKE A DAY OF IT</span><strong>8 am—9 pm</strong></p></div><a href="#visit">Plan your visit <Icon name="arrow" size={18} /></a>
    </div>
    <section className="books-section section-wrap" id="books" aria-labelledby="books-heading">
      <div className="section-heading"><div><p className="eyebrow">THE BOOKSHELF</p><h2 id="books-heading">Your next great <em>discovery.</em></h2></div><p>A different perspective. An unexpected favourite.<br />There’s a story here for every kind of reader.</p></div>
      <div className="books-toolbar"><div className="book-filters" role="group" aria-label="Filter featured books">{['All books', 'Ideas & learning', 'Food & culture'].map(item => <button type="button" key={item} aria-pressed={category === item} className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div><span className="collection-note">From the fair’s original showcase</span></div>
      <div className="showcase-grid">{filteredBooks.map(book => <button type="button" key={book.id} className="showcase-book" onClick={() => setSelectedBook(book)} aria-label={`Read about ${book.title}`}><span className={`book-stage stage-${book.theme}`}><BookCover book={book} decorative /><span className="book-open"><Icon name="arrow" size={19} /></span></span><span className="book-category">{book.category}</span><h3>{book.title}</h3><span className="book-byline">{book.author}</span></button>)}</div>
    </section>
    <section className="programme-section" id="programme" aria-labelledby="programme-heading"><div className="section-wrap programme-layout">
      <div className="programme-intro"><p className="eyebrow">BEYOND THE PAGES</p><h2 id="programme-heading">Good books.<br />Great <em>company.</em></h2><p>Come for the books. Stay for the conversations, the creative sparks, and the people you’ll meet along the way.</p><button type="button" className="button button-outline" onClick={() => setScheduleOpen(true)}>View the full programme <Icon name="arrow" size={18} /></button><span className="programme-doodle" aria-hidden="true">✳</span></div>
      <div className="programme-list">{events.slice(1, 4).concat(events[7]).map(event => <div className="programme-row" key={event.time}><span className="event-time">{event.time}</span><div><span className="event-category">{event.category}</span><h3>{event.title}</h3><p>{event.location}</p></div><button type="button" className="event-arrow" onClick={() => setScheduleOpen(true)} aria-label={`View programme for ${event.title}`}><Icon name="arrow" size={20} /></button></div>)}</div>
    </div></section>
    <section className="visit-section section-wrap" id="visit" aria-labelledby="visit-heading"><div className="section-heading"><div><p className="eyebrow">THE CITY IS PART OF THE STORY</p><h2 id="visit-heading">See you in <em>Cork.</em></h2></div><p>Two welcoming venues. One shared love of stories.<br />Make a little room for discovery.</p></div>
      <div className="venue-grid"><article className="venue-card"><div className="venue-sketch stadium-sketch" aria-hidden="true"><svg viewBox="0 0 480 140" fill="none"><path d="M20 115h440M65 115V70l175-41 175 41v45M65 70l175 23 175-23M87 74v41M112 78v37M140 81v34M170 85v30M205 90v25M240 93v22M275 90v25M310 85v30M340 81v34M368 78v37M393 74v41M65 61l175-41 175 41M42 115V96M438 115V96M240 20V8M240 8h26l-7 7h-19" /></svg></div><div className="venue-content"><span className="eyebrow">BY THE RIVER</span><h3>Páirc Uí Chaoimh</h3><p>A gathering place for big ideas and new discoveries.</p><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Pairc+Ui+Chaoimh+Cork" target="_blank" rel="noreferrer">Find your way <Icon name="arrow" size={17} /></a></div></article>
      <article className="venue-card"><div className="venue-sketch city-sketch" aria-hidden="true"><svg viewBox="0 0 480 140" fill="none"><path d="M20 119h440M85 119V65h100v54M295 119V65h100v54M185 119V53h110v66M175 53l65-27 65 27ZM210 119V68h60v51M219 68v51M240 68v51M261 68v51M202 65h76M175 119h130M180 128h120M95 58h80M305 58h80M226 30V16h28v14M226 16q14-23 28 0M240 5V0M100 80h15v17h-15ZM130 80h15v17h-15ZM160 80h15v17h-15ZM305 80h15v17h-15ZM335 80h15v17h-15ZM365 80h15v17h-15Z" /></svg></div><div className="venue-content"><span className="eyebrow">IN THE CITY</span><h3>Cork City Hall</h3><p>Literature and culture, right in the heart of Cork.</p><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Cork+City+Hall" target="_blank" rel="noreferrer">Find your way <Icon name="arrow" size={17} /></a></div></article></div>
    </section>
    <section className="closing-section section-wrap"><span className="closing-flower" aria-hidden="true">✳</span><p className="eyebrow">THERE’S A PLACE FOR YOU HERE</p><h2>Every great story starts<br />with <em>showing up.</em></h2><Link className="button" to="/register">Be part of the story <Icon name="arrow" size={18} /></Link><Link className="closing-exhibitor" to="/exhibitor">A publisher or bookseller? Exhibit with us <span>↗</span></Link></section>
    {selectedBook && <Modal title="On the bookshelf" onClose={() => setSelectedBook(null)} className="book-detail-modal"><div className="book-detail-layout"><BookCover book={selectedBook} decorative /><div><p className="eyebrow">{selectedBook.category}</p><h3>{selectedBook.title}</h3><p className="detail-author">By {selectedBook.author}</p><p>{selectedBook.description}</p><Link to="/visitor/book-search" className="button" onClick={() => setSelectedBook(null)}>Explore the book catalogue <Icon name="arrow" size={17} /></Link></div></div></Modal>}
    {scheduleOpen && <Modal title="The programme" onClose={() => setScheduleOpen(false)}><p className="modal-lead">18—22 July · Doors open 8 am—9 pm.<br />Exhibitor stalls are open throughout the day.</p><div className="full-programme">{events.map(event => <div className="programme-row" key={event.time}><span className="event-time">{event.time}</span><div><span className="event-category">{event.category}</span><h3>{event.title}</h3><p>{event.detail} · {event.location}</p></div></div>)}</div></Modal>}
  </div>;
}
