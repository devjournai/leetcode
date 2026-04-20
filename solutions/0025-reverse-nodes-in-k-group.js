/**
 * Reverse Nodes In K Group
 * Time Complexity: O(N)
 * Space Complexity: O(1)
*/
var reverseKGroup = function (head, k) {
    const dummyRoot = new ListNode(0, head);
    let previousSegmentEnd = dummyRoot;

    while (true) {
        let currentGroupBegin = previousSegmentEnd.next;
        let groupExplorer = currentGroupBegin;
        let nodeCountInGroup = 0;

        while (groupExplorer !== null && nodeCountInGroup < k) {
            groupExplorer = groupExplorer.next;
            nodeCountInGroup++;
        }

        if (nodeCountInGroup < k) {
            break;
        }

        let reversedPrevious = null;
        let reversalPointer = currentGroupBegin;
        let loopCounter = 0;

        while (loopCounter < k) {
            let reversalNextTemp = reversalPointer.next;
            reversalPointer.next = reversedPrevious;
            reversedPrevious = reversalPointer;
            reversalPointer = reversalNextTemp;
            loopCounter++;
        }

        previousSegmentEnd.next = reversedPrevious;
        currentGroupBegin.next = reversalPointer;

        previousSegmentEnd = currentGroupBegin;
    }

    return dummyRoot.next;
};