/**
 * Sort List
 * Time Complexity: O(N log N)
 * Space Complexity: O(log N)
 */

function mergeSortedSublists(listOneParam, listTwoParam) {
  let resultHead = new ListNode(0);
  let currentResult = resultHead;

  while (listOneParam && listTwoParam) {
    if (listOneParam.val <= listTwoParam.val) {
      currentResult.next = listOneParam;
      listOneParam = listOneParam.next;
    } else {
      currentResult.next = listTwoParam;
      listTwoParam = listTwoParam.next;
    }
    currentResult = currentResult.next;
  }

  if (listOneParam) {
    currentResult.next = listOneParam;
  } else if (listTwoParam) {
    currentResult.next = listTwoParam;
  }

  return resultHead.next;
}

var sortList = function (head) {
  if (!head || !head.next) {
    return head;
  }

  let hare = head;
  let tortoise = head;
  let priorNodeToMid = null;

  while (hare && hare.next) {
    priorNodeToMid = tortoise;
    tortoise = tortoise.next;
    hare = hare.next.next;
  }

  priorNodeToMid.next = null;

  let firstPart = head;
  let secondPart = tortoise;

  let sortedFirstPart = sortList(firstPart);
  let sortedSecondPart = sortList(secondPart);

  return mergeSortedSublists(sortedFirstPart, sortedSecondPart);
};
