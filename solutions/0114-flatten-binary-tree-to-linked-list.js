/**
 * Flatten Binary Tree To Linked List
 * Intuition: Preorder flattening can be done in place: if a node has a left child, splice that left subtree between the node and its original right, hanging the old right off the left subtree’s rightmost node.
 * Approach: 1. Walk current from root along the right spine. 2. When left exists, find the rightmost node of the left subtree. 3. Attach original right after that node, move left onto right, clear left. 4. Advance current = current.right.
 * Dry Run: 1 / 2, 5 / 3,4 and 5 / 6. At 1, left spine 2-4 takes the old right 5. Then walk 1-2-3-4-5-6 with all lefts null.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var flatten = function (root) {
  let currentHead = root;

  while (currentHead !== null) {
    if (currentHead.left !== null) {
      let leftSubtreeEndNode = currentHead.left;
      while (leftSubtreeEndNode.right !== null) {
        leftSubtreeEndNode = leftSubtreeEndNode.right;
      }

      let originalRightSubtree = currentHead.right;
      currentHead.right = currentHead.left;
      currentHead.left = null;
      leftSubtreeEndNode.right = originalRightSubtree;
    }
    currentHead = currentHead.right;
  }
};
