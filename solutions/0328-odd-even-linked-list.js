/**
 * Odd Even Linked List
 * Intuition: Relink odd-positioned nodes into one chain and even-positioned nodes into another, then attach the even chain after the last odd node.
 * Approach: 1. If the list has 0 or 1 node, return it. 2. Remember the first even node. 3. While even has a next, odd.next = even.next and even.next = the new odd's next; advance both. 4. Set last odd.next to the saved even head.
 * Dry Run: 1 → 2 → 3 → 4 → 5.
 *   - After the loop: odds 1-3-5, evens 2-4.
 *   - 5.next = 2 → 1-3-5-2-4.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var oddEvenList = function (initialListHead) {
  if (!initialListHead || !initialListHead.next) {
    return initialListHead;
  }

  const evenListFirstNode = initialListHead.next;
  let currentOddNode = initialListHead;
  let currentEvenNode = initialListHead.next;

  while (currentEvenNode && currentEvenNode.next) {
    currentOddNode.next = currentEvenNode.next;
    currentOddNode = currentOddNode.next;
    currentEvenNode.next = currentOddNode.next;
    currentEvenNode = currentEvenNode.next;
  }

  currentOddNode.next = evenListFirstNode;

  return initialListHead;
};
