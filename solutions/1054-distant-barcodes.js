/**
 * Distant Barcodes
 * Intuition: Place the most frequent barcodes first into even indices, then wrap to odd indices, so identical values are never adjacent.
 * Approach: 1. Count frequencies. 2. Sort (barcode, count) by count descending. 3. Fill output at cursor 0,2,4,... and when past the end, restart at 1. 4. Return the filled array.
 * Dry Run: barcodes = [1,1,1,2,2,2].
 *   - Place 1s at 0,2,4 then 2s at 1,3,5 -> [1,2,1,2,1,2].
 * Time Complexity: O(N log K)
 * Space Complexity: O(K + N)
 */
var rearrangeBarcodes = function (barcodes) {
  const barcodeCountsMap = new Map();
  for (const inputBarcode of barcodes) {
    barcodeCountsMap.set(
      inputBarcode,
      (barcodeCountsMap.get(inputBarcode) || 0) + 1
    );
  }

  const barcodeFrequencyEntries = [...barcodeCountsMap.entries()];
  barcodeFrequencyEntries.sort(
    (firstEntry, secondEntry) => secondEntry[1] - firstEntry[1]
  );

  const outputArray = new Array(barcodes.length);
  let placementCursor = 0;

  for (const pairEntry of barcodeFrequencyEntries) {
    const barcodeElement = pairEntry[0];
    const elementFrequency = pairEntry[1];

    for (let fillCounter = 0; fillCounter < elementFrequency; fillCounter++) {
      if (placementCursor >= barcodes.length) {
        placementCursor = 1;
      }
      outputArray[placementCursor] = barcodeElement;
      placementCursor += 2;
    }
  }

  return outputArray;
};
