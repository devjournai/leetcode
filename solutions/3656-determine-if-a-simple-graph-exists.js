/**
 * Determine If A Simple Graph Exists
 * Intuition: A degree sequence is graphic iff it is non-negative, each degree is at most n - 1, the sum is even, and the Erdős–Gállai inequalities hold.
 * Approach: 1. Reject any degree outside [0, n - 1] or an odd sum. 2. Sort degrees descending and build prefix sums. 3. For each k, require prefix[k] <= k * (k - 1) + sum of min(degree[i], k) over the tail. 4. Compute the tail in linear time with a right pointer into the sorted array.
 * Dry Run: degrees = [3, 1, 2, 2] sorts to [3, 2, 2, 1], sum 8 even. Each k bound holds (k = 2: 5 <= 2 + 3). degrees = [1, 3, 3, 1] fails at k = 2 because 6 > 4.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var simpleGraphExists = function (degrees) {
  const n = degrees.length;
  let degreeSum = 0;

  for (const degree of degrees) {
    if (degree < 0 || degree > n - 1) {
      return false;
    }
    degreeSum += degree;
  }

  if (degreeSum % 2 !== 0) {
    return false;
  }

  const sortedDegrees = degrees.slice().sort((left, right) => right - left);
  const prefixSum = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + sortedDegrees[i];
  }

  let tailIndex = n - 1;
  for (let k = 1; k <= n; k++) {
    while (tailIndex >= k && sortedDegrees[tailIndex] < k) {
      tailIndex--;
    }
    const lastGeK = Math.max(k - 1, tailIndex);
    const geCount = lastGeK - (k - 1);
    const tailMinSum = k * geCount + (prefixSum[n] - prefixSum[lastGeK + 1]);
    if (prefixSum[k] > k * (k - 1) + tailMinSum) {
      return false;
    }
  }

  return true;
};
