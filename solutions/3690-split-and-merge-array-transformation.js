/**
 * Split And Merge Array Transformation
 * Intuition: n ≤ 6, so every split-and-merge state can be explored with BFS. Each operation cuts a contiguous block and splices it elsewhere.
 * Approach: 1. BFS from nums1. 2. From a state, try every [left, right] subarray inserted at every remaining index. 3. First time nums2 is reached is the minimum operations.
 * Dry Run: [3, 1, 2] → cut [3] and append → [1, 2, 3] in one move.
 * Time Complexity: O((N^2) * N!)
 * Space Complexity: O(N * N!)
 */
var minSplitMerge = function (nums1, nums2) {
  const n = nums1.length;
  const target = nums2.join(",");
  const start = nums1.join(",");
  const visited = new Set([start]);
  let queue = [nums1.slice()];

  for (let operations = 0; queue.length > 0; operations++) {
    const nextQueue = [];
    for (const current of queue) {
      if (current.join(",") === target) {
        return operations;
      }
      for (let left = 0; left < n; left++) {
        for (let right = left; right < n; right++) {
          const remaining = current
            .slice(0, left)
            .concat(current.slice(right + 1));
          const block = current.slice(left, right + 1);
          for (let insertAt = 0; insertAt <= remaining.length; insertAt++) {
            const nextState = remaining
              .slice(0, insertAt)
              .concat(block, remaining.slice(insertAt));
            const key = nextState.join(",");
            if (!visited.has(key)) {
              visited.add(key);
              nextQueue.push(nextState);
            }
          }
        }
      }
    }
    queue = nextQueue;
  }
  return -1;
};
