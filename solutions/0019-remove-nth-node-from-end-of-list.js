/**
 * Remove Nth Node From End Of List
 * Intuition: A dummy `virtualHead` plus two pointers `n` steps apart lets the trailing pointer stop just before the node to delete when the lead pointer hits the end.
 * Approach: 1. Link `virtualHead` to `head`. 2. Advance `advancePointer` `n` times. 3. Walk both pointers until `advancePointer.next` is null. 4. Set `trailingPointer.next` to skip one node. 5. Return `virtualHead.next`.
 * Dry Run: list 1→2→3→4→5, n=2.
 *   - advancePointer starts n steps ahead at 2. Walk until advance at 5; trailing at 3. Skip 4. Result 1→2→3→5.
 * Time Complexity: O(L)
 * Space Complexity: O(1)
 */
var removeNthFromEnd = function (head, n) {
  const virtualHead = new ListNode(0);
  virtualHead.next = head;

  let advancePointer = virtualHead;
  let trailingPointer = virtualHead;

  for (let count = 0; count < n; count++) {
    advancePointer = advancePointer.next;
  }

  while (advancePointer.next !== null) {
    advancePointer = advancePointer.next;
    trailingPointer = trailingPointer.next;
  }

  trailingPointer.next = trailingPointer.next.next;

  return virtualHead.next;
};
