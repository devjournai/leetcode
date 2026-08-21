/**
 * Reverse Nodes In K Group
 * Intuition: Count k nodes ahead; if a full group exists, reverse those k pointers in place, stitch `previousSegmentEnd` to the new head, and hang the leftover tail on the old group start.
 * Approach: 1. Dummy `dummyRoot` before `head`. 2. From `previousSegmentEnd`, count k nodes with `groupExplorer`. 3. If fewer than k, break. 4. Reverse `k` nodes with `reversedPrevious`/`reversalPointer`. 5. Connect `previousSegmentEnd.next = reversedPrevious`, `currentGroupBegin.next = reversalPointer`, then move `previousSegmentEnd` to `currentGroupBegin`. Return `dummyRoot.next`.
 * Dry Run: 1→2→3→4, k=2.
 *   - Reverse 1,2 → dummy→2→1, 1.next=3. Then reverse 3,4 → 1→4→3. Result 2→1→4→3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var reverseKGroup = function (head, k) {
  const dummyRoot = new ListNode(0, head);
  let previousSegmentEnd = dummyRoot;

  while (true) {
    let currentGroupBegin = previousSegmentEnd.next;
    let groupExplorer = currentGroupBegin;
    let nodeCountInGroup = 0;

    while (groupExplorer !== null && nodeCountInGroup < k) {
      groupExplorer = groupExplorer.next;
      nodeCountInGroup++;
    }

    if (nodeCountInGroup < k) {
      break;
    }

    let reversedPrevious = null;
    let reversalPointer = currentGroupBegin;
    let loopCounter = 0;

    while (loopCounter < k) {
      let reversalNextTemp = reversalPointer.next;
      reversalPointer.next = reversedPrevious;
      reversedPrevious = reversalPointer;
      reversalPointer = reversalNextTemp;
      loopCounter++;
    }

    previousSegmentEnd.next = reversedPrevious;
    currentGroupBegin.next = reversalPointer;

    previousSegmentEnd = currentGroupBegin;
  }

  return dummyRoot.next;
};
