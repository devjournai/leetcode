/**
 * Find The Minimum And Maximum Number Of Nodes Between Critical Points
 * Intuition: Critical points are local extrema. We can find them by traversing the linked list and comparing each node's value with its immediate neighbors. The minimum and maximum distances are then easily derived from the indices of these critical points.
 * Approach: 1. Initialize pointers for the previous, current, and next nodes, along with variables to track the first, last, and minimum distances between critical points. 2. Traverse the linked list, checking if the current node is a local maxima or minima. 3. If a critical point is found, update the first and last critical point indices and calculate the minimum distance to the previously found critical point. 4. After traversal, if at least two critical points were found, compute the maximum distance from the first to the last critical point. Otherwise, return [-1, -1].
 * Dry Run: head = [3,1,2,5,1,2,6,3]
 *   Initial: firstCriticalFoundIndex = -1, lastCriticalFoundIndex = -1, minCalculatedDifference = Infinity, nodePositionCounter = 2
 *   Pointers: nodePointerOne=3, nodePointerTwo=1, nodePointerThree=2
 *   Loop 1 (nodePositionCounter=2, nodePointerTwo=1): (1 < 3 && 1 < 2) is true. Critical point found.
 *     firstCriticalFoundIndex = 2, lastCriticalFoundIndex = 2.
 *     Advance: nodePointerOne=1, nodePointerTwo=2, nodePointerThree=5, nodePositionCounter=3
 *   Loop 2 (nodePositionCounter=3, nodePointerTwo=2): Not critical.
 *     Advance: nodePointerOne=2, nodePointerTwo=5, nodePointerThree=1, nodePositionCounter=4
 *   Loop 3 (nodePositionCounter=4, nodePointerTwo=5): (5 > 2 && 5 > 1) is true. Critical point found.
 *     minCalculatedDifference = Math.min(Infinity, 4 - 2) = 2.
 *     lastCriticalFoundIndex = 4.
 *     Advance: nodePointerOne=5, nodePointerTwo=1, nodePointerThree=2, nodePositionCounter=5
 *   Loop 4 (nodePositionCounter=5, nodePointerTwo=1): (1 < 5 && 1 < 2) is true. Critical point found.
 *     minCalculatedDifference = Math.min(2, 5 - 4) = 1.
 *     lastCriticalFoundIndex = 5.
 *     Advance: nodePointerOne=1, nodePointerTwo=2, nodePointerThree=6, nodePositionCounter=6
 *   Loop 5 (nodePositionCounter=6, nodePointerTwo=2): Not critical.
 *     Advance: nodePointerOne=2, nodePointerTwo=6, nodePointerThree=3, nodePositionCounter=7
 *   Loop 6 (nodePositionCounter=7, nodePointerTwo=6): (6 > 2 && 6 > 3) is true. Critical point found.
 *     minCalculatedDifference = Math.min(1, 7 - 5) = 1.
 *     lastCriticalFoundIndex = 7.
 *     Advance: nodePointerOne=6, nodePointerTwo=3, nodePointerThree=null, nodePositionCounter=8
 *   Loop terminates.
 *   Result: firstCriticalFoundIndex=2, lastCriticalFoundIndex=7, minCalculatedDifference=1.
 *   maxDistanceResult = 7 - 2 = 5.
 *   Return [1, 5].
 * Time Complexity: O(N)
 * Space Complexity: O(1)
*/
var nodesBetweenCriticalPoints = function (head) {
    if (!head || !head.next || !head.next.next) {
        return [-1, -1];
    }

    let firstCriticalFoundIndex = -1;
    let lastCriticalFoundIndex = -1;
    let minCalculatedDifference = Infinity;

    let nodePointerOne = head;
    let nodePointerTwo = head.next;
    let nodePointerThree = head.next.next;
    let nodePositionCounter = 2;

    while (nodePointerThree !== null) {
        const isLocalMaxima = nodePointerTwo.val > nodePointerOne.val && nodePointerTwo.val > nodePointerThree.val;
        const isLocalMinima = nodePointerTwo.val < nodePointerOne.val && nodePointerTwo.val < nodePointerThree.val;

        if (isLocalMaxima || isLocalMinima) {
            if (firstCriticalFoundIndex === -1) {
                firstCriticalFoundIndex = nodePositionCounter;
            } else {
                minCalculatedDifference = Math.min(minCalculatedDifference, nodePositionCounter - lastCriticalFoundIndex);
            }
            lastCriticalFoundIndex = nodePositionCounter;
        }

        nodePointerOne = nodePointerTwo;
        nodePointerTwo = nodePointerThree;
        nodePointerThree = nodePointerThree.next;
        nodePositionCounter++;
    }

    if (firstCriticalFoundIndex === -1 || firstCriticalFoundIndex === lastCriticalFoundIndex) {
        return [-1, -1];
    }

    const maxDistanceResult = lastCriticalFoundIndex - firstCriticalFoundIndex;
    return [minCalculatedDifference, maxDistanceResult];
};