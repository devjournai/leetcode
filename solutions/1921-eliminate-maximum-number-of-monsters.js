/**
 * Eliminate Maximum Number Of Monsters
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var eliminateMaximum = function (dist, speed) {
  const totalMonstersQuantity = dist.length;

  const monsterArrivalTimings = dist.map((distItem, monsterIndex) => {
    return distItem / speed[monsterIndex];
  });

  monsterArrivalTimings.sort((timeA, timeB) => timeA - timeB);

  let eliminatedCount = 0;
  while (eliminatedCount < totalMonstersQuantity) {
    if (monsterArrivalTimings[eliminatedCount] <= eliminatedCount) {
      return eliminatedCount;
    }
    eliminatedCount++;
  }

  return totalMonstersQuantity;
};
