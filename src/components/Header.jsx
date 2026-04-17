import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isBlog = location.pathname === '/blog';

  const handleScroll = (e, id) => {
    e.preventDefault();
    if (isBlog) {
      navigate('/' + id);
    } else {
      const element = document.getElementById(id.substring(1));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center bg-white/70 backdrop-blur-md border-b border-neutral-200">
      <div className="text-xl font-bold tracking-tight text-neutral-900 mb-4 md:mb-0">
        nahn.dev
      </div>
      <div className="hidden md:flex gap-8 text-sm font-normal font-clash tracking-widest text-neutral-500">
        <Link to="/" onClick={(e) => { if(!isBlog) { e.preventDefault(); window.scrollTo({top:0, behavior: 'smooth'}); } }} className="hover:text-black transition-colors">HOME</Link>
        <a href="#about" onClick={(e) => handleScroll(e, '#about')} className="hover:text-black transition-colors">ABOUT</a>
        <a href="#work" onClick={(e) => handleScroll(e, '#work')} className="hover:text-black transition-colors">WORK</a>
        <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="hover:text-black transition-colors">CONTACT</a>
        <Link to="/blog" className="hover:text-black transition-colors">BLOG</Link>
      </div>
    </header>
  );
}
