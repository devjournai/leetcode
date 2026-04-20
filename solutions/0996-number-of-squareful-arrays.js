/**
 * Number Of Squareful Arrays
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
        elementsToPlace - 1,
      );
      elementTracker[currentIterationIndex] = false;
    }
  }

  generateValidPermutations(0, arraySize);

  return totalValidPermutations;
};
