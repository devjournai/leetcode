/**
 * Insert Into A Sorted Circular Linked List
 * Intuition: Walk the circle until `valueToInsert` sits between `prevIterator` and `currIterator`, including the wrap from max to min. Empty or single-node lists are special-cased.
 * Approach: 1. Empty → self-loop new node. 2. Single node → insert after head. 3. Do-while: break if prev≤val≤curr, or at the decreasing wrap if val≥prev or val≤curr. 4. Splice and return original `listHead`.
 * Dry Run: list 3→4→1→3, insert 2. Skip 3|4 and 4|1; at prev=1 curr=3, 1≤2≤3 → splice 1→2→3. Return head 3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var insert = function (listHead, valueToInsert) {
  const newCircularNode = new _Node(valueToInsert, null);

  if (!listHead) {
    newCircularNode.next = newCircularNode;
    return newCircularNode;
  }

  if (listHead.next === listHead) {
    newCircularNode.next = listHead;
    listHead.next = newCircularNode;
    return listHead;
  }

  let prevIterator = listHead;
  let currIterator = listHead.next;

  do {
    if (
      (prevIterator.val <= valueToInsert &&
        valueToInsert <= currIterator.val) ||
      (prevIterator.val > currIterator.val &&
        (valueToInsert >= prevIterator.val ||
          valueToInsert <= currIterator.val))
    ) {
      break;
    }
    prevIterator = currIterator;
    currIterator = currIterator.next;
  } while (prevIterator !== listHead);

  prevIterator.next = newCircularNode;
  newCircularNode.next = currIterator;

  return listHead;
};
