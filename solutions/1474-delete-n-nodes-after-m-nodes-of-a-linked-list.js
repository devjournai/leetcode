/**
 * Delete N Nodes After M Nodes Of A Linked List
 * Intuition: Walk the list keeping m nodes, then skip n nodes by rewiring keepSegmentEnd.next past the deleted run, and repeat.
 * Approach: 1. From mainIterator, advance keepSegmentEnd m-1 steps. 2. If the keep segment ends, stop. 3. From the next node skip n nodes. 4. Link keepSegmentEnd to the node after the skip; continue from there.
 * Dry Run: 1-2-3-4-5-6-7-8-9-10-11, m=2, n=3
 *   - keep 1-2, delete 3-4-5, keep 6-7, delete 8-9-10, keep 11
 *   - 1-2-6-7-11
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
