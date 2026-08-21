/**
 * Fruits Into Baskets III
 * Intuition: Same placement rule as Fruits Into Baskets II, but n is large, so the leftmost basket with capacity >= fruit must be found in logarithmic time. A max segment tree stores basket capacities and can walk to the first valid leaf.
 * Approach: 1. Build a max segment tree over baskets. 2. For each fruit, query the first index whose stored max is >= fruit; mark that leaf -1. 3. If the query returns -1, the fruit is unplaced. 4. Return the unplaced count.
 * Dry Run: fruits = [4,2,5], baskets = [3,5,4].
 *   - Tree maxes: 5. Query 4 hits index 1, set to -1.
 *   - Query 2 hits index 0.
 *   - Query 5 finds no leaf >= 5 → 1 unplaced.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var numOfUnplacedFruits = function (fruits, baskets) {
  const n = baskets.length;
  const tree = new Array(n * 4).fill(0);

  const merge = (left, right) => Math.max(left, right);

  const build = (treeIndex, lo, hi) => {
    if (lo === hi) {
      tree[treeIndex] = baskets[lo];
      return;
    }
    const mid = Math.floor((lo + hi) / 2);
    build(treeIndex * 2 + 1, lo, mid);
    build(treeIndex * 2 + 2, mid + 1, hi);
    tree[treeIndex] = merge(tree[treeIndex * 2 + 1], tree[treeIndex * 2 + 2]);
  };

  const update = (treeIndex, lo, hi, i, val) => {
    if (lo === hi) {
      tree[treeIndex] = val;
      return;
    }
    const mid = Math.floor((lo + hi) / 2);
    if (i <= mid) {
      update(treeIndex * 2 + 1, lo, mid, i, val);
    } else {
      update(treeIndex * 2 + 2, mid + 1, hi, i, val);
    }
    tree[treeIndex] = merge(tree[treeIndex * 2 + 1], tree[treeIndex * 2 + 2]);
  };

  const queryFirst = (treeIndex, lo, hi, target) => {
    if (tree[treeIndex] < target) {
      return -1;
    }
    if (lo === hi) {
      update(0, 0, n - 1, lo, -1);
      return lo;
    }
    const mid = Math.floor((lo + hi) / 2);
    const leftChild = tree[treeIndex * 2 + 1];
    if (leftChild >= target) {
      return queryFirst(treeIndex * 2 + 1, lo, mid, target);
    }
    return queryFirst(treeIndex * 2 + 2, mid + 1, hi, target);
  };

  build(0, 0, n - 1);

  let unplacedFruitCount = 0;
  for (const fruitQuantity of fruits) {
    if (queryFirst(0, 0, n - 1, fruitQuantity) === -1) {
      unplacedFruitCount++;
    }
  }

  return unplacedFruitCount;
};
