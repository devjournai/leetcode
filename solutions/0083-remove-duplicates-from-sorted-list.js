/**
 * Remove Duplicates From Sorted List
 * Intuition: Because the list is sorted, a value is unique in the result when it differs from the next node (or is the last node); copy those values into a new list.
 * Approach: 1. Dummy head plus a write pointer. 2. Walk the original list; if next is null or val !== next.val, append a new node with that val. 3. Always advance the original pointer. 4. Return dummy.next.
 * Dry Run: 1→1→2→3→3 → copy 1 once (when next differs), copy 2, copy last 3 → 1→2→3
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var deleteDuplicates = function (head) {
  const newLinkedListHead = new ListNode();
  let newLinkedListCurrent = newLinkedListHead;
  let originalListPointer = head;

  while (originalListPointer) {
    if (
      originalListPointer.next === null ||
      originalListPointer.val !== originalListPointer.next.val
    ) {
      newLinkedListCurrent.next = new ListNode(originalListPointer.val);
      newLinkedListCurrent = newLinkedListCurrent.next;
    }
    originalListPointer = originalListPointer.next;
  }

  return newLinkedListHead.next;
};
