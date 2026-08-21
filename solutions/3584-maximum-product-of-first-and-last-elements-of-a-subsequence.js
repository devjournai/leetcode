/**
 * Maximum Product of First and Last Elements of a Subsequence
 * Intuition: A subsequence of length m has last index i and first index ≤ i-m+1. The product nums[first]*nums[i] is maximized by pairing nums[i] with the min or max among valid firsts.
 * Approach: 1. Walk i from m-1 to n-1. 2. Include nums[i-m+1] into running min/max of candidate firsts. 3. Update answer with nums[i]*min and nums[i]*max.
 * Dry Run: nums = [-1, -9, 2, 3], m = 2. At i=1 firsts include -1, products 9. Later 2*(-9)=-18, 3*(-9)=-27, 3*2=6. Max 9.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maximumProduct = function (nums, m) {
  let answer = Number.NEGATIVE_INFINITY;
  let mx = Number.NEGATIVE_INFINITY;
  let mi = Number.POSITIVE_INFINITY;

  for (let i = m - 1; i < nums.length; i++) {
    const first = nums[i - m + 1];
    mi = Math.min(mi, first);
    mx = Math.max(mx, first);
    answer = Math.max(answer, nums[i] * mi, nums[i] * mx);
  }

  return answer;
};
