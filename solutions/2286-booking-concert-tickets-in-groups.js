/**
 * Booking Concert Tickets In Groups
 * Intuition: A segment tree can efficiently handle range queries and updates. For 'gather', we need to find the first row within a range (smallest row number) that has `k` consecutive seats. This requires storing the maximum consecutive seats available in any row in a segment tree node. For 'scatter', we need to check and allocate `k` total seats within a range, prioritizing smaller row and seat numbers. This requires storing the total available seats in a segment tree node and updating them greedily.
 * Approach: 1. Initialize a segment tree where each leaf node represents a row. Each segment tree node stores `[maxConsecutiveSeatsInBlock, totalSeatsInBlock]`.
 * 2. `buildSegmentTree`: Recursively populate the tree. Leaf nodes (individual rows) start with `[m, m]`. Internal nodes store the maximum `maxConsecutiveSeatsInBlock` from its children and the sum of `totalSeatsInBlock` from its children.
 * 3. `gather`: Implement `findAvailableGroup` to query the segment tree. This function searches for the first row (smallest index) within `0` to `maxRow` where `k` consecutive seats are available. It recursively checks the left child first. If a suitable row is found, it calls `allocateGroupSeats` to mark `k` seats as taken in that specific row and update the tree.
 * 4. `scatter`: Implement `retrieveTotalAvailable` to query the segment tree for the total available seats in rows `0` to `maxRow`. If `totalAvailable >= k`, it calls `distributeSeats` to allocate `k` seats. `distributeSeats` greedily allocates seats from the lowest-indexed rows first, updating both `maxConsecutiveSeatsInBlock` and `totalSeatsInBlock` in the affected nodes.
 * 5. Update functions (`allocateGroupSeats`, `distributeSeats`) propagate changes up the tree, maintaining `maxConsecutiveSeatsInBlock` and `totalSeatsInBlock` for parent nodes.
 * Dry Run: BookMyShow(2, 5) -> n=2, m=5. Tree covers rows 0, 1.
 *   - root (0-1): [5, 10]
 *   - L (0-0): [5, 5]
 *   - R (1-1): [5, 5]
 * gather(3, 0):
 *   - call findAvailableGroup(root, 0, 1, 3, 0)
 *   - root.maxConsecutiveSeatsInBlock (5) >= 3.
 *   - recurse left: findAvailableGroup(L, 0, 0, 3, 0)
 *     - L.maxConsecutiveSeatsInBlock (5) >= 3.
 *     - leaf node: return [0, 0] (row 0, seat 5-5 = 0)
 *   - result: [0, 0].
 *   - call allocateGroupSeats(root, 0, 1, 0, 3)
 *     - root total (10) becomes 7.
 *     - recurse left: allocateGroupSeats(L, 0, 0, 0, 3)
 *       - L total (5) becomes 2. L max (5) becomes 2.
 *     - root max becomes max(L.max (2), R.max (5)) = 5.
 *   - Tree state:
 *     - root (0-1): [5, 7]
 *     - L (0-0): [2, 2]
 *     - R (1-1): [5, 5]
 *   - Returns [0, 0].
 * scatter(6, 1):
 *   - call retrieveTotalAvailable(root, 0, 1, 1)
 *     - currentRangeStart (0) <= maxAllowedRow (1).
 *     - midPoint (0).
 *     - leftSumValue = retrieveTotalAvailable(L, 0, 0, 1) -> L.totalSeatsInBlock (2)
 *     - rightSumValue = retrieveTotalAvailable(R, 1, 1, 1) -> R.totalSeatsInBlock (5)
 *     - returns 2 + 5 = 7.
 *   - availableTotal (7) >= seatsCount (6). canAccommodate = true.
 *   - call distributeSeats(root, 0, 1, 6, 1)
 *     - root total (7) becomes 1.
 *     - midPoint (0). leftSegmentSum (L.totalSeatsInBlock = 2).
 *     - leftSegmentSum (2) < seatsToDistribute (6).
 *     - call distributeSeats(L, 0, 0, 2, 1) (left gets all its seats)
 *       - L total (2) becomes 0. L max (2) becomes 0.
 *     - call distributeSeats(R, 1, 1, 6-2=4, 1) (right gets remaining 4 seats)
 *       - R total (5) becomes 1. R max (5) becomes 1.
 *     - root max becomes max(L.max (0), R.max (1)) = 1.
 *   - Tree state:
 *     - root (0-1): [1, 1]
 *     - L (0-0): [0, 0]
 *     - R (1-1): [1, 1]
 *   - Returns true.
 * Time Complexity: O(log N)
 * Space Complexity: O(N)
 */
var BookMyShow = function (n, m) {
  this.rowsCount = n;
  this.seatsPerRow = m;

  let treeCapacity = 1;
  while (treeCapacity < this.rowsCount * 2) {
    treeCapacity <<= 1;
  }
  this.bookingTree = Array.from(
    {
      length: treeCapacity,
    },
    () => [0, 0]
  );

  this.buildSegmentTree(0, 0, this.rowsCount - 1);
};

BookMyShow.prototype.buildSegmentTree = function (
  nodeIdx,
  currentRangeStart,
  currentRangeEnd
) {
  if (currentRangeStart === currentRangeEnd) {
    this.bookingTree[nodeIdx] = [this.seatsPerRow, this.seatsPerRow];
    return;
  }

  const midPoint = Math.floor((currentRangeStart + currentRangeEnd) / 2);
  const leftChildrenIdx = 2 * nodeIdx + 1;
  const rightChildrenIdx = 2 * nodeIdx + 2;

  this.bookingTree[nodeIdx] = [
    this.seatsPerRow,
    (currentRangeEnd - currentRangeStart + 1) * this.seatsPerRow,
  ];
  this.buildSegmentTree(leftChildrenIdx, currentRangeStart, midPoint);
  this.buildSegmentTree(rightChildrenIdx, midPoint + 1, currentRangeEnd);
};

BookMyShow.prototype.gather = function (seatsCount, maximumRow) {
  const bookingResult = this.findAvailableGroup(
    0,
    0,
    this.rowsCount - 1,
    seatsCount,
    maximumRow
  );
  if (bookingResult.length) {
    this.allocateGroupSeats(
      0,
      0,
      this.rowsCount - 1,
      bookingResult[0],
      seatsCount
    );
  }
  return bookingResult;
};

BookMyShow.prototype.findAvailableGroup = function (
  nodeIdx,
  currentRangeStart,
  currentRangeEnd,
  requiredSeats,
  maxAllowedRow
) {
  if (currentRangeStart > maxAllowedRow) return [];
  if (this.bookingTree[nodeIdx][0] < requiredSeats) return [];

  if (currentRangeStart === currentRangeEnd) {
    const allocatedSeatNumber = this.seatsPerRow - this.bookingTree[nodeIdx][0];
    return [currentRangeStart, allocatedSeatNumber];
  }

  const midPoint = Math.floor((currentRangeStart + currentRangeEnd) / 2);
  const leftChildrenIdx = 2 * nodeIdx + 1;
  const rightChildrenIdx = 2 * nodeIdx + 2;

  const leftSubtreeResult = this.findAvailableGroup(
    leftChildrenIdx,
    currentRangeStart,
    midPoint,
    requiredSeats,
    maxAllowedRow
  );
  if (leftSubtreeResult.length) return leftSubtreeResult;
  return this.findAvailableGroup(
    rightChildrenIdx,
    midPoint + 1,
    currentRangeEnd,
    requiredSeats,
    maxAllowedRow
  );
};

BookMyShow.prototype.allocateGroupSeats = function (
  nodeIdx,
  currentRangeStart,
  currentRangeEnd,
  targetRow,
  bookedSeatsCount
) {
  if (currentRangeStart > targetRow || currentRangeEnd < targetRow) return;

  if (currentRangeStart === currentRangeEnd) {
    this.bookingTree[nodeIdx][0] -= bookedSeatsCount;
    this.bookingTree[nodeIdx][1] -= bookedSeatsCount;
    return;
  }

  const midPoint = Math.floor((currentRangeStart + currentRangeEnd) / 2);
  const leftChildrenIdx = 2 * nodeIdx + 1;
  const rightChildrenIdx = 2 * nodeIdx + 2;

  this.bookingTree[nodeIdx][1] -= bookedSeatsCount;
  this.allocateGroupSeats(
    leftChildrenIdx,
    currentRangeStart,
    midPoint,
    targetRow,
    bookedSeatsCount
  );
  this.allocateGroupSeats(
    rightChildrenIdx,
    midPoint + 1,
    currentRangeEnd,
    targetRow,
    bookedSeatsCount
  );

  const leftMaxVal = this.bookingTree[leftChildrenIdx][0];
  const rightMaxVal = this.bookingTree[rightChildrenIdx][0];
  this.bookingTree[nodeIdx][0] = Math.max(leftMaxVal, rightMaxVal);
};

BookMyShow.prototype.scatter = function (seatsCount, maximumRow) {
  const availableTotal = this.retrieveTotalAvailable(
    0,
    0,
    this.rowsCount - 1,
    maximumRow
  );
  const canAccommodate = availableTotal >= seatsCount;
  if (canAccommodate) {
    this.distributeSeats(0, 0, this.rowsCount - 1, seatsCount, maximumRow);
  }
  return canAccommodate;
};

BookMyShow.prototype.retrieveTotalAvailable = function (
  nodeIdx,
  currentRangeStart,
  currentRangeEnd,
  maxAllowedRow
) {
  if (currentRangeStart > maxAllowedRow) return 0;
  if (currentRangeEnd <= maxAllowedRow) return this.bookingTree[nodeIdx][1];

  const midPoint = Math.floor((currentRangeStart + currentRangeEnd) / 2);
  const leftChildrenIdx = 2 * nodeIdx + 1;
  const rightChildrenIdx = 2 * nodeIdx + 2;

  const leftSumValue = this.retrieveTotalAvailable(
    leftChildrenIdx,
    currentRangeStart,
    midPoint,
    maxAllowedRow
  );
  const rightSumValue = this.retrieveTotalAvailable(
    rightChildrenIdx,
    midPoint + 1,
    currentRangeEnd,
    maxAllowedRow
  );
  return leftSumValue + rightSumValue;
};

BookMyShow.prototype.distributeSeats = function (
  nodeIdx,
  currentRangeStart,
  currentRangeEnd,
  seatsToDistribute,
  maxAllowedRow
) {
  if (currentRangeStart > maxAllowedRow || seatsToDistribute <= 0) return;

  if (currentRangeStart === currentRangeEnd) {
    this.bookingTree[nodeIdx][0] -= seatsToDistribute;
    this.bookingTree[nodeIdx][1] -= seatsToDistribute;
    return;
  }

  const midPoint = Math.floor((currentRangeStart + currentRangeEnd) / 2);
  const leftChildrenIdx = 2 * nodeIdx + 1;
  const rightChildrenIdx = 2 * nodeIdx + 2;

  this.bookingTree[nodeIdx][1] -= seatsToDistribute;

  const leftSegmentSum = this.bookingTree[leftChildrenIdx][1];
  if (midPoint + 1 > maxAllowedRow || leftSegmentSum >= seatsToDistribute) {
    this.distributeSeats(
      leftChildrenIdx,
      currentRangeStart,
      midPoint,
      seatsToDistribute,
      maxAllowedRow
    );
  } else {
    this.distributeSeats(
      leftChildrenIdx,
      currentRangeStart,
      midPoint,
      leftSegmentSum,
      maxAllowedRow
    );
    this.distributeSeats(
      rightChildrenIdx,
      midPoint + 1,
      currentRangeEnd,
      seatsToDistribute - leftSegmentSum,
      maxAllowedRow
    );
  }

  const leftMaxSeatsValue = this.bookingTree[leftChildrenIdx][0];
  const rightMaxSeatsValue = this.bookingTree[rightChildrenIdx][0];
  this.bookingTree[nodeIdx][0] = Math.max(
    leftMaxSeatsValue,
    rightMaxSeatsValue
  );
};
