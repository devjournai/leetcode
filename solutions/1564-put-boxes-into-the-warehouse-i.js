/**
 * Put Boxes Into The Warehouse I
 * Time Complexity: O(M log M + N)
 * Space Complexity: O(N)
 */
var maxBoxesInWarehouse = function (boxes, warehouse) {
  const numberOfRooms = warehouse.length;
  const roomMaximumHeights = new Array(numberOfRooms);

  roomMaximumHeights[0] = warehouse[0];
  for (let roomIterator = 1; roomIterator < numberOfRooms; roomIterator++) {
    roomMaximumHeights[roomIterator] = Math.min(
      roomMaximumHeights[roomIterator - 1],
      warehouse[roomIterator],
    );
  }

  boxes.sort((boxHeightA, boxHeightB) => boxHeightA - boxHeightB);

  let currentBoxIndex = 0;
  let boxesFittedCount = 0;

  for (
    let roomBackwardIterator = numberOfRooms - 1;
    roomBackwardIterator >= 0;
    roomBackwardIterator--
  ) {
    if (
      currentBoxIndex < boxes.length &&
      boxes[currentBoxIndex] <= roomMaximumHeights[roomBackwardIterator]
    ) {
      boxesFittedCount++;
      currentBoxIndex++;
    }
  }

  return boxesFittedCount;
};
