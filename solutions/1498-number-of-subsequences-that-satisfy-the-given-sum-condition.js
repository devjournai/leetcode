/**
 * Number Of Subsequences That Satisfy The Given Sum Condition
 * Intuition: Sort, then two pointers. If nums[L]+nums[R] <= target, every subset of (L+1..R) can join nums[L] as min: 2^(R-L) subsequences. Mod 1e9+7.
 * Approach: 1. Sort a copy. 2. Precompute powersOfTwo[i] = 2^i % MOD. 3. While L<=R, if sum of ends <= target add 2^(R-L) and L++; else R--. 4. Return the total.
 * Dry Run: nums = [3,5,6,7], target = 9
 *   - sorted same; 3+7=10>9 drop 7; 3+6<=9 add 2^2=4; 5+6>9 drop 6; 5+5 ok add 1. Total 4.
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
