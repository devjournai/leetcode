/**
 * Count Almost Equal Pairs II
 * Intuition: Same as almost-equal pairs I, but a number may use up to two digit swaps. Enumerating 0, 1, and 2 swaps on a zero-padded digit string covers every almost-equal partner.
 * Approach: 1. For each num, generate all values after 0, 1, or 2 swaps. 2. Add frequencies of those values among earlier numbers. 3. Then increment the count of the original num.
 * Dry Run:
 *   nums = [1023, 2310]
 *   2310 can become 1023 with two swaps, so the pair counts as 1.
 * Time Complexity: O(n * d^4) where d is the digit length of max(nums)
 * Space Complexity: O(n + d^4)
 */
var countPairs = function (nums) {
  let ans = 0;
  const count = new Map();
  const maxLen = String(Math.max(...nums)).length;

  const getSwaps = (digits) => {
    const n = digits.length;
    const swaps = new Set([Number(digits)]);
    const chars = digits.split("");

    const swapAt = (i, j) => {
      [chars[i], chars[j]] = [chars[j], chars[i]];
    };

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        swapAt(i, j);
        swaps.add(Number(chars.join("")));
        swapAt(i, j);
      }
    }

    for (let i1 = 0; i1 < n; i1++) {
      for (let j1 = i1 + 1; j1 < n; j1++) {
        for (let i2 = 0; i2 < n; i2++) {
          for (let j2 = i2 + 1; j2 < n; j2++) {
            swapAt(i1, j1);
            swapAt(i2, j2);
            swaps.add(Number(chars.join("")));
            swapAt(i2, j2);
            swapAt(i1, j1);
          }
        }
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
