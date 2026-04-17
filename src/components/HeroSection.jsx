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
            className={`select-none leading-none block pb-1 ${isBackground
              ? "font-sans font-medium text-[2.2rem] md:text-[3.2rem] lg:text-[4rem] text-transparent"
              : "font-serif italic font-medium text-[2.2rem] md:text-[3.2rem] lg:text-[4rem] bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 via-sky-400 to-fuchsia-400 drop-shadow-sm"
              } lowercase`}
            style={isBackground ? { WebkitTextStroke: "1px rgba(100, 116, 139, 0.3)" } : {}}
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
      <p className="relative z-20 font-sans font-medium text-slate-500 text-lg md:text-xl lg:text-2xl tracking-wide mb-0 opacity-90 text-left lowercase">
        a creative
      </p>

      <div className="relative h-[60px] md:h-[80px] lg:h-[100px] w-max">
        {/* Lớp ma chặn kích thước lớn nhất đễ giữ Layout ngang ko co giật */}
        <div className="opacity-0 pointer-events-none select-none font-sans font-medium lowercase text-[2.2rem] md:text-[3.2rem] lg:text-[4rem] tracking-wider leading-none">developer</div>

        {/* === Lớp Trượt Nền (Background: DESIGNER chìm) === */}
        <div className="absolute left-0 top-0 z-0 opacity-70 w-max">
          <AnimatePresence>
            <StaggeredAnimatedWord key={isSwapped ? "bg-dev" : "bg-des"} word={isSwapped ? "developer" : "designer"} isBackground={true} />
          </AnimatePresence>
        </div>

        {/* === Lớp Trượt Nổi (Foreground: DEVELOPER sáng) === */}
        <div className="absolute left-3 md:left-5 lg:left-6 top-2 md:top-4 lg:top-5 z-10 w-max drop-shadow-sm">
          <AnimatePresence>
            <StaggeredAnimatedWord key={isSwapped ? "fg-des" : "fg-dev"} word={isSwapped ? "designer" : "developer"} isBackground={false} />
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
          <p className="font-serif italic text-slate-500 text-2xl md:text-3xl lg:text-4xl mb-2 opacity-90 magnetic pointer-events-auto">
            Hello! I'm
          </p>
          <h1 className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-sans font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 via-slate-800 to-indigo-900 leading-[1.1] tracking-tight lowercase magnetic pointer-events-auto">
            nahn.
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
