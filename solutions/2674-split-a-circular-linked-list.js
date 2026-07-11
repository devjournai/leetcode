/**
 * Split A Circular Linked List
 * Intuition: To split a circular linked list into two, we first need to determine its total length. With the length, we can precisely calculate the end of the first half and the start of the second half based on the `ceil(length / 2)` rule. The core idea is to break the original circular link and create two new circular links at these identified split points.
 * Approach: 1. Traverse the circular linked list to count its total number of nodes, storing this in `listLengthCounter`. 2. Calculate the size of the first half, `firstHalfSize`, using `Math.ceil(listLengthCounter / 2)`. 3. Traverse from the original list head `firstHalfSize - 1` steps to find `firstHalfLastNode`. 4. The node following `firstHalfLastNode` is `secondHalfFirstNode`. 5. Traverse from `secondHalfFirstNode` `listLengthCounter - firstHalfSize - 1` steps to find `secondHalfLastNode`. 6. Modify pointers: set `firstHalfLastNode.next` to the original `list` head to form the first circular list. 7. Modify pointers: set `secondHalfLastNode.next` to `secondHalfFirstNode` to form the second circular list. 8. Return an array containing the heads of the two new circular lists.
 * Dry Run: Input: A -> B -> C -> D -> A (circular list of length 4)
 * 1. Calculate Length: `listNode` starts at A, `listLengthCounter` is 0. Traverses A, B, C, D. `listLengthCounter` becomes 4.
 * 2. Determine Split Point: `firstHalfSize = Math.ceil(4 / 2) = 2`.
 * 3. Find First Half's End: `firstHalfTraverser` starts at A. Loops `2 - 1 = 1` time. Moves from A to B. `firstHalfLastNode = B`.
 * 4. Identify Second Half's Start: `secondHalfFirstNode = firstHalfLastNode.next = B.next = C`.
 * 5. Find Second Half's End: `secondHalfTraverser` starts at C. Loops `4 - 2 - 1 = 1` time. Moves from C to D. `secondHalfLastNode = D`.
 * 6. Form First Circular List: `firstHalfLastNode.next = list` becomes `B.next = A`. First list is now A -> B -> A.
 * 7. Form Second Circular List: `secondHalfLastNode.next = secondHalfFirstNode` becomes `D.next = C`. Second list is now C -> D -> C.
 * 8. Return: `[A, C]`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var splitCircularLinkedList = function (list) {
  let listLengthCounter = 0;
  let listNode = list;

  do {
    listLengthCounter++;
    listNode = listNode.next;
  } while (listNode !== list);

  const firstHalfSize = Math.ceil(listLengthCounter / 2);

  let firstHalfTraverser = list;
  for (
    let firstHalfIndex = 0;
    firstHalfIndex < firstHalfSize - 1;
    firstHalfIndex++
  ) {
    firstHalfTraverser = firstHalfTraverser.next;
  }

  const firstHalfLastNode = firstHalfTraverser;
  const secondHalfFirstNode = firstHalfLastNode.next;

  let secondHalfTraverser = secondHalfFirstNode;
  for (
    let secondHalfIndex = 0;
    secondHalfIndex < listLengthCounter - firstHalfSize - 1;
    secondHalfIndex++
  ) {
    secondHalfTraverser = secondHalfTraverser.next;
  }

  const secondHalfLastNode = secondHalfTraverser;

  firstHalfLastNode.next = list;
  secondHalfLastNode.next = secondHalfFirstNode;

  return [list, secondHalfFirstNode];
};
