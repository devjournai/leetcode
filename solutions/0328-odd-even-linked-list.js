/**
 * Odd Even Linked List
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var oddEvenList = function (initialListHead) {
    if (!initialListHead || !initialListHead.next) {
        return initialListHead;
    }

    const evenListFirstNode = initialListHead.next;
    let currentOddNode = initialListHead;
    let currentEvenNode = initialListHead.next;

    while (currentEvenNode && currentEvenNode.next) {
        currentOddNode.next = currentEvenNode.next;
        currentOddNode = currentOddNode.next;
        currentEvenNode.next = currentOddNode.next;
        currentEvenNode = currentEvenNode.next;
    }

    currentOddNode.next = evenListFirstNode;

    return initialListHead;
};