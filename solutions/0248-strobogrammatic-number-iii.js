/**
 * Strobogrammatic Number III
 * Time Complexity: O(L_max * L_max * 2^L_max)
 * Space Complexity: O(L_max * 2^L_max)
 */
var strobogrammaticInRange = function (low, high) {
  const strobogramPairs = [
    ["0", "0"],
    ["1", "1"],
    ["6", "9"],
    ["8", "8"],
    ["9", "6"],
  ];

  const generateStroboNumbers = (targetLength, isInitialCall) => {
    if (targetLength === 0) {
      return [""];
    }
    if (targetLength === 1) {
      return ["0", "1", "8"];
    }

    const accumulatedResults = [];
    const recursiveSubNumbers = generateStroboNumbers(targetLength - 2, false);

    for (const [leftChar, rightChar] of strobogramPairs) {
      if (isInitialCall && leftChar === "0") {
        continue;
      }
      for (const subPart of recursiveSubNumbers) {
        const constructedNumber = leftChar + subPart + rightChar;
        accumulatedResults.push(constructedNumber);
      }
    }

    return accumulatedResults;
  };

  const checkNumberRange = (
    candidateNumber,
    lowBoundaryString,
    highBoundaryString,
  ) => {
    const candidateLength = candidateNumber.length;
    const lowBoundaryLength = lowBoundaryString.length;
    const highBoundaryLength = highBoundaryString.length;

    if (candidateLength < lowBoundaryLength) {
      return false;
    }
    if (candidateLength > highBoundaryLength) {
      return false;
    }

    if (
      candidateLength === lowBoundaryLength &&
      candidateNumber < lowBoundaryString
    ) {
      return false;
    }
    if (
      candidateLength === highBoundaryLength &&
      candidateNumber > highBoundaryString
    ) {
      return false;
    }

    return true;
  };

  let totalStroboCount = 0;
  const lowestLength = low.length;
  const highestLength = high.length;

  for (
    let currentLengthIterator = lowestLength;
    currentLengthIterator <= highestLength;
    currentLengthIterator++
  ) {
    const stroboNumbersForLength = generateStroboNumbers(
      currentLengthIterator,
      true,
    );
    for (const individualStroboNumber of stroboNumbersForLength) {
      if (checkNumberRange(individualStroboNumber, low, high)) {
        totalStroboCount++;
      }
    }
  }

  return totalStroboCount;
};
