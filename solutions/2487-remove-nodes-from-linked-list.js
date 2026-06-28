/**
 * Remove Nodes From Linked List
 * Intuition: We need to find nodes that have a greater value to their right. This suggests a right-to-left scan or processing elements in reverse order. A stack is suitable for maintaining elements in a specific order and easily retrieving them in reverse. If we build a stack while traversing the list from left to right, we can ensure that the stack only contains nodes that are candidates for the final list by popping smaller nodes when a larger one is encountered.
 * Approach: 1. Initialize an empty stack. Iterate through the input linked list using a pointer. For each node, compare its value with the top node of the stack. While the stack is not empty and the top node's value is less than the current node's value, pop nodes from the stack. This ensures that only nodes with no greater value to their immediate right (among those processed so far) remain on the stack. After popping, push the current node onto the stack. 2. Once the first pass is complete, the stack contains the nodes that should be in the final list, ordered from left to right. Pop nodes from the stack one by one. Reconstruct the linked list by setting the 'next' pointer of each popped node to the previously constructed part of the list, effectively building the list in reverse (from right to left). The last node popped will be the head of the new list.
 * Dry Run: Input: head = [5,2,13,3,8]
 * 1. Initialize nodeStorage = [], headPointer = 5 -> 2 -> 13 -> 3 -> 8.
 * 2. First pass (build stack):
 *    - headPointer (5): nodeStorage is empty. Push 5. nodeStorage = [5]. headPointer = 2.
 *    - headPointer (2): 5 is not < 2. Push 2. nodeStorage = [5, 2]. headPointer = 13.
 *    - headPointer (13):
 *      - 2 < 13. Pop 2. nodeStorage = [5].
 *      - 5 < 13. Pop 5. nodeStorage = [].
 *    - Push 13. nodeStorage = [13]. headPointer = 3.
 *    - headPointer (3): 13 is not < 3. Push 3. nodeStorage = [13, 3]. headPointer = 8.
 *    - headPointer (8):
 *      - 3 < 8. Pop 3. nodeStorage = [13].
 *      - 13 is not < 8.
 *    - Push 8. nodeStorage = [13, 8]. headPointer = null.
 * 3. End of first pass. nodeStorage = [13, 8]. finalHead = null, previousReconstructedNode = null.
 * 4. Second pass (reconstruct list):
 *    - nodeStorage.length > 0:
 *      - processedNode = nodeStorage.pop() (8). nodeStorage = [13].
 *      - 8.next = previousReconstructedNode (null).
 *      - previousReconstructedNode = 8.
 *      - finalHead = 8.
 *    - nodeStorage.length > 0:
 *      - processedNode = nodeStorage.pop() (13). nodeStorage = [].
 *      - 13.next = previousReconstructedNode (8).
 *      - previousReconstructedNode = 13.
 *      - finalHead = 13.
 * 5. End of second pass.
 * 6. Return finalHead, which is 13 -> 8.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var removeNodes = function (head) {
  const nodeStorage = [];
  let headPointer = head;

  while (headPointer) {
    while (
      nodeStorage.length > 0 &&
      nodeStorage[nodeStorage.length - 1].val < headPointer.val
    ) {
      nodeStorage.pop();
    }
    nodeStorage.push(headPointer);
    headPointer = headPointer.next;
  }

  let finalHead = null;
  let previousReconstructedNode = null;

  while (nodeStorage.length > 0) {
    let processedNode = nodeStorage.pop();
    processedNode.next = previousReconstructedNode;
    previousReconstructedNode = processedNode;
    finalHead = processedNode;
  }

  return finalHead;
};
