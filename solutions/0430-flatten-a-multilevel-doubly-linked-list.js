/**
 * Flatten A Multilevel Doubly Linked List
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var flatten = function (head) {
  if (!head) return null;

  function processCurrentLevel(nodePointer) {
    let currentTraversal = nodePointer;
    let lastProcessed = null;

    while (currentTraversal) {
      lastProcessed = currentTraversal;
      let originalNext = currentTraversal.next;

      if (currentTraversal.child) {
        let childStart = currentTraversal.child;
        currentTraversal.child = null;

        currentTraversal.next = childStart;
        childStart.prev = currentTraversal;

        let childListEnd = processCurrentLevel(childStart);

        childListEnd.next = originalNext;
        if (originalNext) {
          originalNext.prev = childListEnd;
        }
        currentTraversal = originalNext;
      } else {
        currentTraversal = originalNext;
      }
    }
    return lastProcessed;
  }

  processCurrentLevel(head);
  return head;
};
