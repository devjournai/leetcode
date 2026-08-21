/**
 * Next Greater Node In Linked List
 * Intuition: Copy the list to an array, then a monotonic decreasing stack of indices finds the next greater value for each position.
 * Approach: 1. Walk the list into an array. 2. Scan left to right; while the top is smaller than the current value, pop and write that current as its next greater. 3. Push the current index. 4. Unpopped indices stay 0.
 * Dry Run: list = 2 -> 1 -> 5.
 *   - Stack [0] (2). 1 is smaller, push. 5 pops 1 then 2; both get 5. Result [5,5,0].
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
