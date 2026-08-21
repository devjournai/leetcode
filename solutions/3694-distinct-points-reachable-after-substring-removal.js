/**
 * Distinct Points Reachable After Substring Removal
 * Intuition: Removing a length-k substring subtracts that segment's displacement from the full path. Prefix coordinates make every window's net move O(1).
 * Approach: 1. Build prefix X/Y after each move. 2. For each window of length k, final point = total - (prefix[right] - prefix[left]). 3. Count unique points.
 * Dry Run: Different windows that have the same net (dx, dy) map to the same leftover point.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var distinctPoints = function (s, k) {
  const n = s.length;
  const prefixX = Array(n + 1).fill(0);
  const prefixY = Array(n + 1).fill(0);
  let x = 0;
  let y = 0;

  for (let i = 0; i < n; i++) {
    const move = s[i];
    if (move === "U") {
      y++;
    } else if (move === "D") {
      y--;
    } else if (move === "L") {
      x--;
    } else {
      x++;
    }
    prefixX[i + 1] = x;
    prefixY[i + 1] = y;
  }

  const uniquePoints = new Set();
  for (let end = k; end <= n; end++) {
    const finalX = prefixX[n] - (prefixX[end] - prefixX[end - k]);
    const finalY = prefixY[n] - (prefixY[end] - prefixY[end - k]);
    uniquePoints.add(`${finalX},${finalY}`);
  }
  return uniquePoints.size;
};
