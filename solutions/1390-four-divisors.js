/**
 * Four Divisors
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
