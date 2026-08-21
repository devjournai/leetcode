/**
 * Maximum Matrix Sum
 * Intuition: Any two adjacent cells can flip signs together, so negatives can be moved around. An even count of negatives can all be turned positive; an odd count leaves one negative, which should be the smallest absolute value. Max sum is therefore the sum of abs values, minus twice that min abs if the negative count is odd.
 * Approach: 1. Scan the matrix: add `|x|` to the total, count negatives, track `minimumValueMagnitude`. 2. If `signFlipCounter` is even, return the abs sum. 3. Else return abs sum minus `2 * minimumValueMagnitude`.
 * Dry Run: matrix = [[1,-1],[-1,1]].
 *   - abs sum=4, negatives=2 (even) → 4.
 * Dry Run: [[1,2,3],[-1,-2,-3]] → abs=12, 3 negatives, min abs=1 → 12-2=10.
 * Time Complexity: O(R * C)
 * Space Complexity: O(1)
 */
var maxMatrixSum = function (matrix) {
  let overallAbsoluteSum = 0;
  let signFlipCounter = 0;
  let minimumValueMagnitude = Infinity;

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (let colIndex = 0; colIndex < matrix[rowIndex].length; colIndex++) {
      let currentValue = matrix[rowIndex][colIndex];
      let currentAbsoluteValue = Math.abs(currentValue);
      overallAbsoluteSum += currentAbsoluteValue;
      if (currentValue < 0) {
        signFlipCounter++;
      }
      minimumValueMagnitude = Math.min(
        minimumValueMagnitude,
        currentAbsoluteValue
      );
    }
  }

  if (signFlipCounter % 2 === 0) {
    return overallAbsoluteSum;
  } else {
    return overallAbsoluteSum - 2 * minimumValueMagnitude;
  }
};
