/**
 * Count The Number Of Houses At A Certain Distance I
 * Intuition: The graph consists of a linear path of houses 1 to n, with an additional "shortcut" street between x and y. For any two houses, the shortest path will be one of three types: the direct path along the linear street, or a path that utilizes the shortcut street (x to y) in either direction. By comparing these three possibilities for every pair of houses, we can determine the minimum distance.
 * Approach: 1. Initialize an array `distanceCounts` of size `n + 1` to store the frequency of each distance `k`. 2. Determine `firstNode` and `secondNode` by taking `min(x, y)` and `max(x, y)` respectively to simplify path calculations involving the special street. 3. Iterate through all possible unique pairs of houses `(houseA, houseB)` such that `1 <= houseA < houseB <= n`. 4. For each pair, calculate `linearPathDistance = houseB - houseA`. 5. Initialize `currentMinimumDistance` with `linearPathDistance`. 6. If `firstNode` and `secondNode` are distinct (meaning `x` and `y` are not the same house), calculate two alternative path lengths using the special street: one via `houseA -> ... -> firstNode -> secondNode -> ... -> houseB`, and another via `houseA -> ... -> secondNode -> firstNode -> ... -> houseB`. Update `currentMinimumDistance` to be the minimum of these three paths. 7. Increment `distanceCounts[currentMinimumDistance]`. 8. After checking all pairs, return `distanceCounts.slice(1)` to get the 1-indexed results.
 * Dry Run: n=3, x=1, y=3
 *   1. Initialize `distanceCounts` = `[0, 0, 0, 0]` (length n+1).
 *   2. `firstNode` = `Math.min(1, 3)` = 1, `secondNode` = `Math.max(1, 3)` = 3.
 *   3. `houseA` = 1:
 *      `houseB` = 2:
 *         `linearPathDistance` = `2 - 1` = 1.
 *         `currentMinimumDistance` = 1.
 *         `firstNode !== secondNode` is true.
 *         `pathViaFirstToSecond` = `Math.abs(1 - 1) + 1 + Math.abs(3 - 2)` = `0 + 1 + 1` = 2.
 *         `pathViaSecondToFirst` = `Math.abs(1 - 3) + 1 + Math.abs(1 - 2)` = `2 + 1 + 1` = 4.
 *         `currentMinimumDistance` = `Math.min(1, 2, 4)` = 1.
 *         `distanceCounts[1]` becomes 1. (`[0, 1, 0, 0]`)
 *      `houseB` = 3:
 *         `linearPathDistance` = `3 - 1` = 2.
 *         `currentMinimumDistance` = 2.
 *         `firstNode !== secondNode` is true.
 *         `pathViaFirstToSecond` = `Math.abs(1 - 1) + 1 + Math.abs(3 - 3)` = `0 + 1 + 0` = 1.
 *         `pathViaSecondToFirst` = `Math.abs(1 - 3) + 1 + Math.abs(1 - 3)` = `2 + 1 + 2` = 5.
 *         `currentMinimumDistance` = `Math.min(2, 1, 5)` = 1.
 *         `distanceCounts[1]` becomes 2. (`[0, 2, 0, 0]`)
 *   4. `houseA` = 2:
 *      `houseB` = 3:
 *         `linearPathDistance` = `3 - 2` = 1.
 *         `currentMinimumDistance` = 1.
 *         `firstNode !== secondNode` is true.
 *         `pathViaFirstToSecond` = `Math.abs(2 - 1) + 1 + Math.abs(3 - 3)` = `1 + 1 + 0` = 2.
 *         `pathViaSecondToFirst` = `Math.abs(2 - 3) + 1 + Math.abs(1 - 3)` = `1 + 1 + 2` = 4.
 *         `currentMinimumDistance` = `Math.min(1, 2, 4)` = 1.
 *         `distanceCounts[1]` becomes 3. (`[0, 3, 0, 0]`)
 *   5. Loops complete.
 *   6. Return `distanceCounts.slice(1)` which is `[3, 0, 0]`.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var countOfPairs = function (n, x, y) {
  const distanceCounts = new Array(n + 1).fill(0);

  const firstNode = Math.min(x, y);
  const secondNode = Math.max(x, y);

  for (let houseA = 1; houseA <= n; houseA++) {
    for (let houseB = houseA + 1; houseB <= n; houseB++) {
      let linearPathDistance = houseB - houseA;

      let currentMinimumDistance = linearPathDistance;

      if (firstNode !== secondNode) {
        const pathViaFirstToSecond =
          Math.abs(houseA - firstNode) + 1 + Math.abs(secondNode - houseB);
        const pathViaSecondToFirst =
          Math.abs(houseA - secondNode) + 1 + Math.abs(firstNode - houseB);
        currentMinimumDistance = Math.min(
          linearPathDistance,
          pathViaFirstToSecond,
          pathViaSecondToFirst
        );
      }
      distanceCounts[currentMinimumDistance]++;
    }
  }

  return distanceCounts.slice(1);
};
