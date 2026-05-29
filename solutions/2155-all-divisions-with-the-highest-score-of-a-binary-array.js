/**
 * All Divisions With The Highest Score Of A Binary Array
 * Intuition: The score for a division at index `i` depends on the count of zeros in the left part and ones in the right part. When moving the division point from `i` to `i+1`, the element `nums[i]` transitions from the right part to the left part. We can efficiently update the counts of left zeros and right ones in a single pass.
 * Approach: 1. Initialize `rightSideOneCount` by summing all '1's in the entire array. This is the count of '1's for `i=0` (where `numsleft` is empty).
 * 2. Initialize `leftSideZeroCount` to 0.
 * 3. Calculate the initial `highestOverallScore` for `i=0` as `leftSideZeroCount + rightSideOneCount`.
 * 4. Initialize `outputIndices` with `[0]` as `i=0` currently holds the highest score.
 * 5. Iterate through the `nums` array from `loopIndex = 0` to `arrayLength - 1`.
 * 6. In each iteration, consider `nums[loopIndex]` as the element moving from `numsright` to `numsleft` to determine the score for the division point `loopIndex + 1`.
 * 7. If `nums[loopIndex]` is '0', increment `leftSideZeroCount`.
 * 8. If `nums[loopIndex]` is '1', decrement `rightSideOneCount`.
 * 9. Calculate `currentScoreCalculation` for the new division point (`loopIndex + 1`) as `leftSideZeroCount + rightSideOneCount`.
 * 10. Compare `currentScoreCalculation` with `highestOverallScore`:
 *     - If `currentScoreCalculation` is greater, update `highestOverallScore`, clear `outputIndices`, and add `loopIndex + 1`.
 *     - If `currentScoreCalculation` is equal, add `loopIndex + 1` to `outputIndices`.
 * 11. After the loop, `outputIndices` will contain all distinct indices with the highest possible division score.
 * Dry Run: nums = [0,0,1,0]
 * arrayLength = 4
 *
 * 1. Initialize:
 *    rightSideOneCount = nums.reduce((acc, val) => acc + val, 0) = 0+0+1+0 = 1
 *    leftSideZeroCount = 0
 *    highestOverallScore = leftSideZeroCount + rightSideOneCount = 0 + 1 = 1
 *    outputIndices = [0]
 *
 * 2. Loop `loopIndex` from 0 to 3:
 *    - `loopIndex = 0`: itemValue = nums[0] = 0
 *      - itemValue (0) is 0: leftSideZeroCount = 0 + 1 = 1
 *      - itemValue (0) is not 1: rightSideOneCount remains 1
 *      - currentScoreCalculation = leftSideZeroCount + rightSideOneCount = 1 + 1 = 2
 *      - finalDivisionPoint = 0 + 1 = 1
 *      - currentScoreCalculation (2) > highestOverallScore (1):
 *        highestOverallScore = 2
 *        outputIndices = [1]
 *
 *    - `loopIndex = 1`: itemValue = nums[1] = 0
 *      - itemValue (0) is 0: leftSideZeroCount = 1 + 1 = 2
 *      - itemValue (0) is not 1: rightSideOneCount remains 1
 *      - currentScoreCalculation = leftSideZeroCount + rightSideOneCount = 2 + 1 = 3
 *      - finalDivisionPoint = 1 + 1 = 2
 *      - currentScoreCalculation (3) > highestOverallScore (2):
 *        highestOverallScore = 3
 *        outputIndices = [2]
 *
 *    - `loopIndex = 2`: itemValue = nums[2] = 1
 *      - itemValue (1) is not 0: leftSideZeroCount remains 2
 *      - itemValue (1) is 1: rightSideOneCount = 1 - 1 = 0
 *      - currentScoreCalculation = leftSideZeroCount + rightSideOneCount = 2 + 0 = 2
 *      - finalDivisionPoint = 2 + 1 = 3
 *      - currentScoreCalculation (2) is not > highestOverallScore (3)
 *      - currentScoreCalculation (2) is not === highestOverallScore (3)
 *        outputIndices remains [2]
 *
 *    - `loopIndex = 3`: itemValue = nums[3] = 0
 *      - itemValue (0) is 0: leftSideZeroCount = 2 + 1 = 3
 *      - itemValue (0) is not 1: rightSideOneCount remains 0
 *      - currentScoreCalculation = leftSideZeroCount + rightSideOneCount = 3 + 0 = 3
 *      - finalDivisionPoint = 3 + 1 = 4
 *      - currentScoreCalculation (3) is not > highestOverallScore (3)
 *      - currentScoreCalculation (3) === highestOverallScore (3):
 *        outputIndices.push(4) -> outputIndices = [2, 4]
 *
 * 3. Loop ends.
 * 4. Return outputIndices = [2, 4].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxScoreIndices = function (nums) {
  const arrayLength = nums.length;
  let outputIndices = [];

  let rightSideOneCount = 0;
  for (let currentNum of nums) {
    if (currentNum === 1) {
      rightSideOneCount++;
    }
  }

  let leftSideZeroCount = 0;
  let highestOverallScore = leftSideZeroCount + rightSideOneCount;
  outputIndices.push(0);

  for (let loopIndex = 0; loopIndex < arrayLength; loopIndex++) {
    const itemValue = nums[loopIndex];

    if (itemValue === 0) {
      leftSideZeroCount++;
    } else {
      rightSideOneCount--;
    }

    const currentScoreCalculation = leftSideZeroCount + rightSideOneCount;
    const finalDivisionPoint = loopIndex + 1;

    if (currentScoreCalculation > highestOverallScore) {
      highestOverallScore = currentScoreCalculation;
      outputIndices = [finalDivisionPoint];
    } else if (currentScoreCalculation === highestOverallScore) {
      outputIndices.push(finalDivisionPoint);
    }
  }

  return outputIndices;
};
