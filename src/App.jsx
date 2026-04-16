import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SocialSidebar from './components/SocialSidebar';
import Home from './pages/Home';
import Blog from './pages/Blog';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="relative">
        <Header />
        <SocialSidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
