/**
 * Shortest Distance to Target String in a Circular Array
 * Intuition: In a circular array the shortest walk is the minimum of going left or right the same number of steps.
 * Approach: 1. For offset 0..n-1, check start+offset and (if offset>0) start-offset, both modulo n. 2. Return the first offset that hits the target, else -1.
 * Dry Run: words = ["hello","i","leetcode"], target = "i", startIndex = 0. offset 0 is "hello". offset 1 forward is "i". Return 1.
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
