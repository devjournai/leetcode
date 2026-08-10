/**
 * Maximum Strong Pair Xor I
 * Intuition: Sorting the array simplifies the strong pair condition and allows for an optimized nested loop approach. For a sorted array where `x <= y`, the condition `|x - y| <= min(x, y)` simplifies to `y - x <= x`, which further reduces to `y <= 2x`. This simplification, combined with the sorted order, enables early termination of the inner loop when the strong pair condition is no longer met.
 * Approach: 1. Sort the input array `nums` in non-decreasing order. This allows us to work with the simplified strong pair condition `y <= 2x`.
 *           2. Initialize `maxOverallXor` to `0` to store the maximum XOR value found among all strong pairs.
 *           3. Iterate through the sorted array using an `outerIndex` from the beginning to the end. Let the number at `outerIndex` be `firstOperand`.
 *           4. For each `firstOperand`, iterate with an `innerIndex` starting from the `outerIndex` to the end of the array. Let the number at `innerIndex` be `secondOperand`.
 *           5. Check if the pair `(firstOperand, secondOperand)` forms a strong pair using the simplified condition: `secondOperand <= 2 * firstOperand`.
 *           6. If the condition is met, calculate their bitwise XOR value (`firstOperand ^ secondOperand`) and update `maxOverallXor` if this new XOR value is greater than the current `maxOverallXor`.
 *           7. If the condition is NOT met (`secondOperand > 2 * firstOperand`), then because the array `nums` is sorted, any subsequent `secondOperand` values (with an even larger `innerIndex`) will also be greater than `2 * firstOperand`. Thus, we can `break` out of the inner loop, optimizing the search.
 *           8. After iterating through all possible strong pairs, return the final `maxOverallXor`.
 * Dry Run: nums = [1, 2, 3]
 *           1. nums = [1, 2, 3] (after in-place sorting)
 *           2. maxOverallXor = 0
 *           3. outerIndex = 0, firstOperand = 1
 *              - innerIndex = 0, secondOperand = 1
 *                - Condition: 1 <= 2 * 1 (True). currentXorResult = 1 ^ 1 = 0. maxOverallXor = max(0, 0) = 0.
 *              - innerIndex = 1, secondOperand = 2
 *                - Condition: 2 <= 2 * 1 (True). currentXorResult = 1 ^ 2 = 3. maxOverallXor = max(0, 3) = 3.
 *              - innerIndex = 2, secondOperand = 3
 *                - Condition: 3 <= 2 * 1 (False, 3 > 2). Break inner loop.
 *           4. outerIndex = 1, firstOperand = 2
 *              - innerIndex = 1, secondOperand = 2
 *                - Condition: 2 <= 2 * 2 (True). currentXorResult = 2 ^ 2 = 0. maxOverallXor = max(3, 0) = 3.
 *              - innerIndex = 2, secondOperand = 3
 *                - Condition: 3 <= 2 * 2 (True, 3 <= 4). currentXorResult = 2 ^ 3 = 1. maxOverallXor = max(3, 1) = 3.
 *           5. outerIndex = 2, firstOperand = 3
 *              - innerIndex = 2, secondOperand = 3
 *                - Condition: 3 <= 2 * 3 (True). currentXorResult = 3 ^ 3 = 0. maxOverallXor = max(3, 0) = 3.
 *           Return 3.
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */
var maximumStrongPairXor = function (nums) {
  nums.sort((valA, valB) => valA - valB);

  let maxOverallXor = 0;
  let totalElements = nums.length;

  for (let outerIndex = 0; outerIndex < totalElements; outerIndex++) {
    let firstOperand = nums[outerIndex];
    for (
      let innerIndex = outerIndex;
      innerIndex < totalElements;
      innerIndex++
    ) {
      let secondOperand = nums[innerIndex];

      if (secondOperand <= 2 * firstOperand) {
        let currentXorResult = firstOperand ^ secondOperand;
        maxOverallXor = Math.max(maxOverallXor, currentXorResult);
      } else {
        break;
      }
    }
  }

  return maxOverallXor;
};
