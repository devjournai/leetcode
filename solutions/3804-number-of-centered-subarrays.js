/**
 * Number of Centered Subarrays
 * Intuition: We enumerate all starting indices $i$ of subarrays, then starting from index $i$, we enumerate the ending index $j$ of the subarray, calculate the sum $s$ of elements in the subarray $nums[i \ldots j]$, and add all elements in the subarray to the hash table $\textit{st}$. After each enumeration, we check if $s$ appears in the hash table $\textit{st}$. If it does, it means the subarray $nums[i \ldots j]$ is a centered subarray, and we increment the answer by $1$. The time complexity is $O(n^2)$ and the space complexity is $O(n)$, where $n$ is the length of the array $nums$.
 * Approach: We enumerate all starting indices $i$ of subarrays, then starting from index $i$, we enumerate the ending index $j$ of the subarray, calculate the sum $s$ of elements in the subarray $nums[i \ldots j]$, and add all elements in the subarray to the hash table $\textit{st}$. After each enumeration, we check if $s$ appears in the hash table $\textit{st}$. If it does, it means the subarray $nums[i \ldots j]$ is a centered subarray, and we increment the answer by $1$. The time complexity is $O(n^2)$ and the space complexity is $O(n)$, where $n$ is the length of the array $nums$.
 * Dry Run: Input: nums = [-1,1,0] => Output: 5
 * Time Complexity: O(O(n^2))
 * Space Complexity: O(O(n))
 */
var centeredSubarrays = function (nums) {
  const n = nums.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    const st = new Set();
    let s = 0;
    for (let j = i; j < n; j++) {
      s += nums[j];
      st.add(nums[j]);
      if (st.has(s)) {
        ans++;
      }
    }
  }
  return ans;
};
