/**
 * Remove Linked List Elements
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var removeElements = function (head, val) {
  const sentinelNode = new ListNode(0);
  sentinelNode.next = head;

  let currentPointer = sentinelNode;

  while (currentPointer.next) {
    if (currentPointer.next.val === val) {
      currentPointer.next = currentPointer.next.next;
    } else {
      currentPointer = currentPointer.next;
    }
  }

  return sentinelNode.next;
};