/**
 * Recover A Tree From Preorder Traversal
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var recoverFromPreorder = function (inputTraversalString) {
  const nodePathStack = [];

  let currentParseIndex = 0;
  const inputStringLength = inputTraversalString.length;

  while (currentParseIndex < inputStringLength) {
    let dashCounter = 0;
    let temporaryScanIndex = currentParseIndex;
    while (
      temporaryScanIndex < inputStringLength &&
      inputTraversalString[temporaryScanIndex] === "-"
    ) {
      dashCounter++;
      temporaryScanIndex++;
    }
    currentParseIndex = temporaryScanIndex;

    let numericNodeValue = 0;
    let valueScanIndex = currentParseIndex;
    while (
      valueScanIndex < inputStringLength &&
      inputTraversalString[valueScanIndex] !== "-"
    ) {
      numericNodeValue =
        numericNodeValue * 10 + parseInt(inputTraversalString[valueScanIndex]);
      valueScanIndex++;
    }
    currentParseIndex = valueScanIndex;

    const newlyCreatedNode = new TreeNode(numericNodeValue);

    const targetStackSize = dashCounter;
    for (
      let stackPointer = nodePathStack.length;
      stackPointer > targetStackSize;
      stackPointer--
    ) {
      nodePathStack.pop();
    }

    if (nodePathStack.length > 0) {
      const parentReference = nodePathStack[nodePathStack.length - 1];
      if (parentReference.left === null) {
        parentReference.left = newlyCreatedNode;
      } else {
        parentReference.right = newlyCreatedNode;
      }
    }

    nodePathStack.push(newlyCreatedNode);
  }

  return nodePathStack[0];
};
