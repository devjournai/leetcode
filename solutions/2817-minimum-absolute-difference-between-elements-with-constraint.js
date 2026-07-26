/**
 * Minimum Absolute Difference Between Elements With Constraint
 *
 * Intuition:
 * We need two indices i and j such that:
 *
 *      |i - j| >= x
 *
 * and we want to minimize:
 *
 *      |nums[i] - nums[j]|
 *
 * Suppose we process j from left to right.
 *
 * For the current index j, every index:
 *
 *      i <= j - x
 *
 * is far enough from j to form a valid pair.
 *
 * So before processing nums[j], we add nums[j - x] to a data structure.
 *
 * Now the problem becomes:
 *
 *      Among all previously added values, find the value closest
 *      to nums[j].
 *
 * For a sorted collection, the closest value to target must be either:
 *
 *      • the largest value <= target
 *      • the smallest value >= target
 *
 * JavaScript does not have a built-in TreeSet / ordered multiset, so we can
 * use coordinate compression + a Fenwick Tree.
 *
 * -----------------------------------------------------------------------
 *
 * Fenwick Tree:
 *
 * First sort all unique values from nums.
 *
 * Each number receives a compressed index:
 *
 *      value -> rank
 *
 * The Fenwick Tree stores how many currently eligible numbers exist at
 * each rank.
 *
 * For nums[j], let its rank be r.
 *
 * We need:
 *
 *      predecessor = largest inserted rank <= r
 *      successor   = smallest inserted rank >= r
 *
 * Using Fenwick prefix sums, we can determine how many inserted elements
 * occur before/at a rank.
 *
 * Fenwick's kth() operation lets us find the rank containing the k-th
 * inserted element in O(log N).
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Coordinate-compress nums.
 *
 * 2. Create a Fenwick Tree storing frequencies of eligible values.
 *
 * 3. Iterate j from x to n - 1.
 *
 * 4. Insert:
 *
 *      nums[j - x]
 *
 *    because its index is now at least x positions away from j.
 *
 * 5. Find the predecessor and successor of nums[j].
 *
 * 6. Update:
 *
 *      answer = min(
 *          answer,
 *          |nums[j] - predecessor|,
 *          |nums[j] - successor|
 *      )
 *
 * 7. If answer becomes 0, return immediately because no smaller absolute
 *    difference is possible.
 *
 * -----------------------------------------------------------------------
 *
 * Example:
 *
 * nums = [4,3,2,4]
 * x = 2
 *
 * j = 2:
 *
 *      insert nums[0] = 4
 *
 *      target = nums[2] = 2
 *
 *      closest eligible value = 4
 *      difference = 2
 *
 * j = 3:
 *
 *      insert nums[1] = 3
 *
 *      target = nums[3] = 4
 *
 *      eligible values = {3,4}
 *
 *      predecessor = 4
 *
 *      difference = 0
 *
 * Therefore:
 *
 *      answer = 0
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

var minAbsoluteDifference = function (nums, x) {
  if (x === 0) {
    return 0;
  }

  const sorted = [...new Set(nums)].sort((a, b) => a - b);
  const m = sorted.length;

  const rank = new Map();

  for (let i = 0; i < m; i++) {
    rank.set(sorted[i], i + 1);
  }

  const tree = new Int32Array(m + 1);

  const update = (index, delta) => {
    while (index <= m) {
      tree[index] += delta;
      index += index & -index;
    }
  };

  const query = (index) => {
    let sum = 0;

    while (index > 0) {
      sum += tree[index];
      index -= index & -index;
    }

    return sum;
  };

  const kth = (k) => {
    let index = 0;
    let bit = 1;

    while (bit << 1 <= m) {
      bit <<= 1;
    }

    for (; bit > 0; bit >>= 1) {
      const next = index + bit;

      if (next <= m && tree[next] < k) {
        index = next;
        k -= tree[next];
      }
    }

    return index + 1;
  };

  let answer = Infinity;

  for (let j = x; j < nums.length; j++) {
    update(rank.get(nums[j - x]), 1);

    const currentRank = rank.get(nums[j]);
    const total = query(m);

    const leftCount = query(currentRank);

    if (leftCount > 0) {
      const predecessorRank = kth(leftCount);
      const predecessor = sorted[predecessorRank - 1];

      answer = Math.min(answer, nums[j] - predecessor);
    }

    const beforeCount = query(currentRank - 1);

    if (beforeCount < total) {
      const successorRank = kth(beforeCount + 1);
      const successor = sorted[successorRank - 1];

      answer = Math.min(answer, successor - nums[j]);
    }

    if (answer === 0) {
      return 0;
    }
  }

  return answer;
};
