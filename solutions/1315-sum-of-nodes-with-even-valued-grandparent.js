/**
 * Sum Of Nodes With Even Valued Grandparent
 * Intuition: Carry parent and grandparent down BFS so each node can add itself when the grandparent value is even.
 * Approach: 1. Queue triples [node, parent, grandparent]. 2. If grandparent exists and is even, add node.val. 3. Enqueue children with updated parent/grandparent. 4. Return the sum.
 * Dry Run: tree [6,7,8,2,7,1,3,9]. Nodes under even grandparents: 2+7+1+3+9 = 22.
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
