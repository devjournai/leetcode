/**
 * Insertion Sort List
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
*/
var insertionSortList = function (head) {
  const initialSentinel = new ListNode(0);
  let processingNode = head;

  while (processingNode) {
    let subsequentNode = processingNode.next;
    let insertionSpotFinder = initialSentinel;

    while (insertionSpotFinder.next && insertionSpotFinder.next.val < processingNode.val) {
      insertionSpotFinder = insertionSpotFinder.next;
    }

    processingNode.next = insertionSpotFinder.next;
    insertionSpotFinder.next = processingNode;

    processingNode = subsequentNode;
  }

  return initialSentinel.next;
};