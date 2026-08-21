/**
 * Maximum Score From Performing Multiplication Operations
 * Intuition: Each operation multiplies the next multiplier by either the remaining leftmost or rightmost `nums` value. DP over (operations used, left picks) tracks the best score without enumerating both ends explicitly.
 * Approach: 1. `dpScores[op][left]` is the best score after `op` operations with `left` picks from the front. 2. For each operation, try taking the next left element or the matching right element `nums[numLength - rightTaken]`. 3. Take the max of feasible options. 4. Return the max over `dpScores[multipliersCount][*]`.
 * Dry Run: nums = [1,2,3], multipliers = [3,2].
 *   - op1 left: 3*1=3; op1 right: 3*3=9. op2 from 9 with left: 9+2*1=11; from 3 with right: 3+2*3=9. Max 11.
 * Time Complexity: O(m^2)
 * Space Complexity: O(m^2)
 */
var maximumScore = function (nums, multipliers) {
  const numLength = nums.length;
  const multipliersCount = multipliers.length;

  const dpScores = Array.from({ length: multipliersCount + 1 }, () =>
    Array(multipliersCount + 1).fill(0)
  );

  for (
    let currentOperationNumber = 1;
    currentOperationNumber <= multipliersCount;
    currentOperationNumber++
  ) {
    const currentMultiplierIndex = currentOperationNumber - 1;
    const currentMultiplierValue = multipliers[currentMultiplierIndex];

    for (
      let pickedLeftCount = 0;
      pickedLeftCount <= currentOperationNumber;
      pickedLeftCount++
    ) {
      let scoreFromLeftPick = -Infinity;
      if (pickedLeftCount > 0) {
        const previousLeftElementIndex = pickedLeftCount - 1;
        scoreFromLeftPick =
          dpScores[currentOperationNumber - 1][pickedLeftCount - 1] +
          currentMultiplierValue * nums[previousLeftElementIndex];
      }

      let scoreFromRightPick = -Infinity;
      if (pickedLeftCount < currentOperationNumber) {
        const currentRightElementsTaken =
          currentOperationNumber - pickedLeftCount;
        const previousRightElementIndex = numLength - currentRightElementsTaken;
        scoreFromRightPick =
          dpScores[currentOperationNumber - 1][pickedLeftCount] +
          currentMultiplierValue * nums[previousRightElementIndex];
      }

      if (pickedLeftCount === 0) {
        dpScores[currentOperationNumber][pickedLeftCount] = scoreFromRightPick;
      } else if (pickedLeftCount === currentOperationNumber) {
        dpScores[currentOperationNumber][pickedLeftCount] = scoreFromLeftPick;
      } else {
        dpScores[currentOperationNumber][pickedLeftCount] = Math.max(
          scoreFromLeftPick,
          scoreFromRightPick
        );
      }
    }
  }

  let maximumFinalScore = -Infinity;
  for (
    let finalLeftCount = 0;
    finalLeftCount <= multipliersCount;
    finalLeftCount++
  ) {
    maximumFinalScore = Math.max(
      maximumFinalScore,
      dpScores[multipliersCount][finalLeftCount]
    );
  }

  return maximumFinalScore;
};
