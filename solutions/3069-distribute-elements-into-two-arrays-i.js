/**
 * Distribute Elements Into Two Arrays I
 * Intuition: Follow the rules strictly for distributing elements: initialize two arrays with the first two elements, then iterate through the remaining elements, appending each to the array whose last element is greater.
 * Approach: 1. Initialize `firstArray` with `nums[0]` and `secondArray` with `nums[1]`. 2. Iterate from the third element of `nums` (index 2) to the end. 3. For each element, compare the last element of `firstArray` with the last element of `secondArray`. 4. If `firstArray`'s last element is greater, append the current `nums` element to `firstArray`; otherwise, append it to `secondArray`. 5. Concatenate `firstArray` and `secondArray` to produce the final result.
 * Dry Run: nums = [2,1,3]
 * 1. `firstArray` is initialized to `[2]`.
 * 2. `secondArray` is initialized to `[1]`.
 * 3. Loop starts from `elementIndex = 2` (for `nums[2] = 3`):
 *    a. `lastElementFirst` (`firstArray[0]`) is `2`.
 *    b. `lastElementSecond` (`secondArray[0]`) is `1`.
 *    c. `2` is greater than `1`.
 *    d. `nums[2]` which is `3` is pushed to `firstArray`. `firstArray` becomes `[2, 3]`.
 * 4. Loop finishes.
 * 5. `combinedOutcome` is `[...firstArray, ...secondArray]` which is `[2, 3, 1]`.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var resultArray = function (nums) {
  const firstArray = [nums[0]];
  const secondArray = [nums[1]];

  for (let elementIndex = 2; elementIndex < nums.length; elementIndex++) {
    const lastIndexFirst = firstArray.length - 1;
    const lastElementFirst = firstArray[lastIndexFirst];

    const lastIndexSecond = secondArray.length - 1;
    const lastElementSecond = secondArray[lastIndexSecond];

    if (lastElementFirst > lastElementSecond) {
      firstArray.push(nums[elementIndex]);
    } else {
      secondArray.push(nums[elementIndex]);
    }
  }

  const combinedOutcome = [...firstArray, ...secondArray];
  return combinedOutcome;
};
