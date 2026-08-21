/**
 * Min Max Game
 * Intuition: The problem describes a recursive reduction process where an array is halved in size at each step by applying min/max operations on pairs of elements, until only one element remains. This suggests an iterative simulation of the process.
 * Approach: 1. Initialize a working array with a copy of the input `nums`. 2. Repeatedly loop while the working array's length is greater than 1. 3. Inside the loop, create a new array of half the current length. 4. Iterate through the indices of the new array. If the index is even, store the minimum of the corresponding pair from the old array; if odd, store the maximum. 5. Replace the old array with the newly generated array. 6. Once the loop finishes, the working array will contain a single element, which is the result.
 * Dry Run: nums = [1,3,5,2,4,8,2,2]
 * Initial: currentNumbers = [1,3,5,2,4,8,2,2]
 *
 * Iteration 1:
 *   currentNumbers.length = 8
 *   newLength = 4
 *   nextGeneration = [_,_,_,_]
 *   indexForNextGen = 0 (even): nextGeneration[0] = min(currentNumbers[0], currentNumbers[1]) = min(1,3) = 1
 *   indexForNextGen = 1 (odd): nextGeneration[1] = max(currentNumbers[2], currentNumbers[3]) = max(5,2) = 5
 *   indexForNextGen = 2 (even): nextGeneration[2] = min(currentNumbers[4], currentNumbers[5]) = min(4,8) = 4
 *   indexForNextGen = 3 (odd): nextGeneration[3] = max(currentNumbers[6], currentNumbers[7]) = max(2,2) = 2
 *   currentNumbers becomes [1,5,4,2]
 *
 * Iteration 2:
 *   currentNumbers.length = 4
 *   newLength = 2
 *   nextGeneration = [_,_]
 *   indexForNextGen = 0 (even): nextGeneration[0] = min(currentNumbers[0], currentNumbers[1]) = min(1,5) = 1
 *   indexForNextGen = 1 (odd): nextGeneration[1] = max(currentNumbers[2], currentNumbers[3]) = max(4,2) = 4
 *   currentNumbers becomes [1,4]
 *
 * Iteration 3:
 *   currentNumbers.length = 2
 *   newLength = 1
 *   nextGeneration = [_]
 *   indexForNextGen = 0 (even): nextGeneration[0] = min(currentNumbers[0], currentNumbers[1]) = min(1,4) = 1
 *   currentNumbers becomes [1]
 *
 * currentNumbers.length = 1, loop terminates.
 * Return currentNumbers[0] = 1.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minMaxGame = function (nums) {
  let currentNumbers = nums.slice();

  while (currentNumbers.length > 1) {
    let newLength = currentNumbers.length / 2;
    let nextGeneration = new Array(newLength);

    for (
      let indexForNextGen = 0;
      indexForNextGen < newLength;
      indexForNextGen++
    ) {
      let firstSourceIndex = 2 * indexForNextGen;
      let secondSourceIndex = 2 * indexForNextGen + 1;

      if (indexForNextGen % 2 === 0) {
        nextGeneration[indexForNextGen] = Math.min(
          currentNumbers[firstSourceIndex],
          currentNumbers[secondSourceIndex]
        );
      } else {
        nextGeneration[indexForNextGen] = Math.max(
          currentNumbers[firstSourceIndex],
          currentNumbers[secondSourceIndex]
        );
      }
    }
    currentNumbers = nextGeneration;
  }

  return currentNumbers[0];
};
