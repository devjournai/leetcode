/**
 * Find the Smallest Balanced Index
 * Intuition: We first compute the total sum $s$ of all elements in the array. Then we enumerate each index $i$ from right to left, maintaining a variable $p$ to record the product of all elements to the right of index $i$. When we reach index $i$, we first subtract $nums[i]$ from $s$, then check whether $s$ equals $p$; if so, we return index $i$. Next, we multiply $p$ by $nums[i]$. If $p$ is greater than or equal to $s$, the product will only keep growing and no balanced index can be found afterwards, so we can terminate the enumeration early. If no balanced index is found after the enumeration, we return -1. The time complexity is $O(n)$, where $n$ is the length of the array $nums$. The space complexity is $O(1)$.
 * Approach: We first compute the total sum $s$ of all elements in the array. Then we enumerate each index $i$ from right to left, maintaining a variable $p$ to record the product of all elements to the right of index $i$. When we reach index $i$, we first subtract $nums[i]$ from $s$, then check whether $s$ equals $p$; if so, we return index $i$. Next, we multiply $p$ by $nums[i]$. If $p$ is greater than or equal to $s$, the product will only keep growing and no balanced index can be found afterwards, so we can terminate the enumeration early. If no balanced index is found after the enumeration, we return -1. The time complexity is $O(n)$, where $n$ is the length of the array $nums$. The space complexity is $O(1)$.
 * Dry Run: Input: nums = [2,1,2] => Output: 1
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(1))
 */
var smallestBalancedIndex = function (nums) {
  let s = 0;
  for (const x of nums) {
    s += x;
  }
  for (let i = nums.length - 1, p = 1; i >= 0; --i) {
    s -= nums[i];
    if (s === p) {
      return i;
    }
    p *= nums[i];
    if (p >= s) {
      break;
    }
  }
  return -1;
};
