/**
 * Frog Jump
 * Intuition: From stone `currentStoneLocation` after a jump of size `previousJumpMagnitude`, the frog may try jumps of size k-1, k, k+1 if that landing exists. Memoize `(location, lastJump)` in `memoizationRecords`.
 * Approach: 1. Empty false, one stone true. 2. Map positions to indices; last stone is the goal. 3. `recursiveJumpSolver(0,0)` tries positive candidate jumps to mapped stones, memoizing success/failure. 4. First jump from 0 with last-jump 0 only allows size 1.
 * Dry Run: stones = [0,1,3,5,6,8,12,17].
 *   - (0,0)→ jump 1 to 1; then 2 to 3; 2 to 5; 3 to 8; 4 to 12; 5 to 17. Return true.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var canCross = function (stonesInputArray) {
  if (stonesInputArray.length === 0) {
    return false;
  }

  if (stonesInputArray.length === 1) {
    return true;
  }

  const lastStoneValue = stonesInputArray[stonesInputArray.length - 1];
  const stonePositionMapper = new Map();
  for (
    let currentStoneIndex = 0;
    currentStoneIndex < stonesInputArray.length;
    currentStoneIndex++
  ) {
    stonePositionMapper.set(
      stonesInputArray[currentStoneIndex],
      currentStoneIndex
    );
  }

  const memoizationRecords = new Map();

  const recursiveJumpSolver = (currentStoneLocation, previousJumpMagnitude) => {
    const stateIdentifier = `${currentStoneLocation}:${previousJumpMagnitude}`;
    if (memoizationRecords.has(stateIdentifier)) {
      return memoizationRecords.get(stateIdentifier);
    }

    if (currentStoneLocation === lastStoneValue) {
      return true;
    }

    const nextPotentialJumpSizes = [
      previousJumpMagnitude - 1,
      previousJumpMagnitude,
      previousJumpMagnitude + 1,
    ];

    for (
      let iterationIndex = 0;
      iterationIndex < nextPotentialJumpSizes.length;
      iterationIndex++
    ) {
      const candidateJumpSize = nextPotentialJumpSizes[iterationIndex];
      if (candidateJumpSize <= 0) {
        continue;
      }

      const targetStoneLocation = currentStoneLocation + candidateJumpSize;

      if (targetStoneLocation > lastStoneValue) {
        continue;
      }

      if (stonePositionMapper.has(targetStoneLocation)) {
        if (recursiveJumpSolver(targetStoneLocation, candidateJumpSize)) {
          memoizationRecords.set(stateIdentifier, true);
          return true;
        }
      }
    }

    memoizationRecords.set(stateIdentifier, false);
    return false;
  };
  return recursiveJumpSolver(0, 0);
};
