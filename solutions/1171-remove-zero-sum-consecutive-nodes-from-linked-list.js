/**
 * Remove Zero Sum Consecutive Nodes From Linked List
 * Intuition: Equal prefix sums mean the nodes in between sum to 0. Record the last node for each prefix, then relink each prefix to the node after the last occurrence of that sum, deleting the zero-sum span.
 * Approach: 1. Dummy 0 before head. 2. First pass: accumulate prefix and map sum -> latest node. 3. Second pass: at each prefix, set next to map[sum].next. 4. Return dummy.next.
 * Dry Run: 1 -> 2 -> -3 -> 3 -> 1.
 *   - Prefixes: 0,1,3,0,3,4. First 0 at dummy, last 0 at -3, so dummy.next becomes 3. Then prefix 3 maps to the later 3’s next (1).
 *   - Result 3 -> 1.
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
