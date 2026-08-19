/**
 * Final Array State After K Multiplication Operations I
 * Intuition: Each operation multiplies the current minimum (leftmost on ties). A min-heap of (value, index) always exposes that target.
 * Approach: 1. Push every (nums[i], i) into a min-heap. 2. k times pop the smallest pair, multiply its value, and push it back. 3. Write the heap values back into the original indices.
 * Dry Run:
 *   nums = [2,1,3,5,6], k = 5, multiplier = 2
 *   1 -> 2, heap mins: 2,2,3,... after five multiplies the array is [8,4,6,5,6].
 * Time Complexity: O((n + k) log n)
 * Space Complexity: O(n)
 */
var getFinalState = function (nums, k, multiplier) {
  const heap = nums.map((num, i) => [num, i]);

  const compare = (a, b) => a[0] - b[0] || a[1] - b[1];

  const bubbleUp = (idx) => {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (compare(heap[idx], heap[parent]) >= 0) break;
      [heap[idx], heap[parent]] = [heap[parent], heap[idx]];
      idx = parent;
    }
  };

  const bubbleDown = (idx) => {
    while (true) {
      let smallest = idx;
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;
      if (left < heap.length && compare(heap[left], heap[smallest]) < 0) {
        smallest = left;
      }
      if (right < heap.length && compare(heap[right], heap[smallest]) < 0) {
        smallest = right;
      }
      if (smallest === idx) break;
      [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
      idx = smallest;
    }
  };

  for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
    bubbleDown(i);
  }

  const pop = () => {
    const top = heap[0];
    const last = heap.pop();
    if (heap.length > 0) {
      heap[0] = last;
      bubbleDown(0);
    }
    return top;
  };

  const push = (item) => {
    heap.push(item);
    bubbleUp(heap.length - 1);
  };

  while (k-- > 0) {
    const [num, i] = pop();
    push([num * multiplier, i]);
  }

  const ans = Array(nums.length);
  for (const [num, i] of heap) {
    ans[i] = num;
  }
  return ans;
};
