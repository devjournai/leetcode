/**
 * Minimum Time to Make Array Sum At Most x
 * Intuition: After t seconds the raw sum is sum1 + t*sum2. We can reset at most t elements; resetting later helps larger nums2 more, so sort by nums2 and knapsack the reductions.
 * Approach: 1. Pair (nums2, nums1) and sort by nums2. 2. dp[j] = max reduction using j resets; update backwards with dp[j] = max(dp[j], dp[j-1] + a + j*b). 3. Return smallest t with sum1 + t*sum2 - dp[t] <= x, else -1.
 * Dry Run: nums1=[1,2,3], nums2=[1,2,3], x=4. dp[1]=6, dp[2]=13, dp[3]=20. t=3: 6+18-20=4. Answer 3.
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
