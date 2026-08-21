/**
 * Intersection Of Two Linked Lists
 * Intuition: Walking A then B (and B then A) equalizes the extra prefix length, so both pointers travel `lenA + lenB` and meet at the first shared node—or both become null if lists never join.
 * Approach: 1. If either head is null, return null. 2. Start `currentIteratorA` at `headA` and `currentIteratorB` at `headB`. 3. While they differ, each steps to `next` or jumps to the other list's head when null. 4. Return `currentIteratorA` (intersection node or null).
 * Dry Run: A: 4 → 1 → 8 → 4 → 5, B: 5 → 6 → 1 → 8 → 4 → 5 (shared from 8)
 * After switching lists they meet at node 8
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
