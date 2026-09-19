import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Rewind,
  Shuffle,
  CheckCircle2,
  ArrowRight,
  ArrowUpDown,
  Lock,
  Sparkles,
  Info
} from 'lucide-react';

export type SortAlgorithm = 'bubble' | 'selection' | 'insertion' | 'quick' | 'merge';

export interface SortingVisualizerProps {
  initialAlgorithm?: SortAlgorithm;
  allowedAlgorithms?: SortAlgorithm[];
}

export interface AnimationStep {
  array: number[];
  comparing: number[]; // indices currently being compared
  swapping: number[]; // indices currently swapping or moving
  sorted: number[]; // indices permanently sorted
  pivot?: number; // pivot index for Quick sort
  minIdx?: number; // min index for Selection sort
  currentPointer?: number; // scanning pointer (e.g. j or cursor)
  targetIndex?: number; // target position being filled
  keyElement?: { value: number; fromIndex: number; toIndex?: number } | null; // extracted key for Insertion sort
  activeRange?: [number, number]; // active subarray range [low, high]
  leftRange?: [number, number]; // for Merge sort
  rightRange?: [number, number]; // for Merge sort
  mergeBuffer?: number[]; // buffer for Merge sort
  actionType: 'compare' | 'swap' | 'shift' | 'insert' | 'partition' | 'merge' | 'sorted' | 'idle';
  comparisonResult?: string; // e.g. "45 > 23 → SWAP"
  description: string;
  passInfo?: string;
}

export const SortingVisualizer: React.FC<SortingVisualizerProps> = ({
  initialAlgorithm = 'bubble',
  allowedAlgorithms = ['bubble', 'selection', 'insertion', 'quick', 'merge']
}) => {
  const [algorithm, setAlgorithm] = useState<SortAlgorithm>(initialAlgorithm);
  const [initialData, setInitialData] = useState<number[]>([45, 23, 78, 12, 89, 56, 34, 67]);
  const [steps, setSteps] = useState<AnimationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(600); // ms per step

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync algorithm when prop changes
  useEffect(() => {
    if (allowedAlgorithms.includes(initialAlgorithm)) {
      setAlgorithm(initialAlgorithm);
    } else if (allowedAlgorithms.length > 0) {
      setAlgorithm(allowedAlgorithms[0]);
    }
  }, [initialAlgorithm, allowedAlgorithms]);

  // Generate steps whenever algorithm or initialData changes
  useEffect(() => {
    generateSteps(algorithm, initialData);
  }, [algorithm, initialData]);

  // Generate detailed steps for each algorithm
  const generateSteps = (algo: SortAlgorithm, rawArr: number[]) => {
    const arr = [...rawArr];
    const n = arr.length;
    const generatedSteps: AnimationStep[] = [];

    // Step 0: Initial State
    generatedSteps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      actionType: 'idle',
      description: `Initial unsorted array of ${n} elements. Click "Step" or "Auto Play" to trace the algorithm.`
    });

    if (algo === 'bubble') {
      const sortedIndices: number[] = [];
      for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        const passText = `Pass ${i + 1} of ${n - 1}`;

        for (let j = 0; j < n - i - 1; j++) {
          const isGreater = arr[j] > arr[j + 1];
          // Comparison step
          generatedSteps.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapping: [],
            sorted: [...sortedIndices],
            currentPointer: j,
            passInfo: passText,
            actionType: 'compare',
            comparisonResult: `${arr[j]} > ${arr[j + 1]} ? ${isGreater ? 'YES (Swap needed)' : 'NO (Already ordered)'}`,
            description: `Comparing adjacent elements A[${j}] (${arr[j]}) and A[${j + 1}] (${arr[j + 1]}).`
          });

          if (isGreater) {
            // Swap step
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            swapped = true;

            generatedSteps.push({
              array: [...arr],
              comparing: [],
              swapping: [j, j + 1],
              sorted: [...sortedIndices],
              currentPointer: j + 1,
              passInfo: passText,
              actionType: 'swap',
              comparisonResult: `Swapped: A[${j}] ⇄ A[${j + 1}]`,
              description: `Swapped ${arr[j + 1]} and ${arr[j]} so the larger value bubbles rightward.`
            });
          }
        }

        sortedIndices.push(n - 1 - i);
        generatedSteps.push({
          array: [...arr],
          comparing: [],
          swapping: [],
          sorted: [...sortedIndices],
          passInfo: passText,
          actionType: 'sorted',
          description: `Pass ${i + 1} complete! Largest unsorted element ${arr[n - 1 - i]} is now permanently locked at index ${n - 1 - i}.`
        });

        if (!swapped) {
          generatedSteps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: Array.from({ length: n }, (_, k) => k),
            actionType: 'sorted',
            description: `Adaptive Early Exit! Zero swaps occurred in Pass ${i + 1}. Array is already 100% sorted!`
          });
          break;
        }
      }

      // Mark all sorted at finish
      generatedSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, k) => k),
        actionType: 'sorted',
        description: 'Bubble Sort finished! All elements are arranged in non-decreasing order.'
      });
    } else if (algo === 'selection') {
      const sortedIndices: number[] = [];

      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        const passText = `Pass ${i + 1}: Finding minimum for index ${i}`;

        generatedSteps.push({
          array: [...arr],
          comparing: [],
          swapping: [],
          sorted: [...sortedIndices],
          minIdx: i,
          targetIndex: i,
          passInfo: passText,
          actionType: 'idle',
          description: `Starting search for minimum in unsorted suffix [${i}..${n - 1}]. Initial candidate min: A[${i}] = ${arr[i]}.`
        });

        for (let j = i + 1; j < n; j++) {
          const isSmaller = arr[j] < arr[minIdx];
          generatedSteps.push({
            array: [...arr],
            comparing: [minIdx, j],
            swapping: [],
            sorted: [...sortedIndices],
            minIdx: minIdx,
            currentPointer: j,
            targetIndex: i,
            passInfo: passText,
            actionType: 'compare',
            comparisonResult: `${arr[j]} < ${arr[minIdx]} ? ${isSmaller ? 'YES (New minimum found!)' : 'NO'}`,
            description: `Scanning index ${j}: comparing current min ${arr[minIdx]} with A[${j}] (${arr[j]}).`
          });

          if (isSmaller) {
            minIdx = j;
            generatedSteps.push({
              array: [...arr],
              comparing: [],
              swapping: [],
              sorted: [...sortedIndices],
              minIdx: minIdx,
              currentPointer: j,
              targetIndex: i,
              passInfo: passText,
              actionType: 'idle',
              comparisonResult: `New minimum: ${arr[minIdx]} at index ${minIdx}`,
              description: `Updated minimum pointer! New smallest value is ${arr[minIdx]} at index ${minIdx}.`
            });
          }
        }

        if (minIdx !== i) {
          const temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;

          generatedSteps.push({
            array: [...arr],
            comparing: [],
            swapping: [i, minIdx],
            sorted: [...sortedIndices],
            minIdx: i,
            targetIndex: i,
            passInfo: passText,
            actionType: 'swap',
            comparisonResult: `Swapped A[${i}] ⇄ A[${minIdx}]`,
            description: `Swapped minimum element ${arr[i]} into its correct slot at index ${i}.`
          });
        }

        sortedIndices.push(i);
        generatedSteps.push({
          array: [...arr],
          comparing: [],
          swapping: [],
          sorted: [...sortedIndices],
          targetIndex: i,
          passInfo: passText,
          actionType: 'sorted',
          description: `Index ${i} is now permanently sorted with value ${arr[i]}.`
        });
      }

      sortedIndices.push(n - 1);
      generatedSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: sortedIndices,
        actionType: 'sorted',
        description: 'Selection Sort finished! Each position was filled with its minimum element.'
      });
    } else if (algo === 'insertion') {
      const sortedIndices: number[] = [0];

      for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        const passText = `Inserting element ${key} from index ${i}`;

        // Step: Extract Key
        generatedSteps.push({
          array: [...arr],
          comparing: [i],
          swapping: [],
          sorted: [...sortedIndices],
          targetIndex: i,
          keyElement: { value: key, fromIndex: i, toIndex: i },
          passInfo: passText,
          actionType: 'idle',
          comparisonResult: `Key Extracted: ${key}`,
          description: `Extracted key = ${key} at index ${i}. Sorted prefix is [0..${i - 1}]. Now shifting elements larger than ${key} to the right.`
        });

        while (j >= 0 && arr[j] > key) {
          generatedSteps.push({
            array: [...arr],
            comparing: [j],
            swapping: [],
            sorted: [...sortedIndices],
            currentPointer: j,
            keyElement: { value: key, fromIndex: i, toIndex: j + 1 },
            passInfo: passText,
            actionType: 'compare',
            comparisonResult: `${arr[j]} > ${key} ? YES → Shift Right`,
            description: `A[${j}] (${arr[j]}) is greater than key (${key}). Shifting ${arr[j]} right into position ${j + 1}.`
          });

          arr[j + 1] = arr[j];

          generatedSteps.push({
            array: [...arr],
            comparing: [],
            swapping: [j + 1],
            sorted: [...sortedIndices],
            currentPointer: j,
            keyElement: { value: key, fromIndex: i, toIndex: j },
            passInfo: passText,
            actionType: 'shift',
            comparisonResult: `Shifted: A[${j + 1}] := ${arr[j + 1]}`,
            description: `Shifted ${arr[j + 1]} into index ${j + 1}, opening up hole at index ${j}.`
          });

          j--;
        }

        if (j >= 0) {
          generatedSteps.push({
            array: [...arr],
            comparing: [j],
            swapping: [],
            sorted: [...sortedIndices],
            currentPointer: j,
            keyElement: { value: key, fromIndex: i, toIndex: j + 1 },
            passInfo: passText,
            actionType: 'compare',
            comparisonResult: `${arr[j]} <= ${key} ? STOP shifting`,
            description: `A[${j}] (${arr[j]}) is less than or equal to key (${key}). Correct insertion slot found at index ${j + 1}.`
          });
        }

        arr[j + 1] = key;
        sortedIndices.push(i);

        generatedSteps.push({
          array: [...arr],
          comparing: [],
          swapping: [j + 1],
          sorted: [...sortedIndices],
          targetIndex: j + 1,
          keyElement: null,
          passInfo: passText,
          actionType: 'insert',
          comparisonResult: `Inserted: A[${j + 1}] := ${key}`,
          description: `Inserted key ${key} into position ${j + 1}. Sorted prefix now spans [0..${i}].`
        });
      }

      generatedSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, k) => k),
        actionType: 'sorted',
        description: 'Insertion Sort finished! All elements inserted into their proper sequential positions.'
      });
    } else if (algo === 'quick') {
      const sortedSet = new Set<number>();

      const recordQuickSort = (low: number, high: number) => {
        if (low < high) {
          const pivotVal = arr[high];
          const windowText = `Partitioning window [${low}..${high}]`;

          generatedSteps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: Array.from(sortedSet),
            pivot: high,
            activeRange: [low, high],
            passInfo: windowText,
            actionType: 'partition',
            comparisonResult: `Pivot = ${pivotVal} at A[${high}]`,
            description: `Selected pivot = ${pivotVal} at index ${high}. Dividing range [${low}..${high}] so elements ≤ pivot go left, and > pivot go right.`
          });

          let i = low - 1;

          for (let j = low; j < high; j++) {
            const isLessOrEqual = arr[j] <= pivotVal;

            generatedSteps.push({
              array: [...arr],
              comparing: [j, high],
              swapping: [],
              sorted: Array.from(sortedSet),
              pivot: high,
              currentPointer: j,
              targetIndex: i >= low ? i : undefined,
              activeRange: [low, high],
              passInfo: windowText,
              actionType: 'compare',
              comparisonResult: `A[${j}] (${arr[j]}) <= Pivot (${pivotVal}) ? ${isLessOrEqual ? 'YES' : 'NO'}`,
              description: `Comparing A[${j}] (${arr[j]}) with pivot ${pivotVal}.`
            });

            if (isLessOrEqual) {
              i++;
              if (i !== j) {
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;

                generatedSteps.push({
                  array: [...arr],
                  comparing: [],
                  swapping: [i, j],
                  sorted: Array.from(sortedSet),
                  pivot: high,
                  currentPointer: j,
                  targetIndex: i,
                  activeRange: [low, high],
                  passInfo: windowText,
                  actionType: 'swap',
                  comparisonResult: `Swapped A[${i}] ⇄ A[${j}]`,
                  description: `Advanced partition boundary i to ${i} and swapped A[${i}] (${arr[i]}) with A[${j}] (${arr[j]}).`
                });
              } else {
                generatedSteps.push({
                  array: [...arr],
                  comparing: [],
                  swapping: [],
                  sorted: Array.from(sortedSet),
                  pivot: high,
                  currentPointer: j,
                  targetIndex: i,
                  activeRange: [low, high],
                  passInfo: windowText,
                  actionType: 'idle',
                  comparisonResult: `A[${j}] already in left partition (i = ${i})`,
                  description: `A[${j}] (${arr[j]}) is ≤ pivot, already in left section at index ${i}.`
                });
              }
            }
          }

          // Swap pivot to its final spot (i + 1)
          const pIdx = i + 1;
          const temp = arr[pIdx];
          arr[pIdx] = arr[high];
          arr[high] = temp;
          sortedSet.add(pIdx);

          generatedSteps.push({
            array: [...arr],
            comparing: [],
            swapping: [pIdx, high],
            sorted: Array.from(sortedSet),
            pivot: pIdx,
            activeRange: [low, high],
            passInfo: windowText,
            actionType: 'swap',
            comparisonResult: `Pivot placed at index ${pIdx}`,
            description: `Swapped pivot ${arr[pIdx]} into its final sorted position at index ${pIdx}. All elements to the left are ≤ ${arr[pIdx]}, all elements to the right are > ${arr[pIdx]}.`
          });

          recordQuickSort(low, pIdx - 1);
          recordQuickSort(pIdx + 1, high);
        } else if (low === high) {
          sortedSet.add(low);
        }
      };

      recordQuickSort(0, n - 1);

      generatedSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, k) => k),
        actionType: 'sorted',
        description: 'Quick Sort finished! All recursive partitions settled in place.'
      });
    } else if (algo === 'merge') {
      // Merge sort generator
      const recordMergeSort = (low: number, high: number) => {
        if (low < high) {
          const mid = Math.floor(low + (high - low) / 2);

          generatedSteps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [],
            leftRange: [low, mid],
            rightRange: [mid + 1, high],
            activeRange: [low, high],
            passInfo: `Dividing range [${low}..${high}] at mid = ${mid}`,
            actionType: 'idle',
            description: `Dividing: Left half [${low}..${mid}] and Right half [${mid + 1}..${high}].`
          });

          recordMergeSort(low, mid);
          recordMergeSort(mid + 1, high);

          // Merge stage
          const temp: number[] = [];
          let p1 = low;
          let p2 = mid + 1;

          while (p1 <= mid && p2 <= high) {
            const isP1Smaller = arr[p1] <= arr[p2];
            generatedSteps.push({
              array: [...arr],
              comparing: [p1, p2],
              swapping: [],
              sorted: [],
              leftRange: [low, mid],
              rightRange: [mid + 1, high],
              activeRange: [low, high],
              mergeBuffer: [...temp],
              passInfo: `Merging [${low}..${mid}] and [${mid + 1}..${high}]`,
              actionType: 'compare',
              comparisonResult: `A[${p1}] (${arr[p1]}) vs A[${p2}] (${arr[p2]}) → Pick ${isP1Smaller ? arr[p1] : arr[p2]}`,
              description: `Comparing left element A[${p1}] (${arr[p1]}) with right element A[${p2}] (${arr[p2]}).`
            });

            if (isP1Smaller) {
              temp.push(arr[p1]);
              p1++;
            } else {
              temp.push(arr[p2]);
              p2++;
            }
          }

          while (p1 <= mid) {
            temp.push(arr[p1]);
            generatedSteps.push({
              array: [...arr],
              comparing: [p1],
              swapping: [],
              sorted: [],
              leftRange: [low, mid],
              rightRange: [mid + 1, high],
              activeRange: [low, high],
              mergeBuffer: [...temp],
              passInfo: `Flushing remaining left elements`,
              actionType: 'merge',
              comparisonResult: `Copied ${arr[p1]} to buffer`,
              description: `Flushed leftover element ${arr[p1]} from left half into merge buffer.`
            });
            p1++;
          }

          while (p2 <= high) {
            temp.push(arr[p2]);
            generatedSteps.push({
              array: [...arr],
              comparing: [p2],
              swapping: [],
              sorted: [],
              leftRange: [low, mid],
              rightRange: [mid + 1, high],
              activeRange: [low, high],
              mergeBuffer: [...temp],
              passInfo: `Flushing remaining right elements`,
              actionType: 'merge',
              comparisonResult: `Copied ${arr[p2]} to buffer`,
              description: `Flushed leftover element ${arr[p2]} from right half into merge buffer.`
            });
            p2++;
          }

          // Copy back
          for (let k = 0; k < temp.length; k++) {
            arr[low + k] = temp[k];
            generatedSteps.push({
              array: [...arr],
              comparing: [],
              swapping: [low + k],
              sorted: [],
              leftRange: [low, mid],
              rightRange: [mid + 1, high],
              activeRange: [low, high],
              mergeBuffer: [...temp],
              passInfo: `Writing back sorted merged elements into A[${low}..${high}]`,
              actionType: 'insert',
              comparisonResult: `A[${low + k}] := ${temp[k]}`,
              description: `Copied sorted element ${temp[k]} from buffer back into original array at index ${low + k}.`
            });
          }
        }
      };

      recordMergeSort(0, n - 1);

      generatedSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, k) => k),
        actionType: 'sorted',
        description: 'Merge Sort finished! Subarrays systematically combined in guaranteed O(N log N) time.'
      });
    }

    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, speed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, speed]);

  const currentStep = steps[currentStepIndex] || {
    array: initialData,
    comparing: [],
    swapping: [],
    sorted: [],
    actionType: 'idle',
    description: ''
  };

  const handleShuffle = () => {
    const shuffled = [...initialData].sort(() => Math.random() - 0.5);
    setInitialData(shuffled);
  };

  const handlePresetExam = () => {
    setInitialData([45, 23, 78, 12, 89, 56, 34, 67]);
  };

  const handlePresetReversed = () => {
    setInitialData([90, 80, 70, 60, 50, 40, 30, 20]);
  };

  const handlePresetNearlySorted = () => {
    setInitialData([10, 20, 35, 30, 50, 60, 80, 75]);
  };

  // Max value in array for height scaling
  const maxVal = Math.max(...currentStep.array, 100);

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] shadow-xs space-y-4">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9] dark:border-[#38332B]">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#B45309] dark:text-[#FBBF24]" />
          <h4 className="text-sm font-serif font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
            {allowedAlgorithms.length === 1
              ? `${algorithm.toUpperCase()} SORT SIMULATION`
              : 'SORTING ALGORITHM VISUAL SIMULATOR'}
          </h4>
        </div>

        {/* Algorithm Tabs (only show tabs for allowed algorithms) */}
        {allowedAlgorithms.length > 1 && (
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] overflow-x-auto">
            {allowedAlgorithms.map((algo) => (
              <button
                key={algo}
                onClick={() => {
                  setAlgorithm(algo);
                  setIsPlaying(false);
                }}
                className={`px-2.5 py-1 rounded text-xs font-mono font-medium capitalize transition-colors cursor-pointer whitespace-nowrap ${
                  algorithm === algo
                    ? 'bg-[#1A1A1A] dark:bg-[#EDE8DF] text-white dark:text-[#181614] font-bold shadow-2xs'
                    : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
                }`}
              >
                {algo === 'quick' ? 'Quick Sort' : algo === 'merge' ? 'Merge Sort' : `${algo} Sort`}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Control Panel */}
      <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={currentStepIndex >= steps.length - 1}
            className="px-2.5 py-1 rounded bg-[#B45309] text-white font-medium hover:bg-[#92400E] disabled:opacity-50 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
          </button>

          <button
            onClick={() => {
              if (currentStepIndex > 0) {
                setIsPlaying(false);
                setCurrentStepIndex((prev) => prev - 1);
              }
            }}
            disabled={isPlaying || currentStepIndex === 0}
            className="px-2 py-1 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[#1A1A1A] dark:text-[#EDE8DF] hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 flex items-center gap-1 cursor-pointer"
            title="Previous Step"
          >
            <Rewind className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <button
            onClick={() => {
              if (currentStepIndex < steps.length - 1) {
                setIsPlaying(false);
                setCurrentStepIndex((prev) => prev + 1);
              }
            }}
            disabled={isPlaying || currentStepIndex >= steps.length - 1}
            className="px-2 py-1 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[#1A1A1A] dark:text-[#EDE8DF] font-medium hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 flex items-center gap-1 cursor-pointer"
            title="Next Step"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Next</span>
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex(0);
            }}
            className="p-1.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[#66625B] hover:text-[#1A1A1A] cursor-pointer"
            title="Reset to beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleShuffle}
            disabled={isPlaying}
            className="p-1.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[#66625B] hover:text-[#1A1A1A] cursor-pointer"
            title="Shuffle Array"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Presets & Speed */}
        <div className="flex items-center gap-2">
          <span className="text-[#88847C] dark:text-[#78716C]">Presets:</span>
          <button
            onClick={handlePresetExam}
            className="px-2 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] hover:border-[#B45309] text-[11px] cursor-pointer"
          >
            Exam
          </button>
          <button
            onClick={handlePresetNearlySorted}
            className="px-2 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] hover:border-[#B45309] text-[11px] cursor-pointer"
          >
            Near-Sorted
          </button>
          <button
            onClick={handlePresetReversed}
            className="px-2 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] hover:border-[#B45309] text-[11px] cursor-pointer"
          >
            Reversed
          </button>

          <span className="text-[#88847C] dark:text-[#78716C] ml-1">Speed:</span>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="px-1.5 py-0.5 rounded bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-[11px]"
          >
            <option value={900}>Slow</option>
            <option value={500}>Normal</option>
            <option value={200}>Fast</option>
          </select>
        </div>
      </div>

      {/* Main Simulation Stage */}
      <div className="p-4 sm:p-6 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E5E2D9] dark:border-[#38332B] space-y-5">
        {/* Dynamic Action & Comparison Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#181614] border border-[#D8D4C8] dark:border-[#423D36] font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">
              {currentStep.passInfo || `${algorithm.toUpperCase()} SORT`}
            </span>
            {currentStep.comparisonResult && (
              <span className="px-2.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/50 text-amber-900 dark:text-amber-200 font-bold flex items-center gap-1.5">
                <ArrowUpDown className="w-3 h-3 text-amber-600" />
                {currentStep.comparisonResult}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#88847C] dark:text-[#78716C]">
              Step <strong className="text-[#1A1A1A] dark:text-[#EDE8DF]">{currentStepIndex + 1}</strong> / {steps.length}
            </span>
            {currentStepIndex === steps.length - 1 && (
              <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/50 text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Complete
              </span>
            )}
          </div>
        </div>

        {/* Special insertion sort "Extracted Key" display */}
        {algorithm === 'insertion' && currentStep.keyElement && (
          <div className="p-3 rounded-lg bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700/40 flex items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-900 dark:text-amber-200">Current Floating Key:</span>
              <span className="w-9 h-9 rounded-lg bg-amber-500 text-white font-bold flex items-center justify-center shadow-xs text-sm">
                {currentStep.keyElement.value}
              </span>
              <span className="text-[#66625B] dark:text-[#A8A29E] text-[11px]">
                (Lifted from original index {currentStep.keyElement.fromIndex})
              </span>
            </div>
            <span className="text-amber-800 dark:text-amber-300 italic text-[11px]">
              Shifting larger elements right to make room...
            </span>
          </div>
        )}

        {/* Special Merge Sort Buffer display */}
        {algorithm === 'merge' && currentStep.mergeBuffer && currentStep.mergeBuffer.length > 0 && (
          <div className="p-3 rounded-lg bg-blue-50/80 dark:bg-blue-950/30 border border-blue-300 dark:border-blue-700/40 space-y-1.5 text-xs font-mono">
            <div className="flex items-center justify-between text-[11px] text-blue-900 dark:text-blue-200 font-bold">
              <span>Auxiliary Merge Buffer (temporary sorted collection):</span>
              <span>{currentStep.mergeBuffer.length} items collected</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {currentStep.mergeBuffer.map((bVal, bIdx) => (
                <div
                  key={bIdx}
                  className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs"
                >
                  {bVal}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Color Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono border-b border-[#E5E2D9] dark:border-[#38332B] pb-2">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-xs bg-[#66625B]/40 dark:bg-[#A8A29E]/30 inline-block" />
            <span className="text-[#88847C] dark:text-[#78716C]">Unsorted</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-xs bg-amber-500 inline-block" />
            <span className="text-amber-800 dark:text-amber-300 font-bold">Comparing</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-xs bg-rose-500 inline-block" />
            <span className="text-rose-800 dark:text-rose-300 font-bold">Swap / Shift / Write</span>
          </div>
          {algorithm === 'quick' && (
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-xs bg-indigo-600 inline-block" />
              <span className="text-indigo-800 dark:text-indigo-300 font-bold">Pivot</span>
            </div>
          )}
          {algorithm === 'selection' && (
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-xs bg-purple-600 inline-block" />
              <span className="text-purple-800 dark:text-purple-300 font-bold">Current Min</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-xs bg-emerald-500 inline-block" />
            <span className="text-emerald-800 dark:text-emerald-300 font-bold">Locked Sorted</span>
          </div>
        </div>

        {/* Pointer Indicators Row (Shows pointers above each element) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 px-2 h-7 font-mono text-[10px] font-bold">
          {currentStep.array.map((_, idx) => {
            const isComparing = currentStep.comparing.includes(idx);
            const isSwapping = currentStep.swapping.includes(idx);
            const isPivot = currentStep.pivot === idx;
            const isMin = currentStep.minIdx === idx;
            const isTarget = currentStep.targetIndex === idx;
            const isCurrent = currentStep.currentPointer === idx;

            let tag: string | null = null;
            let tagClass = 'bg-gray-100 text-gray-700';

            if (isPivot) {
              tag = 'PIVOT';
              tagClass = 'bg-indigo-600 text-white';
            } else if (isMin) {
              tag = 'MIN';
              tagClass = 'bg-purple-600 text-white';
            } else if (isSwapping) {
              tag = 'SWAP';
              tagClass = 'bg-rose-600 text-white';
            } else if (isComparing) {
              tag = 'COMP';
              tagClass = 'bg-amber-500 text-white';
            } else if (isTarget) {
              tag = 'TARGET';
              tagClass = 'bg-blue-600 text-white';
            } else if (isCurrent) {
              tag = 'SCAN';
              tagClass = 'bg-amber-600 text-white';
            }

            return (
              <div key={idx} className="flex-1 max-w-[54px] flex justify-center">
                {tag ? (
                  <span className={`px-1 py-0.5 rounded text-[9px] font-bold whitespace-nowrap shadow-2xs ${tagClass}`}>
                    {tag}
                  </span>
                ) : (
                  <span className="text-transparent">.</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Visual Bar Chart & Values Stage */}
        <div className="h-52 flex items-end justify-center gap-2 sm:gap-3 pt-2 pb-2 px-2 border-b border-[#E5E2D9] dark:border-[#38332B] bg-white/60 dark:bg-[#201D1A]/60 rounded-lg">
          {currentStep.array.map((val, idx) => {
            const isComparing = currentStep.comparing.includes(idx);
            const isSwapping = currentStep.swapping.includes(idx);
            const isSorted = currentStep.sorted.includes(idx);
            const isPivot = currentStep.pivot === idx;
            const isMin = currentStep.minIdx === idx;

            let barColor = 'bg-[#88847C]/40 dark:bg-[#A8A29E]/30';
            let cardBg = 'bg-white dark:bg-[#2A2622] border-[#E5E2D9] dark:border-[#423D36]';

            if (isPivot) {
              barColor = 'bg-indigo-600 shadow-md ring-2 ring-indigo-400';
              cardBg = 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-900 dark:text-indigo-200';
            } else if (isMin) {
              barColor = 'bg-purple-600 shadow-md ring-2 ring-purple-400';
              cardBg = 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-900 dark:text-purple-200';
            } else if (isSwapping) {
              barColor = 'bg-rose-500 shadow-md animate-pulse ring-2 ring-rose-400';
              cardBg = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200';
            } else if (isComparing) {
              barColor = 'bg-amber-500 shadow-sm ring-2 ring-amber-400';
              cardBg = 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 text-amber-900 dark:text-amber-200';
            } else if (isSorted) {
              barColor = 'bg-emerald-500';
              cardBg = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200';
            }

            const heightPct = Math.max((val / maxVal) * 100, 15);

            return (
              <div key={idx} className="flex-1 max-w-[54px] flex flex-col items-center gap-1.5 h-full justify-end">
                {/* Number Card above the bar */}
                <div
                  className={`w-full py-1 text-center font-mono text-xs font-bold rounded border shadow-2xs transition-all ${cardBg}`}
                >
                  <div className="flex items-center justify-center gap-0.5">
                    {val}
                    {isSorted && <Lock className="w-2.5 h-2.5 text-emerald-600 shrink-0" />}
                  </div>
                </div>

                {/* Scaled Bar */}
                <div
                  className={`w-full rounded-t-md transition-all duration-300 ${barColor}`}
                  style={{ height: `${heightPct}%` }}
                />

                {/* Index label */}
                <span className="text-[10px] font-mono text-[#88847C] dark:text-[#78716C] mt-0.5">
                  [{idx}]
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Explanation Callout */}
        <div className="p-3.5 rounded-lg bg-white dark:bg-[#201D1A] border border-[#E5E2D9] dark:border-[#38332B] flex items-start gap-2.5 text-xs font-mono">
          <ArrowRight className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-[#1A1A1A] dark:text-[#EDE8DF]">Current Operation:</span>
            <p className="text-[#44403C] dark:text-[#D6D0C5] leading-relaxed">
              {currentStep.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
