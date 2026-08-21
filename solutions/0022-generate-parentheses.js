/**
 * Generate Parentheses
 * Intuition: Backtracking only adds `'('` while `openingCount < n` and `')'` while `closingCount < openingCount`, so every complete string of length `2n` is a valid pairing.
 * Approach: 1. Recurse `buildCombinations` with counts and `limitValue = n`. 2. If the fragment length is `limitValue * 2`, push it. 3. Recurse with an extra `'('` when openings remain. 4. Recurse with `')'` when closings are still behind openings. 5. Start from empty counts and return `generatedExpressions`.
 * Dry Run: n = 2.
 *   - "(" then "((" then "(()" then "(())" collected; backtrack to "()" then "()(" then "()()" collected. Return ["(())","()()"].
 * Time Complexity: O(4^n / sqrt(n))
 * Space Complexity: O(n * C_n)
 */
var generateParenthesis = function (n) {
  const generatedExpressions = [];

  function buildCombinations(
    collectionRef,
    currentStringFragment,
    openingCount,
    closingCount,
    limitValue
  ) {
    if (currentStringFragment.length === limitValue * 2) {
      collectionRef.push(currentStringFragment);
      return;
    }

    if (openingCount < limitValue) {
      buildCombinations(
        collectionRef,
        currentStringFragment + "(",
        openingCount + 1,
        closingCount,
        limitValue
      );
    }

    if (closingCount < openingCount) {
      buildCombinations(
        collectionRef,
        currentStringFragment + ")",
        openingCount,
        closingCount + 1,
        limitValue
      );
    }
  }

  buildCombinations(generatedExpressions, "", 0, 0, n);
  return generatedExpressions;
};
