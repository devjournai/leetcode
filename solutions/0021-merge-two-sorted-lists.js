/**
 * Merge Two Sorted Lists
 * Time Complexity: O(N + M)
 * Space Complexity: O(1)
 */
var mergeTwoLists = function (l1, l2) {
  let initialNode = new ListNode();
  let currentConnector = initialNode;

  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      currentConnector.next = l1;
      l1 = l1.next;
    } else {
      currentConnector.next = l2;
      l2 = l2.next;
    }
    currentConnector = currentConnector.next;
  }

  currentConnector.next = l1 || l2;

  return initialNode.next;
};
