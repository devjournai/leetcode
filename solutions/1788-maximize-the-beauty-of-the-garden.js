/**
 * Maximize The Beauty Of The Garden
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumBeauty = function (flowers) {
  const beautyPositionMap = new Map();

  for (let flowerIndex = 0; flowerIndex < flowers.length; flowerIndex++) {
    const currentFlowerBeauty = flowers[flowerIndex];
    if (!beautyPositionMap.has(currentFlowerBeauty)) {
      beautyPositionMap.set(currentFlowerBeauty, []);
    }
    beautyPositionMap.get(currentFlowerBeauty).push(flowerIndex);
  }

  const precomputedPositiveSum = new Array(flowers.length + 1).fill(0);
  for (let sumIndex = 0; sumIndex < flowers.length; sumIndex++) {
    precomputedPositiveSum[sumIndex + 1] =
      precomputedPositiveSum[sumIndex] + Math.max(0, flowers[sumIndex]);
  }

  let maxGardenBeauty = -Infinity;

  for (const [
    mappedBeautyValue,
    mappedIndices,
  ] of beautyPositionMap.entries()) {
    if (mappedIndices.length >= 2) {
      const firstOccurrenceIndex = mappedIndices[0];
      const lastOccurrenceIndex = mappedIndices[mappedIndices.length - 1];
      const intermediatePositiveBeautySum =
        precomputedPositiveSum[lastOccurrenceIndex] -
        precomputedPositiveSum[firstOccurrenceIndex + 1];
      const currentCalculatedBeauty =
        2 * mappedBeautyValue + intermediatePositiveBeautySum;
      maxGardenBeauty = Math.max(maxGardenBeauty, currentCalculatedBeauty);
    }
  }

  return maxGardenBeauty;
};
