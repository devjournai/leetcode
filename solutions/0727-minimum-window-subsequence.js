/**
 * Minimum Window Subsequence
 * Intuition: `dynamicProgramTable[j][i]` is the length of the shortest prefix of `s1[:i]` that contains `s2[:j]` as a subsequence ending at index `i-1`. Matching extends the previous letter; otherwise grow the same s2 prefix by one s1 char.
 * Approach: 1. Table (s2Len+1)×(s1Len+1), row 0 is 0, others Infinity. 2. If chars match, take diagonal+1; else take left+1 when left is finite. 3. Scan the last row for the minimum finite length and slice `s1` from `windowEndLocation - length`.
 * Dry Run: s1 = "abcdebdde", s2 = "bde". Best window is "bcde" (length 4) ending at the first 'e'.
 * Time Complexity: O(S1 * S2)
 * Space Complexity: O(S1 * S2)
 */
var minWindow = function (s1, s2) {
  const primaryStringLength = s1.length;
  const secondaryStringLength = s2.length;

  const dynamicProgramTable = Array.from(
    { length: secondaryStringLength + 1 },
    () => Array(primaryStringLength + 1).fill(Infinity)
  );

  for (
    let stringOneIter = 0;
    stringOneIter <= primaryStringLength;
    stringOneIter++
  ) {
    dynamicProgramTable[0][stringOneIter] = 0;
  }

  for (
    let currentS1Position = 1;
    currentS1Position <= primaryStringLength;
    currentS1Position++
  ) {
    for (
      let currentS2Position = 1;
      currentS2Position <= secondaryStringLength;
      currentS2Position++
    ) {
      if (s1[currentS1Position - 1] === s2[currentS2Position - 1]) {
        dynamicProgramTable[currentS2Position][currentS1Position] =
          dynamicProgramTable[currentS2Position - 1][currentS1Position - 1] + 1;
      } else {
        if (
          dynamicProgramTable[currentS2Position][currentS1Position - 1] !==
          Infinity
        ) {
          dynamicProgramTable[currentS2Position][currentS1Position] =
            dynamicProgramTable[currentS2Position][currentS1Position - 1] + 1;
        }
      }
    }
  }

  let overallMinimumLength = Infinity;
  let windowEndLocation = -1;

  for (
    let scanFinalPosition = 1;
    scanFinalPosition <= primaryStringLength;
    scanFinalPosition++
  ) {
    if (
      dynamicProgramTable[secondaryStringLength][scanFinalPosition] <
      overallMinimumLength
    ) {
      overallMinimumLength =
        dynamicProgramTable[secondaryStringLength][scanFinalPosition];
      windowEndLocation = scanFinalPosition;
    }
  }

  if (overallMinimumLength === Infinity) {
    return "";
  } else {
    const windowStartLocation = windowEndLocation - overallMinimumLength;
    return s1.substring(windowStartLocation, windowEndLocation);
  }
};
