/**
 * Find Closest Number To Zero
 * Intuition: The number closest to zero will have the smallest absolute value. If multiple numbers share the same minimum absolute value, the larger number among them is preferred.
 * Approach: 1. Initialize a variable to store the closest number found so far and its absolute distance to zero, using the first element of the array. 2. Iterate through the remaining elements of the array. 3. For each element, calculate its absolute value. 4. Compare this absolute value with the current minimum absolute distance. If it's smaller, update both the closest number and the minimum distance. 5. If the absolute values are equal, but the current number is greater than the closest number found so far, update the closest number to prefer the larger value. 6. Return the closest number after checking all elements.
 * Dry Run: nums = [-4, -2, 1, 4, 8]
 * 1. Initialize: `closestValueFound = -4`, `currentMinDistance = Math.abs(-4) = 4`.
 * 2. Loop from `indexPosition = 1`:
 *    - `indexPosition = 1`, `currentElement = -2`:
 *      - `absoluteCurrentElement = Math.abs(-2) = 2`.
 *      - `absoluteCurrentElement` (2) < `currentMinDistance` (4) is true.
 *      - Update: `currentMinDistance = 2`, `closestValueFound = -2`.
 *    - `indexPosition = 2`, `currentElement = 1`:
 *      - `absoluteCurrentElement = Math.abs(1) = 1`.
 *      - `absoluteCurrentElement` (1) < `currentMinDistance` (2) is true.
 *      - Update: `currentMinDistance = 1`, `closestValueFound = 1`.
 *    - `indexPosition = 3`, `currentElement = 4`:
 *      - `absoluteCurrentElement = Math.abs(4) = 4`.
 *      - `absoluteCurrentElement` (4) < `currentMinDistance` (1) is false.
 *      - `absoluteCurrentElement` (4) === `currentMinDistance` (1) is false.
 *      - No update.
 *    - `indexPosition = 4`, `currentElement = 8`:
 *      - `absoluteCurrentElement = Math.abs(8) = 8`.
 *      - `absoluteCurrentElement` (8) < `currentMinDistance` (1) is false.
 *      - `absoluteCurrentElement` (8) === `currentMinDistance` (1) is false.
 *      - No update.
 * 3. Loop finishes.
 * 4. Return `closestValueFound` which is `1`.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var findClosestNumber = function (nums) {
  let closestValueFound = nums[0];
  let currentMinDistance = Math.abs(nums[0]);

  let arrayLength = nums.length;
  for (let indexPosition = 1; indexPosition < arrayLength; indexPosition++) {
    let currentElement = nums[indexPosition];
    let absoluteCurrentElement = Math.abs(currentElement);

    if (absoluteCurrentElement < currentMinDistance) {
      currentMinDistance = absoluteCurrentElement;
      closestValueFound = currentElement;
    } else if (absoluteCurrentElement === currentMinDistance) {
      if (currentElement > closestValueFound) {
        closestValueFound = currentElement;
      }
    }
  }

  return closestValueFound;
};
