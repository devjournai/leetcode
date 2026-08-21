/**
 * Middle Of The Linked List
 * Intuition: A `fastPointer` moving two nodes per step reaches the end when `slowPointer` is at the middle (the second middle on even length).
 * Approach: 1. Initialize both pointers at `head`. 2. While `fastPointer` and `fastPointer.next` are non-null, advance slow by one and fast by two. 3. Return `slowPointer`.
 * Dry Run: 1→2→3→4→5.
 *   - After one step: slow=2, fast=3. After two: slow=3, fast=5. Fast.next is null → return 3.
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
