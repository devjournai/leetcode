/**
 * Maximum Of Absolute Value Expression
 * Intuition: |A|+|B|+|C| equals the max over the 4 sign combinations ±A±B±C. Here A=arr1[i]-arr1[j], B=arr2[i]-arr2[j], C=i-j, so for each sign pair the expression is max_i f(i) - min_i f(i) with f(i)=±arr1[i]±arr2[i]+i.
 * Approach: 1. For each of the four (sign1, sign2) pairs, scan i and track min and max of sign1*arr1[i]+sign2*arr2[i]+i. 2. Take the largest (max-min) among the four.
 * Dry Run: arr1 = [1,2,3,4], arr2 = [-1,4,5,6].
 *   - Signs (1,1): f = [0,7,10,13], range 13. Other sign pairs have smaller ranges.
 *   - Answer 13.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxAbsValExpr = function (arr1, arr2) {
  const totalElements = arr1.length;
  let maximumAchieved = 0;
  const coefficientPairs = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  for (const currentSigns of coefficientPairs) {
    const signForArr1 = currentSigns[0];
    const signForArr2 = currentSigns[1];

    let minimumComputedValue = Infinity;
    let maximumComputedValue = -Infinity;

    for (let currentIndex = 0; currentIndex < totalElements; ++currentIndex) {
      const currentCombinedValue =
        signForArr1 * arr1[currentIndex] +
        signForArr2 * arr2[currentIndex] +
        currentIndex;
      minimumComputedValue = Math.min(
        minimumComputedValue,
        currentCombinedValue
      );
      maximumComputedValue = Math.max(
        maximumComputedValue,
        currentCombinedValue
      );
    }

    const currentRangeDifference = maximumComputedValue - minimumComputedValue;
    maximumAchieved = Math.max(maximumAchieved, currentRangeDifference);
  }

  return maximumAchieved;
};
