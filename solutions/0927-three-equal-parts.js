/**
 * Three Equal Parts
 * Intuition: Equal binary values means the same 1-count per third and the same bit string from each part’s first 1 through a length fixed by the last part (including its trailing zeros). Extra zeros between those windows become leading zeros of the next part.
 * Approach: 1. Count 1s; none → [0, n-1]; not multiple of 3 → [-1,-1]. 2. Locate the 1st, (ones/3+1)th, and (2*ones/3+1)th one. 3. Pattern length = n − thirdStart; require enough room between starts. 4. Compare the three slices; return [firstStart+len-1, secondStart+len].
 * Dry Run: [1,0,1,0,1]. ones=3, starts 0,2,4, len=1. Bits 1=1=1. Return [0, 3] → parts [1] | [0,1,0] | [1] as values 1,1,1.
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
