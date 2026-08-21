/**
 * Delayed Count of Equal Elements
 * Intuition: We can use a hash table $\textit{cnt}$ to record the number of occurrences of each number within the index range $(i + k, n - 1]$. We enumerate index $i$ in reverse order starting from index $n - k - 2$. During the enumeration, we first add the number at index $i + k + 1$ to the hash table $\textit{cnt}$, then assign the value of $\textit{cnt}[nums[i]]$ to the answer array $\textit{ans}[i]$. The time complexity is $O(n)$ and the space complexity is $O(n)$, where $n$ is the length of the array $\textit{nums}$.
 * Approach: We can use a hash table $\textit{cnt}$ to record the number of occurrences of each number within the index range $(i + k, n - 1]$. We enumerate index $i$ in reverse order starting from index $n - k - 2$. During the enumeration, we first add the number at index $i + k + 1$ to the hash table $\textit{cnt}$, then assign the value of $\textit{cnt}[nums[i]]$ to the answer array $\textit{ans}[i]$. The time complexity is $O(n)$ and the space complexity is $O(n)$, where $n$ is the length of the array $\textit{nums}$.
 * Dry Run: Input: nums = [1,2,1,1], k = 1 => Output: [2,0,0,0]
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var delayedCount = function (nums, k) {
  const n = nums.length;
  const cnt = new Map();
  const ans = Array(n).fill(0);
  for (let i = n - k - 2; i >= 0; i--) {
    cnt.set(nums[i + k + 1], (cnt.get(nums[i + k + 1]) ?? 0) + 1);
    ans[i] = cnt.get(nums[i]) ?? 0;
  }
  return ans;
};
