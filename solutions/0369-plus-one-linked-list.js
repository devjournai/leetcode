/**
 * Plus One Linked List
 * Intuition: Adding one only changes digits after the last non-9: increment that digit and zero every 9 to its right. A dummy 0 head covers an all-9s carry that needs a new leading 1.
 * Approach: 1. Dummy 0 → head. 2. Scan, remembering the last node whose val !== 9. 3. Increment that node. 4. Set every following node to 0. 5. Return dummy.next if dummy stayed 0, else dummy.
 * Dry Run: 1→9→9. lastNonNine is 1; increment to 2; zero the nines → 2→0→0.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var plusOne = function (head) {
  let dummyHeadNode = new ListNode(0);
  dummyHeadNode.next = head;

  let lastNonNine = dummyHeadNode;
  let currentTraversal = head;

  while (currentTraversal) {
    if (currentTraversal.val !== 9) {
      lastNonNine = currentTraversal;
    }
    currentTraversal = currentTraversal.next;
  }

  lastNonNine.val++;

  let zeroSetter = lastNonNine.next;
  while (zeroSetter) {
    zeroSetter.val = 0;
    zeroSetter = zeroSetter.next;
  }

  if (dummyHeadNode.val === 0) {
    return dummyHeadNode.next;
  } else {
    return dummyHeadNode;
  }
};
