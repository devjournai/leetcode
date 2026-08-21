/**
 * Populating Next Right Pointers In Each Node II
 * Intuition: The tree may be incomplete, so children are chained with a dummy head while walking the current level’s next pointers, then that chain becomes the next level.
 * Approach: 1. Null returns root. 2. For each level, reset a dummy and tail. 3. Walk the level: append left then right onto tail.next. 4. Next level start is dummy.next; clear dummy.next and repeat until the start is null.
 * Dry Run: 1 / 2,3 / 4, 3 / 5. Level 1 links 2.next=3. Building level 2: dummy→4→5. Then 4.next=5. Next start is 4; their children are empty so we stop.
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
