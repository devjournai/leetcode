/**
 * Diameter Of Binary Tree
 * Intuition: The longest path through a node is left-subtree height plus right-subtree height (in edges). Track the global max of that quantity while returning each node's height to its parent.
 * Approach: 1. Recurse with `computeSubtreeDepth`: null returns 0. 2. Get left and right depths. 3. Update `currentMaximumDiameter` with `left + right`. 4. Return `max(left, right) + 1`. 5. Call from `root` and return the diameter.
 * Dry Run: tree 1 with left 2 (children 4,5) and right 3.
 *   - Node 2: left=1, right=1, path=2, height=2.
 *   - Root: left=2, right=1, path=3. Diameter is 3 (4-2-5 or 4-2-1-3).
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var diameterOfBinaryTree = function (root) {
  let currentMaximumDiameter = 0;

  const computeSubtreeDepth = (currentNode) => {
    if (!currentNode) {
      return 0;
    }

    const leftTreeDepth = computeSubtreeDepth(currentNode.left);
    const rightTreeDepth = computeSubtreeDepth(currentNode.right);

    const currentPathLength = leftTreeDepth + rightTreeDepth;
    currentMaximumDiameter = Math.max(
      currentMaximumDiameter,
      currentPathLength
    );

    const maxChildDepth = Math.max(leftTreeDepth, rightTreeDepth);
    return maxChildDepth + 1;
  };

  computeSubtreeDepth(root);
  return currentMaximumDiameter;
};
