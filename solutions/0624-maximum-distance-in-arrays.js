/**
 * Maximum Distance In Arrays
 * Time Complexity: O(M)
 * Space Complexity: O(1)
 */
var maxDistance = function (arrays) {
  let maxDistanceResult = 0;
  let overallMinimumValue = arrays[0][0];
  let overallMaximumValue = arrays[0][arrays[0].length - 1];

  for (
    let currentArrayIndex = 1;
    currentArrayIndex < arrays.length;
    currentArrayIndex++
  ) {
    let currentArray = arrays[currentArrayIndex];
    let currentArrayFirstElement = currentArray[0];
    let currentArrayLastElement = currentArray[currentArray.length - 1];

    let potentialDifferenceOne = Math.abs(
      currentArrayLastElement - overallMinimumValue,
    );
    let potentialDifferenceTwo = Math.abs(
      overallMaximumValue - currentArrayFirstElement,
    );

    maxDistanceResult = Math.max(
      maxDistanceResult,
      potentialDifferenceOne,
      potentialDifferenceTwo,
    );

    overallMinimumValue = Math.min(
      overallMinimumValue,
      currentArrayFirstElement,
    );
    overallMaximumValue = Math.max(
      overallMaximumValue,
      currentArrayLastElement,
    );
  }

  return maxDistanceResult;
};
