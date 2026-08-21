/**
 * Sum Of Subarray Minimums
 * Intuition: Each `arr[i]` is the minimum of `leftBounds[i] * rightBounds[i]` subarrays: distance to the previous strictly smaller element (left) and to the next smaller-or-equal (right), so equal minima are attributed once.
 * Approach: 1. Left pass with increasing stack: pop strictly greater, `leftBounds[i] = i - previousSmaller` (or i-(-1)). 2. Right pass: pop `>= arr[i]`, `rightBounds[i] = nextSmallerOrEqual - i` (or n-i). 3. Sum `arr[i]*left*right % 1e9+7`.
 * Dry Run: arr = [3, 1, 2, 4].
 *   - leftBounds [1,2,1,1], rightBounds [1,3,2,1]. Contributions 3+6+4+4=17.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var sumSubarrayMins = function (arr) {
  const modulusBase = 1_000_000_007;
  const arrayLength = arr.length;

  const leftBounds = new Array(arrayLength);
  const rightBounds = new Array(arrayLength);

  const monotonicStackForLeft = [];

  for (
    let currentLeftIndex = 0;
    currentLeftIndex < arrayLength;
    currentLeftIndex++
  ) {
    while (
      monotonicStackForLeft.length > 0 &&
      arr[monotonicStackForLeft[monotonicStackForLeft.length - 1]] >
        arr[currentLeftIndex]
    ) {
      monotonicStackForLeft.pop();
    }
    const previousSmallerIndex =
      monotonicStackForLeft.length > 0
        ? monotonicStackForLeft[monotonicStackForLeft.length - 1]
        : -1;
    leftBounds[currentLeftIndex] = currentLeftIndex - previousSmallerIndex;
    monotonicStackForLeft.push(currentLeftIndex);
  }

  const monotonicStackForRight = [];

  for (
    let currentRightIndex = arrayLength - 1;
    currentRightIndex >= 0;
    currentRightIndex--
  ) {
    while (
      monotonicStackForRight.length > 0 &&
      arr[monotonicStackForRight[monotonicStackForRight.length - 1]] >=
        arr[currentRightIndex]
    ) {
      monotonicStackForRight.pop();
    }
    const nextSmallerOrEqualIndex =
      monotonicStackForRight.length > 0
        ? monotonicStackForRight[monotonicStackForRight.length - 1]
        : arrayLength;
    rightBounds[currentRightIndex] =
      nextSmallerOrEqualIndex - currentRightIndex;
    monotonicStackForRight.push(currentRightIndex);
  }

  let overallSum = 0;

  for (
    let finalCalculationIndex = 0;
    finalCalculationIndex < arrayLength;
    finalCalculationIndex++
  ) {
    const elementValue = arr[finalCalculationIndex];
    const rangeLeft = leftBounds[finalCalculationIndex];
    const rangeRight = rightBounds[finalCalculationIndex];

    const currentContribution =
      (elementValue * rangeLeft * rangeRight) % modulusBase;
    overallSum = (overallSum + currentContribution) % modulusBase;
  }

  return overallSum;
};
