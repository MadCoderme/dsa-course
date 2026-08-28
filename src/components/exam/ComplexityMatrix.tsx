import React from 'react';
import { Clock } from 'lucide-react';
import { MathText } from '../common/Latex';

export const ComplexityMatrix: React.FC = () => {
  const data = [
    {
      container: 'std::vector',
      header: '<vector>',
      internal: 'Contiguous Dynamic Array Buffer',
      access: '$\\mathcal{O}(1)$',
      search: '$\\mathcal{O}(N)$ (or $\\mathcal{O}(\\log N)$ if sorted)',
      insert: '$\\mathcal{O}(1)$ amortized tail / $\\mathcal{O}(N)$ arbitrary',
      delete: '$\\mathcal{O}(1)$ tail / $\\mathcal{O}(N)$ arbitrary',
      space: '$\\mathcal{O}(N)$',
      cache: 'Excellent (L1/L2 hardware prefetching)'
    },
    {
      container: 'std::set',
      header: '<set>',
      internal: 'Red-Black Tree (Self-Balancing BST)',
      access: 'N/A (No indexing)',
      search: '$\\mathcal{O}(\\log N)$',
      insert: '$\\mathcal{O}(\\log N)$',
      delete: '$\\mathcal{O}(\\log N)$',
      space: '$\\mathcal{O}(N)$',
      cache: 'Moderate (Pointer Chasing in Heap)'
    },
    {
      container: 'std::unordered_set',
      header: '<unordered_set>',
      internal: 'Hash Table (Separate Chaining)',
      access: 'N/A',
      search: '$\\mathcal{O}(1)$ average / $\\mathcal{O}(N)$ worst',
      insert: '$\\mathcal{O}(1)$ average / $\\mathcal{O}(N)$ worst',
      delete: '$\\mathcal{O}(1)$ average / $\\mathcal{O}(N)$ worst',
      space: '$\\mathcal{O}(N)$',
      cache: 'Moderate'
    },
    {
      container: 'std::map',
      header: '<map>',
      internal: 'Red-Black Tree (Unique Key-Value Pairs)',
      access: '$\\mathcal{O}(\\log N)$ via operator[]',
      search: '$\\mathcal{O}(\\log N)$',
      insert: '$\\mathcal{O}(\\log N)$',
      delete: '$\\mathcal{O}(\\log N)$',
      space: '$\\mathcal{O}(N)$',
      cache: 'Moderate (Pointer Chasing)'
    },
    {
      container: 'std::unordered_map',
      header: '<unordered_map>',
      internal: 'Hash Table with Key-Value Buckets',
      access: '$\\mathcal{O}(1)$ average',
      search: '$\\mathcal{O}(1)$ average',
      insert: '$\\mathcal{O}(1)$ average',
      delete: '$\\mathcal{O}(1)$ average',
      space: '$\\mathcal{O}(N)$',
      cache: 'Moderate'
    },
    {
      container: 'std::list',
      header: '<list>',
      internal: 'Doubly Linked List (Nodes in Heap)',
      access: '$\\mathcal{O}(N)$ traversal',
      search: '$\\mathcal{O}(N)$',
      insert: '$\\mathcal{O}(1)$ given iterator',
      delete: '$\\mathcal{O}(1)$ given iterator',
      space: '$\\mathcal{O}(N)$ (2 pointers / node)',
      cache: 'Poor (Cache misses per hop)'
    },
    {
      container: 'std::forward_list',
      header: '<forward_list>',
      internal: 'Singly Linked List',
      access: '$\\mathcal{O}(N)$',
      search: '$\\mathcal{O}(N)$',
      insert: '$\\mathcal{O}(1)$ insert_after',
      delete: '$\\mathcal{O}(1)$ erase_after',
      space: '$\\mathcal{O}(N)$ (1 pointer / node)',
      cache: 'Poor'
    },
    {
      container: 'std::stack',
      header: '<stack>',
      internal: 'Container Adaptor (std::deque base)',
      access: '$\\mathcal{O}(1)$ top() only',
      search: 'N/A',
      insert: '$\\mathcal{O}(1)$ push()',
      delete: '$\\mathcal{O}(1)$ pop()',
      space: '$\\mathcal{O}(N)$',
      cache: 'Good'
    },
    {
      container: 'std::queue',
      header: '<queue>',
      internal: 'Container Adaptor (std::deque base)',
      access: '$\\mathcal{O}(1)$ front() / back()',
      search: 'N/A',
      insert: '$\\mathcal{O}(1)$ push()',
      delete: '$\\mathcal{O}(1)$ pop()',
      space: '$\\mathcal{O}(N)$',
      cache: 'Good'
    },
    {
      container: 'std::priority_queue',
      header: '<priority_queue>',
      internal: 'Binary Max-Heap in std::vector',
      access: '$\\mathcal{O}(1)$ top() (max item)',
      search: '$\\mathcal{O}(N)$ linear scan',
      insert: '$\\mathcal{O}(\\log N)$ push (sift-up)',
      delete: '$\\mathcal{O}(\\log N)$ pop (sift-down)',
      space: '$\\mathcal{O}(N)$ contiguous array',
      cache: 'Very Good (Vector memory backing)'
    },
    {
      container: 'B-Tree (Order M)',
      header: 'Custom / DB Engine',
      internal: 'Multi-Way Balanced Search Tree (Order M)',
      access: '$\\mathcal{O}(\\log_M N)$ disk page reads',
      search: '$\\mathcal{O}(\\log_M N)$',
      insert: '$\\mathcal{O}(\\log_M N)$ node splits',
      delete: '$\\mathcal{O}(\\log_M N)$ node merges',
      space: '$\\mathcal{O}(N)$',
      cache: 'High (Optimized for disk block / cache lines)'
    },
    {
      container: 'Graph (Adj. List)',
      header: '<vector<vector<int>>>',
      internal: 'Array of Neighbor Lists/Vectors',
      access: '$\\mathcal{O}(\\text{deg}(u))$ neighbors',
      search: '$\\mathcal{O}(V + E)$ BFS/DFS',
      insert: '$\\mathcal{O}(1)$ add edge',
      delete: '$\\mathcal{O}(E)$ remove edge',
      space: '$\\mathcal{O}(V + E)$',
      cache: 'Moderate-Good'
    }
  ];

  return (
    <div className="space-y-6" id="complexity-matrix-container">
      <div className="p-6 md:p-8 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] space-y-6 shadow-xs">
        <div className="border-b border-[#E5E2D9] dark:border-[#38332B] pb-4">
          <h2 className="text-lg font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF] flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#15803D] dark:text-[#4ADE80]" /> C++ STL Data Structure Complexity & Architecture Matrix
          </h2>
          <p className="text-xs text-[#66625B] dark:text-[#A8A29E] mt-0.5 font-sans">
            Reference guide with formal LaTeX asymptotic bounds and memory locality ratings.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-[#E5E2D9] dark:border-[#38332B]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F4F2EB] dark:bg-[#2A2622] text-[#2C2B29] dark:text-[#EDE8DF] border-b border-[#E5E2D9] dark:border-[#38332B]">
              <tr>
                <th className="p-3 font-serif font-bold">Container</th>
                <th className="p-3 font-serif font-bold">Header</th>
                <th className="p-3 font-serif font-bold">Internal Architecture</th>
                <th className="p-3 font-serif font-bold">Access</th>
                <th className="p-3 font-serif font-bold">Search</th>
                <th className="p-3 font-serif font-bold">Insertion</th>
                <th className="p-3 font-serif font-bold">Deletion</th>
                <th className="p-3 font-serif font-bold">Space</th>
                <th className="p-3 font-serif font-bold">Cache Locality</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2D9] dark:divide-[#38332B] bg-white dark:bg-[#201D1A] font-mono">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#FAF8F5] dark:bg-[#181614] dark:hover:bg-[#181614] transition-colors">
                  <td className="p-3 font-bold text-[#991B1B] dark:text-[#EF4444] font-mono">{row.container}</td>
                  <td className="p-3 text-[#66625B] dark:text-[#A8A29E]">{row.header}</td>
                  <td className="p-3 text-[#2C2B29] dark:text-[#D6D0C5] font-sans text-[11px]">{row.internal}</td>
                  <td className="p-3 text-[#15803D] dark:text-[#4ADE80]">
                    <MathText text={row.access} />
                  </td>
                  <td className="p-3 text-[#B45309] dark:text-[#FBBF24]">
                    <MathText text={row.search} />
                  </td>
                  <td className="p-3 text-[#15803D] dark:text-[#4ADE80]">
                    <MathText text={row.insert} />
                  </td>
                  <td className="p-3 text-[#15803D] dark:text-[#4ADE80]">
                    <MathText text={row.delete} />
                  </td>
                  <td className="p-3 text-[#66625B] dark:text-[#A8A29E]">
                    <MathText text={row.space} />
                  </td>
                  <td className="p-3 font-sans text-[11px] text-[#44403C] dark:text-[#D6D0C5]">{row.cache}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};