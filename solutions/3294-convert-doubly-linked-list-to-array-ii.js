/**
 * Convert Doubly Linked List to Array II
 * Intuition: The given node can be anywhere in a doubly linked list. Walk `prev` to the head, then walk `next` to collect values in order.
 * Approach:
 * 1. From `node`, while `curr.prev` is not null, move left.
 * 2. From the head, push `curr.val` and move `curr = curr.next` until null.
 * Dry Run: list 1 <-> 2 <-> 3, given node is 2
 *   - Move prev: 2 -> 1 (head)
 *   - Collect 1, 2, 3
 * Time Complexity: O(n)
 * Space Complexity: O(n) for the output array
 */
var toArray = function (node) {
  const ans = [];
  let curr = node;

  while (curr.prev !== null) curr = curr.prev;

  while (curr !== null) {
    ans.push(curr.val);
    curr = curr.next;
  }

  return ans;
};
