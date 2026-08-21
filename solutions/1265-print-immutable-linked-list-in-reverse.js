/**
 * Print Immutable Linked List In Reverse
 * Intuition: Recurse to the end first, then print on the way back so values appear in reverse without mutating the list.
 * Approach: 1. Base case null returns. 2. Recurse on head.getNext(). 3. Call head.printValue().
 * Dry Run: 1 -> 2 -> 3
 *   recurse to 3, print 3, then 2, then 1.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var printLinkedListInReverse = function (head) {
  if (head === null) {
    return;
  }
  const subsequentNode = head.getNext();
  printLinkedListInReverse(subsequentNode);
  head.printValue();
};
