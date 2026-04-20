/**
 * Missing Element In Sorted Array
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var missingElement = function (numArray, targetK) {
  const arrayLength = numArray.length;

  const calculateMissingCount = (currentIndexParam) => {
    return numArray[currentIndexParam] - numArray[0] - currentIndexParam;
  };

  const finalMissingNumbers = calculateMissingCount(arrayLength - 1);

  if (targetK > finalMissingNumbers) {
    return numArray[arrayLength - 1] + targetK - finalMissingNumbers;
  }

  let lowBoundary = 0;
  let highBoundary = arrayLength - 1;

  while (lowBoundary < highBoundary) {
    const midPoint = Math.floor((lowBoundary + highBoundary) / 2);
    const currentMissingNumbers = calculateMissingCount(midPoint);

    if (currentMissingNumbers < targetK) {
      lowBoundary = midPoint + 1;
    } else {
      highBoundary = midPoint;
    }
  }

  const missingBeforeIndex = calculateMissingCount(lowBoundary - 1);
  return numArray[lowBoundary - 1] + targetK - missingBeforeIndex;
};
