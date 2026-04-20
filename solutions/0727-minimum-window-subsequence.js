/**
 * Minimum Window Subsequence
 * Time Complexity: O(S1 * S2)
 * Space Complexity: O(S1 * S2)
 */
var minWindow = function (s1, s2) {
  const primaryStringLength = s1.length;
  const secondaryStringLength = s2.length;

  const dynamicProgramTable = Array.from(
    { length: secondaryStringLength + 1 },
    () => Array(primaryStringLength + 1).fill(Infinity),
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
