/**
 * Final Element After Subarray Deletions
 * Intuition: Since Alice goes first, Alice can choose to remove all elements except the first and last elements, so the answer is at least $\max(nums[0], nums[n - 1])$. For the cases of elements at indices $1, 2, ..., n-2$ (the middle elements), even if Alice wants to keep any of these middle elements, Bob can choose to remove it, so the answer is at most $\max(nums[0], nums[n - 1])$. Therefore, the answer is exactly $\max(nums[0], nums[n - 1])$. The time complexity is $O(1)$ and the space complexity is $O(1)$.
 * Approach: Since Alice goes first, Alice can choose to remove all elements except the first and last elements, so the answer is at least $\max(nums[0], nums[n - 1])$. For the cases of elements at indices $1, 2, ..., n-2$ (the middle elements), even if Alice wants to keep any of these middle elements, Bob can choose to remove it, so the answer is at most $\max(nums[0], nums[n - 1])$. Therefore, the answer is exactly $\max(nums[0], nums[n - 1])$. The time complexity is $O(1)$ and the space complexity is $O(1)$.
 * Dry Run: Input: nums = [1,5,2] => Output: 2
 * Time Complexity: O(O(1))
 * Space Complexity: O(O(1))
 */
var finalElement = function (nums) {
  return Math.max(nums.at(0), nums.at(-1));
};
