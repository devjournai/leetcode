/**
 * Count Indices With Opposite Parity
 * Intuition: We first count the number of even and odd elements in the array nums, denoted as cnt[0] and cnt[1] respectively.
 * Approach: We first count the number of even and odd elements in the array nums, denoted as cnt[0] and cnt[1] respectively. Then, we traverse the array nums from left to right. For index i, we first decrement cnt[nums[i] bmod 2] by 1, then assign cnt[nums[i] bmod 2 oplus 1] to ans[i]. After the traversal, return the answer array ans.
 * Dry Run: Input: nums = [1,2,3,4]. Output: [2,1,1,0].
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var countOppositeParity = function (nums) {
  const cnt = Array < number > (2).fill(0);
  for (const x of nums) {
    ++cnt[x & 1];
  }
  const n = nums.length;
  const ans = Array < number > n.fill(0);
  for (let i = 0; i < n; ++i) {
    --cnt[nums[i] & 1];
    ans[i] = cnt[(nums[i] & 1) ^ 1];
  }
  return ans;
};
