/**
 * Maximum Sum Of Two Non Overlapping Subarrays
 * Intuition: Prefix sums give O(1) window sums. Sweep left-to-right keeping the best first window so far, then try the other order (L then M vs M then L).
 * Approach: 1. Build prefix sums. 2. For each split where L is left of M, track max L ending at the split and add the following M. 3. Repeat with M left of L. 4. Return the larger of the two maxima.
 * Dry Run: nums = [0,6,5,2,2,5,1,9,4], L=1, M=2.
 *   - Best is a length-1 window 9 plus a non-overlapping length-2 window 6+5=11, total 20.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var maxSumTwoNoOverlap = function (inputNumbers, lengthOne, lengthTwo) {
  const calculatePrefixSumsArray = (numbersInput) => {
    const sumsCollection = [0];
    let runningTotal = 0;
    for (
      let iterationCount = 0;
      iterationCount < numbersInput.length;
      iterationCount++
    ) {
      runningTotal += numbersInput[iterationCount];
      sumsCollection.push(runningTotal);
    }
    return sumsCollection;
  };

  const cumulativeSumsArray = calculatePrefixSumsArray(inputNumbers);
  let maximumSubarrayOneSum = Number.MIN_SAFE_INTEGER;
  let resultantMaximumSum = Number.MIN_SAFE_INTEGER;

  for (
    let loopIndexA = lengthOne;
    loopIndexA <= inputNumbers.length - lengthTwo;
    loopIndexA++
  ) {
    const candidateWindowOneSum =
      cumulativeSumsArray[loopIndexA] -
      cumulativeSumsArray[loopIndexA - lengthOne];
    maximumSubarrayOneSum = Math.max(
      maximumSubarrayOneSum,
      candidateWindowOneSum
    );

    const currentWindowTwoSum =
      cumulativeSumsArray[loopIndexA + lengthTwo] -
      cumulativeSumsArray[loopIndexA];
    resultantMaximumSum = Math.max(
      resultantMaximumSum,
      maximumSubarrayOneSum + currentWindowTwoSum
    );
  }

  let maximumSubarrayTwoSum = Number.MIN_SAFE_INTEGER;
  let alternativeResultMaximumSum = Number.MIN_SAFE_INTEGER;

  for (
    let loopIndexB = lengthTwo;
    loopIndexB <= inputNumbers.length - lengthOne;
    loopIndexB++
  ) {
    const candidateWindowTwoSum =
      cumulativeSumsArray[loopIndexB] -
      cumulativeSumsArray[loopIndexB - lengthTwo];
    maximumSubarrayTwoSum = Math.max(
      maximumSubarrayTwoSum,
      candidateWindowTwoSum
    );

    const currentWindowOneSum =
      cumulativeSumsArray[loopIndexB + lengthOne] -
      cumulativeSumsArray[loopIndexB];
    alternativeResultMaximumSum = Math.max(
      alternativeResultMaximumSum,
      maximumSubarrayTwoSum + currentWindowOneSum
    );
  }

  return Math.max(resultantMaximumSum, alternativeResultMaximumSum);
};
