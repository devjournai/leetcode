/**
 * Remove Linked List Elements
 * Intuition: A dummy node in front of the head lets us unlink matching nodes uniformly, including when the head itself equals val.
 * Approach: 1. Attach a sentinel whose next is head. 2. Walk a pointer on the sentinel. 3. If the next node's value equals val, skip it; otherwise advance. 4. Return sentinel.next.
 * Dry Run: head = 1 -> 2 -> 6 -> 3, val = 6.
 *   - sentinel -> 1 -> 2 -> 6 -> 3. Pointer at sentinel.
 *   - next 1, 2 kept; next 6 skipped so 2 -> 3; next 3 kept.
 *   - Return 1 -> 2 -> 3.
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
