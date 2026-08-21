/**
 * Reverse Linked List II
 * Intuition: Reverse the sublist from left to right in place by repeatedly taking the node after the sublist head and inserting it at the front of that sublist (head-insertion).
 * Approach: 1. Dummy points at head; walk `preReversalStart` to the node before index `left`. 2. `reversalSublistTail` is the current left node. 3. For (right-left) times: detach tail.next, splice it after preReversalStart. 4. Return dummy.next.
 * Dry Run: 1→2→3→4→5, left=2, right=4 → after first splice 1→3→2→4→5, after second 1→4→3→2→5
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var reverseBetween = function (head, left, right) {
  const listHeadPlaceholder = new ListNode(0, head);
  let preReversalStart = listHeadPlaceholder;
  let traversalIndex = 1;

  while (traversalIndex < left) {
    preReversalStart = preReversalStart.next;
    traversalIndex++;
  }

  let reversalSublistTail = preReversalStart.next;
  let operationCounter = 0;

  while (operationCounter < right - left) {
    let nodeToRelocate = reversalSublistTail.next;
    reversalSublistTail.next = nodeToRelocate.next;
    nodeToRelocate.next = preReversalStart.next;
    preReversalStart.next = nodeToRelocate;
    operationCounter++;
  }

  return listHeadPlaceholder.next;
};
