/**
 * Find The Middle Index In Array
 * Intuition: The problem asks for an index where the sum of elements to its left equals the sum of elements to its right. This can be efficiently solved by first calculating the total sum of all elements. Then, a single pass through the array can determine if such an index exists by maintaining a running sum of elements to the left and deriving the sum of elements to the right.
 * Approach: 1. Calculate the `sumAllNumbers` by iterating through the input array `nums`. 2. Initialize a variable `currentLeftPartSum` to 0, which will accumulate sums of elements to the left of the current index. 3. Iterate through the array using an `iteratedIndex` from 0 to `nums.length - 1`. 4. Inside the loop, calculate `rightPartSum` for the current `iteratedIndex`. This is `sumAllNumbers - currentLeftPartSum - nums[iteratedIndex]`. This represents the sum of all elements strictly to the right of `iteratedIndex`. 5. Compare `currentLeftPartSum` with `rightPartSum`. If they are equal, `iteratedIndex` is a valid middle index. Since we need the leftmost one, return `iteratedIndex` immediately. 6. After the comparison, update `currentLeftPartSum` by adding `nums[iteratedIndex]` to it. This prepares `currentLeftPartSum` to represent the sum of elements to the left of the *next* index in the subsequent iteration. 7. If the loop completes without finding any middle index, return -1.
 * Dry Run: For `nums = [2, 3, -1, 8, 4]`
 *   1. `sumAllNumbers = 2 + 3 + (-1) + 8 + 4 = 16`
 *   2. `currentLeftPartSum = 0`
 *   3. Loop `iteratedIndex` from 0 to 4:
 *      - `iteratedIndex = 0`: `nums[0] = 2`
 *        - `rightPartSum = 16 - 0 - 2 = 14`
 *        - Is `0 === 14`? No.
 *        - `currentLeftPartSum = 0 + 2 = 2`
 *      - `iteratedIndex = 1`: `nums[1] = 3`
 *        - `rightPartSum = 16 - 2 - 3 = 11`
 *        - Is `2 === 11`? No.
 *        - `currentLeftPartSum = 2 + 3 = 5`
 *      - `iteratedIndex = 2`: `nums[2] = -1`
 *        - `rightPartSum = 16 - 5 - (-1) = 12`
 *        - Is `5 === 12`? No.
 *        - `currentLeftPartSum = 5 + (-1) = 4`
 *      - `iteratedIndex = 3`: `nums[3] = 8`
 *        - `rightPartSum = 16 - 4 - 8 = 4`
 *        - Is `4 === 4`? Yes.
 *        - Return `3`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var findMiddleIndex = function (nums) {
  let sumAllNumbers = nums.reduce(
    (initialValue, currentNumber) => initialValue + currentNumber,
    0
  );
  let currentLeftPartSum = 0;

  for (let iteratedIndex = 0; iteratedIndex < nums.length; iteratedIndex++) {
    let rightPartSum = sumAllNumbers - currentLeftPartSum - nums[iteratedIndex];

    if (currentLeftPartSum === rightPartSum) {
      return iteratedIndex;
    }

    currentLeftPartSum += nums[iteratedIndex];
  }

  return -1;
};
