/**
 * Populating Next Right Pointers In Each Node II
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var connect = function (root) {
  if (root === null) {
    return root;
  }

  let currentLevelFront = root;
  let nextLevelDummyHead = new _Node();
  let nextLevelTail = nextLevelDummyHead;

  while (currentLevelFront !== null) {
    let nodeTraversal = currentLevelFront;

    while (nodeTraversal !== null) {
      if (nodeTraversal.left !== null) {
        nextLevelTail.next = nodeTraversal.left;
        nextLevelTail = nextLevelTail.next;
      }

      if (nodeTraversal.right !== null) {
        nextLevelTail.next = nodeTraversal.right;
        nextLevelTail = nextLevelTail.next;
      }

      nodeTraversal = nodeTraversal.next;
    }

    currentLevelFront = nextLevelDummyHead.next;
    nextLevelDummyHead.next = null;
    nextLevelTail = nextLevelDummyHead;
  }

  return root;
};
