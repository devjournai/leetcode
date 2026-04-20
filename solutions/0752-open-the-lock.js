/**
 * Open The Lock
 * Time Complexity: O(N * L * E)
 * Space Complexity: O(N * L)
 */
var openLock = function (deadends, target) {
  const forbiddenCombinations = new Set(deadends);
  const bfsQueue = [["0000", 0]];
  const exploredStates = new Set(["0000"]);

  if (forbiddenCombinations.has("0000")) {
    return -1;
  }

  while (bfsQueue.length > 0) {
    const [currentCombination, currentMoves] = bfsQueue.shift();

    if (currentCombination === target) {
      return currentMoves;
    }

    for (let wheelIndex = 0; wheelIndex < 4; wheelIndex++) {
      const digitChar = currentCombination[wheelIndex];
      const numericValue = parseInt(digitChar);

      const incrementedDigit = (numericValue + 1) % 10;
      const decrementedDigit = (numericValue - 1 + 10) % 10;

      const combinationUp =
        currentCombination.substring(0, wheelIndex) +
        incrementedDigit.toString() +
        currentCombination.substring(wheelIndex + 1);
      if (
        !exploredStates.has(combinationUp) &&
        !forbiddenCombinations.has(combinationUp)
      ) {
        bfsQueue.push([combinationUp, currentMoves + 1]);
        exploredStates.add(combinationUp);
      }

      const combinationDown =
        currentCombination.substring(0, wheelIndex) +
        decrementedDigit.toString() +
        currentCombination.substring(wheelIndex + 1);
      if (
        !exploredStates.has(combinationDown) &&
        !forbiddenCombinations.has(combinationDown)
      ) {
        bfsQueue.push([combinationDown, currentMoves + 1]);
        exploredStates.add(combinationDown);
      }
    }
  }

  return -1;
};
