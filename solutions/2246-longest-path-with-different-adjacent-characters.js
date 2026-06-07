/**
 * Longest Path With Different Adjacent Characters
 * Intuition: The longest path can either be entirely within a subtree or pass through the current node, connecting two distinct downward paths from its children. We can use a Depth First Search (DFS) to traverse the tree, and for each node, determine the two longest valid paths starting from its children (and extending downwards) such that the characters of adjacent nodes differ. These two paths, combined with the current node, form a potential longest path in the tree. The DFS function also needs to return the longest valid downward path from the current node to its parent, which can be extended by its parent.
 * Approach: 1. Construct an adjacency list `treeConnections` to represent the tree's child relationships from the `parent` array. 2. Initialize a global variable `maxPathFound` to 1, representing the minimum possible path length (a single node). 3. Define a recursive helper function `depthFirstSearch(currentTreeNode)` which takes a node identifier as input. 4. Inside `depthFirstSearch`, initialize `maxLengthOne` and `maxLengthTwo` to 0. These will store the lengths of the two longest valid downward paths originating from distinct children of `currentTreeNode`. 5. Iterate through each `childNodeId` in `treeConnections[currentTreeNode]`. For each child, recursively call `depthFirstSearch(childNodeId)` to get the `childPathResult` (the longest valid downward path starting from that child). 6. If `s[childNodeId]` is different from `s[currentTreeNode]`, it means the path can extend. Update `maxLengthOne` and `maxLengthTwo` based on `childPathResult`. If `childPathResult` is greater than `maxLengthOne`, `maxLengthTwo` becomes `maxLengthOne`, and `maxLengthOne` becomes `childPathResult`. Otherwise, if `childPathResult` is greater than `maxLengthTwo`, update `maxLengthTwo`. 7. After checking all children, update `maxPathFound` with `Math.max(maxPathFound, maxLengthOne + maxLengthTwo + 1)`. This accounts for paths that pass through `currentTreeNode`. 8. Return `maxLengthOne + 1` from `depthFirstSearch`. This value represents the longest valid downward path starting from `currentTreeNode` itself, which its parent can potentially use. 9. Initiate the DFS by calling `depthFirstSearch(0)` for the root node. 10. Return `maxPathFound`.
 * Dry Run:
 * parent = [-1, 0, 0, 1, 1, 2], s = "abacbe"
 * totalNodesCount = 6
 * treeConnections = [[1, 2], [3, 4], [5], [], [], []]
 * maxPathFound = 1
 *
 * dfsHelper(0): (s[0] = 'a')
 *   maxLengthOne = 0, maxLengthTwo = 0
 *   childNodeId = 1: (s[1] = 'b')
 *     dfsHelper(1): (s[1] = 'b')
 *       maxLengthOne = 0, maxLengthTwo = 0
 *       childNodeId = 3: (s[3] = 'a')
 *         dfsHelper(3): (s[3] = 'a')
 *           No children.
 *           maxPathFound = Math.max(1, 0 + 0 + 1) = 1
 *           Returns 1.
 *         childPathResult = 1
 *         s[3]('a') !== s[1]('b') -> true
 *         1 > maxLengthOne(0) -> true. maxLengthTwo = 0, maxLengthOne = 1
 *       childNodeId = 4: (s[4] = 'c')
 *         dfsHelper(4): (s[4] = 'c')
 *           No children.
 *           maxPathFound = Math.max(1, 0 + 0 + 1) = 1
 *           Returns 1.
 *         childPathResult = 1
 *         s[4]('c') !== s[1]('b') -> true
 *         1 > maxLengthOne(1) -> false.
 *         1 > maxLengthTwo(0) -> true. maxLengthTwo = 1
 *       For node 1: maxLengthOne = 1, maxLengthTwo = 1
 *       maxPathFound = Math.max(1, 1 + 1 + 1) = 3 (Path: 3-1-4 or 4-1-3)
 *       Returns 1 + 1 = 2.
 *     childPathResult = 2
 *     s[1]('b') !== s[0]('a') -> true
 *     2 > maxLengthOne(0) -> true. maxLengthTwo = 0, maxLengthOne = 2
 *   childNodeId = 2: (s[2] = 'a')
 *     dfsHelper(2): (s[2] = 'a')
 *       maxLengthOne = 0, maxLengthTwo = 0
 *       childNodeId = 5: (s[5] = 'e')
 *         dfsHelper(5): (s[5] = 'e')
 *           No children.
 *           maxPathFound = Math.max(3, 0 + 0 + 1) = 3
 *           Returns 1.
 *         childPathResult = 1
 *         s[5]('e') !== s[2]('a') -> true
 *         1 > maxLengthOne(0) -> true. maxLengthTwo = 0, maxLengthOne = 1
 *       For node 2: maxLengthOne = 1, maxLengthTwo = 0
 *       maxPathFound = Math.max(3, 1 + 0 + 1) = 3 (Path: 5-2)
 *       Returns 1 + 1 = 2.
 *     childPathResult = 2
 *     s[2]('a') !== s[0]('a') -> false (characters are same, path cannot extend)
 *     maxLengthOne (for node 0) remains 2, maxLengthTwo remains 0.
 *   For node 0: maxLengthOne = 2, maxLengthTwo = 0
 *   maxPathFound = Math.max(3, 2 + 0 + 1) = 3 (Path: 3-1-0 or 4-1-0)
 *   Returns 2 + 1 = 3.
 *
 * Final Result: maxPathFound = 3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var longestPath = function (parent, s) {
  const totalNodesCount = parent.length;
  const treeConnections = Array.from({ length: totalNodesCount }, () => []);
  let maxPathFound = 1;

  for (let nodeIndex = 1; nodeIndex < totalNodesCount; nodeIndex++) {
    treeConnections[parent[nodeIndex]].push(nodeIndex);
  }

  function depthFirstSearch(currentTreeNode) {
    let maxLengthOne = 0;
    let maxLengthTwo = 0;

    for (const childNodeId of treeConnections[currentTreeNode]) {
      const childPathResult = depthFirstSearch(childNodeId);
      if (s[childNodeId] !== s[currentTreeNode]) {
        if (childPathResult > maxLengthOne) {
          maxLengthTwo = maxLengthOne;
          maxLengthOne = childPathResult;
        } else if (childPathResult > maxLengthTwo) {
          maxLengthTwo = childPathResult;
        }
      }
    }

    maxPathFound = Math.max(maxPathFound, maxLengthOne + maxLengthTwo + 1);
    return maxLengthOne + 1;
  }

  depthFirstSearch(0);

  return maxPathFound;
};
