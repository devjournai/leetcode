/**
 * Find The Number Of Ways To Place People II
 * Intuition: For each possible Alice point, iterate through all subsequent points as Bob candidates. By sorting points strategically and maintaining a maximum Y-coordinate encountered among intermediate points, we can efficiently determine if a rectangle formed by Alice and Bob is clear of other people.
 * Approach:
 * 1. Sort the input `points`. The primary sort key is `x`-coordinate in ascending order. The secondary sort key is `y`-coordinate in descending order. This ensures that when we iterate through points, `x_Alice <= x_Bob` is naturally handled, and for same `x` values, `y_Alice >= y_Bob` is also handled by their relative order if Alice is encountered before Bob.
 * 2. Initialize `totalValidPairs` to 0.
 * 3. Iterate with `alicePointer` from `0` to `points.length - 1`.
 *    a. Extract `alicePointX` and `alicePointY` from `points[alicePointer]`.
 *    b. Initialize `maxIntermediateYCoordinate` to negative infinity for the current `alicePoint`. This variable will track the maximum `y`-coordinate of any point encountered *between* `alicePoint` and the current `bobPoint` candidate, within the `x`-range defined by `alicePoint` and `bobPoint`.
 * 4. Iterate with `bobPointer` from `alicePointer + 1` to `points.length - 1`.
 *    a. Extract `bobPointX` and `bobPointY` from `points[bobPointer]`.
 *    c. Check if `bobPointY` is greater than `alicePointY`. If it is, this pair is invalid (Bob's Y is above Alice's Y, violating the upper-left/lower-right corner condition), so continue to the next `bobPointer`.
 *    d. Check if `bobPointY` is less than or equal to `maxIntermediateYCoordinate`. If it is, this pair is invalid because there's an intermediate point (whose `y`-coordinate contributed to `maxIntermediateYCoordinate`) that would be inside or on the fence formed by `alicePoint` and `bobPoint`. Continue to the next `bobPointer`.
 *    e. If both checks pass, it means `alicePointX <= bobPointX`, `bobPointY <= alicePointY`, and no intermediate points between `alicePoint` and `bobPoint` (in the sorted array sense) lie within the y-range `[bobPointY, alicePointY]`. Thus, this is a valid pair. Increment `totalValidPairs`.
 *    f. Update `maxIntermediateYCoordinate` with `Math.max(maxIntermediateYCoordinate, bobPointY)`. This is crucial: the current `bobPoint` itself, or more accurately its `y`-coordinate, becomes a potential intermediate point for *subsequent* `bobPointer` candidates (if they are further to the right). We update `maxIntermediateYCoordinate` to reflect the highest `y`-value encountered so far that is within the x-range `[alicePointX, currentBobX]`.
 * 5. Return `totalValidPairs`.
 * Dry Run:
 * points = [[1,5], [2,4], [3,6], [4,3], [5,2]]
 * Sorted (already is based on x-asc, y-desc for ties): points remains [[1,5], [2,4], [3,6], [4,3], [5,2]]
 * totalValidPairs = 0
 *
 * alicePointer = 0, alicePoint = [1,5] (alicePointX = 1, alicePointY = 5)
 *   maxIntermediateYCoordinate = -Infinity
 *
 *   bobPointer = 1, bobPoint = [2,4] (bobPointX = 2, bobPointY = 4)
 *     bobPointY (4) > alicePointY (5)? No.
 *     bobPointY (4) <= maxIntermediateYCoordinate (-Infinity)? No.
 *     Valid pair. totalValidPairs = 1. (Pair: ([1,5], [2,4]))
 *     maxIntermediateYCoordinate = Math.max(-Infinity, 4) = 4.
 *
 *   bobPointer = 2, bobPoint = [3,6] (bobPointX = 3, bobPointY = 6)
 *     bobPointY (6) > alicePointY (5)? Yes. Continue.
 *
 *   bobPointer = 3, bobPoint = [4,3] (bobPointX = 4, bobPointY = 3)
 *     bobPointY (3) > alicePointY (5)? No.
 *     bobPointY (3) <= maxIntermediateYCoordinate (4)? Yes. Continue. (Point [2,4] is an intermediate point and its Y is within [3,5])
 *     maxIntermediateYCoordinate = Math.max(4, 3) = 4.
 *
 *   bobPointer = 4, bobPoint = [5,2] (bobPointX = 5, bobPointY = 2)
 *     bobPointY (2) > alicePointY (5)? No.
 *     bobPointY (2) <= maxIntermediateYCoordinate (4)? Yes. Continue. (Point [2,4] is an intermediate point and its Y is within [2,5])
 *     maxIntermediateYCoordinate = Math.max(4, 2) = 4.
 *
 * alicePointer = 1, alicePoint = [2,4] (alicePointX = 2, alicePointY = 4)
 *   maxIntermediateYCoordinate = -Infinity
 *
 *   bobPointer = 2, bobPoint = [3,6] (bobPointX = 3, bobPointY = 6)
 *     bobPointY (6) > alicePointY (4)? Yes. Continue.
 *
 *   bobPointer = 3, bobPoint = [4,3] (bobPointX = 4, bobPointY = 3)
 *     bobPointY (3) > alicePointY (4)? No.
 *     bobPointY (3) <= maxIntermediateYCoordinate (-Infinity)? No.
 *     Valid pair. totalValidPairs = 2. (Pair: ([2,4], [4,3]))
 *     maxIntermediateYCoordinate = Math.max(-Infinity, 3) = 3.
 *
 *   bobPointer = 4, bobPoint = [5,2] (bobPointX = 5, bobPointY = 2)
 *     bobPointY (2) > alicePointY (4)? No.
 *     bobPointY (2) <= maxIntermediateYCoordinate (3)? Yes. Continue. (Point [4,3] is an intermediate point and its Y is within [2,4])
 *     maxIntermediateYCoordinate = Math.max(3, 2) = 3.
 *
 * alicePointer = 2, alicePoint = [3,6] (alicePointX = 3, alicePointY = 6)
 *   maxIntermediateYCoordinate = -Infinity
 *
 *   bobPointer = 3, bobPoint = [4,3] (bobPointX = 4, bobPointY = 3)
 *     bobPointY (3) > alicePointY (6)? No.
 *     bobPointY (3) <= maxIntermediateYCoordinate (-Infinity)? No.
 *     Valid pair. totalValidPairs = 3. (Pair: ([3,6], [4,3]))
 *     maxIntermediateYCoordinate = Math.max(-Infinity, 3) = 3.
 *
 *   bobPointer = 4, bobPoint = [5,2] (bobPointX = 5, bobPointY = 2)
 *     bobPointY (2) > alicePointY (6)? No.
 *     bobPointY (2) <= maxIntermediateYCoordinate (3)? Yes. Continue. (Point [4,3] is an intermediate point and its Y is within [2,6])
 *     maxIntermediateYCoordinate = Math.max(3, 2) = 3.
 *
 * alicePointer = 3, alicePoint = [4,3] (alicePointX = 4, alicePointY = 3)
 *   maxIntermediateYCoordinate = -Infinity
 *
 *   bobPointer = 4, bobPoint = [5,2] (bobPointX = 5, bobPointY = 2)
 *     bobPointY (2) > alicePointY (3)? No.
 *     bobPointY (2) <= maxIntermediateYCoordinate (-Infinity)? No.
 *     Valid pair. totalValidPairs = 4. (Pair: ([4,3], [5,2]))
 *     maxIntermediateYCoordinate = Math.max(-Infinity, 2) = 2.
 *
 * Final totalValidPairs = 4.
 *
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var numberOfPairs = function (points) {
  points.sort((pointOne, pointTwo) => {
    if (pointOne[0] === pointTwo[0]) {
      return pointTwo[1] - pointOne[1];
    }
    return pointOne[0] - pointTwo[0];
  });

  let totalValidPairs = 0;

  for (let alicePointer = 0; alicePointer < points.length; alicePointer++) {
    const alicePointX = points[alicePointer][0];
    const alicePointY = points[alicePointer][1];

    let maxIntermediateYCoordinate = -Infinity;

    for (
      let bobPointer = alicePointer + 1;
      bobPointer < points.length;
      bobPointer++
    ) {
      const bobPointX = points[bobPointer][0];
      const bobPointY = points[bobPointer][1];

      if (bobPointY > alicePointY) {
        continue;
      }

      if (bobPointY <= maxIntermediateYCoordinate) {
        continue;
      }

      totalValidPairs++;
      maxIntermediateYCoordinate = Math.max(
        maxIntermediateYCoordinate,
        bobPointY
      );
    }
  }

  return totalValidPairs;
};
