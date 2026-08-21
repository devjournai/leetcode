/**
 * Four Divisors
 * Intuition: Only numbers with exactly four divisors contribute. Trial division up to sqrt(x) lists all divisors; if the count hits 4, add their sum.
 * Approach: 1. For each x, iterate d while d*d <= x; when d divides x, count d and x/d (once if square). 2. Abort early if more than 4 divisors. 3. If exactly 4, add the divisor sum to the total.
 * Dry Run: nums = [21,4,7].
 *   - 21: 1,3,7,21 → sum 32. 4: 1,2,4 (3 divisors). 7: 1,7. Return 32.
 * Time Complexity: O(N * sqrt(M))
 * Space Complexity: O(1)
 */
var sumFourDivisors = function (nums) {
  function calculateDivisorSumForFour(subjectNumber) {
    let divisorCount = 0;
    let runningSum = 0;

    for (
      let checkIndex = 1;
      checkIndex * checkIndex <= subjectNumber;
      checkIndex++
    ) {
      if (subjectNumber % checkIndex === 0) {
        divisorCount++;
        runningSum += checkIndex;

        let pairDivisor = subjectNumber / checkIndex;
        if (checkIndex * checkIndex !== subjectNumber) {
          divisorCount++;
          runningSum += pairDivisor;
        }
      }
      if (divisorCount > 4) {
        return 0;
      }
    }

    if (divisorCount === 4) {
      return runningSum;
    } else {
      return 0;
    }
  }

  let totalAccumulation = 0;
  for (const currentValue of nums) {
    let contributionFromValue = calculateDivisorSumForFour(currentValue);
    totalAccumulation += contributionFromValue;
  }

  return totalAccumulation;
};
