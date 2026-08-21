/**
 * Maximum Difference Between Even and Odd Frequency I
 * Intuition: We want max odd frequency minus min even frequency among letters that appear.
 * Approach: 1. Count letters. 2. Track the largest odd count and the smallest even count. 3. Return maxOdd - minEven.
 * Dry Run: s = "aaaaabbc". a:5 odd, b:2 even, c:1 odd. maxOdd=5, minEven=2, difference=3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var maxDifference = function (s) {
  const count = new Array(26).fill(0);
  for (const character of s) {
    count[character.charCodeAt(0) - 97]++;
  }

  let maxOdd = 0;
  let minEven = s.length;
  for (const freq of count) {
    if (freq === 0) {
      continue;
    }
    if (freq % 2 === 0) {
      minEven = Math.min(minEven, freq);
    } else {
      maxOdd = Math.max(maxOdd, freq);
    }
  }
  return maxOdd - minEven;
};
