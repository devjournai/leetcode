/**
 * Merge Operations To Turn Array Into A Palindrome
 * Intuition: To make an array a palindrome with minimum operations, we need its effective elements from both ends to match. If they don't, we must merge elements on the side with the smaller sum until it matches or exceeds the sum of the other side, incurring one operation for each merge. This greedy strategy aims to balance the sums from the ends.
 * Approach: 1. Initialize two pointers, `frontIndex` at the start and `backIndex` at the end, along with their respective cumulative sums, `currentFrontBlockSum` and `currentBackBlockSum`. An `operationCountValue` tracks the merges. 2. Iterate while `frontIndex` is less than `backIndex`. 3. If `currentFrontBlockSum` and `currentBackBlockSum` are equal, it means we have a matching pair. Advance both pointers inward, and if they haven't crossed, reinitialize their sums with the new elements. 4. If the sums are not equal, the side with the smaller sum must be expanded by merging its next adjacent element. Increment the corresponding pointer, add the new element's value to its sum, and increment `operationCountValue`. 5. The loop continues until `frontIndex` meets or crosses `backIndex`, at which point the array is a palindrome (or a single element/empty, which is trivially a palindrome). 6. Return `operationCountValue`.
 * Dry Run: nums = [1, 2, 3, 1]
 *   - Initialize: `frontIndex = 0`, `backIndex = 3`, `currentFrontBlockSum = nums[0] = 1`, `currentBackBlockSum = nums[3] = 1`, `operationCountValue = 0`.
 *   - Loop (0 < 3):
 *     - `currentFrontBlockSum` (1) === `currentBackBlockSum` (1).
 *     - `frontIndex` becomes 1, `backIndex` becomes 2.
 *     - `frontIndex` (1) < `backIndex` (2) is true.
 *     - `currentFrontBlockSum` reinitialized to `nums[1] = 2`.
 *     - `currentBackBlockSum` reinitialized to `nums[2] = 3`.
 *     - Continue to next iteration.
 *   - Loop (1 < 2):
 *     - `currentFrontBlockSum` (2) !== `currentBackBlockSum` (3).
 *     - `currentFrontBlockSum` (2) < `currentBackBlockSum` (3).
 *     - `frontIndex` becomes 2.
 *     - `currentFrontBlockSum` adds `nums[2]`: `2 + 3 = 5`.
 *     - `operationCountValue` becomes 1.
 *   - Loop (2 < 2) is false. Loop terminates.
 *   - Return `operationCountValue = 1`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumOperations = function (nums) {
  let frontIndex = 0;
  let backIndex = nums.length - 1;
  let currentFrontBlockSum = nums[frontIndex];
  let currentBackBlockSum = nums[backIndex];
  let operationCountValue = 0;

  while (frontIndex < backIndex) {
    if (currentFrontBlockSum === currentBackBlockSum) {
      frontIndex++;
      backIndex--;
      if (frontIndex < backIndex) {
        currentFrontBlockSum = nums[frontIndex];
        currentBackBlockSum = nums[backIndex];
      } else if (frontIndex === backIndex) {
        break;
      }
      continue;
    }

    if (currentFrontBlockSum < currentBackBlockSum) {
      frontIndex++;
      currentFrontBlockSum += nums[frontIndex];
    } else {
      // currentFrontBlockSum > currentBackBlockSum
      backIndex--;
      currentBackBlockSum += nums[backIndex];
    }
    operationCountValue++;
  }

  return operationCountValue;
};
