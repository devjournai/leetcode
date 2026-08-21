/**
 * Check Array Formation Through Concatenation
 * Intuition: Pieces cannot be split, so map each piece by its first element and greedily match arr from left to right.
 * Approach: 1. Map piece[0] → the whole piece. 2. Walk arr; if the current value is not a piece start, fail. 3. Compare the entire piece to the next arr cells. 4. Return true if arr is fully consumed.
 * Dry Run: arr=[85,23,45], pieces=[[85],[23,45]] → matches 85 then 23,45 → true.
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
      currentArraySegmentStart
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
