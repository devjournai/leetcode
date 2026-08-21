/**
 * Minimum K to Reduce Array Within Limit
 * Intuition: We notice that as $k$ increases, it becomes easier to satisfy the condition. This exhibits monotonicity, so we can use binary search to find the minimum $k$. We define the left boundary of the binary search as $l = 1$ and the right boundary as $r = 10^5$. In each binary search iteration, we calculate the middle value $mid = \lfloor (l + r) / 2 \rfloor$ and determine whether the condition $\text{nonPositive}(\text{nums}, k) \leq k^2$ is satisfied when $k = mid$. If the condition is satisfied, we update the right boundary to $r = mid$; otherwise, we update the left boundary to $l = mid + 1$. When the binary search ends, the left boundary $l$ is the minimum $k$ we are looking for. The time complexity is $O(n \log M)$, where $n$ and $M$ are the length of the array $\textit{nums}$ and the maximum range respectively. The space complexity is $O(1)$.
 * Approach: We notice that as $k$ increases, it becomes easier to satisfy the condition. This exhibits monotonicity, so we can use binary search to find the minimum $k$. We define the left boundary of the binary search as $l = 1$ and the right boundary as $r = 10^5$. In each binary search iteration, we calculate the middle value $mid = \lfloor (l + r) / 2 \rfloor$ and determine whether the condition $\text{nonPositive}(\text{nums}, k) \leq k^2$ is satisfied when $k = mid$. If the condition is satisfied, we update the right boundary to $r = mid$; otherwise, we update the left boundary to $l = mid + 1$. When the binary search ends, the left boundary $l$ is the minimum $k$ we are looking for. The time complexity is $O(n \log M)$, where $n$ and $M$ are the length of the array $\textit{nums}$ and the maximum range respectively. The space complexity is $O(1)$.
 * Dry Run: Input: nums = [3,7,5] => Output: 3
 * Time Complexity: O(O(n log M))
 * Space Complexity: O(O(1))
 */
var minimumK = function (nums) {
  const check = (k) => {
    let t = 0;
    for (const x of nums) {
      t += Math.floor((x + k - 1) / k);
    }
    return t <= k * k;
  };

  let l = 1,
    r = 100000;
  while (l < r) {
    const mid = (l + r) >> 1;
    if (check(mid)) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
};
