/**
 * Course Schedule III
 * Intuition: Take courses in order of earliest `lastDay`. Greedily enroll each course; if `cumulativeTime` exceeds that deadline, drop the longest enrolled duration via a max-heap so remaining courses still fit.
 * Approach: 1. Sort `courseData` by `lastDay` (`[1]`). 2. `insertToMaxHeap` / `removeMaxFromHeap` on durations in `heapArray`. 3. For each course, add duration to `cumulativeTime` and heap; if `cumulativeTime > courseDeadlineDay`, subtract `removeMaxFromHeap()`. 4. Return `heapArray.length`.
 * Dry Run: courses=[[100,200],[200,1300],[1000,1250],[2000,3200]].
 *   - Sort by deadline. Take 100, then 1000 (time 1100≤1250), then 200 (1300≤1300). 2000 would overflow; heap keeps 3 courses.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var scheduleCourse = function (courseData) {
  courseData.sort(
    (firstCoursePair, secondCoursePair) =>
      firstCoursePair[1] - secondCoursePair[1]
  );

  const heapArray = [];
  let cumulativeTime = 0;

  function insertToMaxHeap(valToInsert) {
    heapArray.push(valToInsert);
    let insertPosition = heapArray.length - 1;
    while (insertPosition > 0) {
      let parentPosition = (insertPosition - 1) >> 1;
      if (heapArray[parentPosition] >= heapArray[insertPosition]) {
        break;
      }
      [heapArray[parentPosition], heapArray[insertPosition]] = [
        heapArray[insertPosition],
        heapArray[parentPosition],
      ];
      insertPosition = parentPosition;
    }
  }

  function removeMaxFromHeap() {
    const maximumValue = heapArray[0];
    const lastHeapElement = heapArray.pop();
    if (heapArray.length > 0) {
      heapArray[0] = lastHeapElement;
      let heapIteratorIndex = 0;
      while (true) {
        let leftChildIdx = heapIteratorIndex * 2 + 1;
        let rightChildIdx = heapIteratorIndex * 2 + 2;
        let largestIdx = heapIteratorIndex;

        if (
          leftChildIdx < heapArray.length &&
          heapArray[leftChildIdx] > heapArray[largestIdx]
        ) {
          largestIdx = leftChildIdx;
        }
        if (
          rightChildIdx < heapArray.length &&
          heapArray[rightChildIdx] > heapArray[largestIdx]
        ) {
          largestIdx = rightChildIdx;
        }

        if (largestIdx === heapIteratorIndex) {
          break;
        }

        [heapArray[heapIteratorIndex], heapArray[largestIdx]] = [
          heapArray[largestIdx],
          heapArray[heapIteratorIndex],
        ];
        heapIteratorIndex = largestIdx;
      }
    }
    return maximumValue;
  }

  for (const currentCourseInfo of courseData) {
    let courseDurationValue = currentCourseInfo[0];
    let courseDeadlineDay = currentCourseInfo[1];

    cumulativeTime += courseDurationValue;
    insertToMaxHeap(courseDurationValue);

    if (cumulativeTime > courseDeadlineDay) {
      let extractedMaxDuration = removeMaxFromHeap();
      cumulativeTime -= extractedMaxDuration;
    }
  }

  return heapArray.length;
};
