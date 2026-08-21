/**
 * Remove Duplicates From Sorted List II
 * Intuition: Any value that appears more than once must be dropped entirely; walk the sorted list, skip whole duplicate runs, and append unique values onto a new sentinel-backed list.
 * Approach: 1. Create a dummy `sentinelNode`. 2. If the current node equals the next, record that value and skip all nodes with it. 3. Otherwise copy the value into a new node on the result list. 4. Return sentinel.next.
 * Dry Run: 1→2→3→3→4→4→5 → skip both 3s and both 4s, keep 1,2,5 → 1→2→5
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var deleteDuplicates = function (head) {
  const sentinelNode = new ListNode(0);
  let currentResultPointer = sentinelNode;
  let inputTraversalPointer = head;

  while (inputTraversalPointer) {
    if (
      inputTraversalPointer.next &&
      inputTraversalPointer.val === inputTraversalPointer.next.val
    ) {
      const duplicateTargetValue = inputTraversalPointer.val;
      while (
        inputTraversalPointer &&
        inputTraversalPointer.val === duplicateTargetValue
      ) {
        inputTraversalPointer = inputTraversalPointer.next;
      }
    } else {
      currentResultPointer.next = new ListNode(inputTraversalPointer.val);
      currentResultPointer = currentResultPointer.next;
      inputTraversalPointer = inputTraversalPointer.next;
    }
  }

  return sentinelNode.next;
};
