/**
 * Sum Of Absolute Differences In A Sorted Array
 * Intuition: Because `nums` is sorted, |nums[i]−nums[j]| is nums[i]−nums[j] for j<i and nums[j]−nums[i] for j>i. Left contribution is i*nums[i] − prefix; right is remainingSum − nums[i]*(n−1−i).
 * Approach: 1. `totalSumOfElements` = sum(nums); `runningPrefixSum` = 0. 2. For each `currentIterationIndex`, subtract `valueAtIndex` from the remaining sum, compute `leftSideSummation` and `rightSideSummation`, store their sum in `outputArray`. 3. Add `valueAtIndex` into `runningPrefixSum`. 4. Return `outputArray`.
 * Dry Run: nums = [2,3,5]
 * i=0: left=0, remaining=8, right=8−2*2=4, ans=4. i=1: left=3−2=1, remaining=5, right=5−3=2, ans=3. i=2: left=10−5=5, remaining=0, right=0, ans=5. → [4,3,5]
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var getSumAbsoluteDifferences = function (nums) {
  const inputLength = nums.length;
  const outputArray = new Array(inputLength);

  let totalSumOfElements = nums.reduce(
    (initialAccumulator, currentNumber) => initialAccumulator + currentNumber,
    0
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
