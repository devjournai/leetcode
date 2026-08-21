/**
 * Path Sum Iv
 * Intuition: Each 3-digit code is depth, position, value. DFS from (1,1) adds node values along the path and, at leaves, returns the path total; internal nodes sum both children.
 * Approach: 1. Map `"depth-position"` → value. 2. `calculatePathSum(level, pos, pathTotal)` returns 0 if missing; if no children return accumulated; else left pos `2p-1` and right `2p` on the next level.
 * Dry Run: nums=[113,215,221].
 *   - Root 3, left 5, right 1. Leaves: 3+5=8 and 3+1=4. Return 12.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var pathSum = function (nums) {
  const nodeValuesMap = new Map();

  for (const currentNum of nums) {
    const nodeDepthValue = Math.floor(currentNum / 100);
    const nodePositionValue = Math.floor((currentNum % 100) / 10);
    const nodeActualValue = currentNum % 10;
    const mapIdentifier = `${nodeDepthValue}-${nodePositionValue}`;
    nodeValuesMap.set(mapIdentifier, nodeActualValue);
  }

  function calculatePathSum(levelNumber, positionIndex, currentPathTotal) {
    const nodeKeyString = `${levelNumber}-${positionIndex}`;

    if (!nodeValuesMap.has(nodeKeyString)) {
      return 0;
    }

    const nodeDataValue = nodeValuesMap.get(nodeKeyString);
    const accumulatedSum = currentPathTotal + nodeDataValue;

    const nextLevel = levelNumber + 1;
    const leftNodeIndex = positionIndex * 2 - 1;
    const rightNodeIndex = positionIndex * 2;

    const leftKeyString = `${nextLevel}-${leftNodeIndex}`;
    const rightKeyString = `${nextLevel}-${rightNodeIndex}`;

    const isLeftChildPresent = nodeValuesMap.has(leftKeyString);
    const isRightChildPresent = nodeValuesMap.has(rightKeyString);

    if (!isLeftChildPresent && !isRightChildPresent) {
      return accumulatedSum;
    }

    const sumFromLeftBranch = calculatePathSum(
      nextLevel,
      leftNodeIndex,
      accumulatedSum
    );
    const sumFromRightBranch = calculatePathSum(
      nextLevel,
      rightNodeIndex,
      accumulatedSum
    );

    return sumFromLeftBranch + sumFromRightBranch;
  }

  return calculatePathSum(1, 1, 0);
};
