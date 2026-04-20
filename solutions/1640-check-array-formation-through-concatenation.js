/**
 * Check Array Formation Through Concatenation
 * Time Complexity: O(N + P)
 * Space Complexity: O(P)
 */
var canFormArray = function (arr, pieces) {
  const pieceFirstElementMap = new Map();
  let pieceIteratorIndex = 0;
  for (
    pieceIteratorIndex = 0;
    pieceIteratorIndex < pieces.length;
    pieceIteratorIndex++
  ) {
    const currentPieceFragment = pieces[pieceIteratorIndex];
    pieceFirstElementMap.set(currentPieceFragment[0], currentPieceFragment);
  }

  let arrayScanIndex = 0;
  while (arrayScanIndex < arr.length) {
    const currentArraySegmentStart = arr[arrayScanIndex];
    if (!pieceFirstElementMap.has(currentArraySegmentStart)) {
      return false;
    }

    const foundPieceFragment = pieceFirstElementMap.get(
      currentArraySegmentStart,
    );
    let fragmentElementIndex = 0;
    for (
      fragmentElementIndex = 0;
      fragmentElementIndex < foundPieceFragment.length;
      fragmentElementIndex++
    ) {
      const fragmentValue = foundPieceFragment[fragmentElementIndex];
      if (arr[arrayScanIndex] !== fragmentValue) {
        return false;
      }
      arrayScanIndex++;
    }
  }

  return true;
};
