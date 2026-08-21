/**
 * Open The Lock
 * Intuition: Each lock state has eight neighbors (four wheels, ±1). Shortest turns is BFS from `"0000"`, skipping `deadends` and already `exploredStates`.
 * Approach: 1. Put `deadends` in `forbiddenCombinations`. If `"0000"` is forbidden, return -1. 2. Queue pairs `[currentCombination, currentMoves]` starting at `["0000", 0]`. 3. Dequeue; if it equals `target`, return `currentMoves`. 4. For each `wheelIndex`, build `combinationUp` and `combinationDown` with `(d+1)%10` and `(d-1+10)%10`. 5. Enqueue unseen, non-forbidden neighbors with `currentMoves + 1`. 6. If the queue empties, return -1.
 * Dry Run: deadends = ["0201"], target = "0001".
 *   - "0000" is allowed. Wheel 3 down/up yields "0009" and "0001".
 *   - Dequeue "0001" at 1 move → return 1.
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
