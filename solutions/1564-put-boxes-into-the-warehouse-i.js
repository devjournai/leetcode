/**
 * Put Boxes Into The Warehouse I
 * Intuition: Entry is from the left, so room i can only hold min(warehouse[0..i]). Greedily put the smallest remaining box into the rightmost feasible room.
 * Approach: 1. Prefix min heights. 2. Sort boxes ascending. 3. Walk rooms right-to-left, place the next box if it fits.
 * Dry Run: boxes = [4,3,4,1], warehouse = [5,3,3,4,1].
 *   - Prefix mins 5,3,3,3,1; place 1 then two 3s → 3 boxes.
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
      warehouse[roomIterator]
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
