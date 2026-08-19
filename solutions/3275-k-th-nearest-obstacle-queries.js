/**
 * K-th Nearest Obstacle Queries
 * Intuition: Distance from the origin is |x| + |y|. After each query we only need the k-th smallest distance so far, which is the maximum among the k nearest points.
 * Approach: 1. Maintain a max-heap of size k of Manhattan distances. 2. After inserting a query, pop if the heap exceeds k. 3. If the heap has k values, answer is the heap top; otherwise -1.
 * Dry Run:
 *   queries = [[1,2],[3,4],[2,3],[-3,0]], k = 2
 *   Distances 3, 7, 5, 3. After four queries the 2nd nearest is 3.
 * Time Complexity: O(q log k)
 * Space Complexity: O(k)
 */
var resultsArray = function (queries, k) {
  const ans = Array(queries.length);
  const heap = [];

  const bubbleUp = (idx) => {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (heap[idx] <= heap[parent]) break;
      [heap[idx], heap[parent]] = [heap[parent], heap[idx]];
      idx = parent;
    }
  };

  const bubbleDown = (idx) => {
    while (true) {
      let largest = idx;
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;
      if (left < heap.length && heap[left] > heap[largest]) {
        largest = left;
      }
      if (right < heap.length && heap[right] > heap[largest]) {
        largest = right;
      }
      if (largest === idx) break;
      [heap[idx], heap[largest]] = [heap[largest], heap[idx]];
      idx = largest;
    }
  };

  for (let i = 0; i < queries.length; i++) {
    const dist = Math.abs(queries[i][0]) + Math.abs(queries[i][1]);
    heap.push(dist);
    bubbleUp(heap.length - 1);
    if (heap.length > k) {
      heap[0] = heap.pop();
      if (heap.length > 0) {
        bubbleDown(0);
      }
    }
    ans[i] = heap.length === k ? heap[0] : -1;
  }

  return ans;
};
