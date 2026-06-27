/**
 * Find the Maximum Number of Elements in Subset
 * Intuition: The problem describes a palindromic pattern [x, x2, x4, ..., xk/2, xk, xk/2, ..., x4, x2, x] where k is a non-negative power of 2.
 * The elements in this pattern have specific count requirements from the `nums` subset:
 * - If the pattern length is 1 (e.g., `[x]`), it requires one `x`.
 * - If the pattern length is greater than 1 (e.g., `[x, x^2, x]` or `[x, x^2, x^4, x^2, x]`),
 *   the base element `x` and all intermediate elements (`x^2, x^4, ..., x^(k/2)`) must appear at least twice.
 *   The peak element `x^k` must appear at least once.
 * - A special case is when the base element `x=1`. In this case, all elements in the pattern are `1`. The maximum length is simply the total count of `1`s available in `nums`, as `[1,1,...,1]` satisfies the pattern.
 *
 * Approach:
 * 1. Count frequencies: Use a `Map` to store the frequency of each number in `nums`.
 * 2. Initialize `maxLen`: Start with `maxLen = 1`. This covers the base case where any single element `[x]` forms a valid pattern.
 *    If `1` is present in `nums`, update `maxLen = Math.max(maxLen, counts.get(1))`. This ensures the maximum length for patterns based on `x=1` is considered.
 * 3. Iterate through unique numbers: For each unique number `s` in `counts.keys()` (excluding `1`):
 *    a. Initialize `currentVal = s`. This `currentVal` represents the current base of the chain `x, x^2, x^4, ...`
 *    b. Initialize `currentChainLen = 1`. This represents the length of the pattern if `currentVal` is the peak element (e.g., `[currentVal]`).
 *    c. Loop to extend the pattern: In a `while` loop, try to extend the pattern:
 *       i. Calculate `nextVal = currentVal * currentVal`. This `nextVal` is the candidate for the next element in the sequence (e.g., if `currentVal` is `x`, `nextVal` is `x^2`).
 *       ii. Check for termination: If `nextVal` exceeds `10^9` (the maximum allowed value for numbers in `nums`), or if `nextVal` is not present in `counts`, break the loop. This implies `currentVal` is the effective peak of the longest possible chain starting with `s`.
 *       iii. Check counts for extension: To extend the pattern, `currentVal` must transition from being a peak (implicitly assumed to use 1 copy so far) to an intermediate element (requiring 2 copies). `nextVal` would become the new peak candidate, requiring 1 copy.
 *           If `counts.get(currentVal) < 2` or `counts.get(nextVal) < 1`, we cannot extend the pattern further with `currentVal` as an intermediate element and `nextVal` as the peak. Break the loop; `currentVal` remains the peak.
 *       iv. If counts are sufficient, extend the pattern: `currentChainLen += 2`. This operation accounts for `nextVal` becoming the new peak element (1 copy) and an additional `currentVal` (making it 2 copies in total) for the descending part of the palindrome. Update `currentVal = nextVal` to continue building the chain.
 *    d. After the loop, `maxLen` is updated with `currentChainLen`.
 * 4. Return `maxLen`.
 *
 * Dry Run Example 1: nums = [5,4,1,2,2]
 * 1. counts = {1:1, 2:2, 4:1, 5:1}
 * 2. maxLen = 1. `counts.has(1)` is true, so `maxLen = Math.max(1, counts.get(1)) = 1`.
 * 3. Iterate s > 1:
 *    a. s = 2:
 *       `currentVal = 2`. `currentChainLen = 1`.
 *       Loop 1:
 *         `nextVal = 2 * 2 = 4`. `4 <= 10^9` and `counts.has(4)` (true).
 *         `counts.get(currentVal=2)` is 2. `counts.get(nextVal=4)` is 1. Both are sufficient (`2 >= 2` and `1 >= 1`).
 *         `currentChainLen += 2` -> `3`.
 *         `currentVal = 4`.
 *       Loop 2:
 *         `nextVal = 4 * 4 = 16`. `16 <= 10^9` but `counts.has(16)` is false. Break.
 *       `maxLen = Math.max(1, 3) = 3`. (Pattern: [2, 4, 2])
 *    b. s = 4:
 *       `currentVal = 4`. `currentChainLen = 1`.
 *       Loop 1:
 *         `nextVal = 4 * 4 = 16`. `16 <= 10^9` but `counts.has(16)` is false. Break.
 *       `maxLen = Math.max(3, 1) = 3`.
 *    c. s = 5:
 *       `currentVal = 5`. `currentChainLen = 1`.
 *       Loop 1:
 *         `nextVal = 5 * 5 = 25`. `25 <= 10^9` but `counts.has(25)` is false. Break.
 *       `maxLen = Math.max(3, 1) = 3`.
 * 4. Return `maxLen = 3`.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(U)
 */
var maximumLength = function (nums) {
  const counts = new Map();
  for (const num of nums) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  let maxLen = 1;

  if (counts.has(1)) {
    let countOnes = counts.get(1);
    if (countOnes % 2 === 0) {
      countOnes -= 1;
    }
    maxLen = Math.max(maxLen, countOnes);
  }

  for (const s of counts.keys()) {
    if (s === 1) {
      continue;
    }

    let currentVal = s;
    let currentChainLen = 1;

    while (true) {
      const nextVal = currentVal * currentVal;

      if (nextVal > 1000000000 || !counts.has(nextVal)) {
        break;
      }

      if (counts.get(currentVal) < 2) {
        break;
      }

      currentChainLen += 2;
      currentVal = nextVal;
    }

    maxLen = Math.max(maxLen, currentChainLen);
  }

  return maxLen;
};
