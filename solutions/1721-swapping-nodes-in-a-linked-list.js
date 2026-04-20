/**
 * Swapping Nodes In A Linked List
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var swapNodes = function (head, k) {
  let frontNode = head;
  let currentPosition = 1;

  while (currentPosition < k) {
    frontNode = frontNode.next;
    currentPosition++;
  }

  let fastIterator = head;
  let rearNode = head;
  let iterationCount = 0;

  while (iterationCount < k) {
    fastIterator = fastIterator.next;
    iterationCount++;
  }

  while (fastIterator !== null) {
    fastIterator = fastIterator.next;
    rearNode = rearNode.next;
  }

  let tempValueStorage = frontNode.val;
  frontNode.val = rearNode.val;
  rearNode.val = tempValueStorage;

  return head;
};
