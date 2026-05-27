/**
 * Maximum Twin Sum Of A Linked List
 * Intuition: The problem involves pairing elements from the beginning with elements from the end of a linked list. A common strategy for such problems in linked lists is to split the list into two halves, reverse the second half, and then iterate through both halves simultaneously.
 * Approach: 1. Use two pointers (slow and fast) to find the middle of the linked list. The slow pointer will stop at the beginning of the second half, and the node just before it will be the end of the first half. 2. Detach the first half from the second half. 3. Reverse the second half of the linked list. 4. Iterate through the original first half and the now-reversed second half simultaneously, calculating the sum of corresponding nodes and keeping track of the maximum sum found.
 * Dry Run:
 *   head = [5, 4, 2, 1] (n=4)
 *
 *   1. Find Middle:
 *      slowIterator = 5, fastIterator = 5, endOfFirstHalf = null
 *      Loop 1: endOfFirstHalf = 5, slowIterator = 4, fastIterator = 2
 *      Loop 2: endOfFirstHalf = 4, slowIterator = 2, fastIterator = null
 *      Loop ends.
 *      endOfFirstHalf is 4. Set endOfFirstHalf.next = null. List becomes [5 -> 4 -> null] and [2 -> 1].
 *      headOfSecondHalf = 2.
 *
 *   2. Reverse Second Half:
 *      headOfSecondHalf = [2, 1]
 *      previousItem = null, currentItem = 2, nextItemToProcess = null
 *      Loop 1 (currentItem = 2): nextItemToProcess = 1. currentItem.next = null (2 -> null). previousItem = 2. currentItem = 1.
 *      Loop 2 (currentItem = 1): nextItemToProcess = null. currentItem.next = 2 (1 -> 2). previousItem = 1. currentItem = null.
 *      Loop ends.
 *      reversedSecondHalf = 1. The second half is now [1 -> 2 -> null].
 *
 *   3. Calculate Max Twin Sum:
 *      firstHalfCurrentNode = 5 (from original head, which is now [5 -> 4 -> null])
 *      secondHalfCurrentNode = 1 (from reversedSecondHalf, which is [1 -> 2 -> null])
 *      maxTwinSum = 0
 *      Loop 1 (secondHalfCurrentNode = 1):
 *         currentPairSum = 5 + 1 = 6
 *         maxTwinSum = Math.max(0, 6) = 6
 *         firstHalfCurrentNode = 4
 *         secondHalfCurrentNode = 2
 *      Loop 2 (secondHalfCurrentNode = 2):
 *         currentPairSum = 4 + 2 = 6
 *         maxTwinSum = Math.max(6, 6) = 6
 *         firstHalfCurrentNode = null
 *         secondHalfCurrentNode = null
 *      Loop ends.
 *
 *   Return maxTwinSum = 6.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var pairSum = function (head) {
  let slowIterator = head;
  let fastIterator = head;
  let endOfFirstHalf = null;

  while (fastIterator && fastIterator.next) {
    endOfFirstHalf = slowIterator;
    slowIterator = slowIterator.next;
    fastIterator = fastIterator.next.next;
  }

  endOfFirstHalf.next = null;

  let headOfSecondHalf = slowIterator;

  let previousItem = null;
  let currentItem = headOfSecondHalf;
  let nextItemToProcess = null;

  while (currentItem) {
    nextItemToProcess = currentItem.next;
    currentItem.next = previousItem;
    previousItem = currentItem;
    currentItem = nextItemToProcess;
  }

  let reversedSecondHalf = previousItem;

  let firstHalfCurrentNode = head;
  let secondHalfCurrentNode = reversedSecondHalf;
  let maxTwinSum = 0;

  while (secondHalfCurrentNode) {
    let currentPairSum = firstHalfCurrentNode.val + secondHalfCurrentNode.val;
    maxTwinSum = Math.max(maxTwinSum, currentPairSum);
    firstHalfCurrentNode = firstHalfCurrentNode.next;
    secondHalfCurrentNode = secondHalfCurrentNode.next;
  }

  return maxTwinSum;
};
