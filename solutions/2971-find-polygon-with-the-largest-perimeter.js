/**
 * Find Polygon With The Largest Perimeter
 * Intuition: To maximize the perimeter of a polygon, we should try to include as many sides as possible, especially the longer ones. A key property of a polygon is that its longest side must be strictly shorter than the sum of all other sides. By sorting the given side lengths, we can easily identify the longest side among a potential set and iteratively check this condition. If the current longest side is too large, we discard it and re-evaluate with the remaining, shorter set of sides.
 * Approach: 1. Sort the input array `nums` in ascending order. This places the longest available side at the end of the array, simplifying subsequent checks. 2. Calculate the initial sum of all elements in the sorted array. This sum represents the potential perimeter if all sides can form a polygon. 3. Iterate backwards from the last element (which is the potential longest side) down to the third element (to ensure at least 3 sides are always considered). 4. In each iteration, take the current element as `potentialLongestSide`. Check if `currentOverallSum - potentialLongestSide > potentialLongestSide`. If this condition holds, a valid polygon can be formed with the current set of sides, and `currentOverallSum` is the largest possible perimeter. Return this sum. 5. If the condition does not hold, the `potentialLongestSide` is too large. Subtract it from `currentOverallSum` to remove it from consideration for the next iteration, effectively trying to form a polygon with a smaller set of sides. 6. If the loop completes without finding a valid polygon (i.e., `indexIterator` drops below 2), it means no valid polygon with at least 3 sides can be formed from the given `nums`. Return -1.
 * Dry Run: nums = [1, 12, 1, 2, 5, 50]
 *   1. Sort `nums`: `[1, 1, 2, 5, 12, 50]`
 *   2. `let currentOverallSum = nums.reduce((sumAccumulator, currentNumber) => sumAccumulator + currentNumber, 0);`
 *      `currentOverallSum` becomes `71`.
 *   3. `let arrayLength = nums.length;` (arrayLength = 6)
 *   4. Loop `let indexIterator = arrayLength - 1;` (`indexIterator` starts at 5)
 *      * `indexIterator = 5` (`potentialLongestSide = nums[5] = 50`)
 *        `71 - 50 > 50` => `21 > 50` (False)
 *        `currentOverallSum = 71 - 50 = 21`.
 *      * `indexIterator = 4` (`potentialLongestSide = nums[4] = 12`)
 *        `21 - 12 > 12` => `9 > 12` (False)
 *        `currentOverallSum = 21 - 12 = 9`.
 *      * `indexIterator = 3` (`potentialLongestSide = nums[3] = 5`)
 *        `9 - 5 > 5` => `4 > 5` (False)
 *        `currentOverallSum = 9 - 5 = 4`.
 *      * `indexIterator = 2` (`potentialLongestSide = nums[2] = 2`)
 *        `4 - 2 > 2` => `2 > 2` (False)
 *        `currentOverallSum = 4 - 2 = 2`.
 *   5. Loop terminates as `indexIterator` becomes 1, which is less than 2.
 *   6. Return -1.
 * Time Complexity: O(N log N)
 * Space Complexity: O(log N)
 */
var largestPerimeter = function (nums) {
  nums.sort((valueOne, valueTwo) => valueOne - valueTwo);

  let currentOverallSum = nums.reduce(
    (sumAccumulator, currentNumber) => sumAccumulator + currentNumber,
    0
  );
  let arrayLength = nums.length;

  for (
    let indexIterator = arrayLength - 1;
    indexIterator >= 2;
    --indexIterator
  ) {
    let potentialLongestSide = nums[indexIterator];
    if (currentOverallSum - potentialLongestSide > potentialLongestSide) {
      return currentOverallSum;
    }
    currentOverallSum -= potentialLongestSide;
  }

  return -1;
};
