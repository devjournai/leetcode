/**
 * Rotate List
 * Intuition: Rotating right by k is the same as moving the last k nodes to the front. After linking the tail to the head, break the circle n-(k%n) steps from the original head.
 * Approach: 1. If the list is empty/single or k is 0, return head. 2. Count length and keep the tail. 3. Let r = k % n; if r is 0, return head. 4. Connect tail to head, walk n-r-1 steps to the new tail, set new head to next, and cut next.
 * Dry Run: 1→2→3→4→5, k = 2. n=5, r=2. Walk 3 steps to node 3; new head is 4. Cut 3.next. Result 4→5→1→2→3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var rotateRight = function (head, k) {
  if (!head || !head.next || k === 0) {
    return head;
  }

  let currentTraversal = head;
  let listTotalLength = 0;
  let originalListTail = null;

  while (currentTraversal) {
    listTotalLength++;
    originalListTail = currentTraversal;
    currentTraversal = currentTraversal.next;
  }

  let actualRotations = k % listTotalLength;

  if (actualRotations === 0) {
    return head;
  }

  originalListTail.next = head;

  let stepsToBreak = listTotalLength - actualRotations;

  let newTailFinder = head;
  for (let stepCount = 1; stepCount < stepsToBreak; stepCount++) {
    newTailFinder = newTailFinder.next;
  }

  let rotatedListHead = newTailFinder.next;
  newTailFinder.next = null;

  return rotatedListHead;
};
