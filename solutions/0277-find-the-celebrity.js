/**
 * Find The Celebrity
 * Intuition: If A knows B, A cannot be the celebrity, so B is the only remaining candidate. One pass shrinks to a single candidate; a second pass verifies everyone knows them and they know nobody.
 * Approach: 1. Start candidate=0. 2. For i=1..n-1, if knows(candidate, i), set candidate=i. 3. For every other j, if candidate knows j or j does not know candidate, return -1. 4. Else return candidate.
 * Dry Run: n=3, celebrity=1 (1 knows nobody; 0 and 2 know 1).
 *   - knows(0,1) true → candidate=1. knows(1,2) false → stay 1.
 *   - Verify 1 vs 0 and 2. Return 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var solution = function (knows) {
  return function (n) {
    let potentialCelebrity = 0;

    for (let firstPassIndex = 1; firstPassIndex < n; firstPassIndex++) {
      if (knows(potentialCelebrity, firstPassIndex)) {
        potentialCelebrity = firstPassIndex;
      }
    }

    for (let secondPassIndex = 0; secondPassIndex < n; secondPassIndex++) {
      if (
        secondPassIndex !== potentialCelebrity &&
        (knows(potentialCelebrity, secondPassIndex) ||
          !knows(secondPassIndex, potentialCelebrity))
      ) {
        return -1;
      }
    }

    return potentialCelebrity;
  };
};
