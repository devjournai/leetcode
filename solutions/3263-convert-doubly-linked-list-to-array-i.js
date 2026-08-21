/**
 * Convert Doubly Linked List to Array I
 * Intuition: The list is already in left-to-right order. Walking next from the given head copies every value once.
 * Approach: 1. Start at head. 2. Push curr.val and move curr = curr.next until null.
 * Dry Run:
 *   1 <-> 2 <-> 3 -> [1, 2, 3]
 * Time Complexity: O(n)
 * Space Complexity: O(1) extra besides the answer
 *
 * // Definition for a Node.
 * function Node(val, prev, next) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 * };
 */
var toArray = function (head) {
  const ans = [];
  let curr = head;

  while (curr !== null) {
    ans.push(curr.val);
    curr = curr.next;
  }

  return ans;
};
