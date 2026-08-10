/**
 * Maximum Value Of An Ordered Triplet I
 * Intuition: The problem asks for the maximum value of `(nums[i] - nums[j]) * nums[k]` for all ordered triplets `(i, j, k)` such that `i < j < k`. Given the constraint on the array length (up to 100), a straightforward brute-force approach that checks every possible combination of `i`, `j`, and `k` will be computationally feasible.
 * Approach: 1. Initialize a variable `maximumCalculatedValue` to 0. This variable will store the highest triplet value found and will serve as the default return value if all triplets yield negative results. 2. Iterate with `firstElementIndex` from the beginning of the array up to `nums.length - 3`. This range ensures there are at least two subsequent elements available for `j` and `k`. 3. Nested within the first loop, iterate with `secondElementIndex` starting from `firstElementIndex + 1` up to `nums.length - 2`. This guarantees `j` is strictly after `i` and leaves at least one element for `k`. 4. Compute `intermediateDifference = nums[firstElementIndex] - nums[secondElementIndex]`. If `intermediateDifference` is less than or equal to 0, skip to the next `secondElementIndex`. This optimization, as seen in the reference solution, avoids calculating products for non-positive differences, which often do not lead to the maximum positive value. 5. If `intermediateDifference` is positive, enter a third nested loop. Iterate with `thirdElementIndex` from `secondElementIndex + 1` up to `nums.length - 1`. This ensures `k` is strictly after `j`. 6. Calculate the triplet's value: `finalProduct = intermediateDifference * nums[thirdElementIndex]`. 7. Update `maximumCalculatedValue` by comparing it with `finalProduct`, storing the larger of the two using `Math.max()`. 8. After all possible triplets have been evaluated, return the `maximumCalculatedValue`.
 * Dry Run: For `nums = [10, 5, 2, 8, 1]`
 * `maximumCalculatedValue = 0`
 * `lengthOfArray = 5`
 * `firstElementIndex = 0` (`nums[0] = 10`)
 * `secondElementIndex = 1` (`nums[1] = 5`)
 * `intermediateDifference = 10 - 5 = 5` (positive)
 * `thirdElementIndex = 2` (`nums[2] = 2`): `finalProduct = 5 * 2 = 10`. `maximumCalculatedValue = Math.max(0, 10) = 10`.
 * `thirdElementIndex = 3` (`nums[3] = 8`): `finalProduct = 5 * 8 = 40`. `maximumCalculatedValue = Math.max(10, 40) = 40`.
 * `thirdElementIndex = 4` (`nums[4] = 1`): `finalProduct = 5 * 1 = 5`. `maximumCalculatedValue = Math.max(40, 5) = 40`.
 * `secondElementIndex = 2` (`nums[2] = 2`)
 * `intermediateDifference = 10 - 2 = 8` (positive)
 * `thirdElementIndex = 3` (`nums[3] = 8`): `finalProduct = 8 * 8 = 64`. `maximumCalculatedValue = Math.max(40, 64) = 64`.
 * `thirdElementIndex = 4` (`nums[4] = 1`): `finalProduct = 8 * 1 = 8`. `maximumCalculatedValue = Math.max(64, 8) = 64`.
 * `secondElementIndex = 3` (`nums[3] = 8`)
 * `intermediateDifference = 10 - 8 = 2` (positive)
 * `thirdElementIndex = 4` (`nums[4] = 1`): `finalProduct = 2 * 1 = 2`. `maximumCalculatedValue = Math.max(64, 2) = 64`.
 * `firstElementIndex = 1` (`nums[1] = 5`)
 * `secondElementIndex = 2` (`nums[2] = 2`)
 * `intermediateDifference = 5 - 2 = 3` (positive)
 * `thirdElementIndex = 3` (`nums[3] = 8`): `finalProduct = 3 * 8 = 24`. `maximumCalculatedValue = Math.max(64, 24) = 64`.
 * `thirdElementIndex = 4` (`nums[4] = 1`): `finalProduct = 3 * 1 = 3`. `maximumCalculatedValue = Math.max(64, 3) = 64`.
 * `secondElementIndex = 3` (`nums[3] = 8`)
 * `intermediateDifference = 5 - 8 = -3` (non-positive). The inner loop for `thirdElementIndex` is skipped.
 * `firstElementIndex = 2` (`nums[2] = 2`)
 * `secondElementIndex = 3` (`nums[3] = 8`)
 * `intermediateDifference = 2 - 8 = -6` (non-positive). The inner loop for `thirdElementIndex` is skipped.
 * All loops complete.
 * Return `maximumCalculatedValue = 64`.
 * Time Complexity: O(N^3)
 * Space Complexity: O(1)
 */
var maximumTripletValue = function (nums) {
  let maximumCalculatedValue = 0;

  let lengthOfArray = nums.length;

  for (
    let firstElementIndex = 0;
    firstElementIndex < lengthOfArray - 2;
    firstElementIndex++
  ) {
    for (
      let secondElementIndex = firstElementIndex + 1;
      secondElementIndex < lengthOfArray - 1;
      secondElementIndex++
    ) {
      let intermediateDifference =
        nums[firstElementIndex] - nums[secondElementIndex];
      if (intermediateDifference <= 0) {
        continue;
      }
      for (
        let thirdElementIndex = secondElementIndex + 1;
        thirdElementIndex < lengthOfArray;
        thirdElementIndex++
      ) {
        let finalProduct = intermediateDifference * nums[thirdElementIndex];
        maximumCalculatedValue = Math.max(maximumCalculatedValue, finalProduct);
      }
    }
  }

  return maximumCalculatedValue;
};
