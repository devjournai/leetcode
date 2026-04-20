/**
 * Middle Of The Linked List
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var middleNode = function (head) {
  let slowPointer = head;
  let fastPointer = head;

  while (fastPointer !== null && fastPointer.next !== null) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;
  }

  return slowPointer;
};
