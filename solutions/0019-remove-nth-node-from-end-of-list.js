/**
 * Remove Nth Node From End Of List
 * Time Complexity: O(L)
 * Space Complexity: O(1)
*/
var removeNthFromEnd = function (head, n) {
    const virtualHead = new ListNode(0);
    virtualHead.next = head;

    let advancePointer = virtualHead;
    let trailingPointer = virtualHead;

    for (let count = 0; count < n; count++) {
        advancePointer = advancePointer.next;
    }

    while (advancePointer.next !== null) {
        advancePointer = advancePointer.next;
        trailingPointer = trailingPointer.next;
    }

    trailingPointer.next = trailingPointer.next.next;

    return virtualHead.next;
};