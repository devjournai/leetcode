/**
    * Binary Tree Longest Consecutive Sequence
    * Time Complexity: O(N)
    * Space Complexity: O(H)
*/
var longestConsecutive = function (root) {
  let globalMaxPath = 0;

  if (!root) {
    return 0;
  }

  function dfsHelper(currentNodeInstance, precedingNodeValue, sequenceLengthAccumulated) {
    if (!currentNodeInstance) {
      return;
    }

    let currentCalculatedLength;
    if (precedingNodeValue + 1 === currentNodeInstance.val) {
      currentCalculatedLength = sequenceLengthAccumulated + 1;
    } else {
      currentCalculatedLength = 1;
    }

    globalMaxPath = Math.max(globalMaxPath, currentCalculatedLength);

    dfsHelper(currentNodeInstance.left, currentNodeInstance.val, currentCalculatedLength);
    dfsHelper(currentNodeInstance.right, currentNodeInstance.val, currentCalculatedLength);
  }

  dfsHelper(root, root.val - 1, 0);

  return globalMaxPath;
};