/**
 * Amount Of New Area Painted Each Day
 * Intuition: To find the new area painted on a given day, we must subtract any portions of the current day's painting interval that have already been covered by previous paintings. After calculating the new area, we update our record of painted areas by merging the current day's interval with any overlapping existing painted intervals to maintain a collection of disjoint, non-overlapping painted segments.
 * Approach: 1. Initialize an empty Map `paintedSegments` to store existing painted intervals (key: start point, value: end point) and an empty array `paintLog` for results. 2. For each new painting request `[currentSegmentStart, currentSegmentEnd]`: a. Initialize `newlyPaintedLength` to the full length of `[currentSegmentStart, currentSegmentEnd]`. b. Initialize `activeSegmentLeft` and `activeSegmentRight` to `currentSegmentStart` and `currentSegmentEnd` to track the boundaries of the merged interval for the current day. c. Initialize an empty array `segmentsForRemoval` to store keys of existing intervals that will be merged and removed. d. Initialize `initialOverlapHandled` flag to `false`. e. Get all keys from `paintedSegments`, convert to an array, and sort them numerically to process existing intervals in order. f. Iterate through the sorted keys: i. For each existing interval `[existingSegmentStart, existingSegmentEnd]`, check for overlap with the current `[activeSegmentLeft, activeSegmentRight]`. ii. If there's an overlap, apply the reference solution's specific logic to update `newlyPaintedLength` (subtracting the newly covered portion) and expand `activeSegmentLeft`, `activeSegmentRight` to encompass the merged range. iii. Add `existingSegmentStart` to `segmentsForRemoval`. iv. Set `initialOverlapHandled` to `true` after the first relevant overlap. g. After iterating, remove all intervals whose keys are in `segmentsForRemoval` from `paintedSegments`. h. Add the newly merged interval `[activeSegmentLeft, activeSegmentRight]` to `paintedSegments`. i. Add `newlyPaintedLength` to `paintLog`. 3. Return `paintLog`.
 * Dry Run: Input: `paint = [[1, 4], [2, 5]]`
 * - Initialize `paintedSegments = {}`, `paintLog = []`.
 * - **Day 0: `[1, 4]`**
 *   - `currentSegmentStart = 1`, `currentSegmentEnd = 4`.
 *   - `activeSegmentLeft = 1`, `activeSegmentRight = 4`.
 *   - `newlyPaintedLength = 4 - 1 = 3`.
 *   - `sortedSegmentStarts = []` (empty). Loop does not run.
 *   - `paintedSegments.set(1, 4)`.
 *   - `paintLog.push(3)`. `paintLog = [3]`.
 * - **Day 1: `[2, 5]`**
 *   - `currentSegmentStart = 2`, `currentSegmentEnd = 5`.
 *   - `activeSegmentLeft = 2`, `activeSegmentRight = 5`.
 *   - `newlyPaintedLength = 5 - 2 = 3`.
 *   - `sortedSegmentStarts = [1]`. `segmentsForRemoval = []`. `initialOverlapHandled = false`.
 *   - Iterate `existingSegmentStart = 1`, `existingSegmentEnd = 4` (from `paintedSegments.get(1)`).
 *     - Overlap check: `(1 >= 5 || 4 <= 2)` is `false`. There's an overlap.
 *     - First `if` condition: `!initialOverlapHandled && 1 <= 2 && 4 >= 2` is `true`.
 *       - `newlyPaintedLength = Math.max(0, 5 - Math.max(2, 4))` => `Math.max(0, 5 - 4) = 1`.
 *       - `activeSegmentLeft = Math.min(2, 1) = 1`.
 *       - `activeSegmentRight = Math.max(5, 4) = 5`.
 *       - `segmentsForRemoval.push(1)`.
 *       - `initialOverlapHandled = true`.
 *   - Loop ends.
 *   - Remove `1` from `paintedSegments`. `paintedSegments = {}`.
 *   - `paintedSegments.set(1, 5)`.
 *   - `paintLog.push(1)`. `paintLog = [3, 1]`.
 * - Return `[3, 1]`.
 * Time Complexity: O(N^2 log N)
 * Space Complexity: O(N)
 */
var amountPainted = function (paintOperations) {
  const paintedSegments = new Map();
  const paintLog = [];

  for (const currentPaintOperation of paintOperations) {
    const currentSegmentStart = currentPaintOperation[0];
    const currentSegmentEnd = currentPaintOperation[1];

    let activeSegmentLeft = currentSegmentStart;
    let activeSegmentRight = currentSegmentEnd;
    let newlyPaintedLength = activeSegmentRight - activeSegmentLeft;

    const sortedSegmentStarts = Array.from(paintedSegments.keys()).sort(
      (firstKey, secondKey) => firstKey - secondKey,
    );
    const segmentsForRemoval = [];
    let initialOverlapHandled = false;

    for (const existingSegmentStart of sortedSegmentStarts) {
      const existingSegmentEnd = paintedSegments.get(existingSegmentStart);

      if (
        existingSegmentStart >= activeSegmentRight ||
        existingSegmentEnd <= activeSegmentLeft
      ) {
        continue;
      }

      if (
        !initialOverlapHandled &&
        existingSegmentStart <= activeSegmentLeft &&
        existingSegmentEnd >= activeSegmentLeft
      ) {
        newlyPaintedLength = Math.max(
          0,
          currentSegmentEnd - Math.max(currentSegmentStart, existingSegmentEnd),
        );
        activeSegmentLeft = Math.min(activeSegmentLeft, existingSegmentStart);
        activeSegmentRight = Math.max(activeSegmentRight, existingSegmentEnd);
        segmentsForRemoval.push(existingSegmentStart);
        initialOverlapHandled = true;
      } else if (
        existingSegmentStart >= activeSegmentLeft &&
        existingSegmentStart < activeSegmentRight
      ) {
        newlyPaintedLength -=
          Math.min(activeSegmentRight, existingSegmentEnd) -
          existingSegmentStart;
        activeSegmentRight = Math.max(activeSegmentRight, existingSegmentEnd);
        segmentsForRemoval.push(existingSegmentStart);
      } else if (
        existingSegmentEnd > activeSegmentLeft &&
        existingSegmentEnd <= activeSegmentRight
      ) {
        newlyPaintedLength -=
          existingSegmentEnd -
          Math.max(activeSegmentLeft, existingSegmentStart);
        activeSegmentLeft = Math.min(activeSegmentLeft, existingSegmentStart);
        segmentsForRemoval.push(existingSegmentStart);
      }
    }

    for (const keyToDelete of segmentsForRemoval) {
      paintedSegments.delete(keyToDelete);
    }

    paintedSegments.set(activeSegmentLeft, activeSegmentRight);
    paintLog.push(Math.max(0, newlyPaintedLength));
  }

  return paintLog;
};
