/**
 * Sum Of Nodes With Even Valued Grandparent
 * Time Complexity: O(N)
 * Space Complexity: O(W)
 */
var sumEvenGrandparent = function (root) {
  let totalGrandparentSum = 0;
  if (root === null) {
    return totalGrandparentSum;
  }

  let nodeQueue = [];
  nodeQueue.push([root, null, null]);

  while (nodeQueue.length > 0) {
    let currentDequeuedItem = nodeQueue.shift();
    let processNode = currentDequeuedItem[0];
    let processParent = currentDequeuedItem[1];
    let processGrandparent = currentDequeuedItem[2];

    if (processGrandparent !== null && processGrandparent.val % 2 === 0) {
      totalGrandparentSum += processNode.val;
    }

    if (processNode.left !== null) {
      nodeQueue.push([processNode.left, processNode, processParent]);
    }

    if (processNode.right !== null) {
      nodeQueue.push([processNode.right, processNode, processParent]);
    }
  }

  return totalGrandparentSum;
};
