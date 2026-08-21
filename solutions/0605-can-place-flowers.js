/**
 * Can Place Flowers
 * Intuition: A plot can take a flower only if it and both neighbors are empty. Pad with 0s so ends behave like open neighbors, greedily plant and count until `n` is met.
 * Approach: 1. If `n===0` return true. 2. `extendedFlowerbed = [0, ...flowerbed, 0]`. 3. For `plotIndex` from 1 to length-2, if three consecutive 0s, set the middle to 1 and increment `flowersCanBePlaced`; return true early if `>= n`. 4. Return `flowersCanBePlaced >= n`.
 * Dry Run: flowerbed=[1,0,0,0,1], n=1.
 *   - Extended [0,1,0,0,0,1,0]. Index 3 is the only 000 triple → plant. Count 1 ≥ n → true.
 * Time Complexity: O(flowerbed.length)
 * Space Complexity: O(flowerbed.length)
 */
var canPlaceFlowers = function (flowerbed, n) {
  if (n === 0) {
    return true;
  }

  const extendedFlowerbed = [0, ...flowerbed, 0];
  let flowersCanBePlaced = 0;
  const flowerbedSize = extendedFlowerbed.length;

  for (let plotIndex = 1; plotIndex < flowerbedSize - 1; plotIndex++) {
    if (
      extendedFlowerbed[plotIndex] === 0 &&
      extendedFlowerbed[plotIndex - 1] === 0 &&
      extendedFlowerbed[plotIndex + 1] === 0
    ) {
      extendedFlowerbed[plotIndex] = 1;
      flowersCanBePlaced++;

      if (flowersCanBePlaced >= n) {
        return true;
      }
    }
  }

  return flowersCanBePlaced >= n;
};
