/**
 * Rotate Non Negative Elements
 * Intuition: We first extract all non-negative elements from the array and store them in a new array $t$. Then, we create an array $d$ of the same size as $t$ to store the rotated non-negative elements. For each element $t[i]$ in $t$, we place it in $d$ at position $((i - k) \bmod m + m) \bmod m$, where $m$ is the number of non-negative elements. Next, we iterate through the original array $\textit{nums}$. For each position containing a non-negative element, we replace it with the element from the corresponding position in $d$. The time complexity is $O(n)$, where $n$ is the length of the array. The space complexity is $O(m)$, where $m$ is the number of non-negative elements.
 * Approach: We first extract all non-negative elements from the array and store them in a new array $t$. Then, we create an array $d$ of the same size as $t$ to store the rotated non-negative elements. For each element $t[i]$ in $t$, we place it in $d$ at position $((i - k) \bmod m + m) \bmod m$, where $m$ is the number of non-negative elements. Next, we iterate through the original array $\textit{nums}$. For each position containing a non-negative element, we replace it with the element from the corresponding position in $d$. The time complexity is $O(n)$, where $n$ is the length of the array. The space complexity is $O(m)$, where $m$ is the number of non-negative elements.
 * Dry Run: Input: nums = [1,-2,3,-4], k = 3 => Output: [3,-2,1,-4]
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(m))
 */
var rotateElements = function (nums, k) {
  const t = nums.filter((x) => x >= 0);
  const m = t.length;
  const d = new Array(m);
  for (let i = 0; i < m; i++) {
    d[(((i - k) % m) + m) % m] = t[i];
  }
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= 0) {
      nums[i] = d[j++];
    }
  }
  return nums;
};
