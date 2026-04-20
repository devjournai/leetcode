/**
 * Maximum Sum Of Two Non Overlapping Subarrays
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
      candidateWindowOneSum,
    );

    const currentWindowTwoSum =
      cumulativeSumsArray[loopIndexA + lengthTwo] -
      cumulativeSumsArray[loopIndexA];
    resultantMaximumSum = Math.max(
      resultantMaximumSum,
      maximumSubarrayOneSum + currentWindowTwoSum,
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
      candidateWindowTwoSum,
    );

    const currentWindowOneSum =
      cumulativeSumsArray[loopIndexB + lengthOne] -
      cumulativeSumsArray[loopIndexB];
    alternativeResultMaximumSum = Math.max(
      alternativeResultMaximumSum,
      maximumSubarrayTwoSum + currentWindowOneSum,
    );
  }

  return Math.max(resultantMaximumSum, alternativeResultMaximumSum);
};
