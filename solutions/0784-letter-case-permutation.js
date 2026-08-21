/**
 * Letter Case Permutation
 * Intuition: Digits are fixed; each letter independently becomes lower or upper. DFS from index 0 branches on that choice.
 * Approach: 1. `generatePermutations` at `processingPositionIndex === length` pushes `currentPermutationBuild`. 2. If `charToExamine` is a–z or A–Z, recurse with `toLowerCase()` and with `toUpperCase()`. 3. Else append the digit as-is. Start from `("", 0)` and return `allPermutations`.
 * Dry Run: s = "a1b".
 *   - a → "a" / "A". Then '1' stays. Then b → "a1b","a1B","A1b","A1B".
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(N * 2^N)
 */
var letterCasePermutation = function (s) {
  const allPermutations = [];

  function generatePermutations(
    collectedStrings,
    originalTextSource,
    currentPermutationBuild,
    processingPositionIndex
  ) {
    if (processingPositionIndex === originalTextSource.length) {
      collectedStrings.push(currentPermutationBuild);
      return;
    }

    const charToExamine = originalTextSource[processingPositionIndex];
    const nextPositionIncrement = processingPositionIndex + 1;

    const isCharLetter =
      (charToExamine >= "a" && charToExamine <= "z") ||
      (charToExamine >= "A" && charToExamine <= "Z");

    if (isCharLetter) {
      const lowerCasedVariant = charToExamine.toLowerCase();
      generatePermutations(
        collectedStrings,
        originalTextSource,
        currentPermutationBuild + lowerCasedVariant,
        nextPositionIncrement
      );

      const upperCasedVariant = charToExamine.toUpperCase();
      generatePermutations(
        collectedStrings,
        originalTextSource,
        currentPermutationBuild + upperCasedVariant,
        nextPositionIncrement
      );
    } else {
      generatePermutations(
        collectedStrings,
        originalTextSource,
        currentPermutationBuild + charToExamine,
        nextPositionIncrement
      );
    }
  }

  generatePermutations(allPermutations, s, "", 0);

  return allPermutations;
};
