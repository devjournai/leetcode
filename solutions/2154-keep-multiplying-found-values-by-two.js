/**
 * Keep Multiplying Found Values By Two
 * Intuition: The core task involves repeatedly checking for a value and doubling it. A hash set provides efficient, near O(1) average time complexity for checking the presence of an element, making it ideal for this kind of repetitive lookup.
 * Approach: 1. Convert the input array `nums` into a `Set` to optimize lookup operations. 2. Initialize a working variable, say `currentValue`, with the provided `original` number. 3. Begin a `while` loop that continues as long as `currentValue` is present in the created `Set`. 4. Inside the loop, if `currentValue` is found, update `currentValue` by multiplying it by two. 5. The loop naturally terminates when `currentValue` is no longer found in the `Set`. 6. Return the final `currentValue`.
 * Dry Run: nums = [5,3,6,1,12], original = 3
 *   1. numberLookup = new Set([5,3,6,1,12]) -> {1, 3, 5, 6, 12}
 *   2. currentValue = 3
 *   3. Loop start:
 *      - numberLookup.has(3) is true.
 *      - currentValue = 3 * 2 = 6.
 *      - numberLookup.has(6) is true.
 *      - currentValue = 6 * 2 = 12.
 *      - numberLookup.has(12) is true.
 *      - currentValue = 12 * 2 = 24.
 *      - numberLookup.has(24) is false.
 *   4. Loop terminates.
 *   5. Return 24.
 * Time Complexity: O(N + logM)
 * Space Complexity: O(N)
 */
var findFinalValue = function (nums, original) {
  let numberLookup = new Set(nums);
  let currentValue = original;

  while (numberLookup.has(currentValue)) {
    currentValue *= 2;
  }

  return currentValue;
};
