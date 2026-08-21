/**
 * Count Subarrays With Cost Less Than or Equal to K
 * Intuition: We notice that if a subarray $\text{nums}[l..r]$ has a cost less than or equal to $k$, then for any $l' \geq l$ and $r' \leq r$, the subarray $\text{nums}[l'..r']$ also has a cost less than or equal to $k$. Therefore, we can enumerate the right endpoint $r$, use two pointers to maintain the minimum left endpoint $l$ that satisfies the condition, then the number of subarrays ending at $r$ that satisfy the condition is $r - l + 1$, which we accumulate to the answer. We can use two deques to maintain the maximum and minimum values in the current window respectively. The time complexity is $O(n)$ and the space complexity is $O(n)$, where $n$ is the length of the array $\text{nums}$.
 * Approach: We notice that if a subarray $\text{nums}[l..r]$ has a cost less than or equal to $k$, then for any $l' \geq l$ and $r' \leq r$, the subarray $\text{nums}[l'..r']$ also has a cost less than or equal to $k$. Therefore, we can enumerate the right endpoint $r$, use two pointers to maintain the minimum left endpoint $l$ that satisfies the condition, then the number of subarrays ending at $r$ that satisfy the condition is $r - l + 1$, which we accumulate to the answer. We can use two deques to maintain the maximum and minimum values in the current window respectively. The time complexity is $O(n)$ and the space complexity is $O(n)$, where $n$ is the length of the array $\text{nums}$.
 * Dry Run: Input: nums = [1,3,2], k = 4 => Output: 5
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var countSubarrays = function (nums, k) {
  let ans = 0;
  const q1 = [];
  const q2 = [];
  let h1 = 0,
    t1 = 0;
  let h2 = 0,
    t2 = 0;
  let l = 0;
  for (let r = 0; r < nums.length; r++) {
    const x = nums[r];
    while (h1 < t1 && nums[q1[t1 - 1]] <= x) {
      t1--;
    }
    while (h2 < t2 && nums[q2[t2 - 1]] >= x) {
      t2--;
    }
    q1[t1++] = r;
    q2[t2++] = r;
    while (l < r && (nums[q1[h1]] - nums[q2[h2]]) * (r - l + 1) > k) {
      l++;
      if (q1[h1] < l) {
        h1++;
      }
      if (q2[h2] < l) {
        h2++;
      }
    }
    ans += r - l + 1;
  }
  return ans;
};
