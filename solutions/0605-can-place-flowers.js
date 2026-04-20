/**
 * Can Place Flowers
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
