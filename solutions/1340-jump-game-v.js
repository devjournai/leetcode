/**
 * Jump Game V
 * Time Complexity: O(N * D)
 * Space Complexity: O(N)
 */
var maxJumps = function (arr, d) {
  const arrayLength = arr.length;
  const jumpCountsMemo = new Array(arrayLength).fill(0);
  let overallMaximumJumps = 1;

  for (
    let currentStartIndex = 0;
    currentStartIndex < arrayLength;
    currentStartIndex++
  ) {
    overallMaximumJumps = Math.max(
      overallMaximumJumps,
      calculateMaxJumpsFrom(currentStartIndex),
    );
  }

  return overallMaximumJumps;

  function calculateMaxJumpsFrom(currentIndexParam) {
    if (jumpCountsMemo[currentIndexParam] !== 0) {
      return jumpCountsMemo[currentIndexParam];
    }

    let maximumFromCurrent = 1;

    for (let distanceRight = 1; distanceRight <= d; distanceRight++) {
      const nextRightIndex = currentIndexParam + distanceRight;
      if (
        nextRightIndex < arrayLength &&
        arr[currentIndexParam] > arr[nextRightIndex]
      ) {
        maximumFromCurrent = Math.max(
          maximumFromCurrent,
          1 + calculateMaxJumpsFrom(nextRightIndex),
        );
      } else {
        break;
      }
    }

    for (let distanceLeft = 1; distanceLeft <= d; distanceLeft++) {
      const nextLeftIndex = currentIndexParam - distanceLeft;
      if (nextLeftIndex >= 0 && arr[currentIndexParam] > arr[nextLeftIndex]) {
        maximumFromCurrent = Math.max(
          maximumFromCurrent,
          1 + calculateMaxJumpsFrom(nextLeftIndex),
        );
      } else {
        break;
      }
    }

    jumpCountsMemo[currentIndexParam] = maximumFromCurrent;
    return maximumFromCurrent;
  }
};
