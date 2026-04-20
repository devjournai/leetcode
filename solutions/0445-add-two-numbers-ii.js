/**
 * Add Two Numbers II
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
