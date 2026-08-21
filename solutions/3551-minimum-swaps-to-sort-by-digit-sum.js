/**
 * Minimum Swaps to Sort by Digit Sum
 * Intuition: The target order is increasing digit-sum, then value. Minimum swaps to a permutation is n minus the number of cycles in the mapping from current index to target index.
 * Approach: 1. Pair each number with its digit sum and sort to get the target array. 2. Map each value to its target index. 3. Walk unvisited indices, following the map to count cycles. 4. Each cycle of size c needs c-1 swaps, which equals n - cycleCount.
 * Dry Run: nums = [37, 100, 10]. Digit sums 10, 1, 1. Target [100, 10, 37]. Cycles: 0→1→0 and 2→2. Two cycles → 3-2 = 1 swap.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
function digitSum(value) {
  let sum = 0;
  while (value !== 0) {
    sum += value % 10;
    value = Math.floor(value / 10);
  }
  return sum;
}

var minSwaps = function (nums) {
  const n = nums.length;
  const sortedPairs = nums.map((num, index) => [digitSum(num), num, index]);
  sortedPairs.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));

  const targetIndex = new Map();
  for (let i = 0; i < n; i++) {
    targetIndex.set(sortedPairs[i][1], i);
  }

  const visited = new Array(n).fill(false);
  let cycleCount = 0;

  for (let i = 0; i < n; i++) {
    if (visited[i]) {
      continue;
    }
    cycleCount++;
    let j = i;
    while (!visited[j]) {
      visited[j] = true;
      j = targetIndex.get(nums[j]);
    }
  }

  return n - cycleCount;
};
