/**
 * Remove Duplicates From An Unsorted Linked List
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var deleteDuplicatesUnsorted = function (head) {
  const valueCountMap = new Map();
  let currentScanPointer = head;

  while (currentScanPointer) {
    valueCountMap.set(
      currentScanPointer.val,
      (valueCountMap.get(currentScanPointer.val) || 0) + 1,
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
