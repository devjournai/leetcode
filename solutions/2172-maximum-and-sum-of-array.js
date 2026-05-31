/**
 * Maximum And Sum Of Array
 * Intuition: The problem asks to maximize the sum of bitwise AND operations by placing numbers into slots with capacity constraints. This suggests a dynamic programming approach where we iteratively place each number and memoize the maximum sum achieved for a given state.
 * Approach: 1. Define a recursive function `calculateMaxAndSum(currentNumberIndex, currentSlotCapacities)` that returns the maximum AND sum for the remaining numbers starting from `currentNumberIndex`, given the `currentSlotCapacities` state.
 * 2. The base case for the recursion is when `currentNumberIndex` equals the total number of elements in `nums`. In this case, all numbers have been placed, so return 0.
 * 3. To prevent redundant calculations, use a memoization map (`memoizationCache`) to store results. The key for the map should uniquely identify the state, which is a combination of `currentNumberIndex` and a string representation of `currentSlotCapacities`.
 * 4. In the recursive step, iterate through each possible slot (from 0 to `numSlots - 1`).
 * 5. For each slot, check if it has capacity (i.e., less than 2 numbers currently placed).
 * 6. If capacity is available, "place" `nums[currentNumberIndex]` into that slot by incrementing its count in `currentSlotCapacities`.
 * 7. Recursively call `calculateMaxAndSum` for the next number (`currentNumberIndex + 1`) and the updated `currentSlotCapacities`.
 * 8. Add the current bitwise AND sum `(nums[currentNumberIndex] & (slotIdentifier + 1))` to the result of the recursive call.
 * 9. Keep track of the maximum sum found across all possible slot placements for `nums[currentNumberIndex]`.
 * 10. After the recursive call, "unplace" the number by decrementing the slot count in `currentSlotCapacities` to backtrack and explore other options (this is crucial for correct state management in mutable arrays).
 * 11. Store the computed maximum sum for the current state in `memoizationCache` before returning it.
 * Dry Run: nums = [1, 2], numSlots = 1
 * Initial call: `calculateMaxAndSum(0, [0])`
 * - `currentNumberIndex = 0`, `currentSlotCapacities = [0]`
 * - `stateKey = "0,0"` (not in cache)
 * - `overallMax = 0`
 * - Loop `slotIdentifier` from 0 to 0 (representing slot 1)
 *   - `slotIdentifier = 0`:
 *     - `currentSlotCapacities[0] = 0 < 2` (true)
 *     - Increment `currentSlotCapacities[0]` to 1. `currentSlotCapacities` is now `[1]`.
 *     - `currentAndValue = nums[0] & (0 + 1) = 1 & 1 = 1`
 *     - `resultIfPlacedInSlot = 1 + calculateMaxAndSum(1, [1])`
 *       - Recursive call: `calculateMaxAndSum(1, [1])`
 *         - `currentNumberIndex = 1`, `currentSlotCapacities = [1]`
 *         - `stateKey = "1,1"` (not in cache)
 *         - `overallMaxInner = 0`
 *         - Loop `slotIdentifierInner` from 0 to 0
 *           - `slotIdentifierInner = 0`:
 *             - `currentSlotCapacities[0] = 1 < 2` (true)
 *             - Increment `currentSlotCapacities[0]` to 2. `currentSlotCapacities` is now `[2]`.
 *             - `currentAndValueInner = nums[1] & (0 + 1) = 2 & 1 = 0`
 *             - `resultIfPlacedInner = 0 + calculateMaxAndSum(2, [2])`
 *               - Recursive call: `calculateMaxAndSum(2, [2])`
 *                 - `currentNumberIndex = 2 === nums.length`. Return 0.
 *             - `resultIfPlacedInner = 0 + 0 = 0`
 *             - `overallMaxInner = Math.max(0, 0) = 0`
 *             - Decrement `currentSlotCapacities[0]` to 1 (backtrack). `currentSlotCapacities` is now `[1]`.
 *         - Store `memoizationCache.set("1,1", 0)`. Return 0.
 *     - `resultIfPlacedInSlot = 1 + 0 = 1`
 *     - `overallMax = Math.max(0, 1) = 1`
 *     - Decrement `currentSlotCapacities[0]` to 0 (backtrack). `currentSlotCapacities` is now `[0]`.
 * - Store `memoizationCache.set("0,0", 1)`. Return 1.
 * Final result: 1.
 * Time Complexity: O(N * S * 3^S)
 * Space Complexity: O(N * 3^S)
 */
var maximumANDSum = function (nums, numSlots) {
  const memoizationCache = new Map();

  const initialSlotCapacities = new Array(numSlots).fill(0);

  function calculateMaxAndSum(currentNumberIndex, currentSlotCapacities) {
    if (currentNumberIndex === nums.length) {
      return 0;
    }

    const stateKey = `${currentNumberIndex},${currentSlotCapacities.join(",")}`;
    if (memoizationCache.has(stateKey)) {
      return memoizationCache.get(stateKey);
    }

    let overallMax = 0;
    for (let slotIdentifier = 0; slotIdentifier < numSlots; slotIdentifier++) {
      if (currentSlotCapacities[slotIdentifier] < 2) {
        currentSlotCapacities[slotIdentifier]++;

        const currentAndValue = nums[currentNumberIndex] & (slotIdentifier + 1);
        const resultIfPlacedInSlot =
          currentAndValue +
          calculateMaxAndSum(currentNumberIndex + 1, currentSlotCapacities);

        overallMax = Math.max(overallMax, resultIfPlacedInSlot);

        currentSlotCapacities[slotIdentifier]--;
      }
    }

    memoizationCache.set(stateKey, overallMax);
    return overallMax;
  }

  return calculateMaxAndSum(0, initialSlotCapacities);
};
