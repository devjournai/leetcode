/**
 * Insert Greatest Common Divisors In Linked List
 * Intuition: Iterate through the linked list, processing each pair of adjacent nodes. For each pair, calculate their greatest common divisor and insert a new node with this value between them.
 * Approach: 1. Define a helper function to compute the greatest common divisor (GCD) using the Euclidean algorithm. 2. Initialize a pointer to the head of the linked list. 3. While the pointer and its next node exist, retrieve the current node's value and the next node's value. 4. Calculate the GCD of these two values using the helper function. 5. Create a new ListNode with the calculated GCD value, and link its 'next' pointer to the original next node. 6. Update the current node's 'next' pointer to point to this newly created GCD node. 7. Advance the main pointer to the original next node (which is now after the newly inserted GCD node) to continue the traversal. 8. Return the head of the modified list.
 * Dry Run: head = [18, 6, 10]
 * 1. currentOriginalNode = ListNode(18)
 * 2. Loop 1: currentOriginalNode.val = 18, currentOriginalNode.next.val = 6.
 *    - nextOriginalNode = ListNode(6)
 *    - computedGcdValue = calculateGreatestCommonDivisor(18, 6) -> returns 6.
 *    - intermediateNode = new ListNode(6, nextOriginalNode (ListNode(6))).
 *    - currentOriginalNode.next (originally ListNode(6)) becomes intermediateNode (ListNode(6)).
 *      List state: 18 -> 6 (new GCD node) -> 6 (original) -> 10
 *    - currentOriginalNode advances to nextOriginalNode (ListNode(6), the original next node).
 * 3. Loop 2: currentOriginalNode.val = 6, currentOriginalNode.next.val = 10.
 *    - nextOriginalNode = ListNode(10)
 *    - computedGcdValue = calculateGreatestCommonDivisor(6, 10) -> returns 2.
 *    - intermediateNode = new ListNode(2, nextOriginalNode (ListNode(10))).
 *    - currentOriginalNode.next (originally ListNode(10)) becomes intermediateNode (ListNode(2)).
 *      List state: 18 -> 6 (new GCD node) -> 6 (original) -> 2 (new GCD node) -> 10 (original)
 *    - currentOriginalNode advances to nextOriginalNode (ListNode(10), the original next node).
 * 4. Loop 3: currentOriginalNode.val = 10, currentOriginalNode.next is null. Loop terminates.
 * 5. Returns head = [18, 6, 6, 2, 10].
 * Time Complexity: O(N * log M)
 * Space Complexity: O(1)
 */
var insertGreatestCommonDivisors = function (head) {
  function calculateGreatestCommonDivisor(firstOperand, secondOperand) {
    let variableA = firstOperand;
    let variableB = secondOperand;
    while (variableB !== 0) {
      let temporaryRemainder = variableA % variableB;
      variableA = variableB;
      variableB = temporaryRemainder;
    }
    return variableA;
  }

  if (!head || !head.next) {
    return head;
  }

  let currentOriginalNode = head;
  while (currentOriginalNode && currentOriginalNode.next) {
    let nextOriginalNode = currentOriginalNode.next;
    let computedGcdValue = calculateGreatestCommonDivisor(
      currentOriginalNode.val,
      nextOriginalNode.val,
    );
    let intermediateNode = new ListNode(computedGcdValue, nextOriginalNode);
    currentOriginalNode.next = intermediateNode;
    currentOriginalNode = nextOriginalNode;
  }

  return head;
};
