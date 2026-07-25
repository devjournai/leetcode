/**
 * Minimum Time to Make Array Sum At Most x
 *
 * Intuition:
 * Suppose we wait for t seconds.
 *
 * Without performing any reset operation, the total sum becomes:
 *
 *      sum(nums1) + t * sum(nums2)
 *
 * During each second, we may reset one element to 0.
 * Therefore, in t seconds, we can reset at most t different elements.
 *
 * If index i is reset at second j, its contribution removed from the final
 * sum is:
 *
 *      nums1[i] + j * nums2[i]
 *
 * So for a fixed t, we want to maximize the total amount removed using
 * exactly t reset operations.
 *
 * The important observation is that elements should be processed in
 * increasing order of nums2.
 *
 * After sorting pairs (nums1[i], nums2[i]) by nums2[i], we use DP.
 *
 * -----------------------------------------------------------------------
 *
 * DP Definition:
 *
 * dp[j] =
 *      maximum total reduction obtainable by choosing j elements
 *      from the elements processed so far.
 *
 * When processing:
 *
 *      a = nums1[i]
 *      b = nums2[i]
 *
 * If this element becomes the j-th reset element, its reduction is:
 *
 *      a + j * b
 *
 * Therefore:
 *
 *      dp[j] = max(
 *          dp[j],
 *          dp[j - 1] + a + j * b
 *      )
 *
 * We update j backwards so the same element is not used multiple times.
 *
 * -----------------------------------------------------------------------
 *
 * Why Sort by nums2?
 *
 * Suppose two selected elements have growth rates:
 *
 *      b1 <= b2
 *
 * Assigning the later reset time to b2 gives at least as much reduction as
 * assigning it to b1.
 *
 * Therefore, selected elements should be reset in non-decreasing order of
 * nums2.
 *
 * -----------------------------------------------------------------------
 *
 * Final Check:
 *
 * After t seconds, before considering resets:
 *
 *      total = sum1 + t * sum2
 *
 * dp[t] is the maximum reduction possible using t resets.
 *
 * Therefore, the minimum possible sum after t seconds is:
 *
 *      sum1 + t * sum2 - dp[t]
 *
 * We find the smallest t such that:
 *
 *      sum1 + t * sum2 - dp[t] <= x
 *
 * If no t from 0 to n works, return -1.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums1 = [1,2,3]
 * nums2 = [1,2,3]
 * x = 4
 *
 * sum1 = 6
 * sum2 = 6
 *
 * Pairs sorted by nums2:
 *
 *      [1,1], [2,2], [3,3]
 *
 * DP eventually gives:
 *
 *      dp[1] = 6
 *      dp[2] = 13
 *      dp[3] = 20
 *
 * Check:
 *
 * t = 0:
 *
 *      6 > 4
 *
 * t = 1:
 *
 *      6 + 6 - 6 = 6
 *
 * t = 2:
 *
 *      6 + 12 - 13 = 5
 *
 * t = 3:
 *
 *      6 + 18 - 20 = 4
 *
 * Therefore:
 *
 *      answer = 3
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N²)
 * Space Complexity: O(N)
 */

var minimumTime = function (nums1, nums2, x) {
  const n = nums1.length;

  let sum1 = 0;
  let sum2 = 0;

  const pairs = [];

  for (let i = 0; i < n; i++) {
    sum1 += nums1[i];
    sum2 += nums2[i];

    pairs.push([nums2[i], nums1[i]]);
  }

  pairs.sort((a, b) => a[0] - b[0]);

  const dp = new Array(n + 1).fill(0);

  for (let i = 0; i < n; i++) {
    const [b, a] = pairs[i];

    for (let j = i + 1; j >= 1; j--) {
      dp[j] = Math.max(dp[j], dp[j - 1] + a + j * b);
    }
  }

  for (let t = 0; t <= n; t++) {
    const currentSum = sum1 + t * sum2 - dp[t];

    if (currentSum <= x) {
      return t;
    }
  }

  return -1;
};
