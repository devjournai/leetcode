/**
 * Linked List Cycle II
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var detectCycle = function (head) {
  if (!head || !head.next) {
    return null;
  }

  let slowPointer = head;
  let fastPointer = head;
  let cycleFound = false;

  while (fastPointer && fastPointer.next) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;

    if (slowPointer === fastPointer) {
      cycleFound = true;
      break;
    }
  }

  if (!cycleFound) {
    return null;
  }

  let startFinder = head;
  while (startFinder !== slowPointer) {
    startFinder = startFinder.next;
    slowPointer = slowPointer.next;
  }

  return startFinder;
};
