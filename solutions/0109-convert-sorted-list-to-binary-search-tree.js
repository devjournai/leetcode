/**
 * Convert Sorted List To Binary Search Tree
 * Intuition: Simulate inorder construction: visit the left half of the remaining nodes, consume the next list node as root, then build the right half. The list pointer advances once per node.
 * Approach: 1. Count list length. 2. Recurse with a count: left subtree uses floor(n/2) nodes, create root from the current list pointer and advance it, right subtree uses n - floor(n/2) - 1. 3. Zero nodes returns null.
 * Dry Run: List -10 -> -3 -> 0 -> 5 -> 9 (n=5). Left gets 2 nodes (-10 then -3), root 0, right gets 2 nodes (5 then 9). Same balanced shape as the array version.
 * Time Complexity: O(N)
 * Space Complexity: O(log N)
 */
var sortedListToBST = function (head) {
  if (!head) {
    return null;
  }

  let totalNodesCount = 0;
  let nodeIterator = head;
  while (nodeIterator) {
    totalNodesCount++;
    nodeIterator = nodeIterator.next;
  }

  let listProgressPointer = head;

  const buildBalancedTree = (elementsToUse) => {
    if (elementsToUse === 0) {
      return null;
    }

    let leftChildNode = buildBalancedTree(Math.floor(elementsToUse / 2));

    let currentRoot = new TreeNode(listProgressPointer.val);
    currentRoot.left = leftChildNode;
    listProgressPointer = listProgressPointer.next;

    let rightChildNode = buildBalancedTree(
      elementsToUse - Math.floor(elementsToUse / 2) - 1
    );
    currentRoot.right = rightChildNode;

    return currentRoot;
  };

  let finalTreeResult = buildBalancedTree(totalNodesCount);
  return finalTreeResult;
};
