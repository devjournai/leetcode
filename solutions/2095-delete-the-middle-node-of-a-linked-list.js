/**
 * Delete The Middle Node Of A Linked List
 * Intuition: To delete a node in a linked list, we need a reference to the node immediately preceding it. The middle node can be efficiently located using the two-pointer (fast and slow) technique. By maintaining an additional pointer that tracks the node before the slow pointer, we can correctly bypass and delete the middle element.
 * Approach: 1. Handle edge cases where the list is empty or has only one node, returning null as the result of deleting the only node. 2. Initialize three pointers: 'precedingNode' to null, 'slowRunner' to the head, and 'fastRunner' to the head. 3. Traverse the list using the two-pointer approach: 'fastRunner' moves two steps at a time, and 'slowRunner' moves one step at a time, with 'precedingNode' always tracking the node just before 'slowRunner'. 4. When 'fastRunner' reaches the end of the list (or its next node is null), 'slowRunner' will be pointing to the middle node and 'precedingNode' will be pointing to the node before it. 5. Update 'precedingNode.next' to 'slowRunner.next', effectively removing the middle node from the list. 6. Return the original head of the modified list.
 * Dry Run: Input: head = [1, 2, 3, 4, 5]
 * 1. Check head and head.next: head (Node(1)) is not null, head.next (Node(2)) is not null. Continue.
 * 2. Initialize:
 *    precedingNode = null
 *    slowRunner = Node(1)
 *    fastRunner = Node(1)
 * 3. Loop (while fastRunner && fastRunner.next):
 *    Iteration 1:
 *      Condition: fastRunner (Node(1)) is not null, fastRunner.next (Node(2)) is not null. True.
 *      precedingNode becomes Node(1)
 *      slowRunner becomes Node(2)
 *      fastRunner becomes Node(3) (Node(1).next.next)
 *      State: precedingNode = Node(1), slowRunner = Node(2), fastRunner = Node(3)
 *    Iteration 2:
 *      Condition: fastRunner (Node(3)) is not null, fastRunner.next (Node(4)) is not null. True.
 *      precedingNode becomes Node(2)
 *      slowRunner becomes Node(3)
 *      fastRunner becomes Node(5) (Node(3).next.next)
 *      State: precedingNode = Node(2), slowRunner = Node(3), fastRunner = Node(5)
 *    Iteration 3:
 *      Condition: fastRunner (Node(5)) is not null, fastRunner.next (null) is null. False. Loop terminates.
 * 4. Deletion:
 *    precedingNode.next (Node(2).next) is set to slowRunner.next (Node(3).next, which is Node(4)).
 *    The list is now: 1 -> 2 -> 4 -> 5. Node 3 is bypassed.
 * 5. Return head (Node(1)).
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var deleteMiddle = function (head) {
  if (!head || !head.next) {
    return null;
  }

  let precedingNode = null;
  let slowRunner = head;
  let fastRunner = head;

  while (fastRunner && fastRunner.next) {
    precedingNode = slowRunner;
    slowRunner = slowRunner.next;
    fastRunner = fastRunner.next.next;
  }

  precedingNode.next = slowRunner.next;

  return head;
};
