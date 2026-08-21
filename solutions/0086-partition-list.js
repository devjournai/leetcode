/**
 * Partition List
 * Intuition: Stable partition by splicing nodes into two chains: values < x then values ≥ x, then join the chains.
 * Approach: 1. Dummy heads for “less” and “greater-or-equal”. 2. Walk the list, append each node onto the matching chain. 3. Terminate the greater chain with null, stitch less.next to greater.next, return less dummy.next.
 * Dry Run: 1→4→3→2→5→2, x=3 → less 1→2→2, ge 4→3→5 → 1→2→2→4→3→5
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var partition = function (head, x) {
  let lessThanDummyHead = new ListNode(0);
  let currentLessNode = lessThanDummyHead;

  let greaterThanOrEqualToDummyHead = new ListNode(0);
  let currentGreaterEqualNode = greaterThanOrEqualToDummyHead;

  let traversalNode = head;

  while (traversalNode !== null) {
    if (traversalNode.val < x) {
      currentLessNode.next = traversalNode;
      currentLessNode = currentLessNode.next;
    } else {
      currentGreaterEqualNode.next = traversalNode;
      currentGreaterEqualNode = currentGreaterEqualNode.next;
    }
    traversalNode = traversalNode.next;
  }

  currentGreaterEqualNode.next = null;
  currentLessNode.next = greaterThanOrEqualToDummyHead.next;

  return lessThanDummyHead.next;
};
