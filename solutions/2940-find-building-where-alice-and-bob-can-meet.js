/**
 * Find Building Where Alice and Bob Can Meet
 *
 * Intuition:
 *
 * For a query [a, b], first make sure:
 *
 *     a <= b
 *
 * because Alice and Bob can only move to the RIGHT.
 *
 * ------------------------------------------------------------
 *
 * There are three easy cases:
 *
 * 1. a === b
 *
 *    They are already in the same building.
 *
 *    Answer = a
 *
 * 2. heights[a] < heights[b]
 *
 *    Alice can directly move to Bob's building.
 *
 *    Answer = b
 *
 * 3. heights[a] >= heights[b]
 *
 *    Neither person can directly meet at b.
 *
 *    We need to find the first building j > b such that:
 *
 *        heights[j] > heights[a]
 *
 *    Why only heights[a]?
 *
 *    Because:
 *
 *        heights[a] >= heights[b]
 *
 *    So if a building is taller than heights[a], it is
 *    automatically taller than both buildings.
 *
 * ------------------------------------------------------------
 *
 * The difficult part is finding the LEFTMOST index j > b
 * where:
 *
 *     heights[j] > heights[a]
 *
 * for up to 50,000 queries.
 *
 * Approach: Build a max segment tree on heights. For each query swap so a<=b. If a===b return a; if heights[a]<heights[b] return b; else leftmost-search the tree from index b+1 for height > heights[a] (or -1).
 *
 * We can use:
 *
 *     Binary Search + Segment Tree
 *
 * The segment tree stores the maximum height in every range.
 *
 * For a query:
 *
 *     [a, b]
 *
 * we search for the first position after b whose height is
 * greater than heights[a].
 *
 * ------------------------------------------------------------
 *
 * Segment Tree:
 *
 * tree[node] stores:
 *
 *     maximum height in that segment
 *
 * Suppose we want:
 *
 *     first index >= b + 1
 *     whose height > target
 *
 * If the maximum height of a segment is <= target,
 * there is no valid answer inside that segment.
 *
 * Otherwise, we recursively search:
 *
 *     left child first
 *     right child second
 *
 * This guarantees that we find the LEFTMOST valid building.
 *
 * ------------------------------------------------------------
 *
 * Dry Run:
 *
 * heights = [6,4,8,5,2,7]
 *
 * Query:
 *
 *     [0,3]
 *
 * a = 0
 * b = 3
 *
 * heights[0] = 6
 * heights[3] = 5
 *
 * Since:
 *
 *     6 >= 5
 *
 * we cannot meet at building 3.
 *
 * We need:
 *
 *     j > 3
 *     heights[j] > 6
 *
 * Buildings after 3:
 *
 *     index 4 -> height 2
 *     index 5 -> height 7
 *
 * First valid building:
 *
 *     index 5
 *
 * Answer = 5
 *
 * ------------------------------------------------------------
 *
 * Another query:
 *
 *     [2,4]
 *
 * heights[2] = 8
 * heights[4] = 2
 *
 * We need:
 *
 *     j > 4
 *     heights[j] > 8
 *
 * There is no such building.
 *
 * Answer = -1
 *
 * -----------------------------------------------------------
 *
 * Time Complexity: O(n + q log n)
 * Space Complexity: O(n)
 */
var leftmostBuildingQueries = function (heights, queries) {
  const n = heights.length;

  const tree = new Array(4 * n).fill(0);

  const build = (node, left, right) => {
    if (left === right) {
      tree[node] = heights[left];
      return;
    }

    const mid = Math.floor((left + right) / 2);

    build(node * 2, left, mid);
    build(node * 2 + 1, mid + 1, right);

    tree[node] = Math.max(tree[node * 2], tree[node * 2 + 1]);
  };

  build(1, 0, n - 1);

  const findFirst = (node, left, right, start, target) => {
    if (right < start) {
      return -1;
    }

    if (tree[node] <= target) {
      return -1;
    }

    if (left === right) {
      return left;
    }

    const mid = Math.floor((left + right) / 2);

    const leftResult = findFirst(node * 2, left, mid, start, target);

    if (leftResult !== -1) {
      return leftResult;
    }
    return findFirst(node * 2 + 1, mid + 1, right, start, target);
  };

  const answer = new Array(queries.length);

  for (let q = 0; q < queries.length; q++) {
    let [a, b] = queries[q];

    if (a > b) {
      [a, b] = [b, a];
    }

    if (a === b) {
      answer[q] = a;
      continue;
    }

    if (heights[a] < heights[b]) {
      answer[q] = b;
      continue;
    }

    answer[q] = findFirst(1, 0, n - 1, b + 1, heights[a]);
  }

  return answer;
};
