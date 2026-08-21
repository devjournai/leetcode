/**
 * Satisfiability Of Equality Equations
 * Intuition: Union all `==` variables first; any `!=` pair that shares a parent is a contradiction.
 * Approach: 1. Init 26 parents. 2. `retrieveSetRepresentative` with compression; `mergeVariableSets` links roots. 3. Process equations whose `[1]==='='`. 4. For `!=`, return false if same root. 5. Else true.
 * Dry Run: equations = ["a==b","b!=a"]. Merge a,b then inequality finds same representative. False.
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
        disjointSetParents[nodeIdentifier]
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
