import React from 'react';
import { Clock, CheckCircle2, Cpu } from 'lucide-react';
import { Latex, MathText } from '../common/Latex';

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
      container: 'std::stack',
      header: '<stack>',
      internal: 'LIFO Container Adapter (default std::deque)',
      access: '$\\mathcal{O}(1)$ at TOP only',
      search: '$\\mathcal{O}(N)$',
      insert: '$\\mathcal{O}(1)$ PUSH at TOP',
      delete: '$\\mathcal{O}(1)$ POP at TOP',
      space: '$\\mathcal{O}(N)$',
      cache: 'Good'
    },
    {
      container: 'std::queue',
      header: '<queue>',
      internal: 'FIFO Container Adapter (default std::deque)',
      access: '$\\mathcal{O}(1)$ at FRONT / REAR',
      search: '$\\mathcal{O}(N)$',
      insert: '$\\mathcal{O}(1)$ ENQUEUE at REAR',
      delete: '$\\mathcal{O}(1)$ DEQUEUE at FRONT',
      space: '$\\mathcal{O}(N)$',
      cache: 'Good'
    },
    {
      container: 'std::priority_queue',
      header: '<queue>',
      internal: 'Binary Max-Heap in Array Buffer',
      access: '$\\mathcal{O}(1)$ root (top/max)',
      search: '$\\mathcal{O}(N)$',
      insert: '$\\mathcal{O}(\\log N)$ sift-up',
      delete: '$\\mathcal{O}(\\log N)$ sift-down',
      space: '$\\mathcal{O}(N)$',
      cache: 'Excellent (Flat array cache hits)'
    },
    {
      container: 'Binary Tree',
      header: '<custom/pointer>',
      internal: 'Hierarchical Node Pointers (left, data, right)',
      access: '$\\mathcal{O}(N)$ (or $\\mathcal{O}(1)$ root)',
      search: '$\\mathcal{O}(N)$ arbitrary / $\\mathcal{O}(h)$',
      insert: '$\\mathcal{O}(1)$ given parent position',
      delete: '$\\mathcal{O}(1)$ given parent position',
      space: '$\\mathcal{O}(N)$',
      cache: 'Moderate-Poor'
    },
    {
      container: 'AVL Tree',
      header: '<custom/set>',
      internal: 'Strictly Balanced BST (|BF| <= 1)',
      access: '$\\mathcal{O}(\\log N)$ guaranteed',
      search: '$\\mathcal{O}(\\log N)$ guaranteed',
      insert: '$\\mathcal{O}(\\log N)$ with rotations',
      delete: '$\\mathcal{O}(\\log N)$ with rotations',
      space: '$\\mathcal{O}(N)$',
      cache: 'Moderate'
    },
    {
      container: 'B-Tree / B+ Tree',
      header: '<disk/index>',
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
      <div className="p-6 md:p-8 rounded-xl bg-white border border-[#E5E2D9] space-y-6 shadow-xs">
        <div className="border-b border-[#E5E2D9] pb-4">
          <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#15803D]" /> C++ STL Data Structure Complexity & Architecture Matrix
          </h2>
          <p className="text-xs text-[#66625B] mt-0.5 font-sans">
            Reference guide with formal LaTeX asymptotic bounds and memory locality ratings.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-[#E5E2D9]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F4F2EB] text-[#2C2B29] border-b border-[#E5E2D9]">
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
            <tbody className="divide-y divide-[#E5E2D9] bg-white font-mono">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="p-3 font-bold text-[#991B1B] font-mono">{row.container}</td>
                  <td className="p-3 text-[#66625B]">{row.header}</td>
                  <td className="p-3 text-[#2C2B29] font-sans text-[11px]">{row.internal}</td>
                  <td className="p-3 text-[#15803D]">
                    <MathText text={row.access} />
                  </td>
                  <td className="p-3 text-[#B45309]">
                    <MathText text={row.search} />
                  </td>
                  <td className="p-3 text-[#15803D]">
                    <MathText text={row.insert} />
                  </td>
                  <td className="p-3 text-[#15803D]">
                    <MathText text={row.delete} />
                  </td>
                  <td className="p-3 text-[#66625B]">
                    <MathText text={row.space} />
                  </td>
                  <td className="p-3 font-sans text-[11px] text-[#44403C]">{row.cache}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
