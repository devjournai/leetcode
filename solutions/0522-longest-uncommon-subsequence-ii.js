/**
 * Longest Uncommon Subsequence II
 * Time Complexity: O(N^2 * L_max)
 * Space Complexity: O(1)
 */
var findLUSlength = function (stringCollection) {
  const verifySubsequence = (stringAlpha, stringBeta) => {
    let pointerAlpha = 0;
    let pointerBeta = 0;
    const lengthAlpha = stringAlpha.length;
    const lengthBeta = stringBeta.length;

    while (pointerAlpha < lengthAlpha && pointerBeta < lengthBeta) {
      if (stringAlpha[pointerAlpha] === stringBeta[pointerBeta]) {
        pointerAlpha++;
      }
      pointerBeta++;
    }
    return pointerAlpha === lengthAlpha;
  };

  stringCollection.sort(
    (firstElement, secondElement) => secondElement.length - firstElement.length,
  );

  const collectionLength = stringCollection.length;
  let primaryIndex = 0;

  while (primaryIndex < collectionLength) {
    let isTrulyUncommon = true;
    for (
      let secondaryIndex = 0;
      secondaryIndex < collectionLength;
      ++secondaryIndex
    ) {
      if (
        primaryIndex !== secondaryIndex &&
        verifySubsequence(
          stringCollection[primaryIndex],
          stringCollection[secondaryIndex],
        )
      ) {
        isTrulyUncommon = false;
        break;
      }
    }
    if (isTrulyUncommon) {
      return stringCollection[primaryIndex].length;
    }
    primaryIndex++;
  }

  return -1;
};
