/**
 * Online Majority Element In Subarray
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
  queryThreshold,
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
      queryRight,
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
