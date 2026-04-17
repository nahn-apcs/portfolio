import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getPostBySlug } from '../utils/markdownParser';
import ParticleNetwork from '../components/ParticleNetwork';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    const data = getPostBySlug(slug);
    setPost(data);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Article not found or is being loaded.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-32 px-6 overflow-hidden md:ml-20 flex flex-col items-center">
      <div className="absolute inset-0 -z-20 opacity-30 mix-blend-multiply">
        <ParticleNetwork />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-20 flex-1">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Link to="/blog" className="text-indigo-500 hover:text-indigo-600 font-sans text-sm tracking-widest flex items-center gap-2 mb-8 group w-fit transition-all duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            ALL ARTICLES
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-slate-900 tracking-tight leading-tight mb-6">
            {post.metadata.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-500 font-sans text-sm tracking-wide border-b border-neutral-200 pb-8">
            {post.metadata.author && (
              <>
                <span>By {post.metadata.author}</span>
                <span className="hidden sm:inline">•</span>
              </>
            )}
            <span>{post.metadata.date}</span>
            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <div className="flex gap-2 items-center">
                <span>•</span>
                {post.metadata.tags.map(tag => (
                  <span key={tag} className="text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Khối nội dung Typography Markdown chuẩn cho Light Mode */}
        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="prose prose-neutral prose-lg md:prose-xl max-w-none pb-20
          prose-h1:font-sans prose-h1:font-bold prose-h1:text-4xl prose-h1:text-transparent prose-h1:bg-clip-text prose-h1:bg-gradient-to-r prose-h1:from-indigo-600 prose-h1:to-cyan-600 prose-h1:mt-16 prose-h1:mb-8
          prose-h2:font-sans prose-h2:font-bold prose-h2:text-3xl prose-h2:text-transparent prose-h2:bg-clip-text prose-h2:bg-gradient-to-r prose-h2:from-purple-600 prose-h2:to-indigo-500 prose-h2:mt-12 prose-h2:mb-6
          prose-h3:font-sans prose-h3:font-bold prose-h3:text-2xl prose-h3:text-slate-800 prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-slate-700 prose-p:leading-relaxed prose-p:font-sans
          prose-a:text-indigo-600 hover:prose-a:text-indigo-700 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-900 prose-strong:font-semibold
          prose-li:text-slate-700 marker:prose-li:text-indigo-500
          prose-code:before:content-none prose-code:after:content-none"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              a(props) {
                return <a {...props} target="_blank" rel="noopener noreferrer" />;
              },
              pre({ children }) {
                return <div className="my-10 rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-[#E2E8F0]/30 relative group">{children}</div>;
              },
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <>
                    <div className="bg-[#CBD5E1]/40 px-4 py-3 flex items-center gap-2 border-b border-slate-200/60 relative">
                      <div className="flex gap-1.5 z-10">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-red-500/20"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-yellow-500/20"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-green-500/20"></div>
                      </div>
                      <div className="absolute inset-x-0 text-center text-slate-500 text-[10px] font-mono font-semibold tracking-widest uppercase">
                        {match[1]}
                      </div>
                    </div>
                    <SyntaxHighlighter
                      {...props}
                      children={String(children).replace(/\n$/, '')}
                      style={coldarkCold}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent', fontSize: '0.9rem', lineHeight: '1.7', fontFamily: "'JetBrains Mono', monospace" }}
                    />
                  </>
                ) : (
                  <code {...props} className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md font-medium text-[0.9em] font-sans">
                    {children}
                  </code>
                )
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </motion.article>
      </div>
    </div>
  );
}
