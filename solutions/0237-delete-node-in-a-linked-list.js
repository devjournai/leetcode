/**
 * Delete Node In A Linked List
 * Time Complexity: O(1)
 * Space Complexity: O(1)
*/
var deleteNode = function (node) {
  let nextNodeValue = node.next.val;
  node.val = nextNodeValue;

  let nextNextReference = node.next.next;
  node.next = nextNextReference;
};