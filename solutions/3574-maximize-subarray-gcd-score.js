/**
 * Maximize Subarray GCD Score
 * Intuition: Score of a subarray is gcd * length, and we may double up to k elements (those with the fewest factors of 2) which doubles the gcd when every minimum-2-adic element is doubled.
 * Approach: 1. Count trailing twos of each nums[i]. 2. For every L..R compute gcd, the min 2-count, and how many elements have that min. 3. If that count > k we cannot double gcd; else score = gcd*2*len. Track the max.
 * Dry Run: nums = [2, 4], k = 1. Subarray [2,4] gcd 2, min twos is 1 (at 2) with t=1 ≤ k → score 4*2=8.
 * Time Complexity: O(N^2 log A)
 * Space Complexity: O(N)
 */
var maxGCDScore = function (nums, k) {
  const n = nums.length;
  const twoCount = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    let x = nums[i];
    while (x % 2 === 0) {
      twoCount[i]++;
      x /= 2;
    }
  }

  const gcd = (a, b) => {
    while (b !== 0) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  };

  let answer = 0;
  for (let left = 0; left < n; left++) {
    let g = 0;
    let minTwos = Number.MAX_SAFE_INTEGER;
    let minTwosFreq = 0;
    for (let right = left; right < n; right++) {
      g = gcd(g, nums[right]);
      if (twoCount[right] < minTwos) {
        minTwos = twoCount[right];
        minTwosFreq = 1;
      } else if (twoCount[right] === minTwos) {
        minTwosFreq++;
      }
      const len = right - left + 1;
      const score = (minTwosFreq > k ? g : g * 2) * len;
      answer = Math.max(answer, score);
    }
  }

  return answer;
};
