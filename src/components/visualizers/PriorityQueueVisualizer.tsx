import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  Plus,
  Minus,
  Shuffle,
  Play,
  Sparkles,
  RefreshCw,
  Cpu,
  Layers,
  Network,
  Activity,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  ListOrdered,
  Server,
  FileCode
} from 'lucide-react';
import { Latex, MathText } from '../common/Latex';

export const PriorityQueueVisualizer: React.FC = () => {
  // Main view tab
  const [activeTab, setActiveTab] = useState<'abstract-adt' | 'real-world-apps' | 'internal-heap'>('abstract-adt');

  // ==========================================
  // 1. ABSTRACT PRIORITY QUEUE STATE
  // ==========================================
  interface QueueItem {
    id: string;
    value: string;
    priority: number;
    color: string;
  }

  const [abstractMode, setAbstractMode] = useState<'max' | 'min'>('max');
  const [abstractQueue, setAbstractQueue] = useState<QueueItem[]>([
    { id: '1', value: 'Render UI Frame', priority: 90, color: '#DC2626' },
    { id: '2', value: 'Process Network Packet', priority: 75, color: '#EA580C' },
    { id: '3', value: 'Garbage Collection', priority: 30, color: '#16A34A' },
    { id: '4', value: 'Background Sync', priority: 15, color: '#2563EB' }
  ]);
  const [newValue, setNewValue] = useState<string>('Audio DSP Stream');
  const [newPriority, setNewPriority] = useState<number>(85);
  const [abstractLogs, setAbstractLogs] = useState<string[]>([
    'Max-Priority Queue initialized. Items are dispatched strictly by highest priority score.'
  ]);

  const addAbstractLog = (msg: string) => {
    setAbstractLogs((prev) => [msg, ...prev.slice(0, 10)]);
  };

  const handleAbstractEnqueue = () => {
    if (!newValue.trim()) return;
    const colors = ['#DC2626', '#EA580C', '#D97706', '#16A34A', '#2563EB', '#7C3AED'];
    const itemColor = colors[Math.floor(Math.random() * colors.length)];
    const newItem: QueueItem = {
      id: Date.now().toString(),
      value: newValue.trim(),
      priority: Number(newPriority) || 50,
      color: itemColor
    };

    // Insert and sort according to priority
    const updated = [...abstractQueue, newItem].sort((a, b) => 
      abstractMode === 'max' ? b.priority - a.priority : a.priority - b.priority
    );

    setAbstractQueue(updated);
    addAbstractLog(`📥 Enqueued "${newItem.value}" with priority [${newItem.priority}]. Abstract position automatically reordered.`);
    setNewValue('');
    setNewPriority(Math.floor(Math.random() * 80 + 15));
  };

  const handleAbstractDequeue = () => {
    if (abstractQueue.length === 0) {
      addAbstractLog('❌ Priority Queue is empty!');
      return;
    }
    const [topItem, ...rest] = abstractQueue;
    setAbstractQueue(rest);
    addAbstractLog(`🚀 Dispatched highest priority item: "${topItem.value}" [Priority: ${topItem.priority}].`);
  };

  // ==========================================
  // 2. REAL-WORLD APPLICATIONS STATE
  // ==========================================
  const [appCategory, setAppCategory] = useState<'os-scheduler' | 'dijkstra-frontier' | 'huffman-merge' | 'top-k'>('os-scheduler');

  // OS Scheduler State
  const [osTasks, setOsTasks] = useState([
    { pid: 'P101', name: 'Real-Time Audio Mixer', priority: 95, burst: '20ms', status: 'ready', level: 'Real-Time (Kernel)' },
    { pid: 'P102', name: 'User UI Touch Event', priority: 80, burst: '15ms', status: 'ready', level: 'High (User Interactive)' },
    { pid: 'P103', name: 'HTTPS Payload Parser', priority: 50, burst: '40ms', status: 'ready', level: 'Normal' },
    { pid: 'P104', name: 'Disk Indexer Defrag', priority: 10, burst: '120ms', status: 'ready', level: 'Background I/O' }
  ]);
  const [activeCpuTask, setActiveCpuTask] = useState<string | null>(null);

  const handleDispatchCpu = () => {
    if (osTasks.length === 0) return;
    const sorted = [...osTasks].sort((a, b) => b.priority - a.priority);
    const top = sorted[0];
    setActiveCpuTask(`${top.pid}: ${top.name} [Pri: ${top.priority}]`);
    setOsTasks(sorted.slice(1));
  };

  const handleAddOsTask = () => {
    const samples = [
      { name: 'Hardware Interrupt Handler', priority: 99, level: 'Critical Interrupt' },
      { name: 'Video Decode Frame Buffer', priority: 70, level: 'High (Multimedia)' },
      { name: 'Database Query Cache', priority: 45, level: 'Normal' },
      { name: 'Telemetry Log Upload', priority: 5, level: 'Idle Background' }
    ];
    const picked = samples[Math.floor(Math.random() * samples.length)];
    const pid = `P${Math.floor(Math.random() * 800 + 200)}`;
    const newTask = {
      pid,
      name: picked.name,
      priority: picked.priority,
      burst: `${Math.floor(Math.random() * 30 + 10)}ms`,
      status: 'ready',
      level: picked.level
    };
    setOsTasks((prev) => [...prev, newTask].sort((a, b) => b.priority - a.priority));
  };

  // Dijkstra / Prim Frontier State
  const [dijkstraStep, setDijkstraStep] = useState<number>(0);
  const dijkstraTrace = [
    {
      action: 'Initialize Source A with dist[A]=0. Push (A, 0) into Min-PQ.',
      pqState: [{ vertex: 'A', dist: 0 }],
      settled: [],
      table: { A: 0, B: '∞', C: '∞', D: '∞', E: '∞' }
    },
    {
      action: 'extractMin() -> Vertex A (dist=0). Relax neighbors B (weight 4) and C (weight 2).',
      pqState: [{ vertex: 'C', dist: 2 }, { vertex: 'B', dist: 4 }],
      settled: ['A'],
      table: { A: 0, B: 4, C: 2, D: '∞', E: '∞' }
    },
    {
      action: 'extractMin() -> Vertex C (dist=2). Relax neighbors B (2+1=3 < 4 -> decreaseKey to 3) and D (2+7=9).',
      pqState: [{ vertex: 'B', dist: 3 }, { vertex: 'D', dist: 9 }],
      settled: ['A', 'C'],
      table: { A: 0, B: 3, C: 2, D: 9, E: '∞' }
    },
    {
      action: 'extractMin() -> Vertex B (dist=3). Relax neighbor E (3+5=8).',
      pqState: [{ vertex: 'E', dist: 8 }, { vertex: 'D', dist: 9 }],
      settled: ['A', 'C', 'B'],
      table: { A: 0, B: 3, C: 2, D: 9, E: 8 }
    },
    {
      action: 'extractMin() -> Vertex E (dist=8). Relax neighbor D (8+0.5=8.5 < 9 -> decreaseKey to 8.5).',
      pqState: [{ vertex: 'D', dist: 8.5 }],
      settled: ['A', 'C', 'B', 'E'],
      table: { A: 0, B: 3, C: 2, D: 8.5, E: 8 }
    },
    {
      action: 'extractMin() -> Vertex D (dist=8.5). Min-PQ empty. All shortest paths settled!',
      pqState: [],
      settled: ['A', 'C', 'B', 'E', 'D'],
      table: { A: 0, B: 3, C: 2, D: 8.5, E: 8 }
    }
  ];

  // Huffman Merge State
  const [huffmanStep, setHuffmanStep] = useState<number>(0);
  const huffmanTrace = [
    {
      step: 'Initial Priority Queue of character frequency trees (Min-PQ):',
      pq: ['(A: 5)', '(B: 9)', '(C: 12)', '(D: 13)', '(E: 16)', '(F: 45)'],
      merged: 'None yet'
    },
    {
      step: 'extractMin() twice -> (A:5) and (B:9). Merge into node (AB:14). Push (AB:14) into Min-PQ.',
      pq: ['(C: 12)', '(D: 13)', '(AB: 14)', '(E: 16)', '(F: 45)'],
      merged: 'Node (AB: 14) with left A(5), right B(9)'
    },
    {
      step: 'extractMin() twice -> (C:12) and (D:13). Merge into node (CD:25). Push (CD:25) into Min-PQ.',
      pq: ['(AB: 14)', '(E: 16)', '(CD: 25)', '(F: 45)'],
      merged: 'Node (CD: 25) with left C(12), right D(13)'
    },
    {
      step: 'extractMin() twice -> (AB:14) and (E:16). Merge into node (ABE:30). Push (ABE:30) into Min-PQ.',
      pq: ['(CD: 25)', '(ABE: 30)', '(F: 45)'],
      merged: 'Node (ABE: 30) with left AB(14), right E(16)'
    },
    {
      step: 'extractMin() twice -> (CD:25) and (ABE:30). Merge into node (CDABE:55). Push (CDABE:55) into Min-PQ.',
      pq: ['(F: 45)', '(CDABE: 55)'],
      merged: 'Node (CDABE: 55) with left CD(25), right ABE(30)'
    },
    {
      step: 'extractMin() twice -> (F:45) and (CDABE:55). Merge into Root (Total: 100). Huffman Tree complete!',
      pq: ['[Root Tree: 100]'],
      merged: 'Final optimal prefix tree constructed in O(N log N) time.'
    }
  ];

  // Top-K Streaming Tracker State
  const [streamValues] = useState<number[]>([12, 45, 8, 92, 67, 34, 88, 99, 21, 74, 53, 95]);
  const [topKStep, setTopKStep] = useState<number>(4);
  const kLimit = 3;

  // ==========================================
  // 3. INTERNAL BINARY HEAP STATE
  // ==========================================
  const [heapType, setHeapType] = useState<'max' | 'min'>('max');
  const [heap, setHeap] = useState<number[]>([77, 60, 55, 50, 30, 44, 22]);
  const [inputVal, setInputVal] = useState<string>('65');
  const [sortedArray, setSortedArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [heapLogs, setHeapLogs] = useState<string[]>([
    'Max-Heap initialized with array [77, 60, 55, 50, 30, 44, 22]'
  ]);

  const addHeapLog = (msg: string) => {
    setHeapLogs((prev) => [msg, ...prev.slice(0, 10)]);
  };

  const siftUp = (arr: number[], idx: number, isMax: boolean): number[] => {
    let current = idx;
    while (current > 0) {
      const parent = Math.floor((current - 1) / 2);
      const shouldSwap = isMax ? arr[current] > arr[parent] : arr[current] < arr[parent];
      if (shouldSwap) {
        const temp = arr[current];
        arr[current] = arr[parent];
        arr[parent] = temp;
        current = parent;
      } else {
        break;
      }
    }
    return arr;
  };

  const siftDown = (arr: number[], n: number, i: number, isMax: boolean) => {
    let target = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (isMax) {
      if (left < n && arr[left] > arr[target]) target = left;
      if (right < n && arr[right] > arr[target]) target = right;
    } else {
      if (left < n && arr[left] < arr[target]) target = left;
      if (right < n && arr[right] < arr[target]) target = right;
    }

    if (target !== i) {
      const temp = arr[i];
      arr[i] = arr[target];
      arr[target] = temp;
      siftDown(arr, n, target, isMax);
    }
  };

  const handlePush = () => {
    const val = parseInt(inputVal) || Math.floor(Math.random() * 90 + 10);
    const nextArr = [...heap, val];
    setActiveIndices([nextArr.length - 1]);
    const newHeap = siftUp(nextArr, nextArr.length - 1, heapType === 'max');
    setHeap(newHeap);
    addHeapLog(`⬆️ push(${val}) -> Sift-up restored ${heapType.toUpperCase()}-Heap property.`);
    setTimeout(() => setActiveIndices([]), 800);
  };

  const handlePop = () => {
    if (heap.length === 0) {
      addHeapLog('❌ Heap is empty!');
      return;
    }
    const root = heap[0];
    const nextArr = [...heap];
    const last = nextArr.pop()!;
    if (nextArr.length > 0) {
      nextArr[0] = last;
      setActiveIndices([0]);
      siftDown(nextArr, nextArr.length, 0, heapType === 'max');
    }
    setHeap(nextArr);
    addHeapLog(`⬇️ pop() extracted root ${root}. Sift-down restored heap.`);
    setTimeout(() => setActiveIndices([]), 800);
  };

  const handleBuildHeap = () => {
    const randoms = Array.from({ length: 8 }, () => Math.floor(Math.random() * 85 + 10));
    const isMax = heapType === 'max';
    const n = randoms.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      siftDown(randoms, n, i, isMax);
    }
    setHeap(randoms);
    setSortedArray([]);
    addHeapLog(`⚡ Bottom-up Build-Heap completed in O(N) linear time for 8 random keys.`);
  };

  const handleHeapSortSimulation = async () => {
    setIsSorting(true);
    let currentHeap = [...heap];
    const n = currentHeap.length;
    const isMax = heapType === 'max';
    const sorted: number[] = [];

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      siftDown(currentHeap, n, i, isMax);
    }

    addHeapLog('🚀 Starting Step-by-Step Heapsort simulation...');

    for (let i = n - 1; i > 0; i--) {
      const root = currentHeap[0];
      currentHeap[0] = currentHeap[i];
      currentHeap[i] = root;
      sorted.unshift(root);

      siftDown(currentHeap, i, 0, isMax);
      setHeap([...currentHeap.slice(0, i)]);
      setSortedArray([...sorted]);
      await new Promise((r) => setTimeout(r, 600));
    }

    if (currentHeap.length > 0) {
      sorted.unshift(currentHeap[0]);
    }
    setHeap([]);
    setSortedArray(sorted);
    setIsSorting(false);
    addHeapLog(`🎉 Heapsort finished! Array sorted in O(N log N) time.`);
  };

  const handleHeapReset = () => {
    setHeap([77, 60, 55, 50, 30, 44, 22]);
    setSortedArray([]);
    setIsSorting(false);
    setActiveIndices([]);
    setHeapLogs(['Heap reset.']);
  };

  return (
    <div className="space-y-6" id="priority-queue-visualizer-container">
      {/* Top Main Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between p-2 rounded-xl bg-white border border-[#E5E2D9] gap-2 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-[#F4F2EB]">
          <button
            id="tab-abstract-adt"
            onClick={() => setActiveTab('abstract-adt')}
            className={`px-3 py-1.5 rounded-md text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'abstract-adt'
                ? 'bg-white text-[#991B1B] shadow-2xs border border-[#D8D4C8]'
                : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#991B1B]" /> 1. Abstract ADT Model
          </button>
          <button
            id="tab-real-world-apps"
            onClick={() => setActiveTab('real-world-apps')}
            className={`px-3 py-1.5 rounded-md text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'real-world-apps'
                ? 'bg-white text-[#15803D] shadow-2xs border border-[#D8D4C8]'
                : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#15803D]" /> 2. Real-World Applications
          </button>
          <button
            id="tab-internal-heap"
            onClick={() => setActiveTab('internal-heap')}
            className={`px-3 py-1.5 rounded-md text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'internal-heap'
                ? 'bg-white text-[#B45309] shadow-2xs border border-[#D8D4C8]'
                : 'text-[#66625B] hover:text-[#1A1A1A]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#B45309]" /> 3. Internal Binary Heap
          </button>
        </div>

        <span className="text-[11px] font-mono text-[#66625B] hidden sm:inline px-2">
          C++ <span className="font-bold text-[#1A1A1A]">std::priority_queue&lt;T&gt;</span>
        </span>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: ABSTRACT ADT MODEL & BEHAVIOR */}
      {/* ========================================================================= */}
      {activeTab === 'abstract-adt' && (
        <div className="space-y-6">
          {/* Conceptual Header */}
          <div className="p-5 rounded-xl bg-white border border-[#E5E2D9] space-y-3 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#991B1B]" /> Abstract Data Type (ADT) Paradigm
              </h3>
              <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-lg border border-[#E5E2D9]">
                <button
                  onClick={() => {
                    setAbstractMode('max');
                    setAbstractQueue((prev) => [...prev].sort((a, b) => b.priority - a.priority));
                  }}
                  className={`px-2.5 py-1 text-xs font-serif font-bold rounded ${
                    abstractMode === 'max' ? 'bg-[#991B1B] text-white shadow-2xs' : 'text-[#66625B]'
                  }`}
                >
                  Max-Priority (Highest First)
                </button>
                <button
                  onClick={() => {
                    setAbstractMode('min');
                    setAbstractQueue((prev) => [...prev].sort((a, b) => a.priority - b.priority));
                  }}
                  className={`px-2.5 py-1 text-xs font-serif font-bold rounded ${
                    abstractMode === 'min' ? 'bg-[#15803D] text-white shadow-2xs' : 'text-[#66625B]'
                  }`}
                >
                  Min-Priority (Lowest First)
                </button>
              </div>
            </div>
            <p className="text-xs text-[#44403C] leading-relaxed">
              Unlike a standard <strong>FIFO Queue</strong> (which dispatches strictly by arrival time) or a <strong>LIFO Stack</strong> (which dispatches the newest item), a <strong>Priority Queue</strong> associates an intrinsic numerical <em>Priority Key</em> with every element. Dequeue operations always dispatch the element with the highest (or lowest) priority, regardless of when it arrived.
            </p>

            {/* ADT Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9] space-y-1">
                <div className="text-xs font-serif font-bold text-[#66625B] flex items-center gap-1.5">
                  <ListOrdered className="w-3.5 h-3.5 text-blue-600" /> Standard FIFO Queue
                </div>
                <div className="text-[11px] text-[#44403C]">
                  <strong>Policy:</strong> First-In, First-Out.<br />
                  <strong>Dispatch:</strong> Oldest element in queue.
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9] space-y-1">
                <div className="text-xs font-serif font-bold text-[#66625B] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-600" /> LIFO Stack
                </div>
                <div className="text-[11px] text-[#44403C]">
                  <strong>Policy:</strong> Last-In, First-Out.<br />
                  <strong>Dispatch:</strong> Most recently pushed item.
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] space-y-1">
                <div className="text-xs font-serif font-bold text-[#991B1B] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#991B1B]" /> Priority Queue ADT
                </div>
                <div className="text-[11px] text-[#991B1B]">
                  <strong>Policy:</strong> Priority-Weighted Order.<br />
                  <strong>Dispatch:</strong> Extremum element ($\max$ or $\min$).
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Abstract Priority Queue Sandbox */}
          <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#E5E2D9] space-y-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9]">
              <div>
                <h4 className="text-sm font-serif font-bold text-[#1A1A1A]">
                  Interactive Abstract Priority Queue Dispatcher
                </h4>
                <p className="text-xs text-[#66625B]">
                  Enqueue elements with custom priority weights and watch the queue dynamically organize its dispatch head.
                </p>
              </div>
              <span className="text-xs font-mono text-[#991B1B] bg-[#FEF2F2] px-2.5 py-1 rounded border border-[#FECACA] font-bold">
                Queue Length: {abstractQueue.length}
              </span>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9]">
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Element Name (e.g. Render Frame)"
                className="flex-1 min-w-[160px] px-3 py-1.5 rounded-lg bg-white border border-[#D8D4C8] text-xs text-[#1A1A1A] font-sans"
              />
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-serif font-semibold text-[#66625B]">Priority:</span>
                <input
                  type="number"
                  value={newPriority}
                  onChange={(e) => setNewPriority(Number(e.target.value))}
                  className="w-18 px-2 py-1.5 rounded-lg bg-white border border-[#D8D4C8] text-xs text-[#1A1A1A] font-mono font-bold"
                />
              </div>
              <button
                onClick={handleAbstractEnqueue}
                className="px-3.5 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-amber-300" /> Enqueue(val, pri)
              </button>
              <button
                onClick={handleAbstractDequeue}
                disabled={abstractQueue.length === 0}
                className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] text-xs font-serif font-bold flex items-center gap-1.5 disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" /> Dequeue / Dispatch Top
              </button>
            </div>

            {/* Queue Visualization Track */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-serif font-bold text-[#66625B]">
                <span className="text-[#991B1B] flex items-center gap-1">
                  <ArrowRight className="w-3.5 h-3.5" /> DISPATCH HEAD (Highest Priority Out Next)
                </span>
                <span>TAIL (Lowest Priority)</span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] min-h-[140px] flex items-center overflow-x-auto gap-3">
                {abstractQueue.length === 0 ? (
                  <div className="text-xs text-[#88847C] italic mx-auto">
                    Priority Queue is empty. Enqueue new elements above.
                  </div>
                ) : (
                  <AnimatePresence>
                    {abstractQueue.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.7, x: -30 }}
                        transition={{ duration: 0.2 }}
                        className={`shrink-0 w-44 p-3 rounded-xl border flex flex-col justify-between shadow-xs ${
                          idx === 0
                            ? 'bg-white border-[#991B1B] ring-2 ring-[#FECACA]'
                            : 'bg-white border-[#E5E2D9]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-[#88847C]">
                            Rank #{idx + 1}
                          </span>
                          <span
                            className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded text-white"
                            style={{ backgroundColor: item.color }}
                          >
                            Pri: {item.priority}
                          </span>
                        </div>
                        <div className="my-2 font-serif font-bold text-xs text-[#1A1A1A] line-clamp-1">
                          {item.value}
                        </div>
                        <div className="text-[9px] font-mono text-[#66625B] flex items-center justify-between pt-1 border-t border-[#F4F2EB]">
                          <span>{idx === 0 ? '🔥 NEXT OUT' : 'WAITING'}</span>
                          <span>{abstractMode === 'max' ? 'Max-PQ' : 'Min-PQ'}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>

            {/* ADT Activity Log */}
            <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E5E2D9] space-y-1.5">
              <div className="text-[11px] font-serif font-bold text-[#66625B] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#991B1B]" /> ADT Operations Log
              </div>
              <div className="space-y-1 font-mono text-[11px] max-h-24 overflow-y-auto">
                {abstractLogs.map((log, i) => (
                  <div key={i} className="text-[#44403C] py-0.5 border-b border-[#E5E2D9]/40">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: REAL-WORLD & ALGORITHMIC APPLICATIONS */}
      {/* ========================================================================= */}
      {activeTab === 'real-world-apps' && (
        <div className="space-y-6">
          {/* Application Selector */}
          <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] space-y-3 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#15803D]" /> Where Are Priority Queues Used in Systems & Algorithms?
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setAppCategory('os-scheduler')}
                className={`p-2.5 rounded-lg text-left border transition-all cursor-pointer ${
                  appCategory === 'os-scheduler'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                    : 'bg-[#FAF8F5] border-[#E5E2D9] text-[#44403C] hover:bg-[#F4F2EB]'
                }`}
              >
                <div className="text-xs font-serif font-bold">1. OS Task Scheduler</div>
                <div className={`text-[10px] ${appCategory === 'os-scheduler' ? 'text-gray-300' : 'text-[#88847C]'}`}>
                  CPU Preemptive Slicing
                </div>
              </button>

              <button
                onClick={() => setAppCategory('dijkstra-frontier')}
                className={`p-2.5 rounded-lg text-left border transition-all cursor-pointer ${
                  appCategory === 'dijkstra-frontier'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                    : 'bg-[#FAF8F5] border-[#E5E2D9] text-[#44403C] hover:bg-[#F4F2EB]'
                }`}
              >
                <div className="text-xs font-serif font-bold">2. Dijkstra & Prim</div>
                <div className={`text-[10px] ${appCategory === 'dijkstra-frontier' ? 'text-gray-300' : 'text-[#88847C]'}`}>
                  Distance Frontier Min-PQ
                </div>
              </button>

              <button
                onClick={() => setAppCategory('huffman-merge')}
                className={`p-2.5 rounded-lg text-left border transition-all cursor-pointer ${
                  appCategory === 'huffman-merge'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                    : 'bg-[#FAF8F5] border-[#E5E2D9] text-[#44403C] hover:bg-[#F4F2EB]'
                }`}
              >
                <div className="text-xs font-serif font-bold">3. Huffman Coding</div>
                <div className={`text-[10px] ${appCategory === 'huffman-merge' ? 'text-gray-300' : 'text-[#88847C]'}`}>
                  Greedy Frequency Merging
                </div>
              </button>

              <button
                onClick={() => setAppCategory('top-k')}
                className={`p-2.5 rounded-lg text-left border transition-all cursor-pointer ${
                  appCategory === 'top-k'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                    : 'bg-[#FAF8F5] border-[#E5E2D9] text-[#44403C] hover:bg-[#F4F2EB]'
                }`}
              >
                <div className="text-xs font-serif font-bold">4. Top-K Streaming</div>
                <div className={`text-[10px] ${appCategory === 'top-k' ? 'text-gray-300' : 'text-[#88847C]'}`}>
                  Bounded Window Heap
                </div>
              </button>
            </div>
          </div>

          {/* APP 1: OS TASK SCHEDULER */}
          {appCategory === 'os-scheduler' && (
            <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#E5E2D9] space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5E2D9]">
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                    <Server className="w-4 h-4 text-[#991B1B]" /> Operating System Real-Time Task Scheduler
                  </h4>
                  <p className="text-xs text-[#66625B]">
                    Operating System kernels (Linux CFS, FreeRTOS) maintain priority queues of active thread contexts. The CPU scheduler always pulls the highest-priority runnable thread.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddOsTask}
                    className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F4F2EB] border border-[#D8D4C8] text-xs font-serif font-semibold text-[#1A1A1A] cursor-pointer"
                  >
                    + Spawn Random Process
                  </button>
                  <button
                    onClick={handleDispatchCpu}
                    disabled={osTasks.length === 0}
                    className="px-3.5 py-1.5 rounded-lg bg-[#991B1B] hover:bg-[#7F1D1D] disabled:opacity-40 text-white text-xs font-serif font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300" /> Dispatch to CPU Core
                  </button>
                </div>
              </div>

              {/* Active CPU Core State */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] text-emerald-400 font-mono font-bold flex items-center justify-center text-xs shadow-xs">
                    CPU0
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#88847C] uppercase">Currently Executing Thread</div>
                    <div className="text-xs font-serif font-bold text-[#1A1A1A]">
                      {activeCpuTask ? activeCpuTask : 'CPU Idle (Awaiting next interrupt / process)'}
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  Preemption: Enabled
                </span>
              </div>

              {/* Ready Queue Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="bg-[#FAF8F5] text-[#44403C] border-b border-[#E5E2D9]">
                      <th className="p-2.5 font-serif font-bold">PID</th>
                      <th className="p-2.5 font-serif font-bold">Process Name</th>
                      <th className="p-2.5 font-serif font-bold">Priority Score</th>
                      <th className="p-2.5 font-serif font-bold">Category Level</th>
                      <th className="p-2.5 font-serif font-bold">Quantum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {osTasks.map((t, idx) => (
                      <tr key={t.pid} className={`border-b border-[#F4F2EB] ${idx === 0 ? 'bg-[#FEF2F2]/60 font-bold' : ''}`}>
                        <td className="p-2.5 font-mono text-[#991B1B]">{t.pid}</td>
                        <td className="p-2.5 text-[#1A1A1A]">{t.name}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                            t.priority >= 80 ? 'bg-red-100 text-red-800' : t.priority >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {t.priority} {idx === 0 ? '(Highest - Next)' : ''}
                          </span>
                        </td>
                        <td className="p-2.5 text-[#66625B] text-[11px]">{t.level}</td>
                        <td className="p-2.5 font-mono text-[#88847C]">{t.burst}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* APP 2: DIJKSTRA / PRIM FRONTIER */}
          {appCategory === 'dijkstra-frontier' && (
            <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#E5E2D9] space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5E2D9]">
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                    <Network className="w-4 h-4 text-[#15803D]" /> Dijkstra Shortest Path Relaxation Frontier
                  </h4>
                  <p className="text-xs text-[#66625B]">
                    Dijkstra's and Prim's algorithms rely on a <strong>Min-Priority Queue</strong> to greedily extract the candidate vertex with the smallest tentative distance <MathText text="$d[v]$" /> in <MathText text="$\mathcal{O}((V + E) \log V)$" /> time.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (dijkstraStep < dijkstraTrace.length - 1) setDijkstraStep((prev) => prev + 1);
                    }}
                    disabled={dijkstraStep >= dijkstraTrace.length - 1}
                    className="px-3.5 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] disabled:opacity-40 text-white text-xs font-serif font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    Step Next Relaxation ({dijkstraStep + 1}/{dijkstraTrace.length})
                  </button>
                  <button
                    onClick={() => setDijkstraStep(0)}
                    className="p-1.5 rounded-lg bg-[#FAF8F5] border border-[#D8D4C8] text-[#66625B] hover:text-[#1A1A1A] cursor-pointer"
                    title="Reset Trace"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Step Description */}
              <div className="p-3.5 rounded-lg bg-[#F0FDF4] border border-[#DCFCE7] text-xs font-sans text-[#14532D]">
                <strong>Step {dijkstraStep + 1}:</strong> {dijkstraTrace[dijkstraStep].action}
              </div>

              {/* State Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Min-PQ Visual */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
                  <div className="text-xs font-serif font-bold text-[#1A1A1A] flex items-center justify-between">
                    <span>Min-Priority Queue Contents:</span>
                    <span className="text-[10px] font-mono text-[#15803D]">std::priority_queue&lt;pair, vector, greater&gt;</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1 min-h-[50px] items-center">
                    {dijkstraTrace[dijkstraStep].pqState.length === 0 ? (
                      <span className="text-xs text-[#88847C] italic">Min-PQ is Empty (All vertices settled)</span>
                    ) : (
                      dijkstraTrace[dijkstraStep].pqState.map((item, idx) => (
                        <div
                          key={idx}
                          className={`px-3 py-2 rounded-lg border font-mono text-xs flex items-center gap-2 ${
                            idx === 0
                              ? 'bg-white border-[#15803D] text-[#15803D] ring-2 ring-[#DCFCE7] font-bold'
                              : 'bg-white border-[#D8D4C8] text-[#1A1A1A]'
                          }`}
                        >
                          <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[10px]">
                            {item.vertex}
                          </span>
                          <span>d = {item.dist}</span>
                          {idx === 0 && <span className="text-[9px] text-[#15803D] uppercase font-bold">(Top)</span>}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Distance Table */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
                  <div className="text-xs font-serif font-bold text-[#1A1A1A]">
                    Tentative Distance Array $d[v]$ & Settled Set:
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 font-mono text-center">
                    {Object.entries(dijkstraTrace[dijkstraStep].table).map(([v, d]) => {
                      const isSettled = dijkstraTrace[dijkstraStep].settled.includes(v as never);
                      return (
                        <div
                          key={v}
                          className={`p-2 rounded-lg border text-xs ${
                            isSettled
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-900 font-bold'
                              : 'bg-white border-[#D8D4C8] text-[#1A1A1A]'
                          }`}
                        >
                          <div className="text-[10px] text-[#88847C]">{v}</div>
                          <div className="text-xs font-bold mt-0.5">{d}</div>
                          <div className="text-[8px] text-[#66625B] mt-0.5">
                            {isSettled ? 'SETTLED' : 'UNVISITED'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* APP 3: HUFFMAN CODING MERGE */}
          {appCategory === 'huffman-merge' && (
            <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#E5E2D9] space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5E2D9]">
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B45309]" /> Huffman Optimal 2-Tree Greedy Construction
                  </h4>
                  <p className="text-xs text-[#66625B]">
                    Huffman's algorithm repeatedly extracts the <strong>two smallest frequency nodes</strong> from a Min-Priority Queue, merges them into a compound parent, and re-inserts the parent back into the Min-PQ.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (huffmanStep < huffmanTrace.length - 1) setHuffmanStep((prev) => prev + 1);
                    }}
                    disabled={huffmanStep >= huffmanTrace.length - 1}
                    className="px-3.5 py-1.5 rounded-lg bg-[#B45309] hover:bg-[#92400E] disabled:opacity-40 text-white text-xs font-serif font-bold cursor-pointer"
                  >
                    Next Merge Step ({huffmanStep + 1}/{huffmanTrace.length})
                  </button>
                  <button
                    onClick={() => setHuffmanStep(0)}
                    className="p-1.5 rounded-lg bg-[#FAF8F5] border border-[#D8D4C8] text-[#66625B] hover:text-[#1A1A1A] cursor-pointer"
                    title="Reset"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-xs font-sans text-[#92400E]">
                <strong>Step {huffmanStep + 1}:</strong> {huffmanTrace[huffmanStep].step}
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
                <div className="text-xs font-serif font-bold text-[#66625B]">
                  Current Min-PQ State (Trees ordered by root frequency):
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {huffmanTrace[huffmanStep].pq.map((node, i) => (
                    <div
                      key={i}
                      className={`px-3 py-2 rounded-lg border font-mono text-xs ${
                        i < 2 && huffmanStep < huffmanTrace.length - 1
                          ? 'bg-amber-100 border-amber-300 text-amber-950 font-bold'
                          : 'bg-white border-[#D8D4C8] text-[#1A1A1A]'
                      }`}
                    >
                      {node} {i < 2 && huffmanStep < huffmanTrace.length - 1 ? '← Next to Merge' : ''}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* APP 4: TOP-K STREAMING */}
          {appCategory === 'top-k' && (
            <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#E5E2D9] space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5E2D9]">
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#1A1A1A]">
                    Top-K Largest Elements in Continuous Stream (Min-Heap of Size K)
                  </h4>
                  <p className="text-xs text-[#66625B]">
                    To find the Top <MathText text="$K$" /> largest items from an infinite data stream without sorting all elements: maintain a <strong>Min-Heap of capacity $K$</strong>. When a new element arrives, if it is larger than the root (the minimum of the current top-K), pop the root and insert the new element in <MathText text="$\mathcal{O}(\log K)$" /> time!
                  </p>
                </div>
                <button
                  onClick={() => setTopKStep((prev) => (prev < streamValues.length ? prev + 1 : 3))}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-serif font-bold cursor-pointer"
                >
                  Stream Next Number ({topKStep}/{streamValues.length})
                </button>
              </div>

              {/* Visual Track */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
                  <div className="text-xs font-serif font-bold text-[#1A1A1A]">Incoming Data Stream:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {streamValues.map((val, idx) => (
                      <span
                        key={idx}
                        className={`w-9 h-9 rounded-lg font-mono text-xs font-bold flex items-center justify-center border ${
                          idx < topKStep
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white border-[#D8D4C8] text-[#88847C]'
                        }`}
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] space-y-2">
                  <div className="text-xs font-serif font-bold text-[#991B1B]">
                    Current Top-{kLimit} Largest Buffer (Min-Heap):
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    {streamValues
                      .slice(0, topKStep)
                      .sort((a, b) => b - a)
                      .slice(0, kLimit)
                      .map((val, idx) => (
                        <div
                          key={idx}
                          className="w-14 h-16 rounded-xl bg-white border border-[#FECACA] flex flex-col items-center justify-between p-2 font-mono shadow-xs"
                        >
                          <span className="text-[10px] text-[#991B1B] font-bold">#{idx + 1}</span>
                          <span className="text-base font-bold text-[#1A1A1A]">{val}</span>
                          <span className="text-[8px] text-[#66625B]">{idx === kLimit - 1 ? 'Heap Root' : 'Top-K'}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: INTERNAL BINARY HEAP IMPLEMENTATION */}
      {/* ========================================================================= */}
      {activeTab === 'internal-heap' && (
        <div className="space-y-6">
          {/* Sub-Header Actions */}
          <div className="flex flex-wrap items-center justify-between p-2 rounded-xl bg-white border border-[#E5E2D9] gap-2 shadow-xs">
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#F4F2EB]">
              <button
                id="heap-mode-max"
                onClick={() => {
                  setHeapType('max');
                  handleBuildHeap();
                }}
                className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  heapType === 'max'
                    ? 'bg-white text-[#1A1A1A] shadow-2xs border border-[#D8D4C8]'
                    : 'text-[#66625B] hover:text-[#1A1A1A]'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-[#991B1B]" /> Max-Heap (Default C++)
              </button>
              <button
                id="heap-mode-min"
                onClick={() => {
                  setHeapType('min');
                  handleBuildHeap();
                }}
                className={`px-3 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  heapType === 'min'
                    ? 'bg-white text-[#1A1A1A] shadow-2xs border border-[#D8D4C8]'
                    : 'text-[#66625B] hover:text-[#1A1A1A]'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 rotate-180 text-[#15803D]" /> Min-Heap (greater&lt;T&gt;)
              </button>
            </div>

            <button
              id="heap-reset-btn"
              onClick={handleHeapReset}
              className="px-3 py-1.5 rounded-md bg-[#FAF8F5] hover:bg-[#F4F2EB] border border-[#D8D4C8] text-[#66625B] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Heap
            </button>
          </div>

          {/* Control Actions */}
          <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] flex flex-wrap items-center gap-3 shadow-xs">
            <input
              id="heap-val-input"
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Value"
              className="w-20 px-2.5 py-1.5 rounded-md bg-[#FAF8F5] border border-[#D8D4C8] text-xs text-[#1A1A1A] font-mono font-bold"
            />
            <button
              id="heap-push-btn"
              onClick={handlePush}
              className="px-3.5 py-1.5 rounded-md bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" /> push(val)
            </button>
            <button
              id="heap-pop-btn"
              onClick={handlePop}
              disabled={heap.length === 0}
              className="px-3.5 py-1.5 rounded-md bg-white hover:bg-[#FEF2F2] border border-[#FECACA] disabled:opacity-40 text-[#991B1B] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" /> extract_root() / pop()
            </button>
            <button
              id="heap-random-btn"
              onClick={handleBuildHeap}
              className="px-3.5 py-1.5 rounded-md bg-[#FAF8F5] hover:bg-[#F4F2EB] border border-[#D8D4C8] text-[#1A1A1A] text-xs font-serif font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#B45309]" /> Build-Heap <MathText text="$\mathcal{O}(N)$" />
            </button>
            <button
              id="heap-sort-btn"
              onClick={handleHeapSortSimulation}
              disabled={isSorting || heap.length === 0}
              className="ml-auto px-4 py-1.5 rounded-md bg-[#15803D] hover:bg-[#166534] disabled:opacity-40 text-white text-xs font-serif font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" /> Run Heapsort Trace
            </button>
          </div>

          {/* Formulas Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-[#E5E2D9] shadow-xs">
              <div className="text-[11px] font-serif font-bold text-[#66625B]">Parent Pointer Formula</div>
              <div className="mt-1 text-xs">
                <Latex math="\text{Parent}(i) = \left\lfloor \frac{i - 1}{2} \right\rfloor" />
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-[#E5E2D9] shadow-xs">
              <div className="text-[11px] font-serif font-bold text-[#66625B]">Left Child Formula</div>
              <div className="mt-1 text-xs">
                <Latex math="\text{LeftChild}(i) = 2i + 1" />
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-[#E5E2D9] shadow-xs">
              <div className="text-[11px] font-serif font-bold text-[#66625B]">Right Child Formula</div>
              <div className="mt-1 text-xs">
                <Latex math="\text{RightChild}(i) = 2i + 2" />
              </div>
            </div>
          </div>

          {/* Heap Tree Visual Representation */}
          <div className="p-6 md:p-8 rounded-xl bg-white border border-[#E5E2D9] space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E2D9]">
              <div>
                <span className="text-sm font-serif font-bold text-[#1A1A1A]">
                  Binary Heap Tree Structure ({heapType.toUpperCase()}-Heap)
                </span>
                <p className="text-xs text-[#66625B] font-sans">
                  Complete binary tree implicitly mapped into contiguous 0-indexed memory.
                </p>
              </div>
              <span className="text-xs font-mono text-[#991B1B] bg-[#FEF2F2] px-2.5 py-1 rounded border border-[#FECACA] font-bold">
                size() = {heap.length}
              </span>
            </div>

            {/* Tree Hierarchical Levels */}
            <div className="p-6 bg-[#FAF8F5] rounded-xl border border-[#E5E2D9] flex flex-col items-center gap-4 min-h-[180px] justify-center">
              {heap.length === 0 ? (
                <div className="text-xs text-[#88847C] italic">Heap is currently empty (all items extracted!)</div>
              ) : (
                <div className="space-y-4 w-full flex flex-col items-center">
                  {/* Level 0: Root */}
                  <div className="flex justify-center">
                    <div className="flex flex-col items-center">
                      <motion.div
                        layout
                        className={`w-12 h-12 rounded-full font-bold font-mono text-sm flex items-center justify-center shadow-xs border-2 ${
                          activeIndices.includes(0)
                            ? 'bg-[#991B1B] text-white ring-4 ring-[#FECACA]'
                            : 'bg-[#1A1A1A] text-white border-[#D8D4C8]'
                        }`}
                      >
                        {heap[0]}
                      </motion.div>
                      <span className="text-[10px] font-mono text-[#991B1B] font-bold mt-1">Root [0]</span>
                    </div>
                  </div>

                  {/* Level 1 */}
                  {heap.length > 1 && (
                    <div className="flex justify-center gap-16">
                      {heap.slice(1, 3).map((val, idx) => {
                        const realIdx = idx + 1;
                        const isActive = activeIndices.includes(realIdx);

                        return (
                          <div key={idx} className="flex flex-col items-center">
                            <motion.div
                              layout
                              className={`w-10 h-10 rounded-full font-bold font-mono text-xs flex items-center justify-center shadow-xs border ${
                                isActive
                                  ? 'bg-[#FEF2F2] border-[#991B1B] text-[#991B1B] ring-2 ring-[#FECACA]'
                                  : 'bg-white border-[#D8D4C8] text-[#1A1A1A]'
                              }`}
                            >
                              {val}
                            </motion.div>
                            <span className="text-[9px] font-mono text-[#66625B] mt-0.5">[{realIdx}]</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Level 2 */}
                  {heap.length > 3 && (
                    <div className="flex justify-center gap-6">
                      {heap.slice(3, 7).map((val, idx) => {
                        const realIdx = idx + 3;
                        const isActive = activeIndices.includes(realIdx);

                        return (
                          <div key={idx} className="flex flex-col items-center">
                            <motion.div
                              layout
                              className={`w-9 h-9 rounded-full font-bold font-mono text-xs flex items-center justify-center border ${
                                isActive
                                  ? 'bg-[#FEF2F2] border-[#991B1B] text-[#991B1B] ring-2 ring-[#FECACA]'
                                  : 'bg-[#F4F2EB] border-[#D8D4C8] text-[#1A1A1A]'
                              }`}
                            >
                              {val}
                            </motion.div>
                            <span className="text-[9px] font-mono text-[#88847C] mt-0.5">[{realIdx}]</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Flat Array Representation */}
            <div>
              <div className="text-xs font-serif font-bold text-[#66625B] mb-2">
                Contiguous Sequential Array in Memory:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {heap.map((val, idx) => (
                  <motion.div
                    key={idx}
                    layout
                    className="w-14 h-16 rounded-lg bg-[#FAF8F5] border border-[#D8D4C8] flex flex-col items-center justify-between p-1.5 font-mono shadow-2xs"
                  >
                    <span className="text-[10px] text-[#88847C]">[{idx}]</span>
                    <span className="text-sm font-bold text-[#1A1A1A]">{val}</span>
                    <span className="text-[8px] text-[#991B1B] font-bold">
                      {idx === 0 ? 'ROOT' : `P:${Math.floor((idx - 1) / 2)}`}
                    </span>
                  </motion.div>
                ))}

                {sortedArray.length > 0 && (
                  <>
                    <div className="h-12 w-px bg-[#10B981] mx-1" />
                    {sortedArray.map((val, idx) => (
                      <div
                        key={`s-${idx}`}
                        className="w-14 h-16 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] flex flex-col items-center justify-between p-1.5 font-mono shadow-2xs"
                      >
                        <span className="text-[10px] text-[#15803D] font-bold">Sorted</span>
                        <span className="text-sm font-bold text-[#065F46]">{val}</span>
                        <span className="text-[8px] text-[#059669]">Extracted</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="p-4 rounded-xl bg-white border border-[#E5E2D9] shadow-xs">
            <div className="text-xs font-serif font-bold text-[#66625B] mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#991B1B]" /> Binary Heap Memory Activity Log
            </div>
            <div className="space-y-1 font-mono text-xs max-h-28 overflow-y-auto pr-2">
              {heapLogs.map((log, i) => (
                <div key={i} className="text-[#44403C] py-0.5 border-b border-[#F4F2EB]">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
