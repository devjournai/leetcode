/**
 * Jewels And Stones
 * Time Complexity: O(J + S)
 * Space Complexity: O(J)
 */
var numJewelsInStones = function (jewels, stones) {
  const jewelTypesMap = {};
  for (
    let jewelCharIndex = 0;
    jewelCharIndex < jewels.length;
    jewelCharIndex++
  ) {
    const currentJewelCharacter = jewels[jewelCharIndex];
    jewelTypesMap[currentJewelCharacter] = true;
  }

  let totalJewelCount = 0;
  for (
    let stoneItemIndex = 0;
    stoneItemIndex < stones.length;
    stoneItemIndex++
  ) {
    const inspectedStoneCharacter = stones[stoneItemIndex];
    if (jewelTypesMap[inspectedStoneCharacter]) {
      totalJewelCount++;
    }
  }

  return totalJewelCount;
};
