/**
 * Populating Next Right Pointers In Each Node
 * Intuition: The tree is perfect, so every node has both children. Next pointers already linked on the current level let us wire the next level without a queue.
 * Approach: 1. Null root returns null. 2. Start at the leftmost node of each level while it has a left child. 3. Walk the level via next: set left.next = right, and if a neighbor exists set right.next = neighbor.left. 4. Drop to leftmost.left for the next level.
 * Dry Run: Perfect tree 1 / 2,3 / 4,5,6,7. On level 2: 2.left→2.right (4→5), 2.right→3.left (5→6), 3.left→3.right (6→7).
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var connect = function (root) {
  if (!root) {
    return null;
  }

  let levelBeginPointer = root;

  while (levelBeginPointer.left) {
    let currentLevelIterator = levelBeginPointer;

    while (currentLevelIterator) {
      currentLevelIterator.left.next = currentLevelIterator.right;

      if (currentLevelIterator.next) {
        currentLevelIterator.right.next = currentLevelIterator.next.left;
      }

      currentLevelIterator = currentLevelIterator.next;
    }

    levelBeginPointer = levelBeginPointer.left;
  }

  return root;
};
