/**
 * Convert Sorted Array To Binary Search Tree
 * Intuition: The sorted array is an inorder BST. Choosing the midpoint as root at every range keeps left and right sizes balanced.
 * Approach: 1. Recurse on [left, right]; empty range is null. 2. Mid = floor((left+right)/2) becomes the node. 3. Build left on [left, mid-1] and right on [mid+1, right]. Start from [0, n-1].
 * Dry Run: nums = [-10,-3,0,5,9]. Mid 0 is root. Left mid of [-10,-3] is -10 with right -3. Right mid of [5,9] is 5 with right 9. Height-balanced BST.
 * Time Complexity: O(n)
 * Space Complexity: O(log n)
 */
var sortedArrayToBST = function (nums) {
  const buildSubtree = (currentArray, leftIndexBound, rightIndexBound) => {
    if (leftIndexBound > rightIndexBound) {
      return null;
    }

    const midPoint = Math.floor((leftIndexBound + rightIndexBound) / 2);
    const nodeValueCandidate = currentArray[midPoint];
    const currentRoot = new TreeNode(nodeValueCandidate);

    const leftSubtreeBranch = buildSubtree(
      currentArray,
      leftIndexBound,
      midPoint - 1
    );
    currentRoot.left = leftSubtreeBranch;

    const rightSubtreeBranch = buildSubtree(
      currentArray,
      midPoint + 1,
      rightIndexBound
    );
    currentRoot.right = rightSubtreeBranch;

    return currentRoot;
  };

  const initialCallResult = buildSubtree(nums, 0, nums.length - 1);
  return initialCallResult;
};
