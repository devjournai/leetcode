/**
 * Pizza With 3n Slices
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
          sumWithCurrent,
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
    maxSlicesToPick,
  );

  const finalMaximumSum = Math.max(
    resultIncludingFirstSlice,
    resultExcludingFirstSlice,
  );

  return finalMaximumSum;
};
