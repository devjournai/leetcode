/**
 * Swap Nodes In Pairs
 * Intuition: A sentinel sits before each pair so `nodeOne` and `nodeTwo` can be rewired (`prev→two→one→remainder`) without losing the rest of the list, then the pointer moves to `nodeOne` for the next pair.
 * Approach: 1. Return `head` if fewer than two nodes. 2. `sentinelNode.next = head`. 3. While two nodes remain after `pointerBeforePair`, capture `nodeOne`, `nodeTwo`, `remainder`. 4. Relink and set `pointerBeforePair = nodeOne`. 5. Return `sentinelNode.next`.
 * Dry Run: 1→2→3→4.
 *   - Pair 1,2: sentinel→2→1→3→4, pointer at 1. Pair 3,4: 1→4→3. Result 2→1→4→3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var swapPairs = function (head) {
  if (!head || !head.next) {
    return head;
  }

  const sentinelNode = new ListNode(0);
  sentinelNode.next = head;

  let pointerBeforePair = sentinelNode;

  while (pointerBeforePair.next && pointerBeforePair.next.next) {
    let nodeOne = pointerBeforePair.next;
    let nodeTwo = pointerBeforePair.next.next;
    let remainder = nodeTwo.next;

    pointerBeforePair.next = nodeTwo;
    nodeTwo.next = nodeOne;
    nodeOne.next = remainder;

    pointerBeforePair = nodeOne;
  }

  return sentinelNode.next;
};
