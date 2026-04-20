/**
 * Letter Case Permutation
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(N * 2^N)
 */
var letterCasePermutation = function (s) {
  const allPermutations = [];

  function generatePermutations(
    collectedStrings,
    originalTextSource,
    currentPermutationBuild,
    processingPositionIndex,
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
        nextPositionIncrement,
      );

      const upperCasedVariant = charToExamine.toUpperCase();
      generatePermutations(
        collectedStrings,
        originalTextSource,
        currentPermutationBuild + upperCasedVariant,
        nextPositionIncrement,
      );
    } else {
      generatePermutations(
        collectedStrings,
        originalTextSource,
        currentPermutationBuild + charToExamine,
        nextPositionIncrement,
      );
    }
  }

  generatePermutations(allPermutations, s, "", 0);

  return allPermutations;
};
