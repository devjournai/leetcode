/**
 * Beautiful Arrangement
 * Intuition: Place numbers 1..n at positions 1..n such that `num % pos === 0` or `pos % num === 0`. Backtracking with a bitmask skips used numbers.
 * Approach: 1. `depthFirstSearch(currentIdx, alreadyUsedMask)` increments the answer when `currentIdx > n`. 2. Try each unused `potentialValue` that satisfies the divisibility rule; recurse with the bit set. 3. Start at index 1 with mask 0.
 * Dry Run: n = 2.
 *   - Pos 1: 1 then pos 2 can take 2. Pos 1: 2 then pos 2 can take 1. Count 2.
 * Time Complexity: O(N!)
 * Space Complexity: O(N)
 */
var countArrangement = function (inputN) {
  let countOfBeautifulArrangements = 0;

  function depthFirstSearch(currentIdx, alreadyUsedMask) {
    if (currentIdx > inputN) {
      countOfBeautifulArrangements++;
      return;
    }

    for (let potentialValue = 1; potentialValue <= inputN; potentialValue++) {
      const isValueAvailable = !(alreadyUsedMask & (1 << potentialValue));
      const satisfiesCondition =
        potentialValue % currentIdx === 0 || currentIdx % potentialValue === 0;

      if (isValueAvailable && satisfiesCondition) {
        depthFirstSearch(
          currentIdx + 1,
          alreadyUsedMask | (1 << potentialValue)
        );
      }
    }
  }

  depthFirstSearch(1, 0);
  return countOfBeautifulArrangements;
};
