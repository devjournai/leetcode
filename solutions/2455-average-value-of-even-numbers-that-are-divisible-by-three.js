/**
 * Average Value Of Even Numbers That Are Divisible By Three
 * Intuition: An integer is both even and divisible by three if and only if it is divisible by their least common multiple, which is six. Therefore, we need to find the average of all multiples of six in the given array.
 * Approach: 1. Initialize a variable `currentTotalSum` to store the sum of qualifying numbers and `currentTotalCount` to store the count of qualifying numbers, both starting at zero. 2. Iterate through each element in the input array `nums` using an index-based `for` loop. 3. For each `currentNumberInLoop`, check if it is perfectly divisible by 6 (i.e., `currentNumberInLoop % 6 === 0`). 4. If the condition is true, add `currentNumberInLoop` to `currentTotalSum` and increment `currentTotalCount`. 5. After the loop completes, check if `currentTotalCount` is greater than zero. 6. If `currentTotalCount` is positive, calculate the average by dividing `currentTotalSum` by `currentTotalCount` and rounding down using `Math.floor()`. 7. Otherwise (if `currentTotalCount` is zero, meaning no qualifying numbers were found), return 0.
 * Dry Run: nums = [1, 3, 6, 10, 12, 18]
 * - `currentTotalSum = 0`, `currentTotalCount = 0`
 * - `loopIndex = 0`, `currentNumberInLoop = 1`. `1 % 6 !== 0`.
 * - `loopIndex = 1`, `currentNumberInLoop = 3`. `3 % 6 !== 0`.
 * - `loopIndex = 2`, `currentNumberInLoop = 6`. `6 % 6 === 0`. `currentTotalSum = 6`, `currentTotalCount = 1`.
 * - `loopIndex = 3`, `currentNumberInLoop = 10`. `10 % 6 !== 0`.
 * - `loopIndex = 4`, `currentNumberInLoop = 12`. `12 % 6 === 0`. `currentTotalSum = 6 + 12 = 18`, `currentTotalCount = 1 + 1 = 2`.
 * - `loopIndex = 5`, `currentNumberInLoop = 18`. `18 % 6 === 0`. `currentTotalSum = 18 + 18 = 36`, `currentTotalCount = 2 + 1 = 3`.
 * - Loop ends. `currentTotalCount` (3) is `> 0`.
 * - `computedAverage = Math.floor(36 / 3) = Math.floor(12) = 12`.
 * - Return `12`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var averageValue = function (nums) {
  let currentTotalSum = 0;
  let currentTotalCount = 0;

  for (let loopIndex = 0; loopIndex < nums.length; loopIndex++) {
    let currentNumberInLoop = nums[loopIndex];
    if (currentNumberInLoop % 6 === 0) {
      currentTotalSum += currentNumberInLoop;
      currentTotalCount++;
    }
  }

  let computedAverage =
    currentTotalCount > 0 ? Math.floor(currentTotalSum / currentTotalCount) : 0;
  return computedAverage;
};
