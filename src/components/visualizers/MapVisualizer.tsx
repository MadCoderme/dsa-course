import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Search, Type, Sparkles, Network } from 'lucide-react';

interface MapVisualizerProps {
  focusedMode?: 'frequency' | 'graph' | 'custom';
}

export const MapVisualizer: React.FC<MapVisualizerProps> = ({ focusedMode }) => {
  const [viewMode, setViewMode] = useState<'frequency' | 'graph' | 'custom'>(focusedMode || 'frequency');

  React.useEffect(() => {
    if (focusedMode) {
      setViewMode(focusedMode);
    }
  }, [focusedMode]);
  const [sampleText, setSampleText] = useState<string>(
    'tree graph stack queue vector map set stack queue stack tree'
  );
  const [customKey, setCustomKey] = useState<string>('student_id');
  const [customVal, setCustomVal] = useState<string>('2004051');
  const [customMap, setCustomMap] = useState<Record<string, string>>({
    course_code: 'CSE-241',
    course_name: 'Data Structure',
    semester: '4th',
    exam_total: '210'
  });
  const [searchKey, setSearchKey] = useState<string>('course_code');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  // Frequency Map Computation
  const words = sampleText.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const freqMap: Record<string, number> = {};
  words.forEach((w) => {
    freqMap[w] = (freqMap[w] || 0) + 1;
  });

  const sortedFreq = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);
  const maxCount = Math.max(...Object.values(freqMap), 1);

  // Graph Adjacency Map Sample
  const graphAdjacency: Record<string, { neighbor: string; weight: number }[]> = {
    A: [{ neighbor: 'B', weight: 4 }, { neighbor: 'C', weight: 2 }],
    B: [{ neighbor: 'C', weight: 1 }, { neighbor: 'D', weight: 5 }],
    C: [{ neighbor: 'D', weight: 8 }, { neighbor: 'E', weight: 10 }],
    D: [{ neighbor: 'E', weight: 2 }],
    E: []
  };

  const handleAddCustom = () => {
    if (!customKey.trim()) return;
    setCustomMap((prev) => ({ ...prev, [customKey]: customVal }));
    setCustomKey('');
    setCustomVal('');
  };

  const handleRemoveCustom = (key: string) => {
    setCustomMap((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const handleSearch = () => {
    if (customMap[searchKey] !== undefined) {
      setSearchResult(`Found map["${searchKey}"] = "${customMap[searchKey]}" (O(log N))`);
    } else {
      setSearchResult(`Key "${searchKey}" NOT FOUND. (map.find() == map.end())`);
    }
  };

  return (
    <div className="space-y-4" id="map-visualizer-container">
      {/* Sub-view Switcher */}
      {!focusedMode && (
        <div className="flex flex-wrap items-center justify-between p-2 rounded-xl bg-white border border-[#E5E2D9] gap-2 shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-[#F4F2EB]">
            <button
              id="map-view-freq"
              onClick={() => setViewMode('frequency')}
              className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'frequency'
                  ? 'bg-white text-[#1A1A1A] shadow-2xs border border-[#D8D4C8]'
                  : 'text-[#66625B] hover:text-[#1A1A1A]'
              }`}
            >
              <Type className="w-3.5 h-3.5 text-[#991B1B]" /> Word Frequency Counter (O(N))
            </button>
            <button
              id="map-view-graph"
              onClick={() => setViewMode('graph')}
              className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'graph'
                  ? 'bg-white text-[#1A1A1A] shadow-2xs border border-[#D8D4C8]'
                  : 'text-[#66625B] hover:text-[#1A1A1A]'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-[#15803D]" /> Graph Adjacency Map
            </button>
            <button
              id="map-view-custom"
              onClick={() => setViewMode('custom')}
              className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'custom'
                  ? 'bg-white text-[#1A1A1A] shadow-2xs border border-[#D8D4C8]'
                  : 'text-[#66625B] hover:text-[#1A1A1A]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B45309]" /> Custom Key-Value Store
            </button>
          </div>
        </div>
      )}


      {/* View 1: Word Frequency Visualizer */}
      {viewMode === 'frequency' && (
        <div className="p-6 md:p-8 rounded-xl bg-white border border-[#E5E2D9] space-y-4 shadow-xs">
          <div>
            <span className="text-sm font-serif font-bold text-[#1A1A1A]">
              Interactive Text Frequency Mapper (C++ Pattern: <code className="text-[#991B1B] font-mono">freqMap[word]++</code>)
            </span>
            <p className="text-xs text-[#66625B] mt-0.5 font-sans">
              Type words below to see how std::map constructs key-value entries in real-time.
            </p>
          </div>

          <textarea
            id="map-frequency-textarea"
            rows={2}
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#FAF8F5] border border-[#D8D4C8] text-xs text-[#1A1A1A] font-mono focus:outline-none focus:border-[#991B1B]"
            placeholder="Type words separated by spaces..."
          />

          <div className="space-y-2 mt-4">
            <div className="text-xs font-serif font-bold text-[#66625B] flex items-center justify-between pb-1 border-b border-[#E5E2D9]">
              <span>Key (Word)</span>
              <span>Value (Frequency Count)</span>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {sortedFreq.map(([word, count]) => (
                <div
                  key={word}
                  className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9] flex items-center justify-between gap-4"
                >
                  <span className="font-mono text-xs font-bold text-[#991B1B] min-w-[100px]">
                    "{word}"
                  </span>
                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex-1 h-2.5 bg-[#E5E2D9] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / maxCount) * 100}%` }}
                        className="h-full bg-[#991B1B] rounded-full"
                      />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#15803D] min-w-[30px] text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* View 2: Graph Adjacency Map */}
      {viewMode === 'graph' && (
        <div className="p-6 md:p-8 rounded-xl bg-white border border-[#E5E2D9] space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E2D9]">
            <div>
              <span className="text-sm font-serif font-bold text-[#1A1A1A]">
                Graph Adjacency List (std::map&lt;char, vector&lt;pair&lt;char, int&gt;&gt;&gt;)
              </span>
              <p className="text-xs text-[#66625B] mt-0.5 font-sans">
                Maps each Vertex key to its list of weighted outgoing edges.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(graphAdjacency).map(([node, edges]) => (
              <div key={node} className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
                <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-2">
                  <span className="w-7 h-7 rounded-md bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-center font-mono font-bold text-xs text-[#991B1B]">
                    {node}
                  </span>
                  <span className="text-[11px] font-mono text-[#66625B]">
                    Out-degree: {edges.length}
                  </span>
                </div>
                <div className="space-y-1 pt-1">
                  {edges.length === 0 ? (
                    <div className="text-xs text-[#88847C] italic">No outgoing edges (sink)</div>
                  ) : (
                    edges.map((e, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between px-2 py-1 rounded bg-white border border-[#E5E2D9] text-xs font-mono text-[#1A1A1A]"
                      >
                        <span>→ {e.neighbor}</span>
                        <span className="text-[#B45309] font-semibold">weight: {e.weight}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 3: Custom Key-Value Store */}
      {viewMode === 'custom' && (
        <div className="p-6 md:p-8 rounded-xl bg-white border border-[#E5E2D9] space-y-4 shadow-xs">
          <div className="flex flex-wrap items-center gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9]">
            <input
              id="map-custom-key-input"
              type="text"
              value={customKey}
              onChange={(e) => setCustomKey(e.target.value)}
              placeholder="Key"
              className="px-2.5 py-1.5 rounded-md bg-white border border-[#D8D4C8] text-xs text-[#1A1A1A] font-mono"
            />
            <input
              id="map-custom-val-input"
              type="text"
              value={customVal}
              onChange={(e) => setCustomVal(e.target.value)}
              placeholder="Value"
              className="px-2.5 py-1.5 rounded-md bg-white border border-[#D8D4C8] text-xs text-[#1A1A1A] font-mono"
            />
            <button
              id="map-custom-add-btn"
              onClick={handleAddCustom}
              className="px-3.5 py-1.5 rounded-md bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" /> map[key] = val
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="map-search-key-input"
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Search Key"
              className="px-2.5 py-1.5 rounded-md bg-[#FAF8F5] border border-[#D8D4C8] text-xs text-[#1A1A1A] font-mono"
            />
            <button
              id="map-search-btn"
              onClick={handleSearch}
              className="px-3 py-1.5 rounded-md bg-[#FAF8F5] hover:bg-[#F4F2EB] border border-[#D8D4C8] text-[#1A1A1A] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#991B1B]" /> find(key)
            </button>
          </div>

          {searchResult && (
            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#D8D4C8] text-[#1A1A1A] text-xs font-mono">
              {searchResult}
            </div>
          )}

          <div className="space-y-2">
            {Object.entries(customMap).map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9]"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA] font-mono text-xs font-bold">
                    Key: {k}
                  </span>
                  <span className="text-[#88847C]">→</span>
                  <span className="font-mono text-xs text-[#15803D] font-bold">"{v}"</span>
                </div>
                <button
                  onClick={() => handleRemoveCustom(k)}
                  className="text-[#88847C] hover:text-[#991B1B] transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
