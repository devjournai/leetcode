/**
 * Minimum Swaps To Make Strings Equal
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumSwap = function (s1, s2) {
  let countXYMismatch = 0;
  let countYXMismatch = 0;

  let stringLength = s1.length;

  for (let charIterator = 0; charIterator < stringLength; charIterator++) {
    let charA = s1[charIterator];
    let charB = s2[charIterator];

    if (charA === "x" && charB === "y") {
      countXYMismatch++;
    }
    if (charA === "y" && charB === "x") {
      countYXMismatch++;
    }
  }

  let totalMismatchCount = countXYMismatch + countYXMismatch;

  if (totalMismatchCount % 2 !== 0) {
    return -1;
  }

  let resolvedXYPairs = Math.floor(countXYMismatch / 2);
  let resolvedYXPairs = Math.floor(countYXMismatch / 2);

  let remainingXY = countXYMismatch % 2;

  let totalSwapsRequired = resolvedXYPairs + resolvedYXPairs;

  totalSwapsRequired += remainingXY * 2;

  return totalSwapsRequired;
};
