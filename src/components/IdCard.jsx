import React, { useState, useEffect } from 'react';

export default function IdCard() {
   const [cfRating, setCfRating] = useState('...');
   const [lcSolved, setLcSolved] = useState('...');

   // Auto-fetch Live API Data
   useEffect(() => {
      // Codeforces Rating API
      fetch('https://codeforces.com/api/user.info?handles=fan_lamu')
         .then(res => res.json())
         .then(data => {
            if (data.status === "OK" && data.result?.length > 0) {
               setCfRating(data.result[0].rating || 'Unrated');
            }
         })
         .catch(err => console.error('Lỗi Call API CF:', err));

      // LeetCode Solved API (via public proxy endpoint)
      fetch('https://leetcode-stats-api.herokuapp.com/Proteam23')
         .then(res => res.json())
         .then(data => {
            if (data.status === "success" && data.totalSolved !== undefined) {
               setLcSolved(data.totalSolved);
            }
         })
         .catch(err => console.error('Lỗi Call API LC:', err));
   }, []);
   return (
      <div className="relative w-full max-w-[280px] lg:max-w-[320px] aspect-[1/1.5] mx-auto z-30 mb-10 lg:mb-0 group">

         {/* Vầng hào quang (Glowing Aura) khớp với màu Blob của Hero Section */}
         <div className="absolute -inset-1 bg-gradient-to-br from-indigo-400/30 via-purple-400/30 to-cyan-400/30 rounded-[2rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

         {/* Thân thẻ Glassmorphism */}
         <div className="relative w-full h-full rounded-[2rem] bg-white border border-neutral-100 shadow-[0_20px_50px_rgba(31,38,135,0.07)] flex flex-col font-sans overflow-hidden z-20">

            {/* Lỗ xỏ dây đeo thẻ */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-14 h-2.5 bg-neutral-200 rounded-full border-b border-neutral-300 shadow-inner z-20" />

            {/* Dải Gradient trên cùng */}
            <div className="h-[4.5rem] w-full bg-gradient-to-b from-neutral-100 to-transparent flex items-end justify-center pb-2 border-b border-neutral-200">
               <span className="text-neutral-500 font-medium text-[10px] tracking-[0.4em] uppercase">
                  HCMUS • APCS
               </span>
            </div>

            {/* Avatar Roblox */}
            <div className="mt-8 flex justify-center relative">
               {/* Vòng sáng quanh Avatar */}
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-cyan-400 blur-lg rounded-xl w-32 h-32 md:w-36 md:h-36 mx-auto opacity-40 group-hover:opacity-70 transition-opacity duration-500" />

               <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-xl overflow-hidden border border-white/20 bg-white shadow-xl z-10 transition-transform duration-500 group-hover:scale-105">
                  <img
                     src={`${import.meta.env.BASE_URL}roblox.png`}
                     alt="Staff Profile"
                     className="w-full h-full object-cover"
                  />
               </div>
            </div>

            {/* Thông tin nhân viên */}
            <div className="px-4 mt-6 text-center">
               <h3 className="text-xl md:text-2xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                  BACKEND
               </h3>
               <h3 className="text-neutral-900 text-md font-bold tracking-[0.2em] uppercase mt-0.5 opacity-90">
                  DEVELOPER
               </h3>
            </div>

            {/* Chỉ số Lập trình thi đấu thi đấu thực tế (Live Stats) */}
            <div className="px-5 mt-auto mb-6 w-full">
               <div className="bg-neutral-50 rounded-xl p-3 md:p-3.5 space-y-2.5 border border-neutral-200 shadow-inner">

                  <a href="https://codeforces.com/profile/fan_lamu" target="_blank" rel="noreferrer" className="flex justify-between items-center group/link">
                     <span className="text-[#3b82f6] text-[10px] md:text-[11px] font-bold tracking-widest uppercase">Codeforces</span>
                     <span className="text-neutral-600 text-[10px] font-mono group-hover/link:text-black transition-all">{cfRating} ↗</span>
                  </a>

                  <a href="https://leetcode.com/u/Proteam23/" target="_blank" rel="noreferrer" className="flex justify-between items-center group/link">
                     <span className="text-[#eab308] text-[10px] md:text-[11px] font-bold tracking-widest uppercase">LeetCode</span>
                     <span className="text-neutral-600 text-[10px] font-mono group-hover/link:text-black transition-all">{lcSolved} Solved ↗</span>
                  </a>

                  <a href="https://atcoder.jp/users/fan_lamu" target="_blank" rel="noreferrer" className="flex justify-between items-center group/link">
                     <span className="text-[#a855f7] text-[10px] md:text-[11px] font-bold tracking-widest uppercase">AtCoder</span>
                     <span className="text-neutral-600 text-[10px] font-mono group-hover/link:text-black transition-all">1665 ↗</span>
                  </a>

                  <a href="https://oj.vnoi.info/user/nahn" target="_blank" rel="noreferrer" className="flex justify-between items-center group/link">
                     <span className="text-[#10b981] text-[10px] md:text-[11px] font-bold tracking-widest uppercase">VNOJ</span>
                     <span className="text-neutral-600 text-[10px] font-mono group-hover/link:text-black transition-all">2315 ↗</span>
                  </a>

               </div>
            </div>

         </div>
      </div>
   );
}
