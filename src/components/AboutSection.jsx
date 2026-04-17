import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import IdCard from './IdCard';

const commands = [
  { type: 'cmd', text: 'whoami', speed: 60, delayAfter: 200 },
  { type: 'out', text: 'Thành Nhân (NAHN) - Backend Developer', speed: 10, delayAfter: 400 },
  { type: 'cmd', text: 'cat "about me.md"', speed: 50, delayAfter: 200 },
  { type: 'out', text: "APCS Student @ HCMUS | System Architecture & Performance Optimization.\n> I bridge the gap between algorithms and system internals by engineering an Online Judge from scratch. My focus is on building scalable, high-performance tools that solve complex technical challenges.", speed: 5, delayAfter: 500 }
];

export default function AboutSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    if (!isInView) return;
    
    // Auto-loop after the final command's delay
    if (lineIdx >= commands.length) {
      setIsTyping(false);
      const resetTimeout = setTimeout(() => {
        setLineIdx(0);
        setCharIdx(0);
      }, 5000); // Đứng chờ 5 giây trước khi tự động xoá màn hình gõ lại
      return () => clearTimeout(resetTimeout);
    }
    
    setIsTyping(true);
    const line = commands[lineIdx];
    
    if (charIdx < line.text.length) {
      const timeout = setTimeout(() => {
        setCharIdx(prev => prev + 1);
      }, line.speed);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      const timeout = setTimeout(() => {
        setLineIdx(prev => prev + 1);
        setCharIdx(0);
      }, line.delayAfter);
      return () => clearTimeout(timeout);
    }
  }, [isInView, lineIdx, charIdx]);

  return (
    <section id="about" className="min-h-screen py-24 relative flex items-center justify-center">
      <div className="container mx-auto px-6 relative z-10 w-full" ref={containerRef}>
        
        {/* About Header */}
        <div className="text-center mb-28 flex flex-col items-center">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="text-5xl md:text-[5rem] font-clash font-medium text-neutral-900 tracking-tight leading-[1.1] select-none"
           >
             About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-600">
               me
             </span>
           </motion.h2>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 max-w-6xl mx-auto">
          
          {/* === CỘT TRÁI - 3D ID CARD === */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-5/12 flex flex-col justify-center items-center relative z-20"
          >
             <IdCard />
          </motion.div>

          {/* === CỘT PHẢI - 3D TERMINAL WINDOW === */}
          <div className="w-full lg:w-7/12 perspective-[1200px]">
            <motion.div 
              style={{ rotateY: -10, rotateX: 4, transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, scale: 0.95, z: -100 }}
              animate={isInView ? { opacity: 1, scale: 1, z: 0 } : {}}
              whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="rounded-xl overflow-hidden glass-card shadow-[-30px_30px_60px_rgba(31,38,135,0.08)] font-mono text-[13px] md:text-sm leading-relaxed relative cursor-crosshair"
            >
              {/* Ánh sáng chạy ngang kính */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
              
              {/* Top Bar (Mac styled) */}
              <div className="bg-[#F8FAFC] px-4 py-3.5 flex items-center gap-2 border-b border-neutral-200">
                <div className="w-3.5 h-3.5 rounded-full bg-red-400"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-400"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-green-400"></div>
                <div className="mx-auto text-neutral-500 text-[10px] md:text-xs font-semibold tracking-widest hidden sm:block">guest@nahn: ~/"about me"</div>
              </div>
              
              {/* Terminal Body */}
              <div className="p-5 md:p-8 h-[350px] md:h-[400px]">
                {commands.map((cmd, idx) => {
                  if (idx > lineIdx) return null;
                  
                  const isCurrent = idx === lineIdx;
                  const textToRender = isCurrent ? cmd.text.slice(0, charIdx) : cmd.text;
                  
                  return (
                    <div key={idx} className={`mb-5 ${cmd.type === 'cmd' ? 'text-blue-600' : 'text-neutral-600'} whitespace-pre-wrap`}>
                      {cmd.type === 'cmd' ? (
                        <span className="text-[#10b981] font-bold mr-3 tracking-widest">nahn_admin@~ %</span>
                      ) : (
                        <span className="text-neutral-400 mr-2 opacity-80">❯</span>
                      )}
                      <span className={cmd.type === 'cmd' ? 'tracking-wider' : 'tracking-wide leading-loose'}>{textToRender}</span>
                      {isCurrent && (
                        <motion.span 
                          animate={{ opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                          className="inline-block w-2 md:w-2.5 h-4 md:h-5 bg-neutral-900 align-middle ml-1"
                        />
                      )}
                    </div>
                  )
                })}
                
                {/* Blinking Cursor after complete */}
                {!isTyping && lineIdx >= commands.length && (
                   <div className="mt-4 text-blue-600">
                      <span className="text-[#10b981] font-bold mr-3 tracking-widest">nahn_admin@~ %</span>
                      <motion.span 
                          animate={{ opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                          className="inline-block w-2 md:w-2.5 h-4 md:h-5 bg-neutral-900 align-middle"
                      />
                   </div>
                )}
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
