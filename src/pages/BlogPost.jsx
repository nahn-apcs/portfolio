import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-clash font-semibold text-slate-900 tracking-tight leading-tight mb-6">
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
            {post.metadata.tags && (
              <>
                <span>•</span>
                <span className="text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full text-xs">
                  {post.metadata.tags}
                </span>
              </>
            )}
          </div>
        </motion.div>

        {/* Khối nội dung Typography Markdown chuẩn cho Light Mode */}
        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="prose prose-neutral prose-lg md:prose-xl max-w-none pb-20
          prose-h2:font-clash prose-h2:text-3xl prose-h2:text-slate-900 prose-h2:mt-12 prose-h2:mb-6
          prose-p:text-slate-700 prose-p:leading-relaxed prose-p:font-sans
          prose-a:text-indigo-600 hover:prose-a:text-indigo-700 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-900 prose-strong:font-semibold
          prose-li:text-slate-700 marker:prose-li:text-indigo-500"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <div className="rounded-xl overflow-hidden shadow-sm border border-neutral-200/60 my-8">
                     <SyntaxHighlighter
                        {...props}
                        children={String(children).replace(/\n$/, '')}
                        style={materialLight}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{ margin: 0, padding: '1.5rem', background: '#FAFAFA', fontSize: '0.95rem' }}
                      />
                  </div>
                ) : (
                  <code {...props} className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md font-medium text-[0.9em]">
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
