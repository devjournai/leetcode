/**
 * Merge Nodes In Between Zeros
 * Intuition: Iterate through the linked list, accumulating values between consecutive zeros. When a zero is encountered, finalize the sum for that segment and create a new node for the result list, then reset the accumulator.
 * Approach: 1. Initialize a dummy head node for the result list and a pointer to its current tail. 2. Initialize a variable to accumulate the sum of node values. 3. Advance the original list's head to skip the initial zero. 4. Traverse the modified original list until its end. 5. If the current node's value is not zero, add it to the sum accumulator. 6. If the current node's value is zero, and the accumulated sum is greater than zero, create a new ListNode with this sum, append it to the result list, and move the result list's tail pointer. 7. Reset the sum accumulator to zero after processing a segment or encountering a zero. 8. Return the next node of the dummy head, which is the start of the merged list.
 * Dry Run: Input: head = [0,1,2,0,3,4,0]
 *   - newHeadPlaceholder = {val:0, next:null}, newTailPointer = newHeadPlaceholder, currentSegmentSum = 0
 *   - listTraversal = head.next (points to node with value 1)
 *   - Loop (listTraversal is not null):
 *     - listTraversal (val:1): currentSegmentSum = 1. listTraversal moves to node with value 2.
 *     - listTraversal (val:2): currentSegmentSum = 1+2=3. listTraversal moves to node with value 0.
 *     - listTraversal (val:0): val is 0. currentSegmentSum (3) > 0 is true.
 *       - newTailPointer.next = {val:3, next:null}. (Result: {val:0, next:{val:3, next:null}})
 *       - newTailPointer moves to {val:3, next:null}.
 *       - currentSegmentSum = 0.
 *       - listTraversal moves to node with value 3.
 *     - listTraversal (val:3): currentSegmentSum = 0+3=3. listTraversal moves to node with value 4.
 *     - listTraversal (val:4): currentSegmentSum = 3+4=7. listTraversal moves to node with value 0.
 *     - listTraversal (val:0): val is 0. currentSegmentSum (7) > 0 is true.
 *       - newTailPointer.next = {val:7, next:null}. (Result: {val:0, next:{val:3, next:{val:7, next:null}}})
 *       - newTailPointer moves to {val:7, next:null}.
 *       - currentSegmentSum = 0.
 *       - listTraversal moves to null.
 *   - Loop ends.
 *   - Return newHeadPlaceholder.next (which is {val:3, next:{val:7, next:null}}).
 * Time Complexity: O(N)
 * Space Complexity: O(M)
 */
var mergeNodes = function (head) {
  const newHeadPlaceholder = new ListNode(0);
  let newTailPointer = newHeadPlaceholder;
  let currentSegmentSum = 0;

  let listTraversal = head.next;

  while (listTraversal) {
    if (listTraversal.val === 0) {
      if (currentSegmentSum > 0) {
        newTailPointer.next = new ListNode(currentSegmentSum);
        newTailPointer = newTailPointer.next;
      }
      currentSegmentSum = 0;
    } else {
      currentSegmentSum += listTraversal.val;
    }
    listTraversal = listTraversal.next;
  }

  return newHeadPlaceholder.next;
};
