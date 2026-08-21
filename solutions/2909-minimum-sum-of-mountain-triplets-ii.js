/**
 * Minimum Sum Of Mountain Triplets Ii
 * Intuition: A mountain triplet (i, j, k) implies nums[i] < nums[j] and nums[k] < nums[j] with i < j < k. To minimize the sum, for any potential peak `nums[j]`, we must find the smallest possible `nums[i]` to its left and the smallest `nums[k]` to its right, satisfying the conditions.
 * Approach: 1. Precompute an array `leftMinimums` where `leftMinimums[x]` stores the minimum value found in `nums[0...x]`. This helps to quickly get `nums[i]` for `i < j`. 2. Precompute an array `rightMinimums` where `rightMinimums[x]` stores the minimum value found in `nums[x...n-1]`. This helps to quickly get `nums[k]` for `k > j`. 3. Iterate through the array with `j` from `1` to `n-2` (potential peak indices). For each `j`, check if `nums[j]` is greater than `leftMinimums[j-1]` AND `nums[j]` is greater than `rightMinimums[j+1]`. 4. If both conditions are met, calculate the sum `leftMinimums[j-1] + nums[j] + rightMinimums[j+1]` and update the overall minimum sum found so far. 5. If no such triplet is found, return -1; otherwise, return the calculated minimum sum.
 * Dry Run: nums = [8, 6, 1, 5, 3]
 * 1. `arrayLength` = 5
 * 2. Initialize `leftMinimums` array of size 5 with `Infinity`.
 *    `leftMinimums[0]` = `nums[0]` = 8
 *    Loop `loopIndexOne` from 1 to 4:
 *      `loopIndexOne` = 1: `leftMinimums[1]` = `Math.min(leftMinimums[0], nums[1])` = `Math.min(8, 6)` = 6
 *      `loopIndexOne` = 2: `leftMinimums[2]` = `Math.min(leftMinimums[1], nums[2])` = `Math.min(6, 1)` = 1
 *      `loopIndexOne` = 3: `leftMinimums[3]` = `Math.min(leftMinimums[2], nums[3])` = `Math.min(1, 5)` = 1
 *      `loopIndexOne` = 4: `leftMinimums[4]` = `Math.min(leftMinimums[3], nums[4])` = `Math.min(1, 3)` = 1
 *    `leftMinimums` = [8, 6, 1, 1, 1]
 * 3. Initialize `rightMinimums` array of size 5 with `Infinity`.
 *    `rightMinimums[4]` = `nums[4]` = 3
 *    Loop `loopIndexTwo` from 3 down to 0:
 *      `loopIndexTwo` = 3: `rightMinimums[3]` = `Math.min(rightMinimums[4], nums[3])` = `Math.min(3, 5)` = 3
 *      `loopIndexTwo` = 2: `rightMinimums[2]` = `Math.min(rightMinimums[3], nums[2])` = `Math.min(3, 1)` = 1
 *      `loopIndexTwo` = 1: `rightMinimums[1]` = `Math.min(rightMinimums[2], nums[1])` = `Math.min(1, 6)` = 1
 *      `loopIndexTwo` = 0: `rightMinimums[0]` = `Math.min(rightMinimums[1], nums[0])` = `Math.min(1, 8)` = 1
 *    `rightMinimums` = [1, 1, 1, 3, 3]
 * 4. Initialize `overallMinimumSum` = `Infinity`, `sentinelValue` = `Infinity`.
 *    Loop `loopIndexThree` (j) from 1 to 3:
 *      `loopIndexThree` = 1 (j=1): `currentPeakValue` = `nums[1]` = 6
 *        `leftCandidate` = `leftMinimums[0]` = 8
 *        `rightCandidate` = `rightMinimums[2]` = 1
 *        Condition: (6 > 8) && (6 > 1) -> `false` (6 > 8 is false). Skip.
 *      `loopIndexThree` = 2 (j=2): `currentPeakValue` = `nums[2]` = 1
 *        `leftCandidate` = `leftMinimums[1]` = 6
 *        `rightCandidate` = `rightMinimums[3]` = 3
 *        Condition: (1 > 6) && (1 > 3) -> `false` (1 > 6 is false). Skip.
 *      `loopIndexThree` = 3 (j=3): `currentPeakValue` = `nums[3]` = 5
 *        `leftCandidate` = `leftMinimums[2]` = 1
 *        `rightCandidate` = `rightMinimums[4]` = 3
 *        Condition: (5 > 1) && (5 > 3) -> `true` && `true` -> `true`.
 *        `potentialSum` = `1 + 5 + 3` = 9
 *        `overallMinimumSum` = `Math.min(Infinity, 9)` = 9
 * 5. `returnResult` = `overallMinimumSum === sentinelValue ? -1 : overallMinimumSum`
 *    `returnResult` = `9 === Infinity ? -1 : 9` = 9.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var minimumSum = function (nums) {
  const arrayLength = nums.length;
  const leftMinimums = new Array(arrayLength).fill(Infinity);
  const rightMinimums = new Array(arrayLength).fill(Infinity);

  leftMinimums[0] = nums[0];
  for (let loopIndexOne = 1; loopIndexOne < arrayLength; loopIndexOne++) {
    leftMinimums[loopIndexOne] = Math.min(
      leftMinimums[loopIndexOne - 1],
      nums[loopIndexOne]
    );
  }

  rightMinimums[arrayLength - 1] = nums[arrayLength - 1];
  for (let loopIndexTwo = arrayLength - 2; loopIndexTwo >= 0; loopIndexTwo--) {
    rightMinimums[loopIndexTwo] = Math.min(
      rightMinimums[loopIndexTwo + 1],
      nums[loopIndexTwo]
    );
  }

  let overallMinimumSum = Infinity;
  const sentinelValue = Infinity;

  for (
    let loopIndexThree = 1;
    loopIndexThree < arrayLength - 1;
    loopIndexThree++
  ) {
    const currentPeakValue = nums[loopIndexThree];
    const leftCandidate = leftMinimums[loopIndexThree - 1];
    const rightCandidate = rightMinimums[loopIndexThree + 1];

    if (currentPeakValue > leftCandidate && currentPeakValue > rightCandidate) {
      const potentialSum = leftCandidate + currentPeakValue + rightCandidate;
      overallMinimumSum = Math.min(overallMinimumSum, potentialSum);
    }
  }

  const returnResult =
    overallMinimumSum === sentinelValue ? -1 : overallMinimumSum;
  return returnResult;
};
