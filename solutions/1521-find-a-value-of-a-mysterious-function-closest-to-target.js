/**
 * Find A Value Of A Mysterious Function Closest To Target
 * Time Complexity: O(N * W)
 * Space Complexity: O(W)
 */
var closestToTarget = function (arr, target) {
  let minimumAbsDifference = Infinity;
  let previousComputedValues = new Set();
  const arrayLength = arr.length;

  for (
    let currentRightIndex = 0;
    currentRightIndex < arrayLength;
    currentRightIndex++
  ) {
    const currentElementValue = arr[currentRightIndex];
    const presentFunctionOutputs = new Set();

    presentFunctionOutputs.add(currentElementValue);
    minimumAbsDifference = Math.min(
      minimumAbsDifference,
      Math.abs(currentElementValue - target),
    );

    for (const previousResult of previousComputedValues) {
      const combinedAndResult = previousResult & currentElementValue;
      presentFunctionOutputs.add(combinedAndResult);
      minimumAbsDifference = Math.min(
        minimumAbsDifference,
        Math.abs(combinedAndResult - target),
      );
    }

    previousComputedValues = presentFunctionOutputs;
  }

  return minimumAbsDifference;
};
