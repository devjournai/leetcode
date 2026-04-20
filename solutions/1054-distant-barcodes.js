/**
 * Distant Barcodes
 * Time Complexity: O(N log K)
 * Space Complexity: O(K + N)
 */
var rearrangeBarcodes = function (barcodes) {
  const barcodeCountsMap = new Map();
  for (const inputBarcode of barcodes) {
    barcodeCountsMap.set(
      inputBarcode,
      (barcodeCountsMap.get(inputBarcode) || 0) + 1,
    );
  }

  const barcodeFrequencyEntries = [...barcodeCountsMap.entries()];
  barcodeFrequencyEntries.sort(
    (firstEntry, secondEntry) => secondEntry[1] - firstEntry[1],
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
