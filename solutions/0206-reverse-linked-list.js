/**
 * Reverse Linked List
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var reverseList = function (head) {
    if (!head || !head.next) {
        return head;
    }

    const returnedHead = reverseList(head.next);
    const followingNode = head.next;

    followingNode.next = head;
    head.next = null;

    return returnedHead;
};