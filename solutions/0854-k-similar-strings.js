/**
 * K Similar Strings
 * Time Complexity: O(N! * N^2)
 * Space Complexity: O(N! * N)
 */
var kSimilarity = function (s1, s2) {
  if (s1 === s2) {
    return 0;
  }

  const statesQueue = [s1];
  const visitedSet = new Set();
  visitedSet.add(s1);
  let currentLevelSwaps = 0;

  while (statesQueue.length > 0) {
    let levelElementsCount = statesQueue.length;

    for (let j = 0; j < levelElementsCount; j++) {
      const currentTransformation = statesQueue.shift();

      if (currentTransformation === s2) {
        return currentLevelSwaps;
      }

      let firstMismatchIndex = 0;
      while (
        firstMismatchIndex < currentTransformation.length &&
        currentTransformation[firstMismatchIndex] === s2[firstMismatchIndex]
      ) {
        firstMismatchIndex++;
      }

      for (
        let nextSwapTargetIndex = firstMismatchIndex + 1;
        nextSwapTargetIndex < currentTransformation.length;
        nextSwapTargetIndex++
      ) {
        if (
          currentTransformation[nextSwapTargetIndex] ===
            s2[firstMismatchIndex] &&
          currentTransformation[nextSwapTargetIndex] !== s2[nextSwapTargetIndex]
        ) {
          const nextStateString = createSwappedString(
            currentTransformation,
            firstMismatchIndex,
            nextSwapTargetIndex,
          );

          if (!visitedSet.has(nextStateString)) {
            if (nextStateString === s2) {
              return currentLevelSwaps + 1;
            }
            visitedSet.add(nextStateString);
            statesQueue.push(nextStateString);
          }
        }
      }
    }
    currentLevelSwaps++;
  }

  return -1;
};

function createSwappedString(originalString, positionOne, positionTwo) {
  const stringCharacters = originalString.split("");
  [stringCharacters[positionOne], stringCharacters[positionTwo]] = [
    stringCharacters[positionTwo],
    stringCharacters[positionOne],
  ];
  return stringCharacters.join("");
}
