/**
 * Find The Maximum Divisibility Score
 * Intuition: To find the maximum divisibility score, we must calculate the score for each divisor individually. The score is determined by how many numbers in the 'nums' array are perfectly divisible by the current divisor. We need to keep track of the divisor that yields the highest score, and in case of a tie in scores, select the smallest divisor.
 * Approach: 1. Initialize variables to track the maximum score found so far and the corresponding divisor (defaulting to the first divisor in the list). 2. Iterate through each divisor in the 'divisors' array. 3. For each divisor, iterate through all numbers in the 'nums' array to count how many are divisible by the current divisor. 4. After calculating the score for a divisor, compare it with the current maximum score. Update the maximum score and the result divisor if the current divisor has a higher score, or if it has an equal score but is numerically smaller than the current best divisor. 5. Return the final chosen divisor.
 * Dry Run: nums = [4, 7, 9, 12], divisors = [2, 3, 5]
 * 1. highestScoreAchieved = 0, finalAnswerDivisor = 2 (from divisors[0])
 * 2. Outer loop (divIndex = 0, currentDivisorCandidate = 2):
 *    currentDivisibilityCount = 0
 *    Inner loop (numIndex = 0, numberInArray = 4): 4 % 2 === 0. currentDivisibilityCount becomes 1.
 *    Inner loop (numIndex = 1, numberInArray = 7): 7 % 2 !== 0.
 *    Inner loop (numIndex = 2, numberInArray = 9): 9 % 2 !== 0.
 *    Inner loop (numIndex = 3, numberInArray = 12): 12 % 2 === 0. currentDivisibilityCount becomes 2.
 *    End inner loop. currentDivisibilityCount (2) > highestScoreAchieved (0). Update: highestScoreAchieved = 2, finalAnswerDivisor = 2.
 * 3. Outer loop (divIndex = 1, currentDivisorCandidate = 3):
 *    currentDivisibilityCount = 0
 *    Inner loop (numIndex = 0, numberInArray = 4): 4 % 3 !== 0.
 *    Inner loop (numIndex = 1, numberInArray = 7): 7 % 3 !== 0.
 *    Inner loop (numIndex = 2, numberInArray = 9): 9 % 3 === 0. currentDivisibilityCount becomes 1.
 *    Inner loop (numIndex = 3, numberInArray = 12): 12 % 3 === 0. currentDivisibilityCount becomes 2.
 *    End inner loop. currentDivisibilityCount (2) is not > highestScoreAchieved (2).
 *    currentDivisibilityCount (2) === highestScoreAchieved (2) is true.
 *    currentDivisorCandidate (3) < finalAnswerDivisor (2) is false. No update.
 * 4. Outer loop (divIndex = 2, currentDivisorCandidate = 5):
 *    currentDivisibilityCount = 0
 *    Inner loop (numIndex = 0, numberInArray = 4): 4 % 5 !== 0.
 *    Inner loop (numIndex = 1, numberInArray = 7): 7 % 5 !== 0.
 *    Inner loop (numIndex = 2, numberInArray = 9): 9 % 5 !== 0.
 *    Inner loop (numIndex = 3, numberInArray = 12): 12 % 5 !== 0.
 *    End inner loop. currentDivisibilityCount (0) is not > highestScoreAchieved (2). No update.
 * 5. End outer loop. Return finalAnswerDivisor = 2.
 * Time Complexity: O(M * N)
 * Space Complexity: O(1)
 */
var maxDivScore = function (nums, divisors) {
  let highestScoreAchieved = 0;
  let finalAnswerDivisor = divisors[0];

  for (let divIndex = 0; divIndex < divisors.length; divIndex++) {
    const currentDivisorCandidate = divisors[divIndex];
    let currentDivisibilityCount = 0;

    for (let numIndex = 0; numIndex < nums.length; numIndex++) {
      const numberInArray = nums[numIndex];
      if (numberInArray % currentDivisorCandidate === 0) {
        currentDivisibilityCount++;
      }
    }

    if (currentDivisibilityCount > highestScoreAchieved) {
      highestScoreAchieved = currentDivisibilityCount;
      finalAnswerDivisor = currentDivisorCandidate;
    } else if (currentDivisibilityCount === highestScoreAchieved) {
      if (currentDivisorCandidate < finalAnswerDivisor) {
        finalAnswerDivisor = currentDivisorCandidate;
      }
    }
  }

  return finalAnswerDivisor;
};
