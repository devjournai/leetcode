/**
 * Make K-Subarray Sums Equal
 *
 * Intuition:
 * Let:
 *
 *      g = gcd(n, k)
 *
 * Because the array is circular, moving by `k` positions repeatedly forms
 * independent cycles.
 *
 * Every index in the same cycle must eventually have the same value;
 * otherwise, the sums of length-k subarrays cannot all be equal.
 *
 * For each cycle, the minimum cost to make all values equal is obtained by
 * changing every value to the median of that cycle.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Compute:
 *
 *      g = gcd(n, k)
 *
 * 2. There are exactly `g` independent cycles.
 *
 * 3. For every starting index:
 *
 *      start = 0 ... g-1
 *
 *      Traverse:
 *
 *          start
 *          start + k
 *          start + 2k
 *          ...
 *          (mod n)
 *
 *      Collect every value in this cycle.
 *
 * 4. Sort the collected values.
 *
 * 5. Choose the median.
 *
 * 6. Add:
 *
 *      |value - median|
 *
 *      for every value in the cycle.
 *
 * 7. Sum the costs of all cycles.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * arr =
 * [1,4,1,3]
 *
 * k = 2
 *
 * n = 4
 *
 * gcd(4,2)=2
 *
 * ----------------
 * Cycle 1:
 *
 * indices:
 *
 * 0 → 2
 *
 * values:
 *
 * [1,1]
 *
 * median =1
 *
 * cost =0
 *
 * ----------------
 * Cycle 2:
 *
 * indices:
 *
 * 1 → 3
 *
 * values:
 *
 * [4,3]
 *
 * median =4
 *
 * cost =1
 *
 * Total:
 *
 * 1
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

var makeSubKSumEqual = function (arr, k) {
  const n = arr.length;

  const gcd = (a, b) => {
    while (b !== 0) {
      const temp = a % b;
      a = b;
      b = temp;
    }
    return a;
  };

  const groups = gcd(n, k);

  const visited = new Array(n).fill(false);

  let answer = 0n;

  for (let start = 0; start < groups; start++) {
    const values = [];

    let index = start;

    while (!visited[index]) {
      visited[index] = true;

      values.push(arr[index]);

      index = (index + k) % n;
    }

    values.sort((a, b) => a - b);

    const median = values[Math.floor(values.length / 2)];

    for (const value of values) {
      answer += BigInt(Math.abs(value - median));
    }
  }

  return Number(answer);
};
