/**
 * Add Two Numbers
 * Intuition: Digits are stored least-significant first, so we walk both lists in lockstep, adding matching digits plus any carry (`overflow`) and emitting a new node for each ones digit.
 * Approach: 1. Create a dummy `head` and a `currentNode` pointer. 2. While either list still has a node or `overflow` is nonzero, take `firstDigit`/`secondDigit` (0 if a list is exhausted). 3. Compute `sum`, write `digit = sum % 10`, and set `overflow = floor(sum / 10)`. 4. Append a new ListNode and advance each input list when present. 5. Return `head.next`.
 * Dry Run: firstList = 2→4→3, secondList = 5→6→4.
 *   - 2+5+0=7, overflow=0 → 7
 *   - 4+6+0=10, digit=0, overflow=1 → 7→0
 *   - 3+4+1=8, overflow=0 → 7→0→8. Return that list (807).
 * Time Complexity: O(max(M, N))
 * Space Complexity: O(max(M, N))
 */

var addTwoNumbers = function (firstList, secondList) {
  let head = new ListNode(0);
  let currentNode = head;
  let overflow = 0;

  while (firstList !== null || secondList !== null || overflow !== 0) {
    const firstDigit = firstList ? firstList.val : 0;
    const secondDigit = secondList ? secondList.val : 0;

    const sum = firstDigit + secondDigit + overflow;
    const digit = sum % 10;
    overflow = Math.floor(sum / 10);

    currentNode.next = new ListNode(digit);
    currentNode = currentNode.next;

    if (firstList) {
      firstList = firstList.next;
    }
    if (secondList) {
      secondList = secondList.next;
    }
  }

  return head.next;
};
