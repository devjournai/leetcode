/**
 * Maximum Difference Between Increasing Elements
 * Intuition: To find the maximum difference between two elements `nums[j] - nums[i]` where `i < j` and `nums[i] < nums[j]`, we can process the array linearly. We maintain the smallest element encountered so far and for each subsequent element, we calculate the potential difference with this minimum. If the current element is greater than the running minimum, we update our maximum difference. We also continually update the running minimum to ensure we always have the best candidate for `nums[i]`.
 * Approach: 1. Initialize a variable `maximumDifferenceValue` to -1 to store the maximum difference found, handling the case where no valid pair exists. 2. Initialize `minimumElementSoFar` with the first element of the `nums` array. 3. Iterate through the `nums` array starting from the second element. 4. For each `currentArrayElement` during the iteration: a. If `currentArrayElement` is greater than `minimumElementSoFar`, calculate `currentDifference = currentArrayElement - minimumElementSoFar`. b. Update `maximumDifferenceValue` to be the maximum of its current value and `currentDifference`. c. Update `minimumElementSoFar` to be the minimum of its current value and `currentArrayElement`. 5. After the loop completes, return `maximumDifferenceValue`.
 * Dry Run: nums = [7, 1, 5, 4]
 * - Initialize `maximumDifferenceValue = -1`, `minimumElementSoFar = 7`, `iteratorIndex = 1`, `arraySize = 4`.
 *
 * - Loop 1 (`iteratorIndex = 1`):
 *   - `currentArrayElement = nums[1] = 1`.
 *   - `1 > 7` is false.
 *   - `minimumElementSoFar = Math.min(7, 1) = 1`.
 *   - `iteratorIndex` becomes 2.
 *
 * - Loop 2 (`iteratorIndex = 2`):
 *   - `currentArrayElement = nums[2] = 5`.
 *   - `5 > 1` is true.
 *   - `currentDifference = 5 - 1 = 4`.
 *   - `maximumDifferenceValue = Math.max(-1, 4) = 4`.
 *   - `minimumElementSoFar = Math.min(1, 5) = 1`.
 *   - `iteratorIndex` becomes 3.
 *
 * - Loop 3 (`iteratorIndex = 3`):
 *   - `currentArrayElement = nums[3] = 4`.
 *   - `4 > 1` is true.
 *   - `currentDifference = 4 - 1 = 3`.
 *   - `maximumDifferenceValue = Math.max(4, 3) = 4`.
 *   - `minimumElementSoFar = Math.min(1, 4) = 1`.
 *   - `iteratorIndex` becomes 4.
 *
 * - Loop terminates as `iteratorIndex` (4) is not less than `arraySize` (4).
 *
 * - Return `maximumDifferenceValue = 4`.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maximumDifference = function (nums) {
  let maximumDifferenceValue = -1;
  let minimumElementSoFar = nums[0];
  let iteratorIndex = 1;
  let arraySize = nums.length;

  while (iteratorIndex < arraySize) {
    let currentArrayElement = nums[iteratorIndex];
    if (currentArrayElement > minimumElementSoFar) {
      let currentDifference = currentArrayElement - minimumElementSoFar;
      maximumDifferenceValue = Math.max(
        maximumDifferenceValue,
        currentDifference
      );
    }
    minimumElementSoFar = Math.min(minimumElementSoFar, currentArrayElement);
    iteratorIndex++;
  }

  return maximumDifferenceValue;
};
