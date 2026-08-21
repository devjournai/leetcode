/**
 * Shortest Common Supersequence
 * Intuition: SCS length is |s|+|t|−LCS. DP stores SCS length of prefixes; backtracking prefers a shared character or the neighbor with smaller DP, reconstructing one shortest supersequence.
 * Approach: 1. dp[i][j] = 1+dp[i-1][j-1] on match, else 1+min of skip-s or skip-t. 2. Walk from (n,m) appending the chosen character. 3. Drain leftover prefixes. 4. Return the built string.
 * Dry Run: cabac and cbba. DP prefers merging the common c,b,a; one SCS is cabbac.
 * Time Complexity: O(str1.length * str2.length)
 * Space Complexity: O(str1.length * str2.length)
 */
var shortestCommonSupersequence = function (str1, str2) {
  const primaryStringLength = str1.length;
  const secondaryStringLength = str2.length;

  const dpGrid = Array.from({ length: primaryStringLength + 1 }, () =>
    Array(secondaryStringLength + 1).fill(0)
  );

  for (
    let currentPrimaryIndex = 0;
    currentPrimaryIndex <= primaryStringLength;
    currentPrimaryIndex++
  ) {
    dpGrid[currentPrimaryIndex][0] = currentPrimaryIndex;
  }

  for (
    let currentSecondaryIndex = 0;
    currentSecondaryIndex <= secondaryStringLength;
    currentSecondaryIndex++
  ) {
    dpGrid[0][currentSecondaryIndex] = currentSecondaryIndex;
  }

  for (let rowIdx = 1; rowIdx <= primaryStringLength; rowIdx++) {
    for (let colIdx = 1; colIdx <= secondaryStringLength; colIdx++) {
      if (str1[rowIdx - 1] === str2[colIdx - 1]) {
        dpGrid[rowIdx][colIdx] = dpGrid[rowIdx - 1][colIdx - 1] + 1;
      } else {
        dpGrid[rowIdx][colIdx] =
          Math.min(dpGrid[rowIdx - 1][colIdx], dpGrid[rowIdx][colIdx - 1]) + 1;
      }
    }
  }

  let finalResult = "";
  let primaryPointer = primaryStringLength;
  let secondaryPointer = secondaryStringLength;

  while (primaryPointer > 0 || secondaryPointer > 0) {
    if (primaryPointer === 0) {
      finalResult = str2[secondaryPointer - 1] + finalResult;
      secondaryPointer--;
    } else if (secondaryPointer === 0) {
      finalResult = str1[primaryPointer - 1] + finalResult;
      primaryPointer--;
    } else if (str1[primaryPointer - 1] === str2[secondaryPointer - 1]) {
      finalResult = str1[primaryPointer - 1] + finalResult;
      primaryPointer--;
      secondaryPointer--;
    } else {
      if (
        dpGrid[primaryPointer - 1][secondaryPointer] <
        dpGrid[primaryPointer][secondaryPointer - 1]
      ) {
        finalResult = str1[primaryPointer - 1] + finalResult;
        primaryPointer--;
      } else {
        finalResult = str2[secondaryPointer - 1] + finalResult;
        secondaryPointer--;
      }
    }
  }

  return finalResult;
};
