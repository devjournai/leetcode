/**
 * Remove Duplicates From An Unsorted Linked List
 * Intuition: Any value that appears more than once must be fully removed. A frequency map plus a second pass with a dummy node unlinks those nodes.
 * Approach: 1. Count values in `valueCountMap`. 2. Dummy points at head. 3. If a node’s count > 1, skip it; else advance `previousNodeReference`. 4. Return dummy.next.
 * Dry Run: 1→2→3→2.
 *   - 2 has count 2, so drop both 2s → 1→3.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var deleteDuplicatesUnsorted = function (head) {
  const valueCountMap = new Map();
  let currentScanPointer = head;

  while (currentScanPointer) {
    valueCountMap.set(
      currentScanPointer.val,
      (valueCountMap.get(currentScanPointer.val) || 0) + 1
    );
    currentScanPointer = currentScanPointer.next;
  }

  const dummyNodeForList = new ListNode(0);
  dummyNodeForList.next = head;
  let previousNodeReference = dummyNodeForList;
  let currentNodeToExamine = head;

  while (currentNodeToExamine) {
    if (valueCountMap.get(currentNodeToExamine.val) > 1) {
      previousNodeReference.next = currentNodeToExamine.next;
    } else {
      previousNodeReference = currentNodeToExamine;
    }
    currentNodeToExamine = currentNodeToExamine.next;
  }

  return dummyNodeForList.next;
};
