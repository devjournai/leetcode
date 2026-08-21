/**
 * Convert Binary Search Tree To Sorted Doubly Linked List
 * Intuition: Inorder traversal of a BST visits keys in sorted order. Link each popped node to `lastProcessedNode` as the previous DLL node, then circularly join head and tail.
 * Approach: 1. Null root → null. 2. Iterative inorder with `nodeStack`: go left, pop, wire `last.right`/`node.left`, set `listStart` on the first visit, then go right. 3. After the loop, `lastProcessedNode.right = listStart` and `listStart.left = last`. 4. Return `listStart`.
 * Dry Run: tree 4 / 2 5 / 1 3.
 *   - Inorder 1-2-3-4-5; 1 becomes head, 5.right→1, 1.left→5. Return node 1.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var treeToDoublyList = function (root) {
  if (!root) {
    return null;
  }

  let listStart = null;
  let lastProcessedNode = null;
  let nodeStack = [];
  let traverseNode = root;

  while (traverseNode !== null || nodeStack.length > 0) {
    while (traverseNode !== null) {
      nodeStack.push(traverseNode);
      traverseNode = traverseNode.left;
    }

    traverseNode = nodeStack.pop();

    if (lastProcessedNode) {
      lastProcessedNode.right = traverseNode;
      traverseNode.left = lastProcessedNode;
    } else {
      listStart = traverseNode;
    }
    lastProcessedNode = traverseNode;

    traverseNode = traverseNode.right;
  }

  lastProcessedNode.right = listStart;
  listStart.left = lastProcessedNode;

  return listStart;
};
