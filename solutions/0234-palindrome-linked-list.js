/**
 * Palindrome Linked List
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var isPalindrome = function (head) {
    if (!head || !head.next) {
        return true;
    }

    let originalHeadReference = head;

    let slowMovementPointer = head;
    let fastMovementPointer = head;
    let nodeBeforeMiddle = null;

    while (fastMovementPointer !== null && fastMovementPointer.next !== null) {
        nodeBeforeMiddle = slowMovementPointer;
        slowMovementPointer = slowMovementPointer.next;
        fastMovementPointer = fastMovementPointer.next.next;
    }

    let headOfSecondSegment = slowMovementPointer;
    if (fastMovementPointer !== null) {
        headOfSecondSegment = slowMovementPointer.next;
    }

    if (nodeBeforeMiddle !== null) {
        nodeBeforeMiddle.next = null;
    }

    let priorNode = null;
    let presentNode = headOfSecondSegment;
    let followingNode = null;

    while (presentNode !== null) {
        followingNode = presentNode.next;
        presentNode.next = priorNode;
        priorNode = presentNode;
        presentNode = followingNode;
    }
    let reversedSecondHalf = priorNode;

    let firstHalfIterator = originalHeadReference;
    let secondHalfIterator = reversedSecondHalf;

    while (firstHalfIterator !== null && secondHalfIterator !== null) {
        if (firstHalfIterator.val !== secondHalfIterator.val) {
            return false;
        }
        firstHalfIterator = firstHalfIterator.next;
        secondHalfIterator = secondHalfIterator.next;
    }

    return true;
};