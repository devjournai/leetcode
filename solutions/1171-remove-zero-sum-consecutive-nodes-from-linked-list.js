/**
 * Remove Zero Sum Consecutive Nodes From Linked List
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var removeZeroSumSublists = function (head) {
  const dummyHead = new ListNode(0, head);
  const prefixSumStore = new Map();
  let currentSum = 0;

  let traverseNode = dummyHead;
  while (traverseNode !== null) {
    currentSum += traverseNode.val;
    prefixSumStore.set(currentSum, traverseNode);
    traverseNode = traverseNode.next;
  }

  let processingSum = 0;
  let adjustmentNode = dummyHead;
  for (; adjustmentNode !== null; adjustmentNode = adjustmentNode.next) {
    processingSum += adjustmentNode.val;
    if (prefixSumStore.has(processingSum)) {
      adjustmentNode.next = prefixSumStore.get(processingSum).next;
    }
  }

  return dummyHead.next;
};
