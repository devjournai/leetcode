/**
 * Print Immutable Linked List In Reverse
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
