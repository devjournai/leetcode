/**
 * Minimum Moves to Make Array Complementary
 * Intuition: For each pair of numbers (nums[i], nums[n - 1 - i]), the number of moves required to make their sum equal to a target value 'S' varies between 0, 1, and 2. Specifically, it's 0 moves if the pair already sums to S, 1 move if one of the numbers can be changed to achieve S (within the limit), and 2 moves otherwise. This behavior creates distinct cost ranges for 'S'. A difference array (or sweep-line algorithm) can efficiently aggregate these cost changes across all pairs and determine the minimum total moves for any possible target sum.
 * Approach: 1. Initialize a `deltaChanges` array of size `2 * limit + 2` with zeros. This array will store how the total number of moves changes for different target sums. 2. Iterate through `n / 2` pairs of complementary elements (nums[i], nums[n - 1 - i]). For each pair: a. Calculate `pairCurrentSum` (nums[i] + nums[n - 1 - i]). b. Determine `lowerBoundOneMove` (min(nums[i], nums[n - 1 - i]) + 1). c. Determine `upperBoundOneMove` (max(nums[i], nums[n - 1 - i]) + limit). d. Apply updates to `deltaChanges`: i. Increment `deltaChanges[2]` by 2 (representing the initial assumption of 2 moves for this pair if target sum is 2). ii. Decrement `deltaChanges[lowerBoundOneMove]` by 1 (cost drops from 2 to 1). iii. Decrement `deltaChanges[pairCurrentSum]` by 1 (cost drops from 1 to 0). iv. Increment `deltaChanges[pairCurrentSum + 1]` by 1 (cost rises from 0 to 1). v. Increment `deltaChanges[upperBoundOneMove + 1]` by 1 (cost rises from 1 to 2). 3. Initialize `minimumAchievedMoves` to `n` (total elements, maximum possible moves). 4. Initialize `currentSweepMoves` to 0. 5. Iterate `targetSumCandidate` from 2 up to `2 * limit`: a. Add `deltaChanges[targetSumCandidate]` to `currentSweepMoves`. b. Update `minimumAchievedMoves = Math.min(minimumAchievedMoves, currentSweepMoves)`. 6. Return `minimumAchievedMoves`.
 * Dry Run: nums = [1, 2], limit = 2
    1. `arrayLength` = 2.
    2. `deltaChanges` = `new Array(6).fill(0)` = `[0,0,0,0,0,0]`
    3. Iterate `pairIndex` from 0 to `arrayLength / 2 - 1` (0 to 0):
        `pairIndex` = 0:
        `elementOne` = `nums[0]` = 1
        `elementTwo` = `nums[1]` = 2
        `minimumVal` = `Math.min(1, 2)` = 1
        `maximumVal` = `Math.max(1, 2)` = 2
        `pairCurrentSum` = `1 + 2` = 3
        `lowerBoundOneMove` = `minimumVal + 1` = `1 + 1` = 2
        `upperBoundOneMove` = `maximumVal + limit` = `2 + 2` = 4
      Updates to `deltaChanges`:
        `deltaChanges[2] += 2` -> `deltaChanges` = `[0,0,2,0,0,0]`
        `deltaChanges[lowerBoundOneMove]` (`deltaChanges[2]`) `-= 1` -> `deltaChanges` = `[0,0,1,0,0,0]`
        `deltaChanges[pairCurrentSum]` (`deltaChanges[3]`) `-= 1` -> `deltaChanges` = `[0,0,1,-1,0,0]`
        `deltaChanges[pairCurrentSum + 1]` (`deltaChanges[4]`) `+= 1` -> `deltaChanges` = `[0,0,1,-1,1,0]`
        `deltaChanges[upperBoundOneMove + 1]` (`deltaChanges[5]`) `+= 1` -> `deltaChanges` = `[0,0,1,-1,1,1]`
    4. `minimumAchievedMoves` = `arrayLength` = 2.
    5. `currentSweepMoves` = 0.
    6. Iterate `targetSumCandidate` from 2 to `2 * limit` (2 to 4):
        `targetSumCandidate` = 2:
        `currentSweepMoves += deltaChanges[2]` = `0 + 1` = 1
        `minimumAchievedMoves = Math.min(2, 1)` = 1
        `targetSumCandidate` = 3:
        `currentSweepMoves += deltaChanges[3]` = `1 + (-1)` = 0
        `minimumAchievedMoves = Math.min(1, 0)` = 0
        `targetSumCandidate` = 4:
        `currentSweepMoves += deltaChanges[4]` = `0 + 1` = 1
        `minimumAchievedMoves = Math.min(0, 1)` = 0
    7. Return `minimumAchievedMoves` = 0.
 * Time Complexity: O(n + limit)
 * Space Complexity: O(limit)
*/
var minMoves = function (nums, limit) {
  const arrayLength = nums.length;
  const deltaChanges = new Array(2 * limit + 2).fill(0);
  let minimumAchievedMoves = arrayLength;

  for (let pairIndex = 0; pairIndex < arrayLength / 2; pairIndex++) {
    const elementOne = nums[pairIndex];
    const elementTwo = nums[arrayLength - 1 - pairIndex];

    const minimumVal = Math.min(elementOne, elementTwo);
    const maximumVal = Math.max(elementOne, elementTwo);
    const pairCurrentSum = elementOne + elementTwo;

    const lowerBoundOneMove = minimumVal + 1;
    const upperBoundOneMove = maximumVal + limit;

    deltaChanges[2] += 2;
    deltaChanges[lowerBoundOneMove] -= 1;
    deltaChanges[pairCurrentSum] -= 1;
    deltaChanges[pairCurrentSum + 1] += 1;
    deltaChanges[upperBoundOneMove + 1] += 1;
  }

  let currentSweepMoves = 0;
  for (
    let targetSumCandidate = 2;
    targetSumCandidate <= 2 * limit;
    targetSumCandidate++
  ) {
    currentSweepMoves += deltaChanges[targetSumCandidate];
    minimumAchievedMoves = Math.min(minimumAchievedMoves, currentSweepMoves);
  }

  return minimumAchievedMoves;
};
