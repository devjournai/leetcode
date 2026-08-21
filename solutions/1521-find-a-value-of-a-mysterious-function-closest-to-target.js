/**
 * Find A Value Of A Mysterious Function Closest To Target
 * Intuition: AND of subarrays ending at i has few distinct values (bits only turn off). Track previous ANDs, AND with arr[i], keep min |val-target|.
 * Approach: 1. prev set of AND results. 2. For each x, new set {x} ∪ {y&x}. 3. Update min abs to target. 4. prev = new set.
 * Dry Run: arr = [9,12,3,7,15], target = 5.
 *   - ANDs include 3; |3-5|=2.
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
      Math.abs(currentElementValue - target)
    );

    for (const previousResult of previousComputedValues) {
      const combinedAndResult = previousResult & currentElementValue;
      presentFunctionOutputs.add(combinedAndResult);
      minimumAbsDifference = Math.min(
        minimumAbsDifference,
        Math.abs(combinedAndResult - target)
      );
    }

    previousComputedValues = presentFunctionOutputs;
  }

  return minimumAbsDifference;
};
