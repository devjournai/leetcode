/**
 * Binary Tree Cameras
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var minCameraCover = function (root) {
  let totalCamerasRequired = 0;
  const stateNeedsCameraOrCoveredByParent = 0;
  const stateHasCamera = 1;
  const stateIsCoveredByChild = 2;

  function processTreeNode(currentNode) {
    if (currentNode === null) {
      return stateIsCoveredByChild;
    }

    const leftSubtreeResult = processTreeNode(currentNode.left);
    const rightSubtreeResult = processTreeNode(currentNode.right);

    if (
      leftSubtreeResult === stateNeedsCameraOrCoveredByParent ||
      rightSubtreeResult === stateNeedsCameraOrCoveredByParent
    ) {
      totalCamerasRequired++;
      return stateHasCamera;
    }

    if (
      leftSubtreeResult === stateHasCamera ||
      rightSubtreeResult === stateHasCamera
    ) {
      return stateIsCoveredByChild;
    }
    return stateNeedsCameraOrCoveredByParent;
  }

  const finalRootStatus = processTreeNode(root);
  if (finalRootStatus === stateNeedsCameraOrCoveredByParent) {
    totalCamerasRequired++;
  }

  return totalCamerasRequired;
};
