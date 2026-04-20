/**
 * Remove Duplicates From Sorted List
 * Time Complexity: O(n)
 * Space Complexity: O(n)
*/
var deleteDuplicates = function (head) {
    const newLinkedListHead = new ListNode();
    let newLinkedListCurrent = newLinkedListHead;
    let originalListPointer = head;

    while (originalListPointer) {
        if (originalListPointer.next === null || originalListPointer.val !== originalListPointer.next.val) {
            newLinkedListCurrent.next = new ListNode(originalListPointer.val);
            newLinkedListCurrent = newLinkedListCurrent.next;
        }
        originalListPointer = originalListPointer.next;
    }

    return newLinkedListHead.next;
};