/**
 * Find Target Indices After Sorting Array
 * Intuition: Instead of fully sorting the array which takes O(N log N), we can determine the starting position and total count of the target elements in the hypothetical sorted array with a single pass through the unsorted array.
 * Approach: 1. Initialize two counters: `countOfLesser` for elements strictly less than `targetValue` and `countOfTarget` for elements equal to `targetValue`. 2. Iterate through `inputNumbers` once. For each number, increment `countOfLesser` if it's less than `targetValue`, or increment `countOfTarget` if it's equal to `targetValue`. 3. After the pass, `countOfLesser` will be the first index where `targetValue` appears in the sorted array. 4. Initialize an empty array `foundIndices`. 5. Iterate `countOfTarget` times. In each iteration, add `countOfLesser + currentPosition` to `foundIndices`, where `currentPosition` is the loop variable representing the offset from the starting target index. 6. Return the `foundIndices` array.
 * Dry Run:
 * inputNumbers = [1,2,5,2,3], targetValue = 2
 *
 * Initial state:
 * countOfLesser = 0
 * countOfTarget = 0
 * foundIndices = []
 *
 * First pass (iterating through inputNumbers):
 * - numElement = 1: 1 < 2. countOfLesser becomes 1.
 * - numElement = 2: 2 === 2. countOfTarget becomes 1.
 * - numElement = 5: 5 > 2. No change to counters.
 * - numElement = 2: 2 === 2. countOfTarget becomes 2.
 * - numElement = 3: 3 > 2. No change to counters.
 *
 * After first pass:
 * countOfLesser = 1
 * countOfTarget = 2
 *
 * Second pass (populating foundIndices):
 * - currentPosition = 0: foundIndices.push(countOfLesser + 0) -> foundIndices.push(1). foundIndices is now [1].
 * - currentPosition = 1: foundIndices.push(countOfLesser + 1) -> foundIndices.push(2). foundIndices is now [1, 2].
 *
 * Loop finishes.
 * Return [1, 2].
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var targetIndices = function (inputNumbers, targetValue) {
  let countOfLesser = 0;
  let countOfTarget = 0;

  for (const numElement of inputNumbers) {
    if (numElement < targetValue) {
      countOfLesser++;
    } else if (numElement === targetValue) {
      countOfTarget++;
    }
  }

  const foundIndices = [];
  for (
    let currentPosition = 0;
    currentPosition < countOfTarget;
    currentPosition++
  ) {
    foundIndices.push(countOfLesser + currentPosition);
  }

  return foundIndices;
};
