/**
 * Minimum Prefix Removal to Make Array Strictly Increasing
 * Intuition: We can traverse the array backwards from the end to find the first position $i$ that does not satisfy the strictly increasing condition, i.e., $nums[i-1] \geq nums[i]$. At this point, the minimum length of the prefix to remove is $i$. If the entire array is strictly increasing, we do not need to remove any prefix, so we return $0$. The time complexity is $O(n)$, where $n$ is the length of the array. The space complexity is $O(1)$.
 * Approach: We can traverse the array backwards from the end to find the first position $i$ that does not satisfy the strictly increasing condition, i.e., $nums[i-1] \geq nums[i]$. At this point, the minimum length of the prefix to remove is $i$. If the entire array is strictly increasing, we do not need to remove any prefix, so we return $0$. The time complexity is $O(n)$, where $n$ is the length of the array. The space complexity is $O(1)$.
 * Dry Run: Input: nums = [1,-1,2,3,3,4,5] => Output: 4
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(1))
 */
var minimumPrefixLength = function (nums) {
  for (let i = nums.length - 1; i; --i) {
    if (nums[i - 1] >= nums[i]) {
      return i;
    }
  }
  return 0;
};
