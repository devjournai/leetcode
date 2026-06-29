/**
 * Longest Square Streak In An Array
 * Intuition: To find the longest square streak, we can iterate through each number in the input array and attempt to build a square streak starting from it. A streak progresses by squaring the current number (e.g., x, x^2, x^4, ...). We use a Set to efficiently check if subsequent squared numbers exist in the input array. A special check is needed for the number 1, as 1^2 = 1, which could lead to an infinite loop; we assume a streak cannot be extended if the current number is 1, implying that only strictly increasing sequences (for numbers > 1) contribute to the streak length.
 * Approach: 1. Create a Set of all unique numbers from the input array for O(1) average-time lookups. 2. Initialize a variable `maximumStreakFound` to -1. 3. Iterate through each number in the original input array as a potential starting point for a streak. 4. For each starting number, initialize a `currentStreakCount` to 1 and `currentStreakElement` to the starting number. 5. Enter a loop to extend the streak: continue as long as `currentStreakElement` is not 1 and its square exists in the Set. Inside the loop, square `currentStreakElement` and increment `currentStreakCount`. 6. After the loop, if `currentStreakCount` is 2 or more, update `maximumStreakFound` with the maximum of its current value and `currentStreakCount`. 7. Return `maximumStreakFound`.
 * Dry Run: nums = [3, 9, 81, 2, 4]
 * 1. `existingNumbers = new Set([3, 9, 81, 2, 4])` -> `{2, 3, 4, 9, 81}`
 * 2. `maximumStreakFound = -1`
 * 3. Loop `initialValue` in `nums`:
 *    - `initialValue = 3`:
 *        `currentElement = 3`, `currentLength = 1`
 *        `while (currentElement !== 1 && existingNumbers.has(currentElement * currentElement))`:
 *            `3 !== 1 && existingNumbers.has(9)` (true): `currentElement = 9`, `currentLength = 2`
 *            `9 !== 1 && existingNumbers.has(81)` (true): `currentElement = 81`, `currentLength = 3`
 *            `81 !== 1 && existingNumbers.has(6561)` (false, 6561 not in set). Loop ends.
 *        `currentLength = 3`. `3 >= 2` is true. `maximumStreakFound = Math.max(-1, 3) = 3`.
 *    - `initialValue = 9`:
 *        `currentElement = 9`, `currentLength = 1`
 *        `while (currentElement !== 1 && existingNumbers.has(currentElement * currentElement))`:
 *            `9 !== 1 && existingNumbers.has(81)` (true): `currentElement = 81`, `currentLength = 2`
 *            `81 !== 1 && existingNumbers.has(6561)` (false). Loop ends.
 *        `currentLength = 2`. `2 >= 2` is true. `maximumStreakFound = Math.max(3, 2) = 3`.
 *    - `initialValue = 81`:
 *        `currentElement = 81`, `currentLength = 1`
 *        `while (currentElement !== 1 && existingNumbers.has(currentElement * currentElement))`:
 *            `81 !== 1 && existingNumbers.has(6561)` (false). Loop ends.
 *        `currentLength = 1`. `1 >= 2` is false. `maximumStreakFound` remains 3.
 *    - `initialValue = 2`:
 *        `currentElement = 2`, `currentLength = 1`
 *        `while (currentElement !== 1 && existingNumbers.has(currentElement * currentElement))`:
 *            `2 !== 1 && existingNumbers.has(4)` (true): `currentElement = 4`, `currentLength = 2`
 *            `4 !== 1 && existingNumbers.has(16)` (false). Loop ends.
 *        `currentLength = 2`. `2 >= 2` is true. `maximumStreakFound = Math.max(3, 2) = 3`.
 *    - `initialValue = 4`:
 *        `currentElement = 4`, `currentLength = 1`
 *        `while (currentElement !== 1 && existingNumbers.has(currentElement * currentElement))`:
 *            `4 !== 1 && existingNumbers.has(16)` (false). Loop ends.
 *        `currentLength = 1`. `1 >= 2` is false. `maximumStreakFound` remains 3.
 * 4. Return `maximumStreakFound` which is 3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var longestSquareStreak = function (nums) {
  const presentNumbers = new Set(nums);
  let maximumStreakFound = -1;

  for (const initialValue of nums) {
    let currentElement = initialValue;
    let currentLength = 1;

    while (
      currentElement !== 1 &&
      presentNumbers.has(currentElement * currentElement)
    ) {
      currentElement *= currentElement;
      currentLength++;
    }

    if (currentLength >= 2) {
      maximumStreakFound = Math.max(maximumStreakFound, currentLength);
    }
  }

  return maximumStreakFound;
};
