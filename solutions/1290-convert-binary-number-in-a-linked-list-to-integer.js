/**
 * Convert Binary Number In A Linked List To Integer
 * Intuition: Walk the list MSB-first: shift the accumulator left and OR in the current bit.
 * Approach: 1. accumulatedValue=0. 2. While the node exists, accumulatedValue = (accumulatedValue << 1) | val. 3. Return the integer.
 * Dry Run: 1 -> 0 -> 1
 *   0, then (0<<1)|1=1, (1<<1)|0=2, (2<<1)|1=5. Return 5.
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
