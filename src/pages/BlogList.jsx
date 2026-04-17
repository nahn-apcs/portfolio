import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/markdownParser';
import ParticleNetwork from '../components/ParticleNetwork';

export default function BlogList() {
  const posts = getAllPosts();

  return (
    <div className="relative min-h-screen pt-32 px-6 overflow-hidden md:ml-20 flex flex-col items-center">
      <div className="absolute inset-0 -z-20 opacity-40 mix-blend-multiply">
        <ParticleNetwork />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-20 flex-1">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 mt-8"
        >
          <h1 className="text-5xl md:text-[5rem] font-clash font-medium text-neutral-900 tracking-tight leading-[1.1] select-none mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              blog
            </span>
          </h1>
          <p className="text-lg text-slate-500">Documenting my journey through competitive programming and web development.</p>
        </motion.div>

        <div className="grid gap-8 pb-20">
          {posts.map((post, idx) => (
            <motion.article 
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-neutral-200/60 shadow-sm hover:shadow-md transition-shadow group"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="flex items-center gap-4 text-slate-500 font-sans text-sm tracking-wide mb-4">
                  <span>{post.metadata.date}</span>
                  {post.metadata.tags && (
                    <>
                      <span>•</span>
                      <span className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-xs">
                        {post.metadata.tags}
                      </span>
                    </>
                  )}
                </div>
                <h2 className="text-2xl font-clash font-semibold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {post.metadata.title}
                </h2>
                <p className="text-slate-600 leading-relaxed font-sans line-clamp-3">
                  {post.metadata.summary || "Read more about this topic..."}
                </p>
                <div className="mt-6 flex items-center text-indigo-500 text-sm font-semibold tracking-wide">
                  READ ARTICLE
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
