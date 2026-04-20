/**
 * Convert Sorted List To Binary Search Tree
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

    let rightChildNode = buildBalancedTree(elementsToUse - Math.floor(elementsToUse / 2) - 1);
    currentRoot.right = rightChildNode;

    return currentRoot;
  };

  let finalTreeResult = buildBalancedTree(totalNodesCount);
  return finalTreeResult;
};