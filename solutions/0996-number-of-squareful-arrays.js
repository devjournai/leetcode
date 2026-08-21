/**
 * Number Of Squareful Arrays
 * Intuition: Backtrack permutations where each adjacent pair sums to a perfect square (`isSumSquare`). Sort and skip unused duplicates to uniquify.
 * Approach: 1. Sort nums; `elementTracker` marks used indices. 2. `generateValidPermutations(previousValue, remaining)`: remaining 0 increments the count. 3. Skip used, skip duplicate-if-prev-unused, skip if remaining < n and sum isn't square. 4. Start with remaining = n.
 * Dry Run: nums = [1,17,8]. 1+8=9, 8+17=25 squares; also 17+8+1. Two unique perms. Answer 2.
 * Time Complexity: O(N * N!)
 * Space Complexity: O(N)
 */
var numSquarefulPerms = function (nums) {
  nums.sort((alpha, beta) => alpha - beta);
  const arraySize = nums.length;
  const elementTracker = new Array(arraySize).fill(false);
  let totalValidPermutations = 0;

  function isSumSquare(numToCheck) {
    const sqrtResult = Math.sqrt(numToCheck);
    return Number.isInteger(sqrtResult);
  }

  function generateValidPermutations(previousValue, elementsToPlace) {
    if (elementsToPlace === 0) {
      totalValidPermutations++;
      return;
    }

    for (
      let currentIterationIndex = 0;
      currentIterationIndex < arraySize;
      currentIterationIndex++
    ) {
      if (elementTracker[currentIterationIndex]) {
        continue;
      }

      if (
        currentIterationIndex > 0 &&
        nums[currentIterationIndex] === nums[currentIterationIndex - 1] &&
        !elementTracker[currentIterationIndex - 1]
      ) {
        continue;
      }

      if (
        elementsToPlace !== arraySize &&
        !isSumSquare(previousValue + nums[currentIterationIndex])
      ) {
        continue;
      }

      elementTracker[currentIterationIndex] = true;
      generateValidPermutations(
        nums[currentIterationIndex],
        elementsToPlace - 1
      );
      elementTracker[currentIterationIndex] = false;
    }
  }

  generateValidPermutations(0, arraySize);

  return totalValidPermutations;
};
