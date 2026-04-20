/**
 * Plus One Linked List
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var plusOne = function (head) {
  let dummyHeadNode = new ListNode(0);
  dummyHeadNode.next = head;

  let lastNonNine = dummyHeadNode;
  let currentTraversal = head;

  while (currentTraversal) {
    if (currentTraversal.val !== 9) {
      lastNonNine = currentTraversal;
    }
    currentTraversal = currentTraversal.next;
  }

  lastNonNine.val++;

  let zeroSetter = lastNonNine.next;
  while (zeroSetter) {
    zeroSetter.val = 0;
    zeroSetter = zeroSetter.next;
  }

  if (dummyHeadNode.val === 0) {
    return dummyHeadNode.next;
  } else {
    return dummyHeadNode;
  }
};