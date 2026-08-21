/**
 * 143. Reorder List
 * Intuition: L0 → Ln → L1 → Ln-1… is the first half interleaved with the reversed second half. Split at the midpoint, reverse the second half in place, then weave the two chains.
 * Approach: 1. If the list has fewer than three nodes, return. 2. Use `slowWalker`/`fastWalker` with `endOfFirstHalf` to find the mid; `slowWalker` starts the second half. 3. Reverse the second half by repeatedly taking `startSecondAlias.next` and inserting it after `midPointAlias`. 4. Walk `currentFrontList` from `head` and `currentBackList` from `midPointAlias.next` until the pivot, splicing one back node after each front node. 5. Mutate in place; do not return a new head.
 * Dry Run: 1 → 2 → 3 → 4
 * Split: first half ends at 2, second starts at 3. Reverse second: 1 → 2 → 4 → 3
 * Weave: 1 → 4 → 2 → 3
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var reorderList = function (head) {
  if (!head || !head.next || !head.next.next) {
    return;
  }

  let slowWalker = head;
  let fastWalker = head;
  let endOfFirstHalf = null;

  while (fastWalker && fastWalker.next) {
    endOfFirstHalf = slowWalker;
    slowWalker = slowWalker.next;
    fastWalker = fastWalker.next.next;
  }

  let midPointAlias = endOfFirstHalf;
  let startSecondAlias = slowWalker;
  let tempNodeSwap;

  while (startSecondAlias && startSecondAlias.next) {
    tempNodeSwap = startSecondAlias.next;
    startSecondAlias.next = tempNodeSwap.next;
    tempNodeSwap.next = midPointAlias.next;
    midPointAlias.next = tempNodeSwap;
  }

  let currentFrontList = head;
  let currentBackList = midPointAlias.next;
  let pivotPoint = midPointAlias;
  let frontListNextTemporary;
  let backListNextTemporary;

  while (currentFrontList !== pivotPoint) {
    frontListNextTemporary = currentFrontList.next;
    backListNextTemporary = currentBackList.next;

    pivotPoint.next = backListNextTemporary;
    currentBackList.next = frontListNextTemporary;
    currentFrontList.next = currentBackList;

    currentFrontList = frontListNextTemporary;
    currentBackList = pivotPoint.next;
  }
};
