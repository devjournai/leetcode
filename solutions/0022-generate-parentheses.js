/**
 * Generate Parentheses
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
    limitValue,
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
        limitValue,
      );
    }

    if (closingCount < openingCount) {
      buildCombinations(
        collectionRef,
        currentStringFragment + ")",
        openingCount,
        closingCount + 1,
        limitValue,
      );
    }
  }

  buildCombinations(generatedExpressions, "", 0, 0, n);
  return generatedExpressions;
};
