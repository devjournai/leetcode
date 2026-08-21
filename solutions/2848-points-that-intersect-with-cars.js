/**
 * Points That Intersect With Cars
 * Intuition: The problem asks for the total count of unique integer points covered by any car. This is equivalent to finding the length of the union of all given intervals.
 * Approach: 1. Sort the input car intervals by their starting points. This helps in processing overlapping or adjacent intervals efficiently. 2. Initialize variables for the current merged interval's start and end, and a counter for total unique points. 3. Iterate through the sorted intervals. For each interval, check if it overlaps or touches the current merged interval. If it does, extend the `mergedIntervalEnd`. If it doesn't, calculate the points covered by the *previous* merged interval, add them to the total count, and start a new merged interval with the current car's coordinates. 4. After the loop, add the points from the last merged interval to the total count.
 * Dry Run: nums = [[3,6],[1,3],[2,5]]
 *   1. Sort nums: sortedCars = [[1,3],[2,5],[3,6]]
 *   2. Initialize: mergedIntervalStart = 1, mergedIntervalEnd = 3, accumulatedPoints = 0
 *   3. Loop:
 *      - currentCarIndex = 1 (car is [2,5]):
 *        carStartPoint = 2, carEndPoint = 5
 *        2 <= (3 + 1) is true.
 *        mergedIntervalEnd = Math.max(3, 5) = 5. Current merged interval: [1,5]
 *      - currentCarIndex = 2 (car is [3,6]):
 *        carStartPoint = 3, carEndPoint = 6
 *        3 <= (5 + 1) is true.
 *        mergedIntervalEnd = Math.max(5, 6) = 6. Current merged interval: [1,6]
 *   4. End of loop. Add last merged interval's points:
 *      accumulatedPoints += (6 - 1 + 1) = 6.
 *   5. Return accumulatedPoints = 6.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var numberOfPoints = function (nums) {
  if (nums.length === 0) {
    return 0;
  }

  const sortedCars = nums.sort(
    (segmentOne, segmentTwo) => segmentOne[0] - segmentTwo[0]
  );

  let mergedIntervalStart = sortedCars[0][0];
  let mergedIntervalEnd = sortedCars[0][1];
  let accumulatedPoints = 0;

  const numberOfEntries = sortedCars.length;
  for (
    let currentCarIndex = 1;
    currentCarIndex < numberOfEntries;
    currentCarIndex++
  ) {
    const carStartPoint = sortedCars[currentCarIndex][0];
    const carEndPoint = sortedCars[currentCarIndex][1];

    if (carStartPoint <= mergedIntervalEnd + 1) {
      mergedIntervalEnd = Math.max(mergedIntervalEnd, carEndPoint);
    } else {
      accumulatedPoints += mergedIntervalEnd - mergedIntervalStart + 1;
      mergedIntervalStart = carStartPoint;
      mergedIntervalEnd = carEndPoint;
    }
  }

  accumulatedPoints += mergedIntervalEnd - mergedIntervalStart + 1;

  return accumulatedPoints;
};
