/**
 * Reverse Linked List
 * Intuition: Recurse to the tail (the new head), then reverse the one link from the current node to its successor on the way back. Recursion depth is the list length.
 * Approach: 1. Base case: empty or single node is already reversed. 2. Recurse on head.next to get the new head. 3. Set head.next.next = head and head.next = null. 4. Return the new head.
 * Dry Run: 1 -> 2 -> 3.
 *   - reverse(3) returns 3.
 *   - At 2: 3.next = 2, 2.next = null → 3 -> 2.
 *   - At 1: 2.next = 1, 1.next = null → 3 -> 2 -> 1. Return 3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var reverseList = function (head) {
  if (!head || !head.next) {
    return head;
  }

  const returnedHead = reverseList(head.next);
  const followingNode = head.next;

  followingNode.next = head;
  head.next = null;

  return returnedHead;
};
