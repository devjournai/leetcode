/**
 * Minimum Sensors to Cover Grid
 * Intuition: A sensor of range k covers a (2k+1)×(2k+1) Chebyshev square, so the grid tiles into ceil(n/(2k+1)) by ceil(m/(2k+1)) such squares.
 * Approach: Return ceil(n / (2k+1)) * ceil(m / (2k+1)).
 * Dry Run: n=m=5, k=1 → span 3, ceil(5/3)^2 = 4.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var minSensors = function (n, m, k) {
  const span = 2 * k + 1;
  return Math.ceil(n / span) * Math.ceil(m / span);
};
