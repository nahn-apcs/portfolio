import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export default function ProjectSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 1024 ? window.innerWidth / 3 : window.innerWidth / 1.2;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="work" className="py-24 relative z-20">
      <div className="w-full px-6 md:px-12 xl:px-24 mx-auto">
        
        {/* Section Header */}
        <div className="text-left mb-16 flex flex-col items-start w-full">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="text-5xl md:text-[5rem] font-clash font-normal text-white tracking-tight leading-[1.1]"
           >
             My <span className="text-[#d8b4fe]">Work</span>
           </motion.h2>
        </div>

        {/* Khung Flex chứa Projects (Hỗ trợ lướt ngang vô tận) & Nút trượt trái phải */}
        <div className="relative w-full group/slider">
          
          {/* Nút lướt Trái (Mũi tên Tối giản - Floating Chevron) */}
          <button 
             onClick={() => scroll('left')} 
             className="hidden md:flex absolute -left-12 lg:-left-16 top-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center text-neutral-500 z-30 hover:text-white transition-all duration-500 opacity-0 xl:opacity-100 group-hover/slider:opacity-100 group-hover/slider:-translate-x-2"
          >
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div ref={scrollRef} className="w-full border border-white/10 flex flex-nowrap overflow-x-auto overflow-y-hidden snap-x snap-mandatory divide-x divide-white/10 relative custom-scrollbar scroll-smooth">
          
          {/* Project 01: SNITCHES (Lẻ: Ảnh trên, Chữ dưới) */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full md:w-1/2 lg:w-1/3 shrink-0 snap-center flex flex-col p-6 lg:p-8 lg:pt-10 group min-h-[500px] bg-black/40 backdrop-blur-xl hover:bg-black/60 transition-all duration-700 relative overflow-hidden"
          >
            {/* Vùng Ảnh (Image) */}
            <div className="relative w-full mb-10 flex items-center justify-center cursor-pointer">
              <div className="relative w-full shadow-lg aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group-hover:border-purple-500/20 group-hover:shadow-[0_0_40px_rgba(216,180,254,0.15)] transition-all duration-700">
                 <a href="https://www.youtube.com/watch?v=trNBoFlZsGE" target="_blank" rel="noreferrer" className="block w-full h-full">
                    <img 
                      src={`${import.meta.env.BASE_URL}snitches.png`} 
                      alt="Snitches Fashion AI Shop" 
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600/111111/333333?text=Ảnh+bị+lỗi'; }}
                      className="w-full h-full object-cover object-top transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                 </a>
              </div>
              
              <a href="https://www.youtube.com/watch?v=trNBoFlZsGE" target="_blank" rel="noreferrer" className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 w-12 h-12 lg:w-14 lg:h-14 bg-[#1a1a1a] rounded-full flex items-center justify-center border border-white/10 text-white hover:bg-white hover:text-black transition-colors duration-300 z-10 shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </a>
            </div>

            {/* Vùng Tiêu đề & Cấp độ */}
            <div className="flex flex-row justify-between items-start mb-6 lg:mb-8 w-full font-clash mt-auto">
              <h2 className="text-[4rem] lg:text-[4.5rem] leading-[0.8] font-medium text-white tracking-tighter drop-shadow-sm">
                01
              </h2>
              <div className="text-right">
                <h3 className="text-xl lg:text-2xl font-medium text-white mb-1 tracking-wide">Snitches</h3>
                <p className="text-neutral-400 text-xs lg:text-sm tracking-wide">E-Commerce & AI</p>
              </div>
            </div>

            {/* Vùng Tools & Features */}
            <div className="text-left font-sans">
              <h4 className="text-white text-base lg:text-lg mb-2 tracking-wide">Tools and features</h4>
              <p className="text-neutral-500 text-sm lg:text-[15px] leading-relaxed">
                React, Tailwind, Node.js, AI Retrieval
              </p>
            </div>
          </motion.div>

          {/* Project 02: Coming Soon Template (Chẵn: Chữ trên, Khung chờ dưới) */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full md:w-1/2 lg:w-1/3 shrink-0 snap-center flex flex-col p-6 lg:p-8 lg:pb-10 group min-h-[500px] bg-black/40 backdrop-blur-xl hover:bg-black/60 transition-all duration-700 relative overflow-hidden"
          >
            {/* Vùng Tiêu đề & Cấp độ */}
            <div className="flex flex-row justify-between items-end mb-6 lg:mb-8 w-full font-clash">
              <h2 className="text-[4rem] lg:text-[4.5rem] leading-[0.8] font-medium text-white tracking-tighter drop-shadow-sm opacity-50">
                02
              </h2>
              <div className="text-right opacity-50">
                <h3 className="text-xl lg:text-2xl font-medium text-white mb-1 tracking-wide">Coming Soon</h3>
                <p className="text-neutral-400 text-xs lg:text-sm tracking-wide">Work in progress</p>
              </div>
            </div>

            <div className="text-left font-sans mb-10 opacity-50">
              <h4 className="text-white text-base lg:text-lg mb-2 tracking-wide">Tools and features</h4>
              <div className="w-3/4 h-2 bg-white/10 rounded-full mb-3"></div>
              <div className="w-1/2 h-2 bg-white/10 rounded-full"></div>
            </div>

            {/* Khung đứt chờ ảnh (Placeholder) */}
            <div className="flex-1 w-full flex items-center justify-center border border-dashed border-white/10 rounded-2xl group-hover:border-purple-500/30 transition-colors mt-auto aspect-video md:aspect-[4/3] bg-white/[0.02]">
               <span className="text-white/20 font-clash tracking-widest uppercase text-sm">Cooking inside the lab...</span>
            </div>
          </motion.div>

          {/* Project 03: Coming Soon Template (Lẻ: Khung chờ trên, Chữ dưới giống 01) */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full md:w-1/2 lg:w-1/3 shrink-0 snap-center flex flex-col p-6 lg:p-8 lg:pt-10 group min-h-[500px] bg-black/40 backdrop-blur-xl hover:bg-black/60 transition-all duration-700 relative overflow-hidden"
          >
            {/* Khung đứt chờ ảnh (Placeholder) */}
            <div className="flex-1 w-full flex items-center justify-center border border-dashed border-white/10 mb-10 rounded-2xl group-hover:border-purple-500/30 transition-colors aspect-video md:aspect-[4/3] bg-white/[0.02]">
               <span className="text-white/20 font-clash tracking-widest uppercase text-sm">Cooking inside the lab...</span>
            </div>

            {/* Vùng Tiêu đề & Cấp độ */}
            <div className="flex flex-row justify-between items-start mb-6 lg:mb-8 w-full font-clash mt-auto">
              <h2 className="text-[4rem] lg:text-[4.5rem] leading-[0.8] font-medium text-white tracking-tighter drop-shadow-sm opacity-50">
                03
              </h2>
              <div className="text-right opacity-50">
                <h3 className="text-xl lg:text-2xl font-medium text-white mb-1 tracking-wide">Coming Soon</h3>
                <p className="text-neutral-400 text-xs lg:text-sm tracking-wide">Work in progress</p>
              </div>
            </div>

            <div className="text-left font-sans opacity-50">
              <h4 className="text-white text-base lg:text-lg mb-2 tracking-wide">Tools and features</h4>
              <div className="w-3/4 h-2 bg-white/10 rounded-full mb-3"></div>
              <div className="w-1/2 h-2 bg-white/10 rounded-full"></div>
            </div>
          </motion.div>
        </div>

        {/* Nút lướt Phải (Mũi tên Tối giản - Floating Chevron) */}
        <button 
             onClick={() => scroll('right')} 
             className="hidden md:flex absolute -right-12 lg:-right-16 top-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center text-neutral-500 z-30 hover:text-white transition-all duration-500 opacity-0 xl:opacity-100 group-hover/slider:opacity-100 group-hover/slider:translate-x-2"
        >
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
        </div>

      </div>
    </section>
  );
}
