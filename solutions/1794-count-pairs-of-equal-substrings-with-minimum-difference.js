/**
 * Count Pairs Of Equal Substrings With Minimum Difference
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
