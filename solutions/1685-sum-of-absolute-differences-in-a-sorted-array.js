/**
 * Sum Of Absolute Differences In A Sorted Array
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var getSumAbsoluteDifferences = function (nums) {
  const inputLength = nums.length;
  const outputArray = new Array(inputLength);

  let totalSumOfElements = nums.reduce(
    (initialAccumulator, currentNumber) => initialAccumulator + currentNumber,
    0,
  );
  let runningPrefixSum = 0;

  for (
    let currentIterationIndex = 0;
    currentIterationIndex < inputLength;
    currentIterationIndex++
  ) {
    const valueAtIndex = nums[currentIterationIndex];

    totalSumOfElements -= valueAtIndex;

    const leftSideSummation =
      valueAtIndex * currentIterationIndex - runningPrefixSum;
    const rightSideSummation =
      totalSumOfElements -
      valueAtIndex * (inputLength - 1 - currentIterationIndex);

    const finalCalculationElement = leftSideSummation + rightSideSummation;
    outputArray[currentIterationIndex] = finalCalculationElement;

    runningPrefixSum += valueAtIndex;
  }

  return outputArray;
};
