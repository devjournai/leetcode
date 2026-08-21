/**
 * Longest Arithmetic Sequence After Changing At Most One Element
 * Intuition: We first compute the differences between adjacent elements of the array, stored as array $d$, where $d[i] = nums[i] - nums[i - 1]$. Next, we define two arrays $f$ and $g$, where $f[i]$ represents the length of the longest arithmetic subarray ending at the $i$-th element, and $g[i]$ represents the length of the longest arithmetic subarray starting at the $i$-th element. Initially, $f[0] = 1$, $g[n - 1] = 1$, and all other elements are initialized to $2$. We can compute the values of $f$ and $g$ in a single pass: - For $f$: if $d[i] == d[i - 1]$, then $f[i] = f[i - 1] + 1$. - For $g$: if $d[i + 1] == d[i + 2]$, then $g[i] = g[i + 1] + 1$. Then we initialize the answer to $3$, since we can always form an arithmetic subarray of length $3$ by replacing one element. We then enumerate each element and try to replace it with a suitable value to form a longer arithmetic subarray: - For each eleme...
 * Approach: We first compute the differences between adjacent elements of the array, stored as array $d$, where $d[i] = nums[i] - nums[i - 1]$. Next, we define two arrays $f$ and $g$, where $f[i]$ represents the length of the longest arithmetic subarray ending at the $i$-th element, and $g[i]$ represents the length of the longest arithmetic subarray starting at the $i$-th element. Initially, $f[0] = 1$, $g[n - 1] = 1$, and all other elements are initialized to $2$. We can compute the values of $f$ and $g$ in a single pass: - For $f$: if $d[i] == d[i - 1]$, then $f[i] = f[i - 1] + 1$. - For $g$: if $d[i + 1] == d[i + 2]$, then $g[i] = g[i + 1] + 1$. Then we initialize the answer to $3$, since we can always form an arithmetic subarray of length $3$ by replacing one element. We then enumerate each element and try to replace it with a suitable value to form a longer arithmetic subarray: - For each eleme...
 * Dry Run: Input: nums = [9,7,5,10,1] => Output: 5
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var longestArithmetic = function (nums) {
  const n = nums.length;
  const d = new Array(n).fill(0);

  for (let i = 1; i < n; i++) {
    d[i] = nums[i] - nums[i - 1];
  }

  const f = new Array(n).fill(2);
  const g = new Array(n).fill(2);
  f[0] = 1;
  g[n - 1] = 1;

  for (let i = 2; i < n; i++) {
    if (d[i] === d[i - 1]) {
      f[i] = f[i - 1] + 1;
    }
  }

  for (let i = n - 3; i >= 0; i--) {
    if (d[i + 1] === d[i + 2]) {
      g[i] = g[i + 1] + 1;
    }
  }

  let ans = 3;
  for (let i = 0; i < n; i++) {
    ans = Math.max(ans, f[i], g[i]);
    if (i > 0) {
      ans = Math.max(ans, f[i - 1] + 1);
    }
    if (i + 1 < n) {
      ans = Math.max(ans, g[i + 1] + 1);
    }
    if (i > 0 && i < n - 1) {
      let diff = nums[i + 1] - nums[i - 1];
      if (diff % 2 === 0) {
        diff = Math.floor(diff / 2);
        let k = 3;
        if (i > 1 && diff === d[i - 1]) {
          k += f[i - 1] - 1;
        }
        if (i < n - 2 && diff === d[i + 2]) {
          k += g[i + 1] - 1;
        }
        ans = Math.max(ans, k);
      }
    }
  }

  return ans;
};
