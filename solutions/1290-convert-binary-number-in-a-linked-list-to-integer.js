/**
 * Convert Binary Number In A Linked List To Integer
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var getDecimalValue = function (head) {
  let accumulatedValue = 0;
  let traversalNode = head;

  while (traversalNode !== null) {
    accumulatedValue = (accumulatedValue << 1) | traversalNode.val;
    traversalNode = traversalNode.next;
  }

  return accumulatedValue;
};
