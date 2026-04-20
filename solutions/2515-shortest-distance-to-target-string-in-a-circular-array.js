/**
 * Shortest Distance to Target String in a Circular Array
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var closestTarget = function (wordList, desiredTarget, initialIndex) {
  const arrayLength = wordList.length;

  for (let currentOffset = 0; currentOffset < arrayLength; currentOffset++) {
    const forwardCheckIndex = (initialIndex + currentOffset) % arrayLength;
    if (wordList[forwardCheckIndex] === desiredTarget) {
      return currentOffset;
    }

    if (currentOffset > 0) {
      const backwardCheckIndex =
        (initialIndex - currentOffset + arrayLength) % arrayLength;
      if (wordList[backwardCheckIndex] === desiredTarget) {
        return currentOffset;
      }
    }
  }

  return -1;
};
