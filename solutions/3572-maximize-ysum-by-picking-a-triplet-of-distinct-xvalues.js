/**
 * Maximize Ysum by Picking a Triplet of Distinct Xvalues
 * Intuition: We need three pairs with distinct x-values. For each x keep its largest y, then the answer is the sum of the three largest of those.
 * Approach: 1. Pair (x, y) and sort by y descending. 2. Scan, taking a y only when its x is unused. 3. Stop at three x-values, or return -1 if fewer than three distinct x.
 * Dry Run: x = [1, 2, 1, 3, 2], y = [5, 3, 4, 6, 2]. Sorted y: 6 (x=3), 5 (x=1), 4 skipped (x=1 taken), 3 (x=2). Sum 14.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxSumDistinctTriplet = function (x, y) {
  const n = x.length;
  const pairs = [];
  for (let i = 0; i < n; i++) {
    pairs.push([x[i], y[i]]);
  }
  pairs.sort((a, b) => b[1] - a[1]);

  const usedX = new Set();
  let sum = 0;
  for (const [xValue, yValue] of pairs) {
    if (usedX.has(xValue)) {
      continue;
    }
    usedX.add(xValue);
    sum += yValue;
    if (usedX.size === 3) {
      return sum;
    }
  }
  return -1;
};
