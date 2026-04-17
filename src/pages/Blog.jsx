import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Blog() {
  return (
    <div className="relative min-h-screen py-32 px-6 overflow-hidden md:ml-20">
      <div className="max-w-4xl mx-auto w-full relative z-20">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-sans text-sm tracking-widest flex items-center gap-2 mb-8 group w-fit transition-all duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            BACK TO HOME
          </Link>
          <h1 className="text-4xl md:text-6xl font-clash font-semibold text-neutral-900 tracking-tight leading-tight mb-6">
            Optimizing Depth-First Search (DFS) for Graph Cycles
          </h1>
          <div className="flex items-center gap-4 text-neutral-500 font-sans text-sm tracking-wide border-b border-neutral-200 pb-8">
            <span>By Thành Nhân</span>
            <span>•</span>
            <span>May 15, 2026</span>
            <span>•</span>
            <span className="text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-xs">Algorithms</span>
          </div>
        </motion.div>

        {/* Khối nội dung Typography Markdown chuẩn cho Light Mode */}
        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="prose prose-neutral prose-lg md:prose-xl max-w-none 
          prose-h2:font-clash prose-h2:text-3xl prose-h2:text-neutral-900 prose-h2:mt-12 prose-h2:mb-6
          prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:font-sans
          prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline
          prose-code:text-[#2563eb] prose-code:bg-blue-100 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-[#F8FAFC] prose-pre:border prose-pre:border-neutral-200 prose-pre:shadow-sm prose-pre:text-neutral-800
          prose-strong:text-neutral-900 prose-strong:font-semibold
          prose-li:text-neutral-700 marker:prose-li:text-blue-600"
        >
          <p>
            When tackling complex competitive programming challenges on Codeforces or LeetCode, identifying graph cycles efficiently is paramount. Standard DFS implementations are elegant but can sometimes suffer when dealing with densely connected cyclic components, causing TLE (Time Limit Exceeded) errors.
          </p>

          <h2>Core Algorithm Redesign</h2>
          <p>
            Traditionally, graph traversal utilizes a simple boolean array <code>visited[N]</code>. However, to efficiently detect cycles and backtrack gracefully, adopting a <strong>three-state coloring scheme</strong> (0: unvisited, 1: currently in path stack, 2: fully processed) drastically reduces redundant evaluations.
          </p>

          <pre><code>{`#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> adj;
vector<int> state;

bool hasCycle(int node) {
    if (state[node] == 1) return true; // Found a back-edge
    if (state[node] == 2) return false; // Already processed
    
    state[node] = 1; // Mark as currently exploring
    
    for (int neighbor : adj[node]) {
        if (hasCycle(neighbor)) return true;
    }
    
    state[node] = 2; // Mark as fully visited
    return false;
}`}</code></pre>

          <h2>Why this matters in Competitive Programming</h2>
          <p>
            This <code>O(V + E)</code> approach is significantly more robust than backtracking purely on <code>visited</code> flags. It helps prune search trees dynamically, meaning your execution avoids getting trapped in redundant sub-graphs. 
          </p>
          <ul>
            <li>Eliminates unnecessary tree depth recursions.</li>
            <li>Maintains exact paths using parent tracking.</li>
            <li>Easy to extend to topological sorting algorithms natively.</li>
          </ul>

          <p>
            Testing this approach on massive datasets with 10^5 vertices proves that an explicit three-state cache prevents worst-case recursion depths, securing that heavily sought-after "Accepted" verdict.
          </p>

        </motion.article>

      </div>
    </div>
  );
}
