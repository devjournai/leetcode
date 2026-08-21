/**
 * Lexicographically Smallest Equivalent String
 * Intuition: Pairwise equivalences form connected components of letters. The smallest letter in a component is the best replacement for every member, so union-find that always parents toward the smaller root yields the lexicographically smallest mapping.
 * Approach: 1. Init parent[i]=i for 26 letters. 2. Union s1[i] with s2[i], attaching the larger root to the smaller. 3. Path-compress finds. 4. Map each baseStr char to its component’s smallest letter.
 * Dry Run: s1=abc, s2=cde, baseStr=eed. Unions a~c, b~d, c~e → {a,c,e} rooted at a and {b,d} at b. eed → aab.
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
      String.fromCharCode(finalEquivalentRoot + characterASCIIDelta)
    );
    baseStringParseIndex++;
  }

  return constructedResult.join("");
};
