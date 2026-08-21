/**
 * Longest Strictly Increasing Subsequence With Non-Zero Bitwise AND
 * Intuition: A non-zero bitwise AND result means that all numbers in the subsequence have a $1$ at a certain bit position. We can enumerate that bit position, then find the longest strictly increasing subsequence among all numbers that have a $1$ at that bit position, and take the maximum value across all enumerations as the answer. The time complexity is $O(\log M \times n \times \log n)$, and the space complexity is $O(n)$. Here, $n$ and $M$ are the length of the array and the maximum value in the array, respectively.
 * Approach: A non-zero bitwise AND result means that all numbers in the subsequence have a $1$ at a certain bit position. We can enumerate that bit position, then find the longest strictly increasing subsequence among all numbers that have a $1$ at that bit position, and take the maximum value across all enumerations as the answer. The time complexity is $O(\log M \times n \times \log n)$, and the space complexity is $O(n)$. Here, $n$ and $M$ are the length of the array and the maximum value in the array, respectively.
 * Dry Run: Input: nums = [5,4,7] => Output: 2
 * Time Complexity: O(B N log N)
 * Space Complexity: O(N)
 */
var longestSubsequence = function (nums) {
  function lis(arr) {
    const g = [];
    for (const x of arr) {
      let lo = 0;
      let hi = g.length;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (g[mid] < x) lo = mid + 1;
        else hi = mid;
      }
      if (lo === g.length) g.push(x);
      else g[lo] = x;
    }
    return g.length;
  }
  let ans = 0;
  const mx = Math.max(...nums);
  const bits = mx === 0 ? 1 : mx.toString(2).length;
  for (let i = 0; i < bits; i++) {
    const arr = [];
    for (const x of nums) if ((x >> i) & 1) arr.push(x);
    ans = Math.max(ans, lis(arr));
  }
  return ans;
};
