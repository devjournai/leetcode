/**
 * 143. Reorder List
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