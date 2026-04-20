/**
 * Jump Game Iv
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minJumps = function (arr) {
  const arrayLength = arr.length;
  if (arrayLength <= 1) {
    return 0;
  }

  const mapOfValuesAndIndices = new Map();
  for (let initialIndex = 0; initialIndex < arrayLength; initialIndex++) {
    if (!mapOfValuesAndIndices.has(arr[initialIndex])) {
      mapOfValuesAndIndices.set(arr[initialIndex], []);
    }
    mapOfValuesAndIndices.get(arr[initialIndex]).push(initialIndex);
  }

  let bfsQueue = [0];
  const visitedSpots = new Set();
  visitedSpots.add(0);
  let jumpCount = 0;

  while (bfsQueue.length > 0) {
    const nextLevelQueue = [];

    for (const currentPosition of bfsQueue) {
      if (currentPosition === arrayLength - 1) {
        return jumpCount;
      }

      const positionRight = currentPosition + 1;
      if (positionRight < arrayLength && !visitedSpots.has(positionRight)) {
        visitedSpots.add(positionRight);
        nextLevelQueue.push(positionRight);
      }

      const positionLeft = currentPosition - 1;
      if (positionLeft >= 0 && !visitedSpots.has(positionLeft)) {
        visitedSpots.add(positionLeft);
        nextLevelQueue.push(positionLeft);
      }

      const valueAtCurrentPosition = arr[currentPosition];
      const indicesWithSameValue = mapOfValuesAndIndices.get(
        valueAtCurrentPosition,
      );

      if (indicesWithSameValue) {
        for (
          let targetIndexIterator = 0;
          targetIndexIterator < indicesWithSameValue.length;
          targetIndexIterator++
        ) {
          const individualTargetIndex =
            indicesWithSameValue[targetIndexIterator];
          if (!visitedSpots.has(individualTargetIndex)) {
            visitedSpots.add(individualTargetIndex);
            nextLevelQueue.push(individualTargetIndex);
          }
        }
        mapOfValuesAndIndices.delete(valueAtCurrentPosition);
      }
    }

    bfsQueue = nextLevelQueue;
    jumpCount++;
  }

  return -1;
};
