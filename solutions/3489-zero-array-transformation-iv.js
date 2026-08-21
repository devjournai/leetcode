/**
 * Zero Array Transformation IV
 * Intuition: Each index is independent: query (l,r,val) offers val as an optional 0-1 item for every i in [l,r]. nums[i] becomes 0 iff some subset of offered values sums to nums[i]. The earliest prefix of queries that can form every nums[i] is the answer.
 * Approach: 1. If nums is already zero, return 0. 2. Keep a set of reachable subset sums per index, starting at {0}. 3. Apply queries in order, adding val to every existing sum in range. 4. After query k, if every nums[i] is reachable, return k+1. 5. Otherwise return -1.
 * Dry Run: nums = [2,0,2], queries = [[0,2,1],[0,2,1],[1,1,3]].
 *   - After 1: index 0,2 can make 0 or 1, not 2.
 *   - After 2: they can make 2 → return 2.
 * Time Complexity: O(Q * N * S) where S is distinct subset sums per index
 * Space Complexity: O(N * S)
 */
var minZeroArray = function (nums, queries) {
  const alreadyZero = nums.every((num) => num === 0);
  if (alreadyZero) {
    return 0;
  }

  const n = nums.length;
  const subsetSums = Array.from({ length: n }, () => new Set([0]));

  const canFormAllNumbers = () => {
    for (let i = 0; i < n; i++) {
      if (!subsetSums[i].has(nums[i])) {
        return false;
      }
    }
    return true;
  };

  for (let k = 0; k < queries.length; k++) {
    const left = queries[k][0];
    const right = queries[k][1];
    const val = queries[k][2];

    for (let i = left; i <= right; i++) {
      const newSums = [];
      for (const subsetSum of subsetSums[i]) {
        newSums.push(subsetSum + val);
      }
      for (const sum of newSums) {
        subsetSums[i].add(sum);
      }
    }

    if (canFormAllNumbers()) {
      return k + 1;
    }
  }

  return -1;
};
