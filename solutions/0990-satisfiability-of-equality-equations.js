/**
 * Satisfiability Of Equality Equations
 * Time Complexity: O(N * α(26))
 * Space Complexity: O(26)
 */
var equationsPossible = function (equations) {
  const totalAlphabetCount = 26;
  const asciiOffset = 97;
  const disjointSetParents = new Array(totalAlphabetCount);
  for (
    let currentLetterIndex = 0;
    currentLetterIndex < totalAlphabetCount;
    currentLetterIndex++
  ) {
    disjointSetParents[currentLetterIndex] = currentLetterIndex;
  }

  const retrieveSetRepresentative = (nodeIdentifier) => {
    if (disjointSetParents[nodeIdentifier] !== nodeIdentifier) {
      disjointSetParents[nodeIdentifier] = retrieveSetRepresentative(
        disjointSetParents[nodeIdentifier],
      );
    }
    return disjointSetParents[nodeIdentifier];
  };

  const mergeVariableSets = (identifierOne, identifierTwo) => {
    const rootOne = retrieveSetRepresentative(identifierOne);
    const rootTwo = retrieveSetRepresentative(identifierTwo);
    if (rootOne !== rootTwo) {
      disjointSetParents[rootOne] = rootTwo;
    }
  };

  for (const equalityCheckString of equations) {
    if (equalityCheckString[1] === "=") {
      const firstCharacterIndex =
        equalityCheckString[0].charCodeAt(0) - asciiOffset;
      const secondCharacterIndex =
        equalityCheckString[3].charCodeAt(0) - asciiOffset;
      mergeVariableSets(firstCharacterIndex, secondCharacterIndex);
    }
  }

  for (const inequalityCheckString of equations) {
    if (inequalityCheckString[1] === "!") {
      const leftVarIndex = inequalityCheckString[0].charCodeAt(0) - asciiOffset;
      const rightVarIndex =
        inequalityCheckString[3].charCodeAt(0) - asciiOffset;
      if (
        retrieveSetRepresentative(leftVarIndex) ===
        retrieveSetRepresentative(rightVarIndex)
      ) {
        return false;
      }
    }
  }

  return true;
};
