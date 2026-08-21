/**
 * Merge Two Sorted Lists
 * Intuition: A dummy `initialNode` repeatedly takes the smaller of `l1` and `l2` until one list is exhausted, then attaches the remainder.
 * Approach: 1. Create dummy and `currentConnector`. 2. While both lists are nonempty, attach the node with the smaller `val` and advance that list. 3. Set `currentConnector.next` to the leftover list. 4. Return `initialNode.next`.
 * Dry Run: l1 = 1→3, l2 = 2.
 *   - 1≤2 attach 1; 3>2 attach 2; leftover 3. Result 1→2→3.
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
