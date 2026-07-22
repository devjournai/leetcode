/**
 * Longest Non-decreasing Subarray From Two Arrays
 *
 * Intuition:
 * At every index i, we have two choices:
 *
 *      • nums1[i]
 *      • nums2[i]
 *
 * The choice at index i only depends on the choice made at index i - 1.
 * Therefore, Dynamic Programming is sufficient.
 *
 * Let:
 *
 *      dp1 = longest non-decreasing subarray ending at i
 *            if nums1[i] is chosen.
 *
 *      dp2 = longest non-decreasing subarray ending at i
 *            if nums2[i] is chosen.
 *
 * We transition from both possible choices at the previous index.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Initialize:
 *
 *      dp1 = dp2 = 1
 *
 * 2. For every index i (1 → n-1):
 *
 *      newDp1 = 1
 *      newDp2 = 1
 *
 * 3. Try extending nums1[i]:
 *
 *      if nums1[i] >= nums1[i-1]
 *          newDp1 = max(newDp1, dp1 + 1)
 *
 *      if nums1[i] >= nums2[i-1]
 *          newDp1 = max(newDp1, dp2 + 1)
 *
 * 4. Try extending nums2[i]:
 *
 *      if nums2[i] >= nums1[i-1]
 *          newDp2 = max(newDp2, dp1 + 1)
 *
 *      if nums2[i] >= nums2[i-1]
 *          newDp2 = max(newDp2, dp2 + 1)
 *
 * 5. Update:
 *
 *      dp1 = newDp1
 *      dp2 = newDp2
 *
 * 6. Keep track of the maximum answer.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums1 = [1,3,2,1]
 * nums2 = [2,2,3,4]
 *
 * i = 1
 *
 * dp1 = 2
 * dp2 = 2
 *
 * i = 2
 *
 * dp1 = 3
 * dp2 = 3
 *
 * i = 3
 *
 * dp1 = 1
 * dp2 = 4
 *
 * Answer = 4
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxNonDecreasingLength = function (nums1, nums2) {
  const n = nums1.length;

  let dp1 = 1;
  let dp2 = 1;

  let answer = 1;

  for (let i = 1; i < n; i++) {
    let newDp1 = 1;
    let newDp2 = 1;

    if (nums1[i] >= nums1[i - 1]) {
      newDp1 = Math.max(newDp1, dp1 + 1);
    }

    if (nums1[i] >= nums2[i - 1]) {
      newDp1 = Math.max(newDp1, dp2 + 1);
    }

    if (nums2[i] >= nums1[i - 1]) {
      newDp2 = Math.max(newDp2, dp1 + 1);
    }

    if (nums2[i] >= nums2[i - 1]) {
      newDp2 = Math.max(newDp2, dp2 + 1);
    }

    dp1 = newDp1;
    dp2 = newDp2;

    answer = Math.max(answer, dp1, dp2);
  }

  return answer;
};
