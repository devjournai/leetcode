/**
 * Interval List Intersections
 * Time Complexity: O(firstList.length + secondList.length)
 * Space Complexity: O(firstList.length + secondList.length)
 */
var intervalIntersection = function (firstList, secondList) {
  const intersectionResults = [];
  let pointerA = 0;
  let pointerB = 0;

  while (pointerA < firstList.length && pointerB < secondList.length) {
    const currentIntervalA = firstList[pointerA];
    const currentIntervalB = secondList[pointerB];

    const beginOverlap = Math.max(currentIntervalA[0], currentIntervalB[0]);
    const endOverlap = Math.min(currentIntervalA[1], currentIntervalB[1]);

    if (beginOverlap <= endOverlap) {
      intersectionResults.push([beginOverlap, endOverlap]);
    }

    const endOfCurrentA = currentIntervalA[1];
    const endOfCurrentB = currentIntervalB[1];

    if (endOfCurrentA < endOfCurrentB) {
      pointerA++;
    } else if (endOfCurrentB < endOfCurrentA) {
      pointerB++;
    } else {
      pointerA++;
      pointerB++;
    }
  }

  return intersectionResults;
};
