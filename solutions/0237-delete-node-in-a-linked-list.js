/**
 * Delete Node In A Linked List
 * Intuition: We are given the node to delete, not its predecessor, so copy the next node's value into this node and skip the next node.
 * Approach: 1. Set node.val to node.next.val. 2. Set node.next to node.next.next.
 * Dry Run: list 4 -> 5 -> 1 -> 9, delete the node holding 5.
 *   - Copy 1 into the 5-node; its next becomes 9 → 4 -> 1 -> 9.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var deleteNode = function (node) {
  let nextNodeValue = node.next.val;
  node.val = nextNodeValue;

  let nextNextReference = node.next.next;
  node.next = nextNextReference;
};
