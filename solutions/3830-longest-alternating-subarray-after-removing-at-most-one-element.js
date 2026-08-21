/**
 * Longest Alternating Subarray After Removing At Most One Element
 * Intuition: We use two arrays $l_1$ and $l_2$ to represent the length of the longest alternating subarray ending at position $i$ with the last comparison being "", respectively. Similarly, we use $r_1$ and $r_2$ to represent the length of the longest alternating subarray starting at position $i$ with the first comparison being "", respectively. We can compute $l_1$ and $l_2$ through a single left-to-right traversal, and then compute $r_1$ and $r_2$ through a single right-to-left traversal. Next, we initialize the answer as $\max(\max(l_1), \max(l_2))$, which represents the length of the longest alternating subarray without removing any elements. Then, we enumerate the position $i$ of the element to be removed. If after removing position $i$, positions $i-1$ and $i+1$ can still form an alternating relationship, we can add $l_1[i-1]$ and $r_1[i+1]$ (or $l_2[i-1]$ and $r_2[i+1]$) together to update the...
 * Approach: We use two arrays $l_1$ and $l_2$ to represent the length of the longest alternating subarray ending at position $i$ with the last comparison being "", respectively. Similarly, we use $r_1$ and $r_2$ to represent the length of the longest alternating subarray starting at position $i$ with the first comparison being "", respectively. We can compute $l_1$ and $l_2$ through a single left-to-right traversal, and then compute $r_1$ and $r_2$ through a single right-to-left traversal. Next, we initialize the answer as $\max(\max(l_1), \max(l_2))$, which represents the length of the longest alternating subarray without removing any elements. Then, we enumerate the position $i$ of the element to be removed. If after removing position $i$, positions $i-1$ and $i+1$ can still form an alternating relationship, we can add $l_1[i-1]$ and $r_1[i+1]$ (or $l_2[i-1]$ and $r_2[i+1]$) together to update the...
 * Dry Run: Input: nums = [2,1,3,2] => Output: 4
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var longestAlternating = function (nums) {
  const n = nums.length;
  const l1 = new Array(n).fill(1);
  const l2 = new Array(n).fill(1);
  const r1 = new Array(n).fill(1);
  const r2 = new Array(n).fill(1);

  let ans = 0;

  for (let i = 1; i < n; i++) {
    if (nums[i - 1] < nums[i]) {
      l1[i] = l2[i - 1] + 1;
    } else if (nums[i - 1] > nums[i]) {
      l2[i] = l1[i - 1] + 1;
    }
    ans = Math.max(ans, l1[i]);
    ans = Math.max(ans, l2[i]);
  }

  for (let i = n - 2; i >= 0; i--) {
    if (nums[i + 1] > nums[i]) {
      r1[i] = r2[i + 1] + 1;
    } else if (nums[i + 1] < nums[i]) {
      r2[i] = r1[i + 1] + 1;
    }
  }

  for (let i = 1; i < n - 1; i++) {
    if (nums[i - 1] < nums[i + 1]) {
      ans = Math.max(ans, l2[i - 1] + r2[i + 1]);
    } else if (nums[i - 1] > nums[i + 1]) {
      ans = Math.max(ans, l1[i - 1] + r1[i + 1]);
    }
  }

  return ans;
};
