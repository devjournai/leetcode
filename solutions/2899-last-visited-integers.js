/**
 * Last Visited Integers
 * Intuition: We need to maintain a record of positive integers encountered, with the most recently seen easily accessible, and track consecutive negative markers to retrieve specific prior positive integers.
 * Approach: 1. Initialize an empty array `visitedNumbers` to store positive integers encountered, always prepending new ones. 2. Initialize an empty array `finalOutput` to collect the results for each -1. 3. Initialize `negativeStreakCount` to 0 to track consecutive -1s. 4. Iterate through each `currentElement` in the `nums` array using a standard for loop. 5. If `currentElement` is positive, prepend it to `visitedNumbers` and reset `negativeStreakCount` to 0. 6. If `currentElement` is -1, increment `negativeStreakCount`. Then, append either the `(negativeStreakCount - 1)`-th element from `visitedNumbers` (if available) or -1 to `finalOutput`. 7. After iterating through all elements, return `finalOutput`.
 * Dry Run: nums = [1, 2, -1, -1, -1]
 *   Initial state: visitedNumbers = [], finalOutput = [], negativeStreakCount = 0
 *   Loop 1 (currentElement = 1): 1 > 0 is true. visitedNumbers.unshift(1) -> [1]. negativeStreakCount = 0.
 *   Loop 2 (currentElement = 2): 2 > 0 is true. visitedNumbers.unshift(2) -> [2, 1]. negativeStreakCount = 0.
 *   Loop 3 (currentElement = -1): -1 > 0 is false. negativeStreakCount becomes 1. (1 <= visitedNumbers.length (2)) is true. finalOutput.push(visitedNumbers[0]) -> [2].
 *   Loop 4 (currentElement = -1): -1 > 0 is false. negativeStreakCount becomes 2. (2 <= visitedNumbers.length (2)) is true. finalOutput.push(visitedNumbers[1]) -> [2, 1].
 *   Loop 5 (currentElement = -1): -1 > 0 is false. negativeStreakCount becomes 3. (3 <= visitedNumbers.length (2)) is false. finalOutput.push(-1) -> [2, 1, -1].
 *   Return: [2, 1, -1].
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var lastVisitedIntegers = function (nums) {
  const visitedNumbers = [];
  const finalOutput = [];
  let negativeStreakCount = 0;

  for (let currentIndex = 0; currentIndex < nums.length; currentIndex++) {
    const currentElement = nums[currentIndex];
    if (currentElement > 0) {
      visitedNumbers.unshift(currentElement);
      negativeStreakCount = 0;
    } else {
      negativeStreakCount++;
      finalOutput.push(
        negativeStreakCount <= visitedNumbers.length
          ? visitedNumbers[negativeStreakCount - 1]
          : -1,
      );
    }
  }

  return finalOutput;
};
