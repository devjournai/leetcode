/**
 * Minimum Operations to Reach Target Array
 * Intuition: According to the problem description, we only need to count the number of distinct $\text{nums}[i]$ where $\text{nums}[i] \ne \text{target}[i]$. Therefore, we can use a hash table to store these distinct $\text{nums}[i]$ and finally return the size of the hash table. The time complexity is $O(n)$, and the space complexity is $O(n)$, where $n$ is the length of the array.
 * Approach: According to the problem description, we only need to count the number of distinct $\text{nums}[i]$ where $\text{nums}[i] \ne \text{target}[i]$. Therefore, we can use a hash table to store these distinct $\text{nums}[i]$ and finally return the size of the hash table. The time complexity is $O(n)$, and the space complexity is $O(n)$, where $n$ is the length of the array.
 * Dry Run: Input: nums = [1,2,3], target = [2,1,3] => Output: 2
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var minOperations = function (nums, target) {
  const s = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== target[i]) {
      s.add(nums[i]);
    }
  }
  return s.size;
};
