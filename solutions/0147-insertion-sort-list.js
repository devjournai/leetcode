/**
 * Insertion Sort List
 * Intuition: Insertion sort builds a sorted prefix by placing each node into the correct spot. A dummy `initialSentinel` makes inserting at the front uniform.
 * Approach: 1. Create `initialSentinel` with value 0. 2. Walk `processingNode` through the original list, saving `subsequentNode`. 3. From `initialSentinel`, advance `insertionSpotFinder` while `insertionSpotFinder.next.val < processingNode.val`. 4. Splice `processingNode` after `insertionSpotFinder`. 5. Continue with `subsequentNode`. 6. Return `initialSentinel.next`.
 * Dry Run: 4 → 2 → 1 → 3
 * Insert 4: sentinel → 4
 * Insert 2: sentinel → 2 → 4
 * Insert 1: sentinel → 1 → 2 → 4
 * Insert 3: sentinel → 1 → 2 → 3 → 4
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */
var insertionSortList = function (head) {
  const initialSentinel = new ListNode(0);
  let processingNode = head;

  while (processingNode) {
    let subsequentNode = processingNode.next;
    let insertionSpotFinder = initialSentinel;

    while (
      insertionSpotFinder.next &&
      insertionSpotFinder.next.val < processingNode.val
    ) {
      insertionSpotFinder = insertionSpotFinder.next;
    }

    processingNode.next = insertionSpotFinder.next;
    insertionSpotFinder.next = processingNode;

    processingNode = subsequentNode;
  }

  return initialSentinel.next;
};
