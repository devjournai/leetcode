/**
 * Interval List Intersections
 * Intuition: Two pointers on sorted disjoint lists: overlap is [max starts, min ends] when start≤end; advance the interval that finishes first.
 * Approach: 1. While both lists have intervals, compute `beginOverlap`/`endOverlap`. 2. Push if valid. 3. Increment `pointerA` if A's end is smaller, `pointerB` if B's is smaller, both if equal. 4. Return `intersectionResults`.
 * Dry Run: firstList = [[0,2],[5,10]], secondList = [[1,5],[8,12]]. Overlaps [1,2] then [5,5] then [8,10].
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
