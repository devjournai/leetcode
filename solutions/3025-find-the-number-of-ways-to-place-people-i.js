/**
 * Find The Number Of Ways To Place People I
 * Intuition: The problem asks for pairs of points (A, B) where A is upper-left of B, and no other point lies within their bounding rectangle. This suggests iterating through all possible pairs (A, B) and for each pair, iterating through all other points to check the 'no other points' condition.
 * Approach: 1. Sort the input points. A primary sort by x-coordinate (ascending) ensures that `A.x <= B.x` is naturally handled when picking B after A. A secondary sort by y-coordinate (descending) for equal x-coordinates simplifies checks. 2. Iterate through all possible points as A using an outer loop (`firstPointIndex`). 3. For each A, iterate through subsequent points as B using an inner loop (`secondPointIndex`). 4. Check if A is truly upper-left of B (A.y >= B.y). Since `A.x <= B.x` is guaranteed by sorting and `secondPointIndex > firstPointIndex`. 5. If it is, iterate through all remaining points using a third loop (`intermediatePointIndex`) to see if any point falls within the rectangle formed by A and B (inclusive of borders). 6. If no such intermediate point is found after checking all other points, increment the count of valid pairs.
 * Dry Run:
 * Input: [[1,1],[2,2],[3,3]]
 * 1. Sort: `pointsArray` remains `[[1,1],[2,2],[3,3]]` (already sorted by x, then y desc).
 * 2. Initialize `validPairCount` = 0.
 * 3. `firstPointIndex` = 0, `pointOne` = `[1,1]`
 *    `secondPointIndex` = 1, `pointTwo` = `[2,2]`
 *    Check `pointOne[1]` (`1`) >= `pointTwo[1]` (`2`): false. Skip.
 *
 *    `secondPointIndex` = 2, `pointTwo` = `[3,3]`
 *    Check `pointOne[1]` (`1`) >= `pointTwo[1]` (`3`): false. Skip.
 *
 * 4. `firstPointIndex` = 1, `pointOne` = `[2,2]`
 *    `secondPointIndex` = 2, `pointTwo` = `[3,3]`
 *    Check `pointOne[1]` (`2`) >= `pointTwo[1]` (`3`): false. Skip.
 *
 * 5. All loops complete. Return `validPairCount` = 0.
 *
 * Input: [[6,2],[4,4],[2,6]]
 * 1. Sort: `pointsArray` becomes `[[2,6],[4,4],[6,2]]` (sorted by x ascending, then y descending).
 * 2. Initialize `validPairCount` = 0.
 * 3. `firstPointIndex` = 0, `pointOne` = `[2,6]`
 *    `secondPointIndex` = 1, `pointTwo` = `[4,4]`
 *    Check `pointOne[1]` (`6`) >= `pointTwo[1]` (`4`): true.
 *    `currentPairIsValid` = true.
 *    `intermediatePointIndex` = 0 (skip, `intermediatePointIndex` == `firstPointIndex`)
 *    `intermediatePointIndex` = 1 (skip, `intermediatePointIndex` == `secondPointIndex`)
 *    `intermediatePointIndex` = 2, `checkPoint` = `[6,2]`
 *    Check if `[6,2]` is in rectangle of `[[2,6],[4,4]]`:
 *      `checkPoint[0]` (`6`) >= `pointOne[0]` (`2`) -> true
 *      `checkPoint[0]` (`6`) <= `pointTwo[0]` (`4`) -> false. Condition fails. Loop continues.
 *    Inner loop for `intermediatePointIndex` ends. `currentPairIsValid` is true.
 *    Increment `validPairCount` to 1.
 *
 *    `secondPointIndex` = 2, `pointTwo` = `[6,2]`
 *    Check `pointOne[1]` (`6`) >= `pointTwo[1]` (`2`): true.
 *    `currentPairIsValid` = true.
 *    `intermediatePointIndex` = 0 (skip)
 *    `intermediatePointIndex` = 1, `checkPoint` = `[4,4]`
 *    Check if `[4,4]` is in rectangle of `[[2,6],[6,2]]`:
 *      `checkPoint[0]` (`4`) >= `pointOne[0]` (`2`) -> true
 *      `checkPoint[0]` (`4`) <= `pointTwo[0]` (`6`) -> true
 *      `checkPoint[1]` (`4`) <= `pointOne[1]` (`6`) -> true
 *      `checkPoint[1]` (`4`) >= `pointTwo[1]` (`2`) -> true
 *    All conditions are true. `[4,4]` is inside. Set `currentPairIsValid` = false. Break from inner loop.
 *    Inner loop for `intermediatePointIndex` ends. `currentPairIsValid` is false.
 *
 * 4. `firstPointIndex` = 1, `pointOne` = `[4,4]`
 *    `secondPointIndex` = 2, `pointTwo` = `[6,2]`
 *    Check `pointOne[1]` (`4`) >= `pointTwo[1]` (`2`): true.
 *    `currentPairIsValid` = true.
 *    `intermediatePointIndex` = 0, `checkPoint` = `[2,6]`
 *    Check if `[2,6]` is in rectangle of `[[4,4],[6,2]]`:
 *      `checkPoint[0]` (`2`) >= `pointOne[0]` (`4`) -> false. Condition fails. Loop continues.
 *    `intermediatePointIndex` = 1 (skip)
 *    `intermediatePointIndex` = 2 (skip)
 *    Inner loop for `intermediatePointIndex` ends. `currentPairIsValid` is true.
 *    Increment `validPairCount` to 2.
 *
 * 5. All loops complete. Return `validPairCount` = 2.
 * Time Complexity: O(N^3)
 * Space Complexity: O(log N)
 */
var numberOfPairs = function (points) {
  const pointsArray = points;

  pointsArray.sort((firstElement, secondElement) => {
    if (firstElement[0] === secondElement[0]) {
      return secondElement[1] - firstElement[1];
    }
    return firstElement[0] - secondElement[0];
  });

  let validPairCount = 0;
  const arrayLength = pointsArray.length;

  for (
    let firstPointIndex = 0;
    firstPointIndex < arrayLength;
    firstPointIndex++
  ) {
    for (
      let secondPointIndex = firstPointIndex + 1;
      secondPointIndex < arrayLength;
      secondPointIndex++
    ) {
      const pointOne = pointsArray[firstPointIndex];
      const pointTwo = pointsArray[secondPointIndex];

      if (pointOne[1] >= pointTwo[1]) {
        let currentPairIsValid = true;
        for (
          let intermediatePointIndex = 0;
          intermediatePointIndex < arrayLength;
          intermediatePointIndex++
        ) {
          if (
            intermediatePointIndex !== firstPointIndex &&
            intermediatePointIndex !== secondPointIndex
          ) {
            const checkPoint = pointsArray[intermediatePointIndex];

            if (
              checkPoint[0] >= pointOne[0] &&
              checkPoint[0] <= pointTwo[0] &&
              checkPoint[1] <= pointOne[1] &&
              checkPoint[1] >= pointTwo[1]
            ) {
              currentPairIsValid = false;
              break;
            }
          }
        }
        if (currentPairIsValid) {
          validPairCount++;
        }
      }
    }
  }

  return validPairCount;
};
