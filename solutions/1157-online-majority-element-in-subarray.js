/**
 * Online Majority Element In Subarray
 * Intuition: If a majority exists it occupies more than half the range, so random samples almost surely hit it. Occurrence lists plus binary search count a candidate in [left,right] in log time.
 * Approach: 1. Constructor stores each value’s sorted indices. 2. Query samples up to 20 random indices in the range. 3. Count the candidate via lower/upper bound on its index list; return it if count >= threshold, else -1.
 * Dry Run: arr = [1,1,2,2,1,1], query(0,5,4).
 *   - Range is all 1s and 2s; 1 appears 4 times. A sample of 1 counts 4 >= 4, return 1.
 * Time Complexity: O(N) for constructor, O(log N) per query
 * Space Complexity: O(N)
 */
var MajorityChecker = function (inputArray) {
  this.storedArray = inputArray;
  this.indicesMap = new Map();

  for (let currentIndex = 0; currentIndex < inputArray.length; currentIndex++) {
    const currentElement = inputArray[currentIndex];
    const elementPositions = this.indicesMap.get(currentElement) || [];
    elementPositions.push(currentIndex);
    this.indicesMap.set(currentElement, elementPositions);
  }
};

MajorityChecker.prototype.query = function (
  queryLeft,
  queryRight,
  queryThreshold
) {
  const maxCandidateChecks = 20;
  const searchRangeLength = queryRight - queryLeft + 1;

  for (
    let checkIteration = 0;
    checkIteration < maxCandidateChecks;
    checkIteration++
  ) {
    const randomPositionOffset = Math.floor(Math.random() * searchRangeLength);
    const candidateElement = this.storedArray[queryLeft + randomPositionOffset];
    const candidateElementPositions = this.indicesMap.get(candidateElement);

    if (!candidateElementPositions) {
      continue;
    }

    const elementCount = getRangeCount(
      candidateElementPositions,
      queryLeft,
      queryRight
    );

    if (elementCount >= queryThreshold) {
      return candidateElement;
    }
  }

  return -1;
};

function getRangeCount(positionArray, rangeStart, rangeEnd) {
  const leftBoundaryIndex = findFirstOccurrence(positionArray, rangeStart);
  const rightBoundaryIndex = findLastOccurrencePlusOne(positionArray, rangeEnd);
  return rightBoundaryIndex - leftBoundaryIndex;
}

function findFirstOccurrence(sortedList, valueToFind) {
  let searchStart = 0;
  let searchEnd = sortedList.length;
  while (searchStart < searchEnd) {
    const middlePoint = Math.floor((searchStart + searchEnd) / 2);
    if (sortedList[middlePoint] < valueToFind) {
      searchStart = middlePoint + 1;
    } else {
      searchEnd = middlePoint;
    }
  }
  return searchStart;
}

function findLastOccurrencePlusOne(sortedList, valueToFind) {
  let lookupStart = 0;
  let lookupEnd = sortedList.length;
  while (lookupStart < lookupEnd) {
    const midIndex = Math.floor((lookupStart + lookupEnd) / 2);
    if (sortedList[midIndex] <= valueToFind) {
      lookupStart = midIndex + 1;
    } else {
      lookupEnd = midIndex;
    }
  }
  return lookupStart;
}
