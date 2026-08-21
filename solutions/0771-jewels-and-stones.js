/**
 * Jewels And Stones
 * Intuition: Mark every jewel character, then count how many stones appear in that set.
 * Approach: 1. Fill `jewelTypesMap` with each char of `jewels` as true. 2. Scan `stones`; increment `totalJewelCount` when `jewelTypesMap[inspectedStoneCharacter]` is set. 3. Return the count.
 * Dry Run: jewels = "aA", stones = "aAAbbbb".
 *   - Map {a, A}. Stones: a,A,A hit; bbbb miss. Return 3.
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
