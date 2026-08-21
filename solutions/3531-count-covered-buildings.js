/**
 * Count Covered Buildings
 * Intuition: A building is covered if another exists both north and south on its x, and both west and east on its y.
 * Approach: 1. Record min/max y per x and min/max x per y. 2. Count buildings strictly inside those four extremes.
 * Dry Run: n=3, buildings [[1,2],[2,2],[3,2],[2,1],[2,3]]. Center (2,2) is covered → 1.
 * Time Complexity: O(|buildings|)
 * Space Complexity: O(N)
 */
var countCoveredBuildings = function (n, buildings) {
  const northernmost = new Array(n + 1).fill(Infinity);
  const southernmost = new Array(n + 1).fill(0);
  const westernmost = new Array(n + 1).fill(Infinity);
  const easternmost = new Array(n + 1).fill(0);

  for (const [x, y] of buildings) {
    northernmost[x] = Math.min(northernmost[x], y);
    southernmost[x] = Math.max(southernmost[x], y);
    westernmost[y] = Math.min(westernmost[y], x);
    easternmost[y] = Math.max(easternmost[y], x);
  }

  let answer = 0;
  for (const [x, y] of buildings) {
    if (
      northernmost[x] < y &&
      y < southernmost[x] &&
      westernmost[y] < x &&
      x < easternmost[y]
    ) {
      answer += 1;
    }
  }
  return answer;
};
