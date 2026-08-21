/**
 * Copy List With Random Pointer
 * Intuition: Weave each copy immediately after its original so random links can be copied with original.random.next, then unweave the two lists without an extra map.
 * Approach: 1. Null → null. 2. Walk originals: insert a new node with the same val after each. 3. Second walk: copy.random = original.random.next (or null). 4. Third walk: restore original.next and copy.next to separate the lists. Return the copy head.
 * Dry Run: A(1)→B(2), A.random=B, B.random=A. After weave A-A'-B-B'. A'.random=B', B'.random=A'. Unweave yields A→B and A'→B' with matching randoms.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var copyRandomList = function (head) {
  if (head === null) {
    return null;
  }

  let currentOriginalNode = head;
  while (currentOriginalNode !== null) {
    let createdCopyNode = new Node(currentOriginalNode.val);
    createdCopyNode.next = currentOriginalNode.next;
    currentOriginalNode.next = createdCopyNode;
    currentOriginalNode = createdCopyNode.next;
  }

  let pointerToInterleavedList = head;
  while (pointerToInterleavedList !== null) {
    let correspondingCopiedNode = pointerToInterleavedList.next;
    if (pointerToInterleavedList.random !== null) {
      correspondingCopiedNode.random = pointerToInterleavedList.random.next;
    } else {
      correspondingCopiedNode.random = null;
    }
    pointerToInterleavedList = correspondingCopiedNode.next;
  }

  let originalListHead = head;
  let deepCopyHead = head.next;
  let deepCopyCurrent = deepCopyHead;

  while (originalListHead !== null) {
    originalListHead.next = deepCopyCurrent.next;

    if (originalListHead.next !== null) {
      deepCopyCurrent.next = originalListHead.next.next;
    } else {
      deepCopyCurrent.next = null;
    }

    originalListHead = originalListHead.next;
    deepCopyCurrent = deepCopyCurrent.next;
  }

  return deepCopyHead;
};
