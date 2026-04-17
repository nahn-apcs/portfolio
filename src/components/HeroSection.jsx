import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleNetwork from './ParticleNetwork';
import FluidBlob from './FluidBlob';

// Tuyệt chiêu cuối: Component Tách Chữ mà KHÔNG LÀM HỎNG KERNING của Font
const StaggeredAnimatedWord = ({ word, isBackground }) => {
  return (
    <motion.div
      key={word} // Đổi key => Kích hoạt Animate Presence
      // Stagger để bắt các chữ cái chạy đuổi nhau y như sóng
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: { opacity: 1 },
        animate: { opacity: 1, transition: { staggerChildren: 0.07 } },
        exit: { opacity: 1, transition: { staggerChildren: 0.05 } }
      }}
      className="absolute top-0 left-0 flex flex-nowrap whitespace-nowrap"
    >
      {word.split('').map((char, index) => (
        // Bọc Bằng Hộp Tàng Hình có kích thước THỞ theo đúng size góc của Character đó
        <div key={index} className="relative overflow-hidden inline-flex">
          <motion.span
            variants={{
              // Chạy từ đáy hộp lên 0 rồi vọt lên nóc hộp (-120%)
              initial: { y: "120%" },
              animate: { y: "0%", transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
              exit: { y: "-120%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
            }}
            className={`select-none font-clash uppercase tracking-wider leading-none block pb-1 ${isBackground
              ? "font-bold text-[1.8rem] md:text-[2.4rem] lg:text-[2.8rem] text-transparent"
              : "font-bold text-[1.8rem] md:text-[2.4rem] lg:text-[2.8rem] text-slate-800 drop-shadow-sm"
              }`}
            style={isBackground ? { WebkitTextStroke: "1px rgba(148, 163, 184, 0.5)" } : {}}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
};

const HeroTypography = () => {
  const [isSwapped, setIsSwapped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSwapped((prev) => !prev);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-left relative inline-block w-max md:-mt-10 lg:-mt-20 mr-0 md:mr-4 lg:mr-8 ml-auto">
      <p className="relative z-20 font-clash font-normal text-slate-500 text-xl md:text-2xl lg:text-3xl tracking-wide mb-0 lg:mb-1 opacity-90 text-left capitalize">
        a creative
      </p>

      <div className="relative h-[60px] md:h-[80px] lg:h-[100px] w-max">
        {/* Lớp ma chặn kích thước lớn nhất đễ giữ Layout ngang ko co co giật */}
        <div className="opacity-0 pointer-events-none select-none font-clash font-bold uppercase text-[1.8rem] md:text-[2.4rem] lg:text-[2.8rem] tracking-wider leading-none">DEVELOPER</div>

        {/* === Lớp Trượt Nền (Background: DESIGNER chìm) === */}
        <div className="absolute left-0 top-0 z-0 opacity-70 w-max">
          <AnimatePresence>
            <StaggeredAnimatedWord key={isSwapped ? "bg-dev" : "bg-des"} word={isSwapped ? "DEVELOPER" : "DESIGNER"} isBackground={true} />
          </AnimatePresence>
        </div>

        {/* === Lớp Trượt Nổi (Foreground: DEVELOPER sáng) === */}
        <div className="absolute left-3 md:left-5 lg:left-6 top-2 md:top-4 lg:top-5 z-10 w-max drop-shadow-sm">
          <AnimatePresence>
            <StaggeredAnimatedWord key={isSwapped ? "fg-des" : "fg-dev"} word={isSwapped ? "DESIGNER" : "DEVELOPER"} isBackground={false} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center pt-20">
      <ParticleNetwork />

      {/* Siêu phẩm: Khối Thạch Pha Lê Đa Sắc (Multicolored Blob) */}
      <FluidBlob />

      <div className="container mx-auto px-6 relative flex flex-col md:flex-row justify-between items-center md:items-start z-10 w-full pointer-events-none">

        {/* === CỘT TRÁI === */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-5/12 text-left mb-16 md:mb-0 md:pl-16 lg:pl-32 magnetic md:-mt-10 lg:-mt-20"
        >
          <p className="font-clash font-normal text-slate-500 text-xl md:text-2xl lg:text-3xl tracking-wide mb-0 lg:mb-1 opacity-90 magnetic pointer-events-auto">
            Hello! I'm
          </p>
          <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.2rem] font-clash font-semibold text-slate-900 leading-none tracking-wider uppercase magnetic pointer-events-auto">
            NAHN
          </h1>
        </motion.div>

        {/* === CỘT PHẢI === */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full md:w-6/12 flex flex-col items-start md:items-end md:pr-4 lg:pr-10"
        >
          <HeroTypography />
        </motion.div>

      </div>

    </section>
  );
}
