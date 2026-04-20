/**
 * Linked List Cycle
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var hasCycle = function (head) {
    let slowPointer = head;
    let fastPointer = head;

    while (fastPointer !== null && fastPointer.next !== null) {
        slowPointer = slowPointer.next;
        fastPointer = fastPointer.next.next;

        if (slowPointer === fastPointer) {
            return true;
        }
    }

    return false;
};