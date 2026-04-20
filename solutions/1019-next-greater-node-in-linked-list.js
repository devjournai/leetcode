/**
 * Next Greater Node In Linked List
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var nextLargerNodes = function (head) {
  const nodeValues = [];
  let currentListNode = head;

  while (currentListNode) {
    nodeValues.push(currentListNode.val);
    currentListNode = currentListNode.next;
  }

  const resultCollection = new Array(nodeValues.length).fill(0);
  const elementStack = [];

  for (let currentIndex = 0; currentIndex < nodeValues.length; currentIndex++) {
    while (
      elementStack.length > 0 &&
      nodeValues[elementStack[elementStack.length - 1]] <
        nodeValues[currentIndex]
    ) {
      const topIndex = elementStack.pop();
      resultCollection[topIndex] = nodeValues[currentIndex];
    }
    elementStack.push(currentIndex);
  }

  return resultCollection;
};
