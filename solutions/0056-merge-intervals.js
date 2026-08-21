/**
 * Merge Intervals
 * Intuition: After sorting by start time, overlapping intervals always sit next to each other. Merge into the last kept interval when the next start is at most the current end.
 * Approach: 1. If empty, return []. 2. Sort by start. 3. Seed the answer with the first interval. 4. For each later interval, if it overlaps the last merged one, extend that end; otherwise append it.
 * Dry Run: intervals = [[1,3],[2,6],[8,10],[15,18]].
 *   - [2,6] overlaps [1,3] → [1,6]. [8,10] does not overlap → append. [15,18] append. Result [[1,6],[8,10],[15,18]].
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var merge = function (inputIntervals) {
  if (inputIntervals.length === 0) {
    return [];
  }

  inputIntervals.sort(
    (firstValue, secondValue) => firstValue[0] - secondValue[0]
  );

  const mergedCollection = [];
  mergedCollection.push(inputIntervals[0]);

  for (
    let currentIndex = 1;
    currentIndex < inputIntervals.length;
    currentIndex++
  ) {
    const currentCheckInterval = inputIntervals[currentIndex];
    const previousMergedInterval =
      mergedCollection[mergedCollection.length - 1];

    const currentStartPoint = currentCheckInterval[0];
    const currentEndPoint = currentCheckInterval[1];
    const previousEndPoint = previousMergedInterval[1];

    if (currentStartPoint <= previousEndPoint) {
      const updatedEndPoint = Math.max(previousEndPoint, currentEndPoint);
      previousMergedInterval[1] = updatedEndPoint;
    } else {
      mergedCollection.push(currentCheckInterval);
    }
  }

  return mergedCollection;
};
