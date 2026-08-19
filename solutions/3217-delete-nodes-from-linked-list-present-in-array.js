/**
 * Delete Nodes From Linked List Present in Array
 * Intuition: Nodes whose values appear in nums should be skipped. A hash set plus a sentinel predecessor lets us unlink matching nodes in one pass.
 * Approach: 1. Put nums into a set. 2. Walk a dummy node whose next is head. 3. If the next value is in the set, skip it; otherwise advance. Return dummy.next.
 * Dry Run:
 *   nums = [1, 2, 3], list 1 -> 2 -> 3 -> 4 -> 5
 *   Skip 1, skip 2, skip 3, keep 4 and 5 -> 4 -> 5.
 * Time Complexity: O(|nums| + |head|)
 * Space Complexity: O(|nums|)
 */
var modifiedList = function (nums, head) {
  const valuesToDelete = new Set(nums);
  const sentinelNode = new ListNode(0, head);
  let currentPointer = sentinelNode;

  while (currentPointer.next) {
    if (valuesToDelete.has(currentPointer.next.val)) {
      currentPointer.next = currentPointer.next.next;
    } else {
      currentPointer = currentPointer.next;
    }
  }

  return sentinelNode.next;
};
