/**
 * Populating Next Right Pointers In Each Node
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