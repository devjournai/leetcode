/**
 * Remove Duplicates From Sorted List II
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
