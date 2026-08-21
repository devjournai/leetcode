/**
 * Swapping Nodes In A Linked List
 * Intuition: The k-th node from the start and from the end swap values. Walk k steps to the front node; a second pointer k ahead then moves to the tail so the lagging pointer is the k-th from the end.
 * Approach: 1. Advance `frontNode` k−1 times. 2. Advance `fastIterator` k steps, then move `fastIterator` and `rearNode` together until fast is null. 3. Swap `frontNode.val` and `rearNode.val`. 4. Return `head`.
 * Dry Run: list 1→2→3→4→5, k = 2
 * front=2; rear becomes 4; swap → 1→4→3→2→5.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var swapNodes = function (head, k) {
  let frontNode = head;
  let currentPosition = 1;

  while (currentPosition < k) {
    frontNode = frontNode.next;
    currentPosition++;
  }

  let fastIterator = head;
  let rearNode = head;
  let iterationCount = 0;

  while (iterationCount < k) {
    fastIterator = fastIterator.next;
    iterationCount++;
  }

  while (fastIterator !== null) {
    fastIterator = fastIterator.next;
    rearNode = rearNode.next;
  }

  let tempValueStorage = frontNode.val;
  frontNode.val = rearNode.val;
  rearNode.val = tempValueStorage;

  return head;
};
