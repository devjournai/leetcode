/**
 * Binary Tree Cameras
 * Intuition: Greedy postorder: if a child needs a camera, place one here; if a child has a camera, this node is covered; else ask the parent to cover.
 * Approach: 1. States 0 need, 1 has camera, 2 covered. Nulls are covered. 2. If either child is 0, increment `totalCamerasRequired` and return 1. 3. If either child is 1, return 2. 4. Else return 0. 5. If the root still needs coverage, add one camera.
 * Dry Run: [0,0,null,0,0]. Leaves return 0; their parent places a camera; root is covered by that camera. Answer 1.
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
