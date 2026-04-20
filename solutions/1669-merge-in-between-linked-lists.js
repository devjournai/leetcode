/**
 * Merge In Between Linked Lists
 * Time Complexity: O(n + m)
 * Space Complexity: O(1)
 */
var mergeInBetween = function (list1, a, b, list2) {
  const dummyHead = new ListNode(0, list1);

  let firstTraveler = dummyHead;
  for (let currentIteration = 0; currentIteration < a; currentIteration++) {
    firstTraveler = firstTraveler.next;
  }

  let secondTraveler = dummyHead;
  let counterValue = 0;
  while (counterValue <= b) {
    secondTraveler = secondTraveler.next;
    counterValue++;
  }

  let list2LastNode = list2;
  while (list2LastNode && list2LastNode.next) {
    list2LastNode = list2LastNode.next;
  }

  firstTraveler.next = list2;
  list2LastNode.next = secondTraveler;

  return dummyHead.next;
};
