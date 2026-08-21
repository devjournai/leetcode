/**
 * Pizza With 3n Slices
 * Intuition: We pick n = slices.length/3 pieces from a circle with no two adjacent. That is house-robber-style DP on a line, run twice: once taking slice 0 (so exclude last and second), once skipping slice 0.
 * Approach: 1. maxSlicesToPick = N/3. 2. calculateMaxSum(arr, k) is DP: dp[i][j] = max of skip arr[i-1] or take it plus dp[i-2][j-1] (cannot take two adjacent). 3. Case A: slices[0] + DP on slices[2..N-2] with k-1 picks. 4. Case B: DP on slices[1..N-1] with k picks. 5. Return the max.
 * Dry Run: slices = [1,2,3,4,5,6], pick 2.
 *   - Take first (1) then from [3,4,5] pick 1 → best 5, total 6. Skip first: DP on [2,3,4,5,6] pick 2 → 2+5=7 or 3+6=9. Return 9.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var maxSizeSlices = function (slices) {
  const totalPizzaSlices = slices.length;
  const maxSlicesToPick = totalPizzaSlices / 3;

  function calculateMaxSum(availableSlices, requiredPicks) {
    const collectionLength = availableSlices.length;
    const dynamicProgramTable = Array(collectionLength + 1)
      .fill(null)
      .map(() => Array(requiredPicks + 1).fill(0));

    for (
      let sliceQuantity = 1;
      sliceQuantity <= requiredPicks;
      sliceQuantity++
    ) {
      for (
        let slicePosition = 1;
        slicePosition <= collectionLength;
        slicePosition++
      ) {
        const sumWithoutCurrent =
          dynamicProgramTable[slicePosition - 1][sliceQuantity];

        let sumWithCurrent = availableSlices[slicePosition - 1];
        let previousSumForInclusion = 0;

        if (slicePosition >= 2) {
          previousSumForInclusion =
            dynamicProgramTable[slicePosition - 2][sliceQuantity - 1];
        } else {
          if (sliceQuantity > 1) {
            sumWithCurrent = -Infinity;
          }
        }
        sumWithCurrent += previousSumForInclusion;

        dynamicProgramTable[slicePosition][sliceQuantity] = Math.max(
          sumWithoutCurrent,
          sumWithCurrent
        );
      }
    }
    return dynamicProgramTable[collectionLength][requiredPicks];
  }

  const subsetForFirstCase = slices.slice(2, totalPizzaSlices - 1);
  const resultIncludingFirstSlice =
    slices[0] + calculateMaxSum(subsetForFirstCase, maxSlicesToPick - 1);

  const subsetForSecondCase = slices.slice(1, totalPizzaSlices);
  const resultExcludingFirstSlice = calculateMaxSum(
    subsetForSecondCase,
    maxSlicesToPick
  );

  const finalMaximumSum = Math.max(
    resultIncludingFirstSlice,
    resultExcludingFirstSlice
  );

  return finalMaximumSum;
};
