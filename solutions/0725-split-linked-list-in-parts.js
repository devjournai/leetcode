/**
 * Split Linked List In Parts
 * Intuition: Split N nodes into k parts whose sizes differ by at most 1. The first `remainderNodes` parts get one extra node; unused parts stay null.
 * Approach: 1. Count `totalLength`. 2. `minimalLength = floor(N/k)`, `remainderNodes = N % k`. 3. For each of k parts, walk `minimalLength` or +1 nodes, cut `previousNodeInSegment.next`, and store the head in `outputSegments`.
 * Dry Run: 1→2→3→4→5, k=3. Lengths 2,2,1 → [1→2], [3→4], [5].
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
