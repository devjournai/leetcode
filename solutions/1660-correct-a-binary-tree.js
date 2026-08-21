/**
 * Correct A Binary Tree
 * Intuition: Exactly one node has an invalid right pointer into an already-visited node (from a right-first DFS). When that pointer is seen, detach the faulty node from its parent.
 * Approach: 1. DFS visiting right then left, recording seen nodes. 2. If current.right is already in the set, null the parent's corresponding child and return null. 3. Otherwise mark current seen and recurse. 4. Return the repaired root.
 * Dry Run: 1→2, 1→3, and 2.right illegally points at 3.
 *   - Right-first DFS sees 3, then at 2 detects 3 already visited → drop 2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var correctBinaryTree = function (root) {
  const visitedNodesTracker = new Set();

  function depthFirstSearchRepair(
    currentExaminationNode,
    parentLink,
    isLeftChildConnection
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
      false
    );
    currentExaminationNode.left = depthFirstSearchRepair(
      currentExaminationNode.left,
      currentExaminationNode,
      true
    );

    return currentExaminationNode;
  }

  const resultTreeRoot = depthFirstSearchRepair(root, null, false);
  return resultTreeRoot;
};
