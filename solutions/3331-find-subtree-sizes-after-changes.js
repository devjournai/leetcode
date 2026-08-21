/**
 * Find Subtree Sizes After Changes
 * Intuition: Each node may reattach to its closest ancestor with the same character. After rewriting parents, subtree sizes are standard DFS sizes on the new tree.
 * Approach: 1. For every node i > 0, walk original parents until a same-character ancestor (or root). 2. Build an adjacency list from the new parents. 3. DFS from 0, setting ans[u] = 1 + sum of children's sizes.
 * Dry Run: parent = [-1, 0, 0, 1], s = "aabc". Node 3 ('c') has no same-letter ancestor. Node 2 ('a') reparents to 0. Sizes follow the new tree.
 * Time Complexity: O(N * H)
 * Space Complexity: O(N)
 */

var findSubtreeSizes = function (parent, s) {
  const n = parent.length;
  const sizes = Array(n).fill(0);
  const newParent = parent.slice();
  const tree = Array.from({ length: n }, () => []);

  for (let node = 1; node < n; node++) {
    const closest = findClosestSameLetterAncestor(node, parent, s);
    if (closest !== -1) {
      newParent[node] = closest;
    }
  }

  for (let node = 1; node < n; node++) {
    tree[newParent[node]].push(node);
  }

  fillSubtreeSizes(tree, 0, sizes);
  return sizes;
};

function findClosestSameLetterAncestor(node, parent, s) {
  for (let current = parent[node]; current !== -1; current = parent[current]) {
    if (s[current] === s[node]) {
      return current;
    }
  }
  return -1;
}

function fillSubtreeSizes(tree, node, sizes) {
  let size = 1;
  for (const child of tree[node]) {
    size += fillSubtreeSizes(tree, child, sizes);
  }
  sizes[node] = size;
  return size;
}
