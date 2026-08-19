/**
 * Count Almost Equal Pairs I
 * Intuition: Two numbers are almost equal if one swap of digits (or no swap) turns one into the other. Padding to the same width lets leading zeros participate so 3 and 30 can match after a swap.
 * Approach: 1. For each num, generate every value reachable by 0 or 1 digit swap (on a zero-padded string). 2. Add how many earlier numbers equal any of those swap-forms. 3. Then record the original num in a frequency map.
 * Dry Run:
 *   nums = [3, 12, 30, 17, 21]
 *   3 then 12 contribute 0. 30 swaps to 03 = 3, so it pairs with the earlier 3. 21 swaps to 12, pairing with 12. Answer 2.
 * Time Complexity: O(n * d^2) where d is the digit length of max(nums)
 * Space Complexity: O(n + d^2)
 */
var countPairs = function (nums) {
  let ans = 0;
  const count = new Map();
  const maxLen = String(Math.max(...nums)).length;

  const getSwaps = (digits) => {
    const n = digits.length;
    const swaps = new Set([Number(digits)]);
    const chars = digits.split("");

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        [chars[i], chars[j]] = [chars[j], chars[i]];
        swaps.add(Number(chars.join("")));
        [chars[i], chars[j]] = [chars[j], chars[i]];
      }
    }

    return swaps;
  };

  for (const num of nums) {
    const digits = String(num).padStart(maxLen, "0");
    for (const swap of getSwaps(digits)) {
      ans += count.get(swap) || 0;
    }
    count.set(num, (count.get(num) || 0) + 1);
  }

  return ans;
};
