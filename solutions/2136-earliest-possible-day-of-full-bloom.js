/**
 * Earliest Possible Day Of Full Bloom
 * Intuition: To minimize the latest bloom day among all flowers, we should prioritize planting seeds that take the longest to grow *after* planting. By ensuring these long-growing seeds are considered early in the accumulated planting schedule, we attempt to pair their significant `growTime` with a relatively smaller `currentPlantingAccumulator`.
 * Approach: 1. Combine `plantTime` and `growTime` for each seed into an array of objects to keep related data together. 2. Sort this array in descending order based on `growTime`. This greedy choice is crucial for optimality. 3. Iterate through the sorted seeds, maintaining a running total of days spent planting (`currentPlantingAccumulator`). For each seed, calculate its bloom day (`currentPlantingAccumulator` + `growTime`) and update the `latestBloomDate` if this seed's bloom day is later than any previously calculated. The `currentPlantingAccumulator` ensures that each seed's planting time is accounted for sequentially.
 * Dry Run: plantTime = [3, 2, 1], growTime = [2, 1, 3]
 * 1. Combine: flowerSeeds = [{plantingDuration: 3, growingDuration: 2}, {plantingDuration: 2, growingDuration: 1}, {plantingDuration: 1, growingDuration: 3}]
 * 2. Sort by growingDuration descending:
 *    flowerSeeds = [{plantingDuration: 1, growingDuration: 3}, {plantingDuration: 3, growingDuration: 2}, {plantingDuration: 2, growingDuration: 1}]
 * 3. Initialize: currentPlantingAccumulator = 0, latestBloomDate = 0
 * 4. Iterate:
 *    a. Seed 1 ({plant: 1, grow: 3}):
 *       currentPlantingAccumulator = 0 + 1 = 1
 *       seedBloomCalculation = 1 + 3 = 4
 *       latestBloomDate = max(0, 4) = 4
 *    b. Seed 2 ({plant: 3, grow: 2}):
 *       currentPlantingAccumulator = 1 + 3 = 4
 *       seedBloomCalculation = 4 + 2 = 6
 *       latestBloomDate = max(4, 6) = 6
 *    c. Seed 3 ({plant: 2, grow: 1}):
 *       currentPlantingAccumulator = 4 + 2 = 6
 *       seedBloomCalculation = 6 + 1 = 7
 *       latestBloomDate = max(6, 7) = 7
 * 5. Return latestBloomDate = 7
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var earliestFullBloom = function (plantTime, growTime) {
  const flowerSeeds = plantTime.map((plantingDurationValue, seedIndex) => ({
    plantingDuration: plantingDurationValue,
    growingDuration: growTime[seedIndex],
  }));

  flowerSeeds.sort(
    (firstSeedPair, secondSeedPair) =>
      secondSeedPair.growingDuration - firstSeedPair.growingDuration,
  );

  let currentPlantingAccumulator = 0;
  let latestBloomDate = 0;

  for (const { plantingDuration, growingDuration } of flowerSeeds) {
    currentPlantingAccumulator += plantingDuration;
    const individualBloomCalculation =
      currentPlantingAccumulator + growingDuration;
    latestBloomDate = Math.max(latestBloomDate, individualBloomCalculation);
  }

  return latestBloomDate;
};
