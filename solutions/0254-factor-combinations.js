/**
 * Factor Combinations
 * Intuition: Combinations are nondecreasing factorizations of n (excluding n itself). Backtrack: try factors `f` from a minimum up to √current, append `f` and `current/f`, then recurse on the quotient starting from `f`.
 * Approach: 1. If n < 2, return []. 2. For `loopFactor` from `minimumPossibleFactor` while `loopFactor² ≤ currentValue`, if it divides, let `q = current/loopFactor`. 3. If `q >= loopFactor`, record `[...seq, f, q]` and recurse on `q` with min factor `f` and seq plus `f`. 4. Return all recorded lists.
 * Dry Run: n = 12.
 *   - f=2, q=6 → [2,6]; recurse 6 from 2: f=2, q=3 → [2,2,3]. f=3, q=4 but 4<3 skip. Then f=3 on 12, q=4 ≥3 → [3,4]. Return [[2,6],[2,2,3],[3,4]].
 * Time Complexity: O(C * logN)
 * Space Complexity: O(logN)
 */
var getFactors = function (n) {
  const finalResultCollection = [];

  const initiateFactorSearch = (
    currentValue,
    minimumPossibleFactor,
    currentFactorSequence
  ) => {
    for (
      let loopFactor = minimumPossibleFactor;
      loopFactor * loopFactor <= currentValue;
      loopFactor++
    ) {
      if (currentValue % loopFactor === 0) {
        const quotientValue = currentValue / loopFactor;

        if (quotientValue >= loopFactor) {
          finalResultCollection.push([
            ...currentFactorSequence,
            loopFactor,
            quotientValue,
          ]);
          initiateFactorSearch(quotientValue, loopFactor, [
            ...currentFactorSequence,
            loopFactor,
          ]);
        }
      }
    }
  };

  if (n >= 2) {
    initiateFactorSearch(n, 2, []);
  }

  return finalResultCollection;
};
