import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiCplusplus, SiPython, SiDjango, SiMysql, SiPostgresql, 
  SiDocker, SiGit, SiJavascript, SiReact, SiHtml5, 
  SiTailwindcss, SiVite, SiRedis, SiTypescript 
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const techList = [
  { name: "C++", icon: <SiCplusplus color="#00599C" /> },
  { name: "Python", icon: <SiPython color="#3776AB" /> },
  { name: "Django", icon: <SiDjango color="#44B78B" /> }, /* Màu nguyên bản #092E20 quá tối nên dùng màu sáng nổi bật */
  { name: "MySQL", icon: <SiMysql color="#4479A1" /> },
  { name: "PostgreSQL", icon: <SiPostgresql color="#336791" /> },
  { name: "Docker", icon: <SiDocker color="#2496ED" /> },
  { name: "Git", icon: <SiGit color="#F05032" /> },
  { name: "Java", icon: <FaJava color="#ED8B00" /> },
  { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" /> },
  { name: "React", icon: <SiReact color="#61DAFB" /> },
  { name: "HTML", icon: <SiHtml5 color="#E34F26" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss color="#06B6D4" /> },
  { name: "Vite", icon: <SiVite color="#646CFF" /> },
  { name: "Redis", icon: <SiRedis color="#DC382D" /> },
  { name: "TypeScript", icon: <SiTypescript color="#3178C6" /> }
];

export default function TechStackSection() {
  return (
    <section id="techstack" className="py-24 relative z-20 w-full overflow-hidden">
      {/* CSS Keyframe Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          will-change: transform;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="w-full flex flex-col items-center justify-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-16 md:gap-24 w-full"
        >
          {/* Tiêu đề ăn theo style của "About me" */}
          <h2 className="text-5xl md:text-[5rem] font-clash font-medium text-neutral-900 tracking-tight leading-[1.1] select-none text-center">
            Tech stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">I use</span>
          </h2>

          {/* Dải Marquee Typography quay vòng vô cực chứa Icon và Tên công cụ */}
          <div className="relative w-full flex overflow-hidden group select-none py-10">
            
            {/* Gradient masks mờ mép */}
            <div className="absolute top-0 left-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[#FAFAFA] via-[#FAFAFA]/50 to-transparent z-10 pointer-events-none"></div>

            <div className="flex w-max animate-scroll items-center">
              
              {/* Cụm Tech 1 */}
              <div className="flex flex-nowrap items-center gap-12 md:gap-16 px-6 md:px-8">
                {techList.map((tech, index) => (
                  <React.Fragment key={`group1-${index}`}>
                    <div className="flex items-center justify-center hover:scale-125 hover:brightness-[1.1] hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-crosshair">
                      <span className="text-5xl md:text-[4.5rem] lg:text-[5rem] leading-none block">{tech.icon}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* Cụm Tech 2 (Nhân đôi để tạo vòng lặp vô tận) */}
              <div className="flex flex-nowrap items-center gap-12 md:gap-16 px-6 md:px-8">
                {techList.map((tech, index) => (
                  <React.Fragment key={`group2-${index}`}>
                    <div className="flex items-center justify-center hover:scale-125 hover:brightness-[1.1] hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-crosshair">
                      <span className="text-5xl md:text-[4.5rem] lg:text-[5rem] leading-none block">{tech.icon}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
