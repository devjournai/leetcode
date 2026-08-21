/**
 * Maximum Enemy Forts That Can Be Captured
 * Intuition: The problem requires finding the maximum number of enemy forts (0s) located strictly between a 'my fort' (1) and an 'empty fort' (-1). This means we are looking for segments in the array that start with either 1 or -1, are followed by only 0s, and end with the opposite type of fort (-1 or 1 respectively).
 * Approach: 1. Initialize `maxCapturedForts` to 0 to store the highest count found. 2. Use a `firstFortPointer` to iterate through the array, skipping any enemy forts (0) until a 'my fort' (1) or an 'empty fort' (-1) is encountered. 3. Once a non-enemy fort is found at `firstFortPointer`, use a `secondFortPointer` starting from the next position to scan forward. 4. `secondFortPointer` will skip any enemy forts (0) until it finds another non-enemy fort (1 or -1). 5. If both `firstFortPointer` and `secondFortPointer` have found non-enemy forts and their types are different (one is 1 and the other is -1), then all forts between them must be enemy forts (0s). Calculate the count of these enemy forts as `secondFortPointer - firstFortPointer - 1` and update `maxCapturedForts` if this count is higher. 6. After checking the segment, advance `firstFortPointer` to `secondFortPointer`'s position to continue the search for the next potential segment. Repeat until `firstFortPointer` reaches the end of the array.
 * Dry Run: forts = [1, 0, 0, -1, 0]
 *   maxCapturedForts = 0
 *   firstFortPointer = 0
 *
 *   Outer while (firstFortPointer < 5):
 *     1. firstFortPointer = 0. forts[0] = 1. Inner while (forts[firstFortPointer] === 0) is skipped.
 *     2. secondFortPointer = 1.
 *     3. Inner while (secondFortPointer < 5 && forts[secondFortPointer] === 0):
 *        - secondFortPointer = 1. forts[1] = 0. secondFortPointer becomes 2.
 *        - secondFortPointer = 2. forts[2] = 0. secondFortPointer becomes 3.
 *        - secondFortPointer = 3. forts[3] = -1. Condition forts[secondFortPointer] === 0 is false. Loop ends.
 *     4. secondFortPointer = 3.
 *     5. Check if forts[firstFortPointer] (forts[0]=1) !== forts[secondFortPointer] (forts[3]=-1). True.
 *     6. Calculate captured: 3 - 0 - 1 = 2.
 *     7. maxCapturedForts = Math.max(0, 2) = 2.
 *     8. firstFortPointer = secondFortPointer = 3.
 *
 *   Outer while (firstFortPointer < 5):
 *     1. firstFortPointer = 3. forts[3] = -1. Inner while (forts[firstFortPointer] === 0) is skipped.
 *     2. secondFortPointer = 4.
 *     3. Inner while (secondFortPointer < 5 && forts[secondFortPointer] === 0):
 *        - secondFortPointer = 4. forts[4] = 0. secondFortPointer becomes 5.
 *        - secondFortPointer = 5. Condition secondFortPointer < 5 is false. Loop ends.
 *     4. secondFortPointer = 5.
 *     5. Check if secondFortPointer >= forts.length (5 >= 5). True. Break outer while loop.
 *
 *   Return maxCapturedForts = 2.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var captureForts = function (fortLocations) {
  let maxCapturedForts = 0;
  let firstFortPointer = 0;

  while (firstFortPointer < fortLocations.length) {
    while (
      firstFortPointer < fortLocations.length &&
      fortLocations[firstFortPointer] === 0
    ) {
      firstFortPointer++;
    }

    if (firstFortPointer >= fortLocations.length) {
      break;
    }

    let secondFortPointer = firstFortPointer + 1;
    while (
      secondFortPointer < fortLocations.length &&
      fortLocations[secondFortPointer] === 0
    ) {
      secondFortPointer++;
    }

    if (secondFortPointer >= fortLocations.length) {
      break;
    }

    if (fortLocations[firstFortPointer] !== fortLocations[secondFortPointer]) {
      maxCapturedForts = Math.max(
        maxCapturedForts,
        secondFortPointer - firstFortPointer - 1
      );
    }

    firstFortPointer = secondFortPointer;
  }

  return maxCapturedForts;
};
