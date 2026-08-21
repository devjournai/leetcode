/**
 * Exam Room
 * Intuition: Keep occupied seats sorted. Seat 0 if empty. Else maximize min-distance: gap to first seat, midpoints of consecutive occupied pairs, and last seat n-1. Binary-insert the chosen index.
 * Approach: 1. Constructor: `roomSize`, empty `seatOccupancy`. 2. `seat`: empty → 0. Else compare dist of 0, each floor(gap/2), and n-1-last; splice at `findPositionForInsertion`. 3. `leave`: splice `indexOf(p)`.
 * Dry Run: ExamRoom(10). seat→0. seat→9 (dist 9). seat→4. leave(4). seat→4 again.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var ExamRoom = function (n) {
  this.roomSize = n;
  this.seatOccupancy = [];
};

ExamRoom.prototype.seat = function () {
  if (this.seatOccupancy.length === 0) {
    this.seatOccupancy.push(0);
    return 0;
  }

  let currentMaximumDistance = this.seatOccupancy[0];
  let candidateSeatIdentifier = 0;

  for (
    let iteratorIndex = 1;
    iteratorIndex < this.seatOccupancy.length;
    iteratorIndex++
  ) {
    const previousOccupiedPosition = this.seatOccupancy[iteratorIndex - 1];
    const currentOccupiedPosition = this.seatOccupancy[iteratorIndex];
    const distanceBetweenSeats = Math.floor(
      (currentOccupiedPosition - previousOccupiedPosition) / 2
    );

    if (distanceBetweenSeats > currentMaximumDistance) {
      currentMaximumDistance = distanceBetweenSeats;
      candidateSeatIdentifier = Math.floor(
        (currentOccupiedPosition + previousOccupiedPosition) / 2
      );
    }
  }

  const lastOccupiedPosition =
    this.seatOccupancy[this.seatOccupancy.length - 1];
  const finalSeatDistance = this.roomSize - 1 - lastOccupiedPosition;
  if (finalSeatDistance > currentMaximumDistance) {
    candidateSeatIdentifier = this.roomSize - 1;
  }

  const insertionIndexValue = this.findPositionForInsertion(
    candidateSeatIdentifier
  );
  this.seatOccupancy.splice(insertionIndexValue, 0, candidateSeatIdentifier);

  return candidateSeatIdentifier;
};

ExamRoom.prototype.leave = function (p) {
  const removalIndex = this.seatOccupancy.indexOf(p);
  this.seatOccupancy.splice(removalIndex, 1);
};

ExamRoom.prototype.findPositionForInsertion = function (valueToInsert) {
  let lowPointer = 0;
  let highPointer = this.seatOccupancy.length - 1;

  while (lowPointer <= highPointer) {
    const middlePointer = Math.floor((lowPointer + highPointer) / 2);
    if (this.seatOccupancy[middlePointer] < valueToInsert) {
      lowPointer = middlePointer + 1;
    } else {
      highPointer = middlePointer - 1;
    }
  }

  return lowPointer;
};
