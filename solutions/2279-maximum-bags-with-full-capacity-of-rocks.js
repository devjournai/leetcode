/**
 * Maximum Bags With Full Capacity Of Rocks
 * Intuition: To maximize the number of bags filled, it is most efficient to prioritize filling bags that require the fewest additional rocks first.
 * Approach: 1. Compute the deficit (remaining capacity) for each bag by subtracting its current rock count from its maximum capacity. 2. Store these deficits in an array. 3. Sort this array of deficits in non-decreasing order to identify bags that are easiest to fill. 4. Iterate through the sorted deficits. For each bag, if the remaining `additionalRocks` are sufficient to cover its deficit, use the rocks, decrement the available `additionalRocks`, and increment a counter for fully filled bags. 5. If the `additionalRocks` are insufficient for the current bag, stop the iteration, as all subsequent bags will require at least as many rocks. 6. Return the final count of fully filled bags.
 * Dry Run: bagCapacities = [2, 3, 4, 5], currentRocks = [1, 2, 4, 4], extraRocks = 2
 *   1. Calculate deficits:
 *      - Bag 0: 2 - 1 = 1
 *      - Bag 1: 3 - 2 = 1
 *      - Bag 2: 4 - 4 = 0
 *      - Bag 3: 5 - 4 = 1
 *      neededRocksPerBag = [1, 1, 0, 1]
 *   2. Sort deficits: neededRocksPerBag becomes [0, 1, 1, 1]
 *   3. Initialize: fullyFilledBagsCount = 0, availableExtraRocks = 2, currentBagPointer = 0
 *   4. Loop:
 *      - currentBagPointer = 0, requiredForOneBag = 0. 0 <= 2 (true). fullyFilledBagsCount = 1, availableExtraRocks = 2 - 0 = 2. currentBagPointer = 1.
 *      - currentBagPointer = 1, requiredForOneBag = 1. 1 <= 2 (true). fullyFilledBagsCount = 2, availableExtraRocks = 2 - 1 = 1. currentBagPointer = 2.
 *      - currentBagPointer = 2, requiredForOneBag = 1. 1 <= 1 (true). fullyFilledBagsCount = 3, availableExtraRocks = 1 - 1 = 0. currentBagPointer = 3.
 *      - currentBagPointer = 3, requiredForOneBag = 1. 1 <= 0 (false). Break loop.
 *   5. Return fullyFilledBagsCount = 3.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maximumBags = function (bagCapacities, currentRocks, extraRocks) {
  const totalBags = bagCapacities.length;
  const neededRocksPerBag = new Array(totalBags);

  for (let bagIndex = 0; bagIndex < totalBags; bagIndex++) {
    neededRocksPerBag[bagIndex] =
      bagCapacities[bagIndex] - currentRocks[bagIndex];
  }

  neededRocksPerBag.sort((firstValue, secondValue) => firstValue - secondValue);

  let fullyFilledBagsCount = 0;
  let availableExtraRocks = extraRocks;
  let currentBagPointer = 0;

  while (currentBagPointer < totalBags) {
    const requiredForOneBag = neededRocksPerBag[currentBagPointer];
    if (requiredForOneBag <= availableExtraRocks) {
      fullyFilledBagsCount++;
      availableExtraRocks -= requiredForOneBag;
    } else {
      break;
    }
    currentBagPointer++;
  }

  return fullyFilledBagsCount;
};
