/**
 * Reverse Nodes In Even Length Groups
 * Intuition: Iterate through the linked list, identify groups of increasing length (1, 2, 3, ...), and reverse only those groups whose actual length is even, re-linking them into the main list.
 * Approach: 1. Initialize a `groupPrecursor` node to `head` and an `groupExpectedLength` variable to 2 (since the first group has length 1, which is odd). 2. Loop while `groupPrecursor.next` is not null, indicating there are more nodes to process. 3. Inside the loop, determine the `firstNodeOfGroup` and traverse `groupExpectedLength` nodes to find the `nextSegmentStartNode` and `actualGroupLengthFound`. 4. If `actualGroupLengthFound` is even, call a helper function `performReversal` to reverse the segment from `firstNodeOfGroup` for `actualGroupLengthFound` nodes. The helper connects the segment's new tail to `nextSegmentStartNode` and returns the new head of the reversed segment. 5. Connect `groupPrecursor.next` to this `newlyReversedHead`. 6. Advance `groupPrecursor` by `actualGroupLengthFound` steps to position it correctly at the end of the current processed group. 7. Increment `groupExpectedLength` for the next iteration. 8. The `performReversal` helper uses a standard iterative approach to reverse a linked list segment, returning the new head of the reversed segment and ensuring the original head's `next` pointer (now the tail) points to the node following the segment.
 * Dry Run: Input: `head = [1,2,3,4,5,6,7,8]`
 * Initial: `groupPrecursor = 1`, `groupExpectedLength = 2`.
 * Loop 1 (Group Length 2):
 *   - Group nodes: `2 -> 3`. `firstNodeOfGroup = 2`, `actualGroupLengthFound = 2`, `nextSegmentStartNode = 4`.
 *   - `actualGroupLengthFound` (2) is even.
 *   - Call `performReversal(2, 2)`: `2 -> 3` becomes `3 -> 2`. Original `2.next` (now tail) points to `4`. Returns `3`.
 *   - `groupPrecursor.next` (1.next) becomes `3`. List: `1 -> 3 -> 2 -> 4 -> 5 -> 6 -> 7 -> 8`.
 *   - `groupPrecursor` advances 2 steps: `1 -> 3 -> 2`. `groupPrecursor` is now `2`.
 *   - `groupExpectedLength` becomes `3`.
 * Loop 2 (Group Length 3):
 *   - Group nodes: `4 -> 5 -> 6`. `firstNodeOfGroup = 4`, `actualGroupLengthFound = 3`, `nextSegmentStartNode = 7`.
 *   - `actualGroupLengthFound` (3) is odd. No reversal.
 *   - `groupPrecursor` advances 3 steps: `2 -> 4 -> 5 -> 6`. `groupPrecursor` is now `6`.
 *   - `groupExpectedLength` becomes `4`.
 * Loop 3 (Group Length 4):
 *   - Group nodes: `7 -> 8`. `firstNodeOfGroup = 7`, `actualGroupLengthFound = 2`, `nextSegmentStartNode = null`. (List ends prematurely)
 *   - `actualGroupLengthFound` (2) is even.
 *   - Call `performReversal(7, 2)`: `7 -> 8` becomes `8 -> 7`. Original `7.next` (now tail) points to `null`. Returns `8`.
 *   - `groupPrecursor.next` (6.next) becomes `8`. List: `1 -> 3 -> 2 -> 4 -> 5 -> 6 -> 8 -> 7 -> null`.
 *   - `groupPrecursor` advances 2 steps: `6 -> 8 -> 7`. `groupPrecursor` is now `7`.
 *   - `groupExpectedLength` becomes `5`.
 * Loop 4: `groupPrecursor.next` (7.next) is `null`. Loop terminates.
 * Return `head` (`1`).
 * Final List: `1 -> 3 -> 2 -> 4 -> 5 -> 6 -> 8 -> 7 -> null`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var reverseEvenLengthGroups = function (head) {
  let groupPrecursor = head;
  let groupExpectedLength = 2;

  function performReversal(segmentHeadOriginal, lengthToReverse) {
    let previousDuringReverse = null;
    let currentDuringReverse = segmentHeadOriginal;
    let temporaryNextNode;
    for (
      let loopIndexReverse = 0;
      loopIndexReverse < lengthToReverse;
      loopIndexReverse++
    ) {
      temporaryNextNode = currentDuringReverse.next;
      currentDuringReverse.next = previousDuringReverse;
      previousDuringReverse = currentDuringReverse;
      currentDuringReverse = temporaryNextNode;
    }
    segmentHeadOriginal.next = currentDuringReverse;
    return previousDuringReverse;
  }

  while (groupPrecursor.next) {
    let firstNodeOfGroup = groupPrecursor.next;
    let currentGroupTraversalNode = firstNodeOfGroup;
    let nodesFoundInGroup = 0;

    while (
      currentGroupTraversalNode &&
      nodesFoundInGroup < groupExpectedLength
    ) {
      currentGroupTraversalNode = currentGroupTraversalNode.next;
      nodesFoundInGroup++;
    }

    let nextSegmentStartNode = currentGroupTraversalNode;
    let actualGroupLengthFound = nodesFoundInGroup;

    if (actualGroupLengthFound % 2 === 0) {
      let newlyReversedHead = performReversal(
        firstNodeOfGroup,
        actualGroupLengthFound
      );
      groupPrecursor.next = newlyReversedHead;
    }

    for (
      let incrementer = 0;
      incrementer < actualGroupLengthFound;
      incrementer++
    ) {
      groupPrecursor = groupPrecursor.next;
    }

    groupExpectedLength++;
  }

  return head;
};
