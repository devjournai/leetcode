/**
 * Sort Linked List Already Sorted Using Absolute Values
 * Intuition: The linked list is sorted by absolute values. This means negative numbers might appear "out of order" when considering their actual values (e.g., -5 might appear before -3, but actually -5 < -3). All positive numbers are correctly placed relative to each other, and all negative numbers are correctly placed relative to each other (in terms of absolute value position). When a negative number is encountered, it is smaller than any positive number and any other negative number whose absolute value is smaller. By moving each encountered negative number to the very beginning of the list, we effectively build the sorted list from the smallest (most negative) to the largest (most positive) value.
 * Approach: 1. Handle edge cases for an empty or single-node list. 2. Initialize two pointers: `previousElement` to the head and `traversalNode` to the node after the head. 3. Iterate through the list using `traversalNode`. 4. If `traversalNode` contains a negative value, detach it from its current position by updating `previousElement.next` to bypass `traversalNode`. Then, prepend `traversalNode` to the beginning of the list by making it the new head and linking its `next` pointer to the old head. Advance `traversalNode` to the node that was originally after the detached negative node. 5. If `traversalNode` contains a non-negative value, simply advance both `previousElement` and `traversalNode` to their respective next nodes. 6. After the loop completes, the `head` pointer will reference the start of the fully sorted list.
 * Dry Run: Input: head = [1, -2, -3, 4, -5, -6]
 * Initial: head -> (1), previousElement -> (1), traversalNode -> (-2)
 *
 * Iteration 1: traversalNode is (-2). (-2 < 0) is true.
 *   subsequentNode -> (-3)
 *   (1).next becomes (-3). List now: (1) -> (-3) -> (4) -> (-5) -> (-6)
 *   (-2).next becomes (1). Node (-2) points to (1).
 *   head becomes (-2). head is now (-2).
 *   traversalNode becomes (-3). traversalNode is now (-3).
 *   previousElement remains (1).
 * Current state: head -> (-2) -> (1) -> (-3) -> (4) -> (-5) -> (-6). previousElement -> (1), traversalNode -> (-3)
 *
 * Iteration 2: traversalNode is (-3). (-3 < 0) is true.
 *   subsequentNode -> (4)
 *   (1).next becomes (4). List now: (-2) -> (1) -> (4) -> (-5) -> (-6)
 *   (-3).next becomes (-2). Node (-3) points to (-2).
 *   head becomes (-3). head is now (-3).
 *   traversalNode becomes (4). traversalNode is now (4).
 *   previousElement remains (1).
 * Current state: head -> (-3) -> (-2) -> (1) -> (4) -> (-5) -> (-6). previousElement -> (1), traversalNode -> (4)
 *
 * Iteration 3: traversalNode is (4). (4 < 0) is false.
 *   previousElement becomes (4).
 *   traversalNode becomes (-5).
 * Current state: head -> (-3) -> (-2) -> (1) -> (4) -> (-5) -> (-6). previousElement -> (4), traversalNode -> (-5)
 *
 * Iteration 4: traversalNode is (-5). (-5 < 0) is true.
 *   subsequentNode -> (-6)
 *   (4).next becomes (-6). List now: (-3) -> (-2) -> (1) -> (4) -> (-6)
 *   (-5).next becomes (-3). Node (-5) points to (-3).
 *   head becomes (-5). head is now (-5).
 *   traversalNode becomes (-6). traversalNode is now (-6).
 *   previousElement remains (4).
 * Current state: head -> (-5) -> (-3) -> (-2) -> (1) -> (4) -> (-6). previousElement -> (4), traversalNode -> (-6)
 *
 * Iteration 5: traversalNode is (-6). (-6 < 0) is true.
 *   subsequentNode -> null
 *   (4).next becomes null. List now: (-5) -> (-3) -> (-2) -> (1) -> (4)
 *   (-6).next becomes (-5). Node (-6) points to (-5).
 *   head becomes (-6). head is now (-6).
 *   traversalNode becomes null. traversalNode is now null.
 *   previousElement remains (4).
 * Current state: head -> (-6) -> (-5) -> (-3) -> (-2) -> (1) -> (4). previousElement -> (4), traversalNode -> null
 *
 * Loop ends as traversalNode is null.
 * Return head which is (-6).
 * Final Result: [-6, -5, -3, -2, 1, 4]
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var sortLinkedList = function (head) {
  if (!head || !head.next) {
    return head;
  }

  let previousElement = head;
  let traversalNode = head.next;

  while (traversalNode) {
    if (traversalNode.val < 0) {
      let subsequentNode = traversalNode.next;
      previousElement.next = subsequentNode;
      traversalNode.next = head;
      head = traversalNode;
      traversalNode = subsequentNode;
    } else {
      previousElement = traversalNode;
      traversalNode = traversalNode.next;
    }
  }

  return head;
};
