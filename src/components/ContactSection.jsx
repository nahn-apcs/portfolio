import React from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="contact" className="w-full mt-32 pt-8 pb-4 bg-[#F1F5F9] border-t border-neutral-200 relative z-[100]">
      <div className="w-block w-full px-6 md:px-12 xl:px-24 mx-auto max-w-[1400px]">
        
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl lg:text-4xl font-clash font-medium text-neutral-900 tracking-widest mb-6"
        >
          CONTACT
        </motion.h2>

        {/* 3-Column Layout */}
        <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
          
          {/* Column 1: Email & Location */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-5 min-w-[200px]"
          >
             <div>
               <h4 className="text-sm font-sans text-neutral-500 mb-1">Email</h4>
               <a href="mailto:kenpro030709@gmail.com" className="text-neutral-700 hover:text-blue-600 font-sans text-[15px] transition-colors inline-block">kenpro030709@gmail.com</a>
             </div>
             <div>
               <h4 className="text-sm font-sans text-neutral-500 mb-1">Location</h4>
               <p className="text-neutral-700 font-sans text-[15px]">Ho Chi Minh City, Vietnam</p>
             </div>
          </motion.div>

          {/* Column 2: Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col w-full max-w-[240px]"
          >
             <h4 className="text-sm font-sans text-neutral-500 mb-2">Social</h4>
             <div className="flex flex-col w-full">
               {[
                 { name: 'Github', url: 'https://github.com/nahn-apcs' },
                 { name: 'Linkedin', url: 'https://www.linkedin.com/in/th%C3%A0nh-nh%C3%A2n-nguy%E1%BB%85n-911a9b2b4/' },
                 { name: 'Facebook', url: 'https://www.facebook.com/thanh.nhan.269619/' },
                 { name: 'Instagram', url: 'https://www.instagram.com/th_._nh__21/' }
               ].map((social) => (
                 <a href={social.url} target="_blank" rel="noreferrer" key={social.name} className="group flex justify-between items-center py-1.5 border-b border-neutral-300 hover:border-neutral-900 transition-colors duration-300">
                   <span className="text-neutral-700 font-sans text-[15px] group-hover:text-neutral-900">{social.name}</span>
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                     <line x1="7" y1="17" x2="17" y2="7"></line>
                     <polyline points="7 7 17 7 17 17"></polyline>
                   </svg>
                 </a>
               ))}
             </div>
          </motion.div>

          {/* Column 3: Credits & Copyright */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between h-full min-h-0"
          >
             <div className="pt-0">
               <p className="text-neutral-500 font-sans text-[14px] leading-relaxed">Designed and Developed</p>
               <p className="font-sans text-[14px] font-medium leading-relaxed text-purple-600">by Thanh Nhan</p>
             </div>
             <div className="mt-6 md:mt-auto pb-0">
               <p className="text-neutral-600 font-sans text-[13px] flex items-center gap-1.5">
                 <span className="text-base leading-none">©</span> 2026
               </p>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
