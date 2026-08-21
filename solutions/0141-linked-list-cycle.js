/**
 * Linked List Cycle
 * Intuition: If a cycle exists, a pointer that moves two steps will eventually lap a pointer that moves one step. If the fast pointer hits null, the list is acyclic.
 * Approach: 1. Set `slowPointer` and `fastPointer` to `head`. 2. While `fastPointer` and `fastPointer.next` are non-null, advance `slowPointer` by one node and `fastPointer` by two. 3. If they become the same node, return true. 4. If the loop ends, return false.
 * Dry Run: 3 → 2 → 0 → -4 → (back to 2)
 * Start: both at 3
 * Step 1: slow=2, fast=0
 * Step 2: slow=0, fast=2
 * Step 3: slow=-4, fast=-4 → meet, return true
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var hasCycle = function (head) {
  let slowPointer = head;
  let fastPointer = head;

  while (fastPointer !== null && fastPointer.next !== null) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;

    if (slowPointer === fastPointer) {
      return true;
    }
  }

  return false;
};
