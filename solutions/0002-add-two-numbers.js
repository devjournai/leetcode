/**
 * Add Two Numbers
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
