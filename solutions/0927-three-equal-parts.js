/**
 * Three Equal Parts
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var threeEqualParts = function (arr) {
  let totalOneCount = 0;
  for (const digitValue of arr) {
    totalOneCount += digitValue;
  }

  if (totalOneCount === 0) {
    return [0, arr.length - 1];
  }

  if (totalOneCount % 3 !== 0) {
    return [-1, -1];
  }

  const onesPerSection = totalOneCount / 3;
  let firstPartStart = -1;
  let secondPartStart = -1;
  let thirdPartStart = -1;
  let currentOnesCounter = 0;

  for (
    let currentPosition = 0;
    currentPosition < arr.length;
    currentPosition++
  ) {
    if (arr[currentPosition] === 1) {
      currentOnesCounter++;
      if (currentOnesCounter === 1) firstPartStart = currentPosition;
      if (currentOnesCounter === onesPerSection + 1)
        secondPartStart = currentPosition;
      if (currentOnesCounter === 2 * onesPerSection + 1)
        thirdPartStart = currentPosition;
    }
  }

  const significantSegmentLength = arr.length - thirdPartStart;

  if (
    secondPartStart - firstPartStart < significantSegmentLength ||
    thirdPartStart - secondPartStart < significantSegmentLength
  ) {
    return [-1, -1];
  }

  for (
    let comparisonIndex = 0;
    comparisonIndex < significantSegmentLength;
    comparisonIndex++
  ) {
    if (
      arr[firstPartStart + comparisonIndex] !==
        arr[secondPartStart + comparisonIndex] ||
      arr[firstPartStart + comparisonIndex] !==
        arr[thirdPartStart + comparisonIndex]
    ) {
      return [-1, -1];
    }
  }

  const partOneEndIndex = firstPartStart + significantSegmentLength - 1;
  const partTwoStartAfterEnd = secondPartStart + significantSegmentLength;

  return [partOneEndIndex, partTwoStartAfterEnd];
};
