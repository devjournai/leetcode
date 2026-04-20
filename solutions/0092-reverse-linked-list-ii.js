var reverseBetween = function (head, left, right) {
    const listHeadPlaceholder = new ListNode(0, head);
    let preReversalStart = listHeadPlaceholder;
    let traversalIndex = 1;

    while (traversalIndex < left) {
        preReversalStart = preReversalStart.next;
        traversalIndex++;
    }

    let reversalSublistTail = preReversalStart.next;
    let operationCounter = 0;

    while (operationCounter < right - left) {
        let nodeToRelocate = reversalSublistTail.next;
        reversalSublistTail.next = nodeToRelocate.next;
        nodeToRelocate.next = preReversalStart.next;
        preReversalStart.next = nodeToRelocate;
        operationCounter++;
    }

    return listHeadPlaceholder.next;
};