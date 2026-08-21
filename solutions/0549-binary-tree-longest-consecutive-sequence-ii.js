/**
 * Binary Tree Longest Consecutive Sequence II
 * Intuition: At each node track the longest increasing and decreasing consecutive chain starting at that node into a child. Combining inc + dec - 1 covers a path that goes down one side and up the other through this node.
 * Approach: 1. Recurse; null returns [0,0]. 2. From each child, if parent = child+1 extend decreasing; if parent = child-1 extend increasing. 3. Update `overallMaxPathLength` with inc+dec-1. 4. Return [inc, dec] to the parent. 5. Return the global max.
 * Dry Run: 1 with left 2 and right 3? Use 2 with children 1 and 3.
 *   - At 1: [1,1]. Parent 2 = 1+1 so decreasing from 2 via left is 2. At 3: [1,1]; 2 = 3-1 so increasing from 2 via right is 2.
 *   - Path length 2+2-1 = 3 (1-2-3). Return 3.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var longestConsecutive = function (root) {
  let overallMaxPathLength = 0;

  function calculateNodePaths(currentNode) {
    if (!currentNode) {
      return [0, 0];
    }

    let nodeIncreasingSequence = 1;
    let nodeDecreasingSequence = 1;

    if (currentNode.left) {
      const [leftAscendingLength, leftDescendingLength] = calculateNodePaths(
        currentNode.left
      );

      if (currentNode.val === currentNode.left.val + 1) {
        nodeDecreasingSequence = Math.max(
          nodeDecreasingSequence,
          leftDescendingLength + 1
        );
      }
      if (currentNode.val === currentNode.left.val - 1) {
        nodeIncreasingSequence = Math.max(
          nodeIncreasingSequence,
          leftAscendingLength + 1
        );
      }
    }

    if (currentNode.right) {
      const [rightAscendingLength, rightDescendingLength] = calculateNodePaths(
        currentNode.right
      );

      if (currentNode.val === currentNode.right.val + 1) {
        nodeDecreasingSequence = Math.max(
          nodeDecreasingSequence,
          rightDescendingLength + 1
        );
      }
      if (currentNode.val === currentNode.right.val - 1) {
        nodeIncreasingSequence = Math.max(
          nodeIncreasingSequence,
          rightAscendingLength + 1
        );
      }
    }

    overallMaxPathLength = Math.max(
      overallMaxPathLength,
      nodeIncreasingSequence + nodeDecreasingSequence - 1
    );

    return [nodeIncreasingSequence, nodeDecreasingSequence];
  }

  calculateNodePaths(root);

  return overallMaxPathLength;
};
