/**
 * Maximum Bitwise AND After Increment Operations
 * Intuition: We enumerate each bit from the highest bit, attempting to include that bit in the final bitwise AND result. For the currently attempted bitwise AND result $\textit{target}$, we calculate the minimum number of operations required to increase each element in the array to at least $\textit{target}$. Specifically, we find the position $j - 1$ where $\textit{target}$ has the first bit set to $1$ from high to low, while the current element has the corresponding bit set to $0$. Then we only need to increase the current element to the value of $\textit{target}$ in the lower $j$ bits. The required number of operations is $(\textit{target} \& 2^{j} - 1) - (\textit{nums}[i] \& 2^{j} - 1)$. We store the required number of operations for all elements in the array $\textit{cost}$, sort it, and take the sum of the first $m$ elements. If it does not exceed $k$, it means we can include this bit in the fi...
 * Approach: We enumerate each bit from the highest bit, attempting to include that bit in the final bitwise AND result. For the currently attempted bitwise AND result $\textit{target}$, we calculate the minimum number of operations required to increase each element in the array to at least $\textit{target}$. Specifically, we find the position $j - 1$ where $\textit{target}$ has the first bit set to $1$ from high to low, while the current element has the corresponding bit set to $0$. Then we only need to increase the current element to the value of $\textit{target}$ in the lower $j$ bits. The required number of operations is $(\textit{target} \& 2^{j} - 1) - (\textit{nums}[i] \& 2^{j} - 1)$. We store the required number of operations for all elements in the array $\textit{cost}$, sort it, and take the sum of the first $m$ elements. If it does not exceed $k$, it means we can include this bit in the fi...
 * Dry Run: Input: nums = [3,1,2], k = 8, m = 2 => Output: 6
 * Time Complexity: O(O(n * log n * log M))
 * Space Complexity: O(O(n))
 */
var maximumAND = function (nums, k, m) {
  const mx = 32 - Math.clz32(Math.max(...nums) + k);

  let ans = 0;
  const n = nums.length;
  const cost = new Array(n);

  for (let bit = mx - 1; bit >= 0; bit--) {
    let target = ans | (1 << bit);
    for (let i = 0; i < n; i++) {
      const x = nums[i];
      const diff = target & ~x;
      const j = diff === 0 ? 0 : 32 - Math.clz32(diff);
      const mask = (1 << j) - 1;
      cost[i] = (target & mask) - (x & mask);
    }
    cost.sort((a, b) => a - b);
    let sum = 0;
    for (let i = 0; i < m; i++) {
      sum += cost[i];
    }
    if (sum <= k) {
      ans = target;
    }
  }

  return ans;
};
