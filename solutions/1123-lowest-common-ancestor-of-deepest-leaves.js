/**
 * Lowest Common Ancestor Of Deepest Leaves
 * Intuition: The LCA of the deepest leaves is the deepest node whose left and right subtrees have equal height; if one side is deeper, the answer lives entirely on that side.
 * Approach: 1. Post-order each node and return {subtree height, LCA of deepest leaves in that subtree}. 2. Null is height 0. 3. Equal child heights: this node is the LCA. 4. Otherwise keep the LCA from the taller child and add 1 to height. 5. Return the root call’s LCA.
 * Dry Run: root = [3,5,1,6,2,0,8,null,null,7,4].
 *   - Deepest leaves are 7 and 4 under 2; left of 5 is shallower than right.
 *   - Node 2 has equal deepest heights, so LCA is 2.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var lcaDeepestLeaves = function (root) {
  function processNodeAndDepth(currentNodeElement) {
    if (!currentNodeElement) {
      return { maximumDepth: 0, deepestLca: null };
    }

    const leftSubtreeOutcome = processNodeAndDepth(currentNodeElement.left);
    const rightSubtreeOutcome = processNodeAndDepth(currentNodeElement.right);

    const leftLevel = leftSubtreeOutcome.maximumDepth;
    const rightLevel = rightSubtreeOutcome.maximumDepth;

    if (leftLevel === rightLevel) {
      const currentTotalDepth = leftLevel + 1;
      return {
        maximumDepth: currentTotalDepth,
        deepestLca: currentNodeElement,
      };
    } else if (leftLevel > rightLevel) {
      const extendedLeftDepth = leftLevel + 1;
      return {
        maximumDepth: extendedLeftDepth,
        deepestLca: leftSubtreeOutcome.deepestLca,
      };
    } else {
      const extendedRightDepth = rightLevel + 1;
      return {
        maximumDepth: extendedRightDepth,
        deepestLca: rightSubtreeOutcome.deepestLca,
      };
    }
  }

  const overallResult = processNodeAndDepth(root);
  return overallResult.deepestLca;
};
