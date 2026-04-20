/**
 * Recover Binary Search Tree
 * Time Complexity: O(N)
 * Space Complexity: O(H)
*/
var recoverTree = function (root) {
    let firstViolationCandidate = null;
    let secondViolationCandidate = null;
    let previousNodeInOrder = null;

    const performInOrderTraversal = (currentTreeRoot) => {
        if (!currentTreeRoot) {
            return;
        }

        performInOrderTraversal(currentTreeRoot.left);

        if (previousNodeInOrder !== null && previousNodeInOrder.val > currentTreeRoot.val) {
            if (firstViolationCandidate === null) {
                firstViolationCandidate = previousNodeInOrder;
            }
            secondViolationCandidate = currentTreeRoot;
        }

        previousNodeInOrder = currentTreeRoot;

        performInOrderTraversal(currentTreeRoot.right);
    };

    performInOrderTraversal(root);

    const temporaryValue = firstViolationCandidate.val;
    firstViolationCandidate.val = secondViolationCandidate.val;
    secondViolationCandidate.val = temporaryValue;
};