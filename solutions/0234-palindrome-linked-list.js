/**
 * Palindrome Linked List
 * Intuition: Compare the first half to the reversed second half in O(1) extra space. Slow/fast finds the middle; even/odd length chooses where the second half starts.
 * Approach: 1. Empty/single node → true. 2. Slow/fast to mid; if fast is non-null (odd), start the second half after slow. 3. Cut the first half, reverse the second. 4. Walk both halves; any value mismatch → false, else true.
 * Dry Run: 1 -> 2 -> 2 -> 1.
 *   - Slow lands on the second 2; even length so second half is 2 -> 1. Cut first half to 1 -> 2.
 *   - Reverse second half to 1 -> 2. Compare 1==1, 2==2 → true.
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
