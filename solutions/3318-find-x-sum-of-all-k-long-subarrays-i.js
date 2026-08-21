/**
 * Find X-Sum of All K-Long Subarrays I
 * Intuition: The x-sum of a window keeps only the x most frequent values (ties broken by larger value) and sums value * frequency. n is tiny, so recompute frequencies per window.
 * Approach: 1. For each window of length k, count frequencies. 2. Sort pairs by frequency desc, then value desc. 3. Take the first x pairs and add value * freq.
 * Dry Run: nums = [1,1,2,2,3,4], k = 4, x = 2
 *   - [1,1,2,2] → keep 1 and 2 → 6; [1,2,2,3] → keep 2 and 3 → 7; [2,2,3,4] → keep 2 and 4 → 8
 * Time Complexity: O(N * K log K)
 * Space Complexity: O(K)
 */
var findXSum = function (nums, k, x) {
  const ans = [];
  for (let i = 0; i <= nums.length - k; i++) {
    const count = new Map();
    for (let j = i; j < i + k; j++) {
      count.set(nums[j], (count.get(nums[j]) || 0) + 1);
    }
    const pairs = [...count.entries()].sort((a, b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }
      return b[0] - a[0];
    });
    let sum = 0;
    for (let t = 0; t < Math.min(x, pairs.length); t++) {
      sum += pairs[t][0] * pairs[t][1];
    }
    ans.push(sum);
  }
  return ans;
};
