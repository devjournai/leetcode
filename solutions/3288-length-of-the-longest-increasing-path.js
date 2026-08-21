/**
 * Length of the Longest Increasing Path
 * Intuition: The path must include coordinates[k] and be strictly increasing in both x and y. Points that can appear before k are those with x < xk and y < yk; after k, x > xk and y > yk. The two sides are independent LIS problems on 2D points.
 * Approach:
 * 1. Split points into `left` (strictly southwest of k) and `right` (strictly northeast).
 * 2. LIS on 2D: sort by x ascending, y descending (so equal-x points cannot chain), then patience-sort on y.
 * 3. Answer is 1 + LIS(left) + LIS(right).
 * Dry Run: coordinates = [[3,1],[2,2],[4,1],[0,0],[5,3]], k = 1 (point (2,2))
 *   - left: (0,0). LIS = 1
 *   - right: (5,3) only among points with x>2 and y>2. LIS = 1
 *   - Path (0,0) -> (2,2) -> (5,3), length 3
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var maxPathLength = function (coordinates, k) {
  const xk = coordinates[k][0];
  const yk = coordinates[k][1];
  const leftCoordinates = [];
  const rightCoordinates = [];

  for (const [x, y] of coordinates) {
    if (x < xk && y < yk) leftCoordinates.push([x, y]);
    else if (x > xk && y > yk) rightCoordinates.push([x, y]);
  }

  const firstGreaterEqual = (arr, target) => {
    let l = 0;
    let r = arr.length;

    while (l < r) {
      const m = (l + r) >> 1;
      if (arr[m] < target) l = m + 1;
      else r = m;
    }

    return l;
  };

  const lengthOfLIS = (coords) => {
    coords.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));
    const tails = [];

    for (const [, y] of coords) {
      if (tails.length === 0 || y > tails[tails.length - 1]) tails.push(y);
      else tails[firstGreaterEqual(tails, y)] = y;
    }

    return tails.length;
  };

  return 1 + lengthOfLIS(leftCoordinates) + lengthOfLIS(rightCoordinates);
};
