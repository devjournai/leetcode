/**
 * Subarrays Distinct Element Sum of Squares II
 *
 * Intuition:
 * For every right endpoint `right`, consider all subarrays ending at `right`:
 *
 *     [0..right], [1..right], [2..right], ..., [right..right]
 *
 * Let `distinctCount[left]` be the number of distinct values in
 * `nums[left..right]`.
 *
 * We need:
 *
 *     sum(distinctCount[left]²)
 *
 * for every `right`.
 *
 * The challenge is that when we add `nums[right]`, the distinct count
 * increases only for some starting positions.
 *
 * Suppose:
 *
 *     nums[right] = value
 *
 * and the previous occurrence of `value` was at index `last[value]`.
 *
 * For every starting position:
 *
 *     last[value] < left <= right
 *
 * `value` was not already present in `nums[left..right-1]`.
 *
 * Therefore, adding `value` increases the distinct count by 1 for
 * every `left` in:
 *
 *     [last[value] + 1, right]
 *
 * For all other starting positions, the distinct count remains unchanged.
 *
 * So for every `right`, we need a data structure that supports:
 *
 * 1. Range increment:
 *      distinctCount[left] += 1
 *
 * 2. Get the sum of squares:
 *      sum(distinctCount[left]²)
 *
 * A Segment Tree with Lazy Propagation can efficiently perform both.
 *
 * ------------------------------------------------------------
 *
 * Important Mathematical Observation:
 *
 * Suppose a range contains values:
 *
 *     x1, x2, x3, ...
 *
 * and we add 1 to every value.
 *
 * Then:
 *
 *     (x + 1)² = x² + 2x + 1
 *
 * Therefore:
 *
 *     newSumSquares = oldSumSquares
 *                     + 2 * oldSum
 *                     + numberOfElements
 *
 * So each segment tree node stores:
 *
 *     sum      = sum of distinct counts
 *     sumSq    = sum of squares of distinct counts
 *     lazy     = pending range increment
 *
 * When adding `1` to an entire node:
 *
 *     sumSq = sumSq + 2 * sum + length
 *     sum   = sum + length
 *
 * More generally, when adding `value`:
 *
 *     (x + value)²
 *       = x² + 2 * value * x + value²
 *
 * Therefore:
 *
 *     newSumSq = sumSq
 *                + 2 * value * sum
 *                + value² * length
 *
 * ------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Create a segment tree representing every possible left endpoint.
 *
 * 2. Initially every distinct count is 0.
 *
 * 3. Process `nums` from left to right.
 *
 * 4. For each `right`:
 *    - Find the previous occurrence of `nums[right]`.
 *    - Let it be `previousIndex`.
 *
 * 5. Increase the distinct count by 1 for:
 *
 *       [previousIndex + 1, right]
 *
 *    using a range update on the segment tree.
 *
 * 6. The root's `sumSq` now represents:
 *
 *       sum of distinctCount[left]²
 *
 *    for every subarray ending at `right`.
 *
 * 7. Add this value to the final answer.
 *
 * 8. Store the current index as the latest occurrence of the value.
 *
 * ------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [1, 2, 1]
 *
 * right = 0
 * value = 1
 * previous occurrence = -1
 *
 * Update range:
 *
 *     [0, 0]
 *
 * Distinct counts:
 *
 *     [1]
 *
 * Sum of squares:
 *
 *     1² = 1
 *
 * answer = 1
 *
 *
 * right = 1
 * value = 2
 * previous occurrence = -1
 *
 * Update range:
 *
 *     [0, 1]
 *
 * Distinct counts for subarrays ending at 1:
 *
 *     [1, 2]
 *
 * Sum of squares:
 *
 *     1² + 2² = 5
 *
 * answer:
 *
 *     1 + 5 = 6
 *
 *
 * right = 2
 * value = 1
 * previous occurrence = 0
 *
 * Update range:
 *
 *     [1, 2]
 *
 * Distinct counts:
 *
 *     [2, 2, 1]
 *
 * Sum of squares:
 *
 *     2² + 2² + 1² = 9
 *
 * answer:
 *
 *     6 + 9 = 15
 *
 * Therefore:
 *
 *     answer = 15
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var sumCounts = function (nums) {
  const MOD = 1000000007;
  const n = nums.length;
  const sum = new Array(4 * n).fill(0);
  const sumSq = new Array(4 * n).fill(0);
  const lazy = new Array(4 * n).fill(0);

  const apply = (node, left, right, value) => {
    const length = right - left + 1;

    const oldSum = sum[node];

    sumSq[node] =
      (sumSq[node] +
        ((2 * value) % MOD) * oldSum +
        ((value * value) % MOD) * length) %
      MOD;

    sum[node] = (sum[node] + value * length) % MOD;

    lazy[node] = (lazy[node] + value) % MOD;
  };

  const push = (node, left, right) => {
    if (lazy[node] === 0 || left === right) {
      return;
    }

    const middle = Math.floor((left + right) / 2);
    const value = lazy[node];

    const leftChild = node * 2;
    const rightChild = node * 2 + 1;

    apply(leftChild, left, middle, value);
    apply(rightChild, middle + 1, right, value);

    lazy[node] = 0;
  };

  const update = (node, left, right, queryLeft, queryRight, value) => {
    if (queryRight < left || right < queryLeft) {
      return;
    }

    if (queryLeft <= left && right <= queryRight) {
      apply(node, left, right, value);
      return;
    }

    push(node, left, right);

    const middle = Math.floor((left + right) / 2);

    update(node * 2, left, middle, queryLeft, queryRight, value);

    update(node * 2 + 1, middle + 1, right, queryLeft, queryRight, value);

    sum[node] = (sum[node * 2] + sum[node * 2 + 1]) % MOD;

    sumSq[node] = (sumSq[node * 2] + sumSq[node * 2 + 1]) % MOD;
  };

  const last = new Array(100001).fill(-1);

  let answer = 0;

  for (let right = 0; right < n; right++) {
    const value = nums[right];
    const previousIndex = last[value];
    update(1, 0, n - 1, previousIndex + 1, right, 1);
    answer = (answer + sumSq[1]) % MOD;
    last[value] = right;
  }

  return answer;
};
