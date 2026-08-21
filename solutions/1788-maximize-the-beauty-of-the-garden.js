/**
 * Maximize The Beauty Of The Garden
 * Intuition: A valid garden starts and ends with the same flower type. Beauty is 2 * that type plus the sum of positive flowers strictly inside. For each type, the first and last occurrence maximize the interior.
 * Approach: 1. Map each beauty value to all indices. 2. Prefix-sum positive values in `precomputedPositiveSum`. 3. For types with ≥2 occurrences, beauty = 2*type + positives between first and last. 4. Return `maxGardenBeauty`.
 * Dry Run: flowers = [1,2,3,1,2,3].
 *   - Type 1 from 0 to 3: 2*1 + max(0,2)+max(0,3)=2+2+3=7. Type 2: 2*2+3+1=8. Type 3: 2*3+1+2=8. Max 8.
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
