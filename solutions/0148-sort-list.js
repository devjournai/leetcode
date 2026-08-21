/**
 * Sort List
 * Intuition: Merge sort on a linked list splits at the middle with tortoise/hare, sorts each half recursively, then merges two sorted lists in linear time without extra node allocation beyond recursion.
 * Approach: 1. `mergeSortedSublists` walks both lists, always attaching the smaller head to a dummy `resultHead`. 2. `sortList`: if 0 or 1 node, return `head`. 3. Advance `hare` by two and `tortoise` by one, tracking `priorNodeToMid`; cut with `priorNodeToMid.next = null`. 4. Recurse on `firstPart` (original head) and `secondPart` (`tortoise`). 5. Return the merge of the two sorted halves.
 * Dry Run: 4 → 2 → 1 → 3
 * Split: 4 → 2 and 1 → 3
 * Sort halves: 2 → 4 and 1 → 3
 * Merge: 1 → 2 → 3 → 4
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
