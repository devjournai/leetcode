/**
 * Binary Tree Longest Consecutive Sequence II
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
        currentNode.left,
      );

      if (currentNode.val === currentNode.left.val + 1) {
        nodeDecreasingSequence = Math.max(
          nodeDecreasingSequence,
          leftDescendingLength + 1,
        );
      }
      if (currentNode.val === currentNode.left.val - 1) {
        nodeIncreasingSequence = Math.max(
          nodeIncreasingSequence,
          leftAscendingLength + 1,
        );
      }
    }

    if (currentNode.right) {
      const [rightAscendingLength, rightDescendingLength] = calculateNodePaths(
        currentNode.right,
      );

      if (currentNode.val === currentNode.right.val + 1) {
        nodeDecreasingSequence = Math.max(
          nodeDecreasingSequence,
          rightDescendingLength + 1,
        );
      }
      if (currentNode.val === currentNode.right.val - 1) {
        nodeIncreasingSequence = Math.max(
          nodeIncreasingSequence,
          rightAscendingLength + 1,
        );
      }
    }

    overallMaxPathLength = Math.max(
      overallMaxPathLength,
      nodeIncreasingSequence + nodeDecreasingSequence - 1,
    );

    return [nodeIncreasingSequence, nodeDecreasingSequence];
  }

  calculateNodePaths(root);

  return overallMaxPathLength;
};
