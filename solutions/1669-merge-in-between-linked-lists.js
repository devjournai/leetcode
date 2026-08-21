/**
 * Merge In Between Linked Lists
 * Intuition: Splice list2 into list1 by pointing the node before index a at list2's head and list2's tail at the node that was at index b (its successor).
 * Approach: 1. Dummy before list1. 2. Walk a steps from dummy to the node before a. 3. Walk b+1 steps from dummy to node b (then its next is the join-back). 4. Find list2's last node. 5. Rewire firstTraveler.next = list2 and list2Tail.next = secondTraveler (node after b). 6. Return dummy.next.
 * Dry Run: list1=0→1→2→3→4, a=2,b=3, list2=100→101.
 *   - 1.next=100, 101.next=4 → 0→1→100→101→4.
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
