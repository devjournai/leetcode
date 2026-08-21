/**
 * Recover A Tree From Preorder Traversal
 * Intuition: Dash count is depth. A stack of the current ancestor path lets each new node attach as the next child of the node at depth-1.
 * Approach: 1. Parse dashes then the integer value. 2. Pop the stack down to that depth. 3. Attach as left if parent has no left, else right. 4. Push the new node. Return stack[0].
 * Dry Run: "1-2--3--4-5--6--7".
 *   - 1 at depth 0. 2 at depth 1 under 1. 3,4 at depth 2 under 2. 5 at depth 1 under 1. 6,7 under 5.
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
