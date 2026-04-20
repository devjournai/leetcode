/**
 * Delete N Nodes After M Nodes Of A Linked List
 * Time Complexity: O(L)
 * Space Complexity: O(1)
 */
var deleteNodes = function (head, m, n) {
  let mainIterator = head;

  while (mainIterator !== null) {
    let keptNodesCounter = 1;
    let keepSegmentEnd = mainIterator;

    while (keepSegmentEnd !== null && keptNodesCounter < m) {
      keepSegmentEnd = keepSegmentEnd.next;
      keptNodesCounter++;
    }

    if (keepSegmentEnd === null) {
      break;
    }

    let deletedNodesStart = keepSegmentEnd.next;
    let removedNodesCounter = 0;

    while (deletedNodesStart !== null && removedNodesCounter < n) {
      deletedNodesStart = deletedNodesStart.next;
      removedNodesCounter++;
    }

    keepSegmentEnd.next = deletedNodesStart;
    mainIterator = deletedNodesStart;
  }

  return head;
};
