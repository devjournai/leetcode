/**
 * Shortest Impossible Sequence Of Rolls
 * Intuition: The length of the shortest impossible sequence is one more than the number of times we can sequentially collect all distinct roll values from 1 to k within the given `rolls` array.
 * Approach: 1. Initialize a counter `completedLevels` to zero and an empty `Set` named `currentFacesCollected`. 2. Iterate through each `currentRoll` in the `diceRolls` array. 3. Add `currentRoll` to `currentFacesCollected`. 4. If `currentFacesCollected.size` becomes equal to `maxFaceValue`, it means we have collected all possible faces (1 through k) in this segment. Increment `completedLevels` and clear `currentFacesCollected` to prepare for collecting the next set of faces. 5. After processing all `diceRolls`, return `completedLevels + 1`. This accounts for the fact that if we can form `M` full sequences of `1...k` (i.e., `completedLevels = M`), then any sequence of length `M` is possible, making the shortest impossible sequence of length `M + 1`.
 * Dry Run: diceRolls = [1,2,3,4,5,6], maxFaceValue = 6
 *   Initial: completedLevels = 0, currentFacesCollected = {}
 *   currentRoll = 1: currentFacesCollected = {1}
 *   currentRoll = 2: currentFacesCollected = {1,2}
 *   currentRoll = 3: currentFacesCollected = {1,2,3}
 *   currentRoll = 4: currentFacesCollected = {1,2,3,4}
 *   currentRoll = 5: currentFacesCollected = {1,2,3,4,5}
 *   currentRoll = 6: currentFacesCollected = {1,2,3,4,5,6}
 *     currentFacesCollected.size (6) === maxFaceValue (6) is true.
 *     completedLevels becomes 1.
 *     currentFacesCollected.clear() -> currentFacesCollected = {}
 *   Loop ends.
 *   Return completedLevels + 1 = 1 + 1 = 2.
 * Time Complexity: O(N)
 * Space Complexity: O(k)
 */
var shortestSequence = function (diceRolls, maxFaceValue) {
  const currentFacesCollected = new Set();
  let completedLevels = 0;

  for (const currentRoll of diceRolls) {
    currentFacesCollected.add(currentRoll);
    if (currentFacesCollected.size === maxFaceValue) {
      completedLevels++;
      currentFacesCollected.clear();
    }
  }

  return completedLevels + 1;
};
