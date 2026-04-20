/**
 * Lexicographically Smallest Equivalent String
 * Time Complexity: O(L1 + L2 + L3)
 * Space Complexity: O(L3)
 */
var smallestEquivalentString = function (s1, s2, baseStr) {
  const alphabetSize = 26;
  const parentMap = Array(alphabetSize);
  const characterASCIIDelta = 97;

  let initPointer = 0;
  while (initPointer < alphabetSize) {
    parentMap[initPointer] = initPointer;
    initPointer++;
  }

  const findRepresentative = (nodeIdentifier) => {
    if (parentMap[nodeIdentifier] === nodeIdentifier) {
      return nodeIdentifier;
    }
    parentMap[nodeIdentifier] = findRepresentative(parentMap[nodeIdentifier]);
    return parentMap[nodeIdentifier];
  };

  const mergeSets = (valueA, valueB) => {
    const rootA = findRepresentative(valueA);
    const rootB = findRepresentative(valueB);

    if (rootA !== rootB) {
      if (rootA < rootB) {
        parentMap[rootB] = rootA;
      } else {
        parentMap[rootA] = rootB;
      }
    }
  };

  let equivalenceIndex = 0;
  const firstStringLength = s1.length;
  while (equivalenceIndex < firstStringLength) {
    const charAVal = s1.charCodeAt(equivalenceIndex) - characterASCIIDelta;
    const charBVal = s2.charCodeAt(equivalenceIndex) - characterASCIIDelta;
    mergeSets(charAVal, charBVal);
    equivalenceIndex++;
  }

  const constructedResult = [];
  let baseStringParseIndex = 0;
  const baseInputLength = baseStr.length;
  while (baseStringParseIndex < baseInputLength) {
    const currentBaseCharValue =
      baseStr.charCodeAt(baseStringParseIndex) - characterASCIIDelta;
    const finalEquivalentRoot = findRepresentative(currentBaseCharValue);
    constructedResult.push(
      String.fromCharCode(finalEquivalentRoot + characterASCIIDelta),
    );
    baseStringParseIndex++;
  }

  return constructedResult.join("");
};
