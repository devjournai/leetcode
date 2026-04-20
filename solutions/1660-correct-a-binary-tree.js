/**
 * Correct A Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var correctBinaryTree = function (root) {
  const visitedNodesTracker = new Set();

  function depthFirstSearchRepair(
    currentExaminationNode,
    parentLink,
    isLeftChildConnection,
  ) {
    if (!currentExaminationNode) {
      return null;
    }

    if (
      currentExaminationNode.right &&
      visitedNodesTracker.has(currentExaminationNode.right)
    ) {
      if (parentLink) {
        if (isLeftChildConnection) {
          parentLink.left = null;
        } else {
          parentLink.right = null;
        }
      }
      return null;
    }

    visitedNodesTracker.add(currentExaminationNode);

    currentExaminationNode.right = depthFirstSearchRepair(
      currentExaminationNode.right,
      currentExaminationNode,
      false,
    );
    currentExaminationNode.left = depthFirstSearchRepair(
      currentExaminationNode.left,
      currentExaminationNode,
      true,
    );

    return currentExaminationNode;
  }

  const resultTreeRoot = depthFirstSearchRepair(root, null, false);
  return resultTreeRoot;
};
