/**
 * Find Time Required to Eliminate Bacterial Strains
 * Intuition: Always eliminate the currently cheapest strain, paying splitTime to keep a lab available; a min-heap models the next ready times.
 * Approach: 1. Heapify elimination times and drop the smallest (handled by the first free lab). 2. Repeatedly pop the next time, add splitTime, and push-pop it against the heap. 3. When the heap is empty, that combined time is the answer.
 * Dry Run: timeReq = [10, 4, 5], splitTime = 2. Heap after drop 4: [5,10]. 2+5=7, push-pop vs 10 → leftover [10], then 2+10=12.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minEliminationTime = function (timeReq, splitTime) {
  const heap = timeReq.slice();
  const siftDown = (i, size) => {
    while (true) {
      let smallest = i;
      const left = i * 2 + 1;
      const right = i * 2 + 2;
      if (left < size && heap[left] < heap[smallest]) smallest = left;
      if (right < size && heap[right] < heap[smallest]) smallest = right;
      if (smallest === i) break;
      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
      i = smallest;
    }
  };
  const siftUp = (i) => {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (heap[parent] <= heap[i]) break;
      [heap[parent], heap[i]] = [heap[i], heap[parent]];
      i = parent;
    }
  };
  const heapify = () => {
    for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--)
      siftDown(i, heap.length);
  };
  const heappop = () => {
    const minValue = heap[0];
    const last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      siftDown(0, heap.length);
    }
    return minValue;
  };
  const heappushpop = (value) => {
    if (heap.length && heap[0] < value) {
      const minValue = heap[0];
      heap[0] = value;
      siftDown(0, heap.length);
      return minValue;
    }
    return value;
  };

  heapify();
  heappop();

  while (true) {
    const bacterial = splitTime + heappop();
    if (!heap.length) {
      return bacterial;
    }
    heappushpop(bacterial);
  }
};
