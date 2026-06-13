/**
 * Maximum Score Of Spliced Array
 * Intuition: The problem asks to maximize the score, which is the maximum of the sums of two arrays after an optional subarray swap. A swap changes `sum1` by `sum(nums2[l...r]) - sum(nums1[l...r])` and `sum2` by `sum(nums1[l...r]) - sum(nums2[l...r])`. This means one sum increases by a certain value while the other decreases by the same value. To maximize the score, we can either maximize `sum1` (by maximizing the gain `sum(nums2[l...r]) - sum(nums1[l...r])`) or maximize `sum2` (by maximizing the gain `sum(nums1[l...r]) - sum(nums2[l...r])`). Both "maximize gain" problems are solvable using Kadane's algorithm. If no swap improves the score, Kadane's algorithm will yield a gain of 0, effectively choosing not to swap.
 * Approach: 1. Calculate the initial total sums of `nums1` and `nums2`. 2. Apply Kadane's algorithm to find the maximum possible gain for `nums1` if `nums1[left...right]` is swapped with `nums2[left...right]`. This gain is derived from `nums2[i] - nums1[i]` for each element in the swapped subarray. 3. Apply Kadane's algorithm again to find the maximum possible gain for `nums2` if `nums1[left...right]` is swapped with `nums2[left...right]`. This gain is derived from `nums1[i] - nums2[i]` for each element. 4. Calculate the two potential maximum scores: `initial_sum1 + max_gain_for_sum1` and `initial_sum2 + max_gain_for_sum2`. 5. Return the overall maximum of these two potential scores.
 * Dry Run:
 * nums1 = [60, 60, 60], nums2 = [10, 90, 10]
 * arrayLength = 3
 *
 * // Initial sums calculation
 * totalOne = 0, totalTwo = 0
 * idxA = 0: totalOne = 60, totalTwo = 10
 * idxA = 1: totalOne = 120, totalTwo = 100
 * idxA = 2: totalOne = 180, totalTwo = 110
 * End of first loop: totalOne = 180, totalTwo = 110
 *
 * // Kadane's algorithm for max gains
 * currentMaxDiffOne = 0, overallMaxDiffOne = 0
 * currentMaxDiffTwo = 0, overallMaxDiffTwo = 0
 *
 * idxB = 0:
 *   diffValOne = nums2[0] - nums1[0] = 10 - 60 = -50
 *   currentMaxDiffOne = Math.max(0, 0 + (-50)) = 0
 *   overallMaxDiffOne = Math.max(0, 0) = 0
 *   diffValTwo = nums1[0] - nums2[0] = 60 - 10 = 50
 *   currentMaxDiffTwo = Math.max(0, 0 + 50) = 50
 *   overallMaxDiffTwo = Math.max(0, 50) = 50
 *
 * idxB = 1:
 *   diffValOne = nums2[1] - nums1[1] = 90 - 60 = 30
 *   currentMaxDiffOne = Math.max(0, 0 + 30) = 30
 *   overallMaxDiffOne = Math.max(0, 30) = 30
 *   diffValTwo = nums1[1] - nums2[1] = 60 - 90 = -30
 *   currentMaxDiffTwo = Math.max(0, 50 + (-30)) = 20
 *   overallMaxDiffTwo = Math.max(50, 20) = 50
 *
 * idxB = 2:
 *   diffValOne = nums2[2] - nums1[2] = 10 - 60 = -50
 *   currentMaxDiffOne = Math.max(0, 30 + (-50)) = 0
 *   overallMaxDiffOne = Math.max(30, 0) = 30
 *   diffValTwo = nums1[2] - nums2[2] = 60 - 10 = 50
 *   currentMaxDiffTwo = Math.max(0, 20 + 50) = 70
 *   overallMaxDiffTwo = Math.max(50, 70) = 70
 * End of second loop: overallMaxDiffOne = 30, overallMaxDiffTwo = 70
 *
 * // Final score calculation
 * scoreOptionOne = totalOne + overallMaxDiffOne = 180 + 30 = 210
 * scoreOptionTwo = totalTwo + overallMaxDiffTwo = 110 + 70 = 180
 *
 * return Math.max(210, 180) = 210
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maximumsSplicedArray = function (nums1, nums2) {
  const arrayLength = nums1.length;
  let totalOne = 0;
  let totalTwo = 0;

  for (let idxA = 0; idxA < arrayLength; idxA++) {
    totalOne += nums1[idxA];
    totalTwo += nums2[idxA];
  }

  let currentMaxDiffOne = 0;
  let overallMaxDiffOne = 0;
  let currentMaxDiffTwo = 0;
  let overallMaxDiffTwo = 0;

  for (let idxB = 0; idxB < arrayLength; idxB++) {
    const diffValOne = nums2[idxB] - nums1[idxB];
    currentMaxDiffOne = Math.max(0, currentMaxDiffOne + diffValOne);
    overallMaxDiffOne = Math.max(overallMaxDiffOne, currentMaxDiffOne);

    const diffValTwo = nums1[idxB] - nums2[idxB];
    currentMaxDiffTwo = Math.max(0, currentMaxDiffTwo + diffValTwo);
    overallMaxDiffTwo = Math.max(overallMaxDiffTwo, currentMaxDiffTwo);
  }

  const scoreOptionOne = totalOne + overallMaxDiffOne;
  const scoreOptionTwo = totalTwo + overallMaxDiffTwo;

  return Math.max(scoreOptionOne, scoreOptionTwo);
};
