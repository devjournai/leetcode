/**
 * Eliminate Maximum Number Of Monsters
 * Intuition: A monster arriving at time `t` can be killed only if we still have a weapon charge at an integer minute strictly before `t`. Killing the soonest arrivals first is optimal, so we sort by arrival time and assign charges 0, 1, 2, ...
 * Approach: 1. Compute each monster's arrival as `dist[i] / speed[i]`. 2. Sort those times ascending. 3. Walk `eliminatedCount` from 0: if `monsterArrivalTimings[eliminatedCount] <= eliminatedCount`, that monster reaches the city at or before the next shot, so return `eliminatedCount`. 4. If the loop finishes, every monster was eliminated.
 * Dry Run: dist = [1, 3, 4], speed = [1, 1, 1] → arrivals [1, 3, 4].
 *   - t=0: 1 > 0, kill first (count=1)
 *   - t=1: 3 > 1, kill second (count=2)
 *   - t=2: 4 > 2, kill third. Return 3.
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
