/**
 * Swap Nodes In Pairs
 * Time Complexity: O(N)
 * Space Complexity: O(1)
*/
var swapPairs = function (head) {
    if (!head || !head.next) {
        return head;
    }

    const sentinelNode = new ListNode(0);
    sentinelNode.next = head;

    let pointerBeforePair = sentinelNode;

    while (pointerBeforePair.next && pointerBeforePair.next.next) {
        let nodeOne = pointerBeforePair.next;
        let nodeTwo = pointerBeforePair.next.next;
        let remainder = nodeTwo.next;

        pointerBeforePair.next = nodeTwo;
        nodeTwo.next = nodeOne;
        nodeOne.next = remainder;

        pointerBeforePair = nodeOne;
    }

    return sentinelNode.next;
};
