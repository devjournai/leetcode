/**
 * House Robber V
 * Intuition: We define two variables $f$ and $g$, where $f$ represents the maximum amount when the current house is not robbed, and $g$ represents the maximum amount when the current house is robbed. Initially, $f = 0$ and $g = nums[0]$. The answer is $\max(f, g)$. Next, we traverse starting from the second house: - If the current house has the same color as the previous house, then $f$ is updated to $\max(f, g)$, and $g$ is updated to $f + nums[i]$. - If the current house has a different color from the previous house, then $f$ is updated to $\max(f, g)$, and $g$ is updated to $\max(f, g) + nums[i]$. Finally, return $\max(f, g)$. The time complexity is $O(n)$, where $n$ is the number of houses. The space complexity is $O(1)$.
 * Approach: We define two variables $f$ and $g$, where $f$ represents the maximum amount when the current house is not robbed, and $g$ represents the maximum amount when the current house is robbed. Initially, $f = 0$ and $g = nums[0]$. The answer is $\max(f, g)$. Next, we traverse starting from the second house: - If the current house has the same color as the previous house, then $f$ is updated to $\max(f, g)$, and $g$ is updated to $f + nums[i]$. - If the current house has a different color from the previous house, then $f$ is updated to $\max(f, g)$, and $g$ is updated to $\max(f, g) + nums[i]$. Finally, return $\max(f, g)$. The time complexity is $O(n)$, where $n$ is the number of houses. The space complexity is $O(1)$.
 * Dry Run: Input: nums = [1,4,3,5], colors = [1,1,2,2] => Output: 9
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(1))
 */
var rob = function (nums, colors) {
  const n = nums.length;
  let f = 0;
  let g = nums[0];

  for (let i = 1; i < n; i++) {
    if (colors[i - 1] === colors[i]) {
      [f, g] = [Math.max(f, g), f + nums[i]];
    } else {
      [f, g] = [Math.max(f, g), Math.max(f, g) + nums[i]];
    }
  }

  return Math.max(f, g);
};
