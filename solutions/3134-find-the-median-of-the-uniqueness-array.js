/**
 * Find the Median of the Uniqueness Array
 * Intuition: The uniqueness array is the distinct-count of every subarray. Its median is the smallest k such that at least half of all subarrays have at most k distinct values. That count is monotonic, so binary search k and count subarrays with a sliding window.
 * Approach: 1. Total subarrays = n * (n + 1) / 2. Median rank is (total + 1) / 2. 2. Binary search distinct limit m in [1, n]. 3. For a candidate m, count subarrays with at most m distinct numbers via two pointers. 4. If that count is at least the median rank, search left; otherwise search right. 5. Return the smallest feasible m.
 * Dry Run: nums = [1, 2, 3]
 * - Subarray distinct counts: 1, 1, 1, 2, 2, 3. Sorted median (3rd of 6) = 1
 * - Binary search: m = 2 has 6 subarrays >= 3, m = 1 has 3 subarrays >= 3, so answer = 1
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var medianOfUniquenessArray = function (nums) {
  const n = nums.length;
  const subarrayCount = (n * (n + 1)) / 2;
  const medianCount = Math.floor((subarrayCount + 1) / 2);

  const subarraysWithAtMostKDistinct = (k) => {
    const count = new Map();
    let result = 0;
    let left = 0;
    for (let right = 0; right < n; right++) {
      count.set(nums[right], (count.get(nums[right]) || 0) + 1);
      if (count.get(nums[right]) === 1) {
        k--;
      }
      while (k < 0) {
        count.set(nums[left], count.get(nums[left]) - 1);
        if (count.get(nums[left]) === 0) {
          k++;
        }
        left++;
      }
      result += right - left + 1;
    }
    return result;
  };

  let left = 1;
  let right = n;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (subarraysWithAtMostKDistinct(mid) >= medianCount) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
};
