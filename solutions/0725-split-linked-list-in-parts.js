/**
 * Split Linked List In Parts
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var splitListToParts = function (head, k) {
  let totalLength = 0;
  let listIterator = head;

  while (listIterator) {
    totalLength++;
    listIterator = listIterator.next;
  }

  const minimalLength = Math.floor(totalLength / k);
  const remainderNodes = totalLength % k;
  const outputSegments = new Array(k).fill(null);

  let listTraverser = head;
  for (let segmentNumber = 0; segmentNumber < k; segmentNumber++) {
    if (!listTraverser) {
      break;
    }

    const currentSegmentDesiredLength =
      minimalLength + (segmentNumber < remainderNodes ? 1 : 0);
    outputSegments[segmentNumber] = listTraverser;

    let previousNodeInSegment = listTraverser;
    for (
      let advanceSteps = 1;
      advanceSteps < currentSegmentDesiredLength;
      advanceSteps++
    ) {
      previousNodeInSegment = previousNodeInSegment.next;
    }

    let nextSegmentStart = previousNodeInSegment.next;
    previousNodeInSegment.next = null;
    listTraverser = nextSegmentStart;
  }

  return outputSegments;
};
