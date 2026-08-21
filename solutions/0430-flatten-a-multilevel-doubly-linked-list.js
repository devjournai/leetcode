/**
 * Flatten A Multilevel Doubly Linked List
 * Intuition: Walk each doubly-linked level; when a node has a `child`, splice that child list in after it, recurse to flatten the child, then reconnect the saved `next`.
 * Approach: 1. Null head returns null. 2. `processCurrentLevel` walks `next`. 3. On `child`, clear child, link child after current, recurse for `childListEnd`, wire `childListEnd` to `originalNext`. 4. Return the last node of this level. 5. Flatten from `head` and return `head`.
 * Dry Run: 1-2-3 with 2.child=4-5. At 2, splice 4, flatten 4-5, attach 5.next=3. Result 1-2-4-5-3 with prev links.
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
