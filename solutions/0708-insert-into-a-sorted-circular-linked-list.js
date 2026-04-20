/**
 * Insert Into A Sorted Circular Linked List
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
