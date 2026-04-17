import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const milestones = [
  {
    title: "Bronze Medalist",
    subtitle: "National Olympiad in Informatics",
    year: "2022",
    desc: "Secured 3rd Prize (Bronze) at the Vietnam National Olympiad in Informatics (HSGQG). This achievement laid a rigorous foundation in algorithmic design, memory management, and computational thinking."
  },
  {
    title: "Silver Medalist",
    subtitle: "National Olympiad in Informatics",
    year: "2023",
    desc: "Awarded 2nd Prize (Silver) at the Vietnam National Olympiad in Informatics (HSGQG). Demonstrated advanced problem-solving skills and technical mastery, ranking among the nation’s top-tier competitive programmers."
  },
  {
    title: "Bronze Medalist",
    subtitle: "ICPC Vietnam National",
    year: "2025",
    desc: "Earned a Bronze Medal at the ICPC Vietnam National Contest. Specialized in optimizing complex data structures and graph algorithms while delivering high-performance solutions under intense competitive pressure."
  },
  {
    title: <a href="#cppro" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors underline decoration-blue-500/30 underline-offset-4">CPPro Online Judge</a>,
    subtitle: "System Architecture Project",
    year: "NOW",
    desc: "Architecting a high-performance algorithmic evaluation platform from scratch. Utilizing Django, Docker, and Redis to ensure a scalable and secure infrastructure. The system features a containerized C++ sandbox for safe, untrusted code execution, designed to serve the training needs of the CPPros community."
  }
];

export default function MilestoneSection() {
  const containerRef = useRef(null);

  // Theo dõi tỷ lệ cuộn ngang qua thẻ div ref (containerRef)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 85%"]
  });

  // Chuyển quy đổi tỷ lệ cuộn (0 -> 1) sang độ cao (%) của cột sáng
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="honors" className="py-24 relative z-20">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        
        {/* Tiêu đề phần (Section Header) */}
        <div className="text-center mb-32 flex flex-col items-center">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: false, amount: 0.5 }}
             className="text-5xl md:text-[5rem] font-clash font-medium text-neutral-900 tracking-tight leading-[1.1]"
           >
             Honors &<br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
               milestones
             </span>
           </motion.h2>
        </div>

        {/* Trục Timeline Ánh sáng (Scroll Tracking Timeline) */}
        <div ref={containerRef} className="relative w-full max-w-5xl mx-auto">
           
           {/* Dải nền tối tĩnh */}
           <div className="absolute left-4 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 w-[2px] bg-indigo-100" />

           {/* Dải sáng trung tâm dọc MỞ RỘNG dần độ cao theo lineHeight */}
           <motion.div 
             className="absolute left-4 md:left-1/2 top-0 md:-translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-indigo-500 to-cyan-400 shadow-[0_0_15px_1px_rgba(99,102,241,0.5)]"
             style={{ height: lineHeight }}
           />
           
           {/* Hạt nhân sáng đuổi theo đáy cột sáng (Glowing Dot) */}
           <motion.div 
             className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-[0_0_20px_5px_rgba(99,102,241,0.8)] z-10 -ml-[7px] md:ml-0 md:-translate-x-1/2 -translate-y-1/2"
             style={{ top: lineHeight }}
           />

           <div className="flex flex-col space-y-24 pb-10">
             {milestones.map((item, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, filter: "blur(5px)", y: 10 }}
                 whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                 transition={{ duration: 0.35, ease: "easeOut" }}
                 viewport={{ once: false, margin: "-25% 0px -20% 0px" }}
                 className="flex flex-col md:flex-row w-full group relative z-10"
               >
                 
                 {/* Dành cho Desktop: Cột Trái (Chức danh + Năm) */}
                 <div className="hidden md:flex w-1/2 pr-16 justify-between items-start gap-6 xl:gap-8">
                    <div className="text-left flex-1 pr-6">
                       <h3 className="text-3xl lg:text-4xl font-clash font-medium text-neutral-800 leading-none group-hover:text-black transition-colors drop-shadow-none">{item.title}</h3>
                       <p className="text-indigo-600 opacity-90 mt-3 font-clash text-[1.1rem] md:text-xl tracking-wide">{item.subtitle}</p>
                    </div>
                    {/* Năm mốc thời gian */}
                    <div className="text-5xl lg:text-6xl font-normal font-clash text-neutral-400 tracking-wider mt-1 shrink-0">
                       {item.year}
                    </div>
                 </div>

                 {/* Dành cho Mobile: Bố cục dọc */}
                 <div className="md:hidden flex flex-col pl-12 mb-6 relative">
                    <div className="text-5xl font-normal font-clash text-neutral-400 mb-2 tracking-wider">{item.year}</div>
                    <h3 className="text-3xl font-clash font-medium text-neutral-900 leading-none drop-shadow-none pt-1">{item.title}</h3>
                    <p className="text-indigo-600 opacity-90 font-clash text-[1.1rem] mt-2">{item.subtitle}</p>
                 </div>

                 {/* Cột Phải: Nội dung mô tả (Description) */}
                 <div className="w-full md:w-1/2 pl-12 md:pl-16 flex items-start">
                    <p className="text-neutral-600 text-base md:text-[1.1rem] leading-relaxed pt-1 md:pt-2 md:max-w-md font-sans">
                      {item.desc}
                    </p>
                 </div>
                 
               </motion.div>
             ))}
           </div>
        </div>

      </div>
    </section>
  );
}
