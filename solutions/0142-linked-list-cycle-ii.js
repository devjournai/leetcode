/**
 * Linked List Cycle II
 * Intuition: Floyd's meeting point is not necessarily the cycle entrance. After slow and fast meet, walking one pointer from the head and the other from the meeting node at equal speed lands on the entrance.
 * Approach: 1. If `head` or `head.next` is null, return null. 2. Run tortoise/hare from `head` until they meet or `fastPointer` cannot move; set `cycleFound` on a meeting. 3. If no cycle, return null. 4. Set `startFinder` to `head` and advance `startFinder` and `slowPointer` together until they equal; return that node.
 * Dry Run: 3 → 2 → 0 → -4 → (back to 2)
 * Meet at -4. startFinder=3, slow=-4
 * Next: startFinder=2, slow=2 → entrance is node 2
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
