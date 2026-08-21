/**
 * Count Pairs Of Equal Substrings With Minimum Difference
 * Intuition: Equal length-1 substrings are single matching letters. For each letter, the last index in `firstString` minus the first index in `secondString` is a candidate difference; count letters achieving the global minimum.
 * Approach: 1. Scan firstString right-to-left storing 1-based last positions in `firstCharIndices`. 2. Scan secondString left-to-right storing first positions. 3. For each letter present in both, compare `firstStringLocation - secondStringLocation` to `smallestDiffVal` and update `matchingPairsCount`. 4. Return the count.
 * Dry Run: firstString = "abcd", secondString = "bccda".
 *   - Letter a: 1-5=-4; b: 2-1=1; c: 3-2=1; d: 4-4=0. Minimum is -4 occurring once → 1.
 * Time Complexity: O(firstString.length + secondString.length)
 * Space Complexity: O(1)
 */
var countQuadruples = function (firstString, secondString) {
  const firstCharIndices = new Array(26).fill(0);
  const secondCharIndices = new Array(26).fill(0);
  let smallestDiffVal = Number.POSITIVE_INFINITY;
  let matchingPairsCount = 0;

  for (
    let firstStrIter = firstString.length;
    firstStrIter > 0;
    firstStrIter--
  ) {
    const characterCode = firstString.charCodeAt(firstStrIter - 1) - 97;
    firstCharIndices[characterCode] = firstStrIter;
  }

  for (
    let secondStrIter = 1;
    secondStrIter <= secondString.length;
    secondStrIter++
  ) {
    const characterCode = secondString.charCodeAt(secondStrIter - 1) - 97;
    secondCharIndices[characterCode] = secondStrIter;
  }

  for (let alphabetIndex = 0; alphabetIndex < 26; alphabetIndex++) {
    const firstStringLocation = firstCharIndices[alphabetIndex];
    const secondStringLocation = secondCharIndices[alphabetIndex];

    if (firstStringLocation > 0 && secondStringLocation > 0) {
      const currentComputedDifference =
        firstStringLocation - secondStringLocation;
      if (currentComputedDifference < smallestDiffVal) {
        smallestDiffVal = currentComputedDifference;
        matchingPairsCount = 1;
      } else if (currentComputedDifference === smallestDiffVal) {
        matchingPairsCount++;
      }
    }
  }

  return matchingPairsCount;
};
