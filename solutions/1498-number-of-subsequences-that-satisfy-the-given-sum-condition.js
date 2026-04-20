/**
 * Number Of Subsequences That Satisfy The Given Sum Condition
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var numSubseq = function (nums, target) {
  const modulusBase = 1_000_000_007;

  const workingNumbers = nums
    .slice()
    .sort((numberOne, numberTwo) => numberOne - numberTwo);

  const countOfNumbers = workingNumbers.length;
  let totalSatisfyingSubsequences = 0;

  const powersOfTwo = new Array(countOfNumbers);
  powersOfTwo[0] = 1;

  for (
    let currentPowerIndex = 1;
    currentPowerIndex < countOfNumbers;
    currentPowerIndex++
  ) {
    powersOfTwo[currentPowerIndex] =
      (powersOfTwo[currentPowerIndex - 1] * 2) % modulusBase;
  }

  let leftBoundary = 0;
  let rightBoundary = countOfNumbers - 1;

  while (leftBoundary <= rightBoundary) {
    const minimumCandidate = workingNumbers[leftBoundary];
    const maximumCandidate = workingNumbers[rightBoundary];

    if (minimumCandidate + maximumCandidate <= target) {
      totalSatisfyingSubsequences =
        (totalSatisfyingSubsequences +
          powersOfTwo[rightBoundary - leftBoundary]) %
        modulusBase;
      leftBoundary++;
    } else {
      rightBoundary--;
    }
  }

  return totalSatisfyingSubsequences;
};
