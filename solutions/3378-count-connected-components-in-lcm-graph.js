/**
 * Count Connected Components in LCM Graph
 * Intuition: Two values `a` and `b` share an edge when `lcm(a, b) ≤ threshold`, which is equivalent to sharing a common multiple ≤ threshold. Union each number with all of its multiples up to `threshold`.
 * Approach: 1. Union-find keyed by integer values. 2. For every `num`, union `num` with `2*num, 3*num, ...` while the multiple is ≤ threshold. 3. Count unique roots among the original `nums` (values larger than `threshold` stay isolated).
 * Dry Run: nums = [2, 4, 8, 3], threshold = 5.
 *   - 2 unions with 4. 4 has no multiple ≤ 5 besides itself skipped (starts at 8). 8 > 5 so isolated. 3 unions with nothing ≤ 5.
 *   - Components: {2,4}, {8}, {3} → 3.
 * Time Complexity: O(N * (threshold / min(nums)) * α(threshold))
 * Space Complexity: O(threshold)
 */

var countComponents = function (nums, threshold) {
  const parentByValue = new Map();
  const rankByValue = new Map();

  const findRoot = (value) => {
    if (!parentByValue.has(value)) {
      parentByValue.set(value, value);
      rankByValue.set(value, 0);
    }
    if (parentByValue.get(value) !== value) {
      parentByValue.set(value, findRoot(parentByValue.get(value)));
    }
    return parentByValue.get(value);
  };

  const unionByRank = (leftValue, rightValue) => {
    const leftRoot = findRoot(leftValue);
    const rightRoot = findRoot(rightValue);
    if (leftRoot === rightRoot) {
      return;
    }
    const leftRank = rankByValue.get(leftRoot);
    const rightRank = rankByValue.get(rightRoot);
    if (leftRank < rightRank) {
      parentByValue.set(leftRoot, rightRoot);
    } else if (leftRank > rightRank) {
      parentByValue.set(rightRoot, leftRoot);
    } else {
      parentByValue.set(leftRoot, rightRoot);
      rankByValue.set(rightRoot, rightRank + 1);
    }
  };

  for (const num of nums) {
    for (let multiple = 2 * num; multiple <= threshold; multiple += num) {
      unionByRank(num, multiple);
    }
  }

  const uniqueRoots = new Set();
  for (const num of nums) {
    uniqueRoots.add(findRoot(num));
  }
  return uniqueRoots.size;
};
