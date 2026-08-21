/**
 * Count Good Nodes In Binary Tree
 * Intuition: A node is good if it is >= every ancestor. DFS carries the max value seen on the path.
 * Approach: 1. If root is null return 0. 2. Recurse with max so far starting at -Infinity. 3. If node.val >= max, increment the counter. 4. Recurse left and right with max(max, node.val).
 * Dry Run: root = [3,1,4,3,null,1,5]
 *   - 3 is good (first)
 *   - left 1 < 3 skip; its child 3 >= 3 good
 *   - right 4 >= 3 good; 5 >= 4 good; 1 skip. Count 4.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var goodNodes = function (root) {
  let goodNodesCounter = 0;

  const depthFirstTravel = (currentNode, maximumPathValue) => {
    if (currentNode === null) {
      return;
    }

    const nodeValue = currentNode.val;

    if (nodeValue >= maximumPathValue) {
      goodNodesCounter++;
    }

    const nextMaximumValueForChildren = Math.max(maximumPathValue, nodeValue);

    depthFirstTravel(currentNode.left, nextMaximumValueForChildren);
    depthFirstTravel(currentNode.right, nextMaximumValueForChildren);
  };

  if (root === null) {
    return 0;
  }

  depthFirstTravel(root, -Infinity);

  return goodNodesCounter;
};
