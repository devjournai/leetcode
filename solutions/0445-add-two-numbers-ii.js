/**
 * Add Two Numbers II
 * Intuition: Lists are MSD-first, so push digits onto stacks and add LSD-first with carry, prepending each new digit onto the result.
 * Approach: 1. Walk `l1`/`l2` into `stackOne`/`stackTwo`. 2. While a stack or carry remains, pop digits (0 if empty), sum with carry. 3. Create a `ListNode` for `sum%10` and set `next` to the previous head. 4. Return `resultingHead`.
 * Dry Run: 7→2→4→3 plus 5→6→4. Stacks add 3+4, 4+6, 2+5, 7 → 7→8→0→7.
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var addTwoNumbers = function (l1, l2) {
  const stackOne = [];
  const stackTwo = [];
  let currentPointerOne = l1;

  while (currentPointerOne) {
    stackOne.push(currentPointerOne.val);
    currentPointerOne = currentPointerOne.next;
  }

  let currentPointerTwo = l2;
  while (currentPointerTwo) {
    stackTwo.push(currentPointerTwo.val);
    currentPointerTwo = currentPointerTwo.next;
  }

  let currentCarry = 0;
  let resultingHead = null;

  while (stackOne.length > 0 || stackTwo.length > 0 || currentCarry > 0) {
    let digitValueOne = 0;
    if (stackOne.length > 0) {
      digitValueOne = stackOne.pop();
    }

    let digitValueTwo = 0;
    if (stackTwo.length > 0) {
      digitValueTwo = stackTwo.pop();
    }

    let combinedSum = digitValueOne + digitValueTwo + currentCarry;
    currentCarry = Math.floor(combinedSum / 10);
    let currentDigit = combinedSum % 10;

    let newResultNode = new ListNode(currentDigit);
    newResultNode.next = resultingHead;
    resultingHead = newResultNode;
  }

  return resultingHead;
};
