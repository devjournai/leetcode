/**
 * Partition List
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var partition = function (head, x) {
    let lessThanDummyHead = new ListNode(0);
    let currentLessNode = lessThanDummyHead;

    let greaterThanOrEqualToDummyHead = new ListNode(0);
    let currentGreaterEqualNode = greaterThanOrEqualToDummyHead;

    let traversalNode = head;

    while (traversalNode !== null) {
        if (traversalNode.val < x) {
            currentLessNode.next = traversalNode;
            currentLessNode = currentLessNode.next;
        } else {
            currentGreaterEqualNode.next = traversalNode;
            currentGreaterEqualNode = currentGreaterEqualNode.next;
        }
        traversalNode = traversalNode.next;
    }

    currentGreaterEqualNode.next = null;
    currentLessNode.next = greaterThanOrEqualToDummyHead.next;

    return lessThanDummyHead.next;
};