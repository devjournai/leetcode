/**
 * Jump Game III
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var canReach = function (arr, start) {
  const seenIndices = new Set();
  const searchQueue = [start];
  seenIndices.add(start);

  while (searchQueue.length > 0) {
    const currentPosition = searchQueue.shift();

    if (arr[currentPosition] === 0) {
      return true;
    }

    const stepMagnitude = arr[currentPosition];
    const nextForwardPoint = currentPosition + stepMagnitude;
    const nextBackwardPoint = currentPosition - stepMagnitude;

    if (nextForwardPoint < arr.length && !seenIndices.has(nextForwardPoint)) {
      seenIndices.add(nextForwardPoint);
      searchQueue.push(nextForwardPoint);
    }

    if (nextBackwardPoint >= 0 && !seenIndices.has(nextBackwardPoint)) {
      seenIndices.add(nextBackwardPoint);
      searchQueue.push(nextBackwardPoint);
    }
  }

  return false;
};
