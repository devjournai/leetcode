/**
 * Relocate Marbles
 * Intuition: Only unique occupied positions matter, not marble counts. A Set is ideal for tracking these unique positions efficiently.
 * Approach: 1. Initialize a Set with all initial marble positions from `nums`. 2. Iterate through each move instruction, removing the `moveFrom` position and adding the `moveTo` position to the Set. 3. Convert the final Set of occupied positions into a sorted array.
 * Dry Run:
 * nums = [1, 1, 3], moveFrom = [1, 2], moveTo = [2, 4]
 * 1. currentPositions = new Set(nums) -> {1, 3}
 * 2. Loop indexCount = 0:
 *    positionToRemove = moveFrom[0] = 1
 *    positionToAdd = moveTo[0] = 2
 *    currentPositions.delete(1) -> {3}
 *    currentPositions.add(2) -> {3, 2}
 * 3. Loop indexCount = 1:
 *    positionToRemove = moveFrom[1] = 2
 *    positionToAdd = moveTo[1] = 4
 *    currentPositions.delete(2) -> {3}
 *    currentPositions.add(4) -> {3, 4}
 * 4. Loop ends.
 * 5. finalPositionsArray = [...currentPositions] -> [3, 4]
 * 6. finalPositionsArray.sort((firstValue, secondValue) => firstValue - secondValue) -> [3, 4]
 * 7. Return [3, 4].
 * Time Complexity: O(N + M + P log P)
 * Space Complexity: O(P)
 */
var relocateMarbles = function (nums, moveFrom, moveTo) {
  const currentPositions = new Set(nums);

  for (let indexCount = 0; indexCount < moveFrom.length; indexCount++) {
    const positionToRemove = moveFrom[indexCount];
    const positionToAdd = moveTo[indexCount];
    currentPositions.delete(positionToRemove);
    currentPositions.add(positionToAdd);
  }

  const finalPositionsArray = [...currentPositions];
  finalPositionsArray.sort(
    (firstValue, secondValue) => firstValue - secondValue,
  );

  return finalPositionsArray;
};
