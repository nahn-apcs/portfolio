import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { motion } from 'framer-motion';

export default function SocialSidebar() {
  const socials = [
    { icon: <FaGithub size={24} />, href: "https://github.com/nahn-apcs" },
    { icon: <FaLinkedin size={24} />, href: "https://www.linkedin.com/in/th%C3%A0nh-nh%C3%A2n-nguy%E1%BB%85n-911a9b2b4/" },
    { icon: <FaFacebook size={24} />, href: "https://www.facebook.com/thanh.nhan.269619/" },
    { icon: <FaXTwitter size={24} />, href: "https://x.com/nahn2305" },
    { icon: <FaInstagram size={24} />, href: "https://www.instagram.com/th_._nh__21/" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="fixed left-6 md:left-10 bottom-24 md:bottom-32 top-0 flex-col justify-center z-40 hidden md:flex"
    >
      <div className="flex flex-col items-center gap-8 py-8 px-3 rounded-full transition-all duration-500 hover:bg-blue-100 hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] group">
        {socials.map((item, idx) => (
          <a key={idx} href={item.href} target="_blank" rel="noreferrer" className="text-[#a1a1aa] group-hover:text-[#18181b] hover:!text-blue-600 hover:scale-125 transition-all duration-300 transform drop-shadow-sm">
            {item.icon}
          </a>
        ))}
      </div>
    </motion.div>
  );
}
