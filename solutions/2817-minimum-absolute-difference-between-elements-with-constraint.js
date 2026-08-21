/**
 * Minimum Absolute Difference Between Elements With Constraint
 * Intuition: For index j, eligible partners are values at indices <= j-x. The closest eligible value is the predecessor or successor in a sorted multiset.
 * Approach: 1. Compress unique values. 2. Fenwick tree stores frequencies of eligible ranks. 3. For j from x..n-1, insert nums[j-x], then query predecessor/successor of nums[j] via prefix counts and kth. 4. Track min abs diff; return early if 0.
 * Dry Run: nums = [4,3,2,4], x = 2. j=2 inserts 4, closest to 2 is 4 (diff 2). j=3 inserts 3, closest to 4 is 4 (diff 0). Answer 0.
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
