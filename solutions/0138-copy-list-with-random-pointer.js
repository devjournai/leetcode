/**
 * Copy List With Random Pointer
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var copyRandomList = function (head) {
    if (head === null) {
        return null;
    }

    let currentOriginalNode = head;
    while (currentOriginalNode !== null) {
        let createdCopyNode = new Node(currentOriginalNode.val);
        createdCopyNode.next = currentOriginalNode.next;
        currentOriginalNode.next = createdCopyNode;
        currentOriginalNode = createdCopyNode.next;
    }

    let pointerToInterleavedList = head;
    while (pointerToInterleavedList !== null) {
        let correspondingCopiedNode = pointerToInterleavedList.next;
        if (pointerToInterleavedList.random !== null) {
            correspondingCopiedNode.random = pointerToInterleavedList.random.next;
        } else {
            correspondingCopiedNode.random = null;
        }
        pointerToInterleavedList = correspondingCopiedNode.next;
    }

    let originalListHead = head;
    let deepCopyHead = head.next;
    let deepCopyCurrent = deepCopyHead;

    while (originalListHead !== null) {
        originalListHead.next = deepCopyCurrent.next;

        if (originalListHead.next !== null) {
            deepCopyCurrent.next = originalListHead.next.next;
        } else {
            deepCopyCurrent.next = null;
        }

        originalListHead = originalListHead.next;
        deepCopyCurrent = deepCopyCurrent.next;
    }

    return deepCopyHead;
};