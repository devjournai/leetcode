/**
 * Intersection Of Two Linked Lists
 * Time Complexity: O(N + M)
 * Space Complexity: O(1)
 */
var getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) {
    return null;
  }

  let currentIteratorA = headA;
  let currentIteratorB = headB;

  while (currentIteratorA !== currentIteratorB) {
    currentIteratorA =
      currentIteratorA === null ? headB : currentIteratorA.next;
    currentIteratorB =
      currentIteratorB === null ? headA : currentIteratorB.next;
  }

  return currentIteratorA;
};
