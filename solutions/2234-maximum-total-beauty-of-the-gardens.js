/**
 * Maximum Total Beauty Of The Gardens
 * Intuition: This problem requires optimizing two interdependent components: maximizing the number of complete gardens and maximizing the minimum flowers in incomplete gardens, all while staying within a budget. A greedy approach combined with pre-computation for the minimum incomplete flowers seems appropriate. Sorting the gardens helps in efficiently making decisions, as completing larger gardens is cheaper, and increasing the minimum in smaller gardens takes fewer flowers.
 * Approach:
 * 1. Sort the `initialFlowers` array in descending order. This places gardens that are already large or closest to `completionTarget` at the beginning.
 * 2. Pre-calculate `minimumCostToReachLevel`: an array where `minimumCostToReachLevel[k]` represents the cost to raise all gardens from index `k` to `gardenCount-1` (the `gardenCount-k` smallest gardens in the sorted list) to at least `sortedFlowers[k]` flowers, but not exceeding `completionTarget-1`. This is done by iterating `currentCheckIdx` backwards from `gardenCount-2` to `0`. During this, `lastUniqueIdxForCost` tracks the start of a block of identical flower counts to optimize calculations. The calculation stops if the cumulative cost exceeds `extraFlowersCount` or if `sortedFlowers[currentCheckIdx]` is already complete.
 * 3. Initialize `maximumOverallBeauty` to 0. Initialize `minGardenPointer` to `currentCheckIdx + 1` (the last `currentCheckIdx` from the pre-calculation loop, incremented to point to the first potentially incomplete garden).
 * 4. Calculate an initial `currentMinimumValue` for the case where no gardens are explicitly completed. This uses `extraFlowersCount`, `minimumCostToReachLevel[minGardenPointer]`, and `sortedFlowers[minGardenPointer]`. The maximum possible value for an incomplete garden is `completionTarget - 1`.
 * 5. Iterate `mainLoopIterator` from 0 to `gardenCount-1`. This `mainLoopIterator` represents the index of the current garden being considered for completion. Gardens `0` to `mainLoopIterator-1` are handled as complete.
 *    a. If `sortedFlowers[mainLoopIterator]` is already complete (`>= completionTarget`), it doesn't cost additional flowers and doesn't impact the calculation of `currentMinimumValue` for incomplete gardens; skip to the next iteration.
 *    b. Calculate the `currentBeautyScore` for the scenario where `mainLoopIterator` gardens are completed (each contributing `fullReward`) and the remaining `gardenCount - mainLoopIterator` gardens contribute `currentMinimumValue * partialReward`. Update `maximumOverallBeauty`.
 *    c. Calculate `costToCompleteCurrent` needed to make `sortedFlowers[mainLoopIterator]` complete.
 *    d. If `costToCompleteCurrent` exceeds `currentRemainingBudget`, we cannot complete this garden, so no further iterations are possible; break the loop.
 *    e. Deduct `costToCompleteCurrent` from `currentRemainingBudget`.
 *    f. Mark `sortedFlowers[mainLoopIterator]` as complete by setting its value to `completionTarget`. This in-place modification allows the `while` loop that adjusts `minGardenPointer` to correctly check for `sortedFlowers[adjustmentPointer - 1]` values.
 *    g. Adjust `minGardenPointer`: advance `minGardenPointer` as long as any of these conditions are met:
 *        i. `minGardenPointer` points to a garden that is now considered "complete" (`minGardenPointer <= mainLoopIterator`).
 *        ii. `currentRemainingBudget` is insufficient to raise gardens from `minGardenPointer` to `gardenCount-1` to `sortedFlowers[minGardenPointer]` (using the pre-calculated `minimumCostToReachLevel` based on original values).
 *        iii. `minGardenPointer` is not at the beginning, and `sortedFlowers[minGardenPointer]` has the same value as the element before it in the *modified* `sortedFlowers` array (this allows skipping over duplicates that are no longer part of the minimum consideration due to their left neighbor being completed/moved past).
 *    h. Recalculate `currentMinimumValue` based on the updated `currentRemainingBudget` and `minGardenPointer`. This value is capped at `completionTarget - 1`.
 * 6. After the loop, check if all `gardenCount` gardens could be completed (i.e., the smallest garden `sortedFlowers[gardenCount-1]` is now `>= completionTarget`). If so, calculate the beauty (`gardenCount * fullReward`) and update `maximumOverallBeauty`.
 * 7. Return `maximumOverallBeauty`.
 * Dry Run:
 * `initialFlowers = [5, 4, 3, 2, 1]`, `extraFlowersCount = 10`, `completionTarget = 6`, `fullReward = 100`, `partialReward = 10`
 * `gardenCount = 5`.
 * `sortedFlowers = [5, 4, 3, 2, 1]` (after sorting descending)
 * `minimumCostToReachLevel = Array(6).fill(0)`
 * Initial `lastUniqueIdxForCost = 4`. `currentCheckIdx` loop `3` down to `0`.
 * `currentCheckIdx = 3`: `sortedFlowers[3]=2 < 6`. `flowerDifference = 2-1=1`. `suffixGardenCount = 5-4=1`. `minimumCostToReachLevel[3] = 0 + 1*1 = 1`. `sortedFlowers[3] != sortedFlowers[2]`. `lastUniqueIdxForCost = 3`.
 * `currentCheckIdx = 2`: `sortedFlowers[2]=3 < 6`. `flowerDifference = 3-2=1`. `suffixGardenCount = 5-3=2`. `minimumCostToReachLevel[2] = 1 + 1*2 = 3`. `sortedFlowers[2] != sortedFlowers[1]`. `lastUniqueIdxForCost = 2`.
 * `currentCheckIdx = 1`: `sortedFlowers[1]=4 < 6`. `flowerDifference = 4-3=1`. `suffixGardenCount = 5-2=3`. `minimumCostToReachLevel[1] = 3 + 1*3 = 6`. `sortedFlowers[1] != sortedFlowers[0]`. `lastUniqueIdxForCost = 1`.
 * `currentCheckIdx = 0`: `sortedFlowers[0]=5 < 6`. `flowerDifference = 5-4=1`. `suffixGardenCount = 5-1=4`. `minimumCostToReachLevel[0] = 6 + 1*4 = 10`. `sortedFlowers[0] != sortedFlowers[-1]` (boundary). `lastUniqueIdxForCost` remains 1.
 * `currentCheckIdx` loop ends, `currentCheckIdx` is `0`.
 * `minimumCostToReachLevel = [10, 6, 3, 1, 0, 0]`.
 * `minGardenPointer = currentCheckIdx + 1 = 0 + 1 = 1`. (Actually it's `currentCheckIdx` after loop, which is 0. Then `++currentCheckIdx` happens, making it 1. So it should be `0` initially based on the reference if no gardens were `target` or more. Let's trace the reference's `minIndex++` outside loop before the first min calc.)
 * The reference solution sets `minIndex = minIndex + 1` after its `suffixCost` loop which makes `minIndex = 0 + 1 = 1`. Let's follow this.
 * `minGardenPointer = 1`.
 * `remainingBudgetForMin = extraFlowersCount - minimumCostToReachLevel[minGardenPointer] = 10 - minimumCostToReachLevel[1] = 10 - 6 = 4`.
 * `gardensForMinCount = gardenCount - minGardenPointer = 5 - 1 = 4`.
 * `currentMinimumValue = Math.min(completionTarget - 1, sortedFlowers[minGardenPointer] + Math.floor(remainingBudgetForMin / gardensForMinCount)) = Math.min(5, sortedFlowers[1]=4 + Math.floor(4 / 4)) = Math.min(5, 4+1) = 5`.
 * `maximumOverallBeauty = 0`. `currentRemainingBudget = 10`.
 * `mainLoopIterator = 0`:
 *   `sortedFlowers[0]=5 < 6`.
 *   `currentBeautyScore = 0 * 100 + 5 * 10 = 50`. `maximumOverallBeauty = 50`.
 *   `costToCompleteCurrent = 6 - 5 = 1`. `1 <= 10`. True.
 *   `currentRemainingBudget = 10 - 1 = 9`.
 *   `sortedFlowers[0] = 6`. `sortedFlowers` is now `[6, 4, 3, 2, 1]`.
 *   `adjustmentPointer = 1`.
 *   `while` loop: `adjustmentPointer <= mainLoopIterator` (1 <= 0) is false.
 *     `currentRemainingBudget < minimumCostToReachLevel[adjustmentPointer]` (9 < `minimumCostToReachLevel[1]=6`) is false.
 *     `adjustmentPointer > 0 && sortedFlowers[adjustmentPointer] === sortedFlowers[adjustmentPointer - 1]` (1>0 && `sortedFlowers[1]=4 === sortedFlowers[0]=6`) is false.
 *   `while` loop condition is false. `adjustmentPointer` remains `1`.
 *   `actualRemainingFlowers = 9 - minimumCostToReachLevel[1] = 9 - 6 = 3`.
 *   `totalGardensInMinGroup = 5 - 1 = 4`.
 *   `currentMinimumValue = Math.min(5, sortedFlowers[1]=4 + Math.floor(3 / 4)) = Math.min(5, 4+0) = 4`.
 * `mainLoopIterator = 1`:
 *   `sortedFlowers[1]=4 < 6`.
 *   `currentBeautyScore = 1 * 100 + 4 * 10 = 140`. `maximumOverallBeauty = 140`.
 *   `costToCompleteCurrent = 6 - 4 = 2`. `2 <= 9`. True.
 *   `currentRemainingBudget = 9 - 2 = 7`.
 *   `sortedFlowers[1] = 6`. `sortedFlowers` is now `[6, 6, 3, 2, 1]`.
 *   `adjustmentPointer = 1`.
 *   `while` loop: `adjustmentPointer <= mainLoopIterator` (1 <= 1) is true. `adjustmentPointer` becomes `2`.
 *   `while` loop re-evaluates: `adjustmentPointer <= mainLoopIterator` (2 <= 1) is false.
 *     `currentRemainingBudget < minimumCostToReachLevel[adjustmentPointer]` (7 < `minimumCostToReachLevel[2]=3`) is false.
 *     `adjustmentPointer > 0 && sortedFlowers[adjustmentPointer] === sortedFlowers[adjustmentPointer - 1]` (2>0 && `sortedFlowers[2]=3 === sortedFlowers[1]=6`) is false.
 *   `while` loop ends. `adjustmentPointer = 2`.
 *   `actualRemainingFlowers = 7 - minimumCostToReachLevel[2] = 7 - 3 = 4`.
 *   `totalGardensInMinGroup = 5 - 2 = 3`.
 *   `currentMinimumValue = Math.min(5, sortedFlowers[2]=3 + Math.floor(4 / 3)) = Math.min(5, 3+1) = 4`.
 * `mainLoopIterator = 2`:
 *   `sortedFlowers[2]=3 < 6`.
 *   `currentBeautyScore = 2 * 100 + 4 * 10 = 240`. `maximumOverallBeauty = 240`.
 *   `costToCompleteCurrent = 6 - 3 = 3`. `3 <= 7`. True.
 *   `currentRemainingBudget = 7 - 3 = 4`.
 *   `sortedFlowers[2] = 6`. `sortedFlowers` is now `[6, 6, 6, 2, 1]`.
 *   `adjustmentPointer = 2`.
 *   `while` loop: `adjustmentPointer <= mainLoopIterator` (2 <= 2) is true. `adjustmentPointer` becomes `3`.
 *   `while` loop re-evaluates: `adjustmentPointer <= mainLoopIterator` (3 <= 2) is false.
 *     `currentRemainingBudget < minimumCostToReachLevel[adjustmentPointer]` (4 < `minimumCostToReachLevel[3]=1`) is false.
 *     `adjustmentPointer > 0 && sortedFlowers[adjustmentPointer] === sortedFlowers[adjustmentPointer - 1]` (3>0 && `sortedFlowers[3]=2 === sortedFlowers[2]=6`) is false.
 *   `while` loop ends. `adjustmentPointer = 3`.
 *   `actualRemainingFlowers = 4 - minimumCostToReachLevel[3] = 4 - 1 = 3`.
 *   `totalGardensInMinGroup = 5 - 3 = 2`.
 *   `currentMinimumValue = Math.min(5, sortedFlowers[3]=2 + Math.floor(3 / 2)) = Math.min(5, 2+1) = 3`.
 * `mainLoopIterator = 3`:
 *   `sortedFlowers[3]=2 < 6`.
 *   `currentBeautyScore = 3 * 100 + 3 * 10 = 330`. `maximumOverallBeauty = 330`.
 *   `costToCompleteCurrent = 6 - 2 = 4`. `4 <= 4`. True.
 *   `currentRemainingBudget = 4 - 4 = 0`.
 *   `sortedFlowers[3] = 6`. `sortedFlowers` is now `[6, 6, 6, 6, 1]`.
 *   `adjustmentPointer = 3`.
 *   `while` loop: `adjustmentPointer <= mainLoopIterator` (3 <= 3) is true. `adjustmentPointer` becomes `4`.
 *   `while` loop re-evaluates: `adjustmentPointer <= mainLoopIterator` (4 <= 3) is false.
 *     `currentRemainingBudget < minimumCostToReachLevel[adjustmentPointer]` (0 < `minimumCostToReachLevel[4]=0`) is false.
 *     `adjustmentPointer > 0 && sortedFlowers[adjustmentPointer] === sortedFlowers[adjustmentPointer - 1]` (4>0 && `sortedFlowers[4]=1 === sortedFlowers[3]=6`) is false.
 *   `while` loop ends. `adjustmentPointer = 4`.
 *   `actualRemainingFlowers = 0 - minimumCostToReachLevel[4] = 0 - 0 = 0`.
 *   `totalGardensInMinGroup = 5 - 4 = 1`.
 *   `currentMinimumValue = Math.min(5, sortedFlowers[4]=1 + Math.floor(0 / 1)) = Math.min(5, 1+0) = 1`.
 * `mainLoopIterator = 4`:
 *   `sortedFlowers[4]=1 < 6`.
 *   `currentBeautyScore = 4 * 100 + 1 * 10 = 410`. `maximumOverallBeauty = 410`.
 *   `costToCompleteCurrent = 6 - 1 = 5`. `5 <= 0`. False. Break loop.
 * Final check: `sortedFlowers[gardenCount - 1] = sortedFlowers[4] = 1`. `1 >= 6` is false.
 * Return `410`.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maximumBeauty = function (
  initialFlowers,
  extraFlowersCount,
  completionTarget,
  fullReward,
  partialReward,
) {
  const gardenCount = initialFlowers.length;
  initialFlowers.sort((valueOne, valueTwo) => valueTwo - valueOne); // Sort descending

  const minimumCostToReachLevel = Array(gardenCount + 1).fill(0);
  let lastUniqueIdxForCost = gardenCount - 1;
  let currentCheckIdx = gardenCount - 2;

  for (; currentCheckIdx >= 0; --currentCheckIdx) {
    if (initialFlowers[currentCheckIdx] >= completionTarget) {
      break;
    }

    const flowerDifference =
      initialFlowers[currentCheckIdx] - initialFlowers[currentCheckIdx + 1];
    const suffixGardenCount = gardenCount - lastUniqueIdxForCost;
    minimumCostToReachLevel[currentCheckIdx] =
      minimumCostToReachLevel[currentCheckIdx + 1] +
      flowerDifference * suffixGardenCount;

    if (minimumCostToReachLevel[currentCheckIdx] > extraFlowersCount) {
      break;
    }

    if (
      initialFlowers[currentCheckIdx] !== initialFlowers[currentCheckIdx - 1]
    ) {
      lastUniqueIdxForCost = currentCheckIdx;
    }
  }

  ++currentCheckIdx;

  let remainingBudgetForMin =
    extraFlowersCount - minimumCostToReachLevel[currentCheckIdx];
  let gardensForMinCount = gardenCount - currentCheckIdx;
  let currentMinimumValue = Math.min(
    completionTarget - 1,
    initialFlowers[currentCheckIdx] +
      Math.floor(remainingBudgetForMin / gardensForMinCount),
  );

  let maximumOverallBeauty = 0;
  let currentRemainingBudget = extraFlowersCount;
  let adjustmentPointer = currentCheckIdx;

  for (
    let mainLoopIterator = 0;
    mainLoopIterator < gardenCount;
    ++mainLoopIterator
  ) {
    if (initialFlowers[mainLoopIterator] >= completionTarget) {
      continue;
    }

    const currentBeautyScore =
      mainLoopIterator * fullReward + currentMinimumValue * partialReward;
    maximumOverallBeauty = Math.max(maximumOverallBeauty, currentBeautyScore);

    const costToCompleteCurrent =
      completionTarget - initialFlowers[mainLoopIterator];
    if (costToCompleteCurrent > currentRemainingBudget) {
      break;
    }

    currentRemainingBudget -= costToCompleteCurrent;
    initialFlowers[mainLoopIterator] = completionTarget; // Mark as complete

    while (
      adjustmentPointer <= mainLoopIterator ||
      currentRemainingBudget < minimumCostToReachLevel[adjustmentPointer] ||
      (adjustmentPointer > 0 &&
        initialFlowers[adjustmentPointer] ===
          initialFlowers[adjustmentPointer - 1])
    ) {
      ++adjustmentPointer;
      if (
        adjustmentPointer > gardenCount - 1 &&
        !(
          adjustmentPointer > 0 &&
          initialFlowers[adjustmentPointer] ===
            initialFlowers[adjustmentPointer - 1]
        )
      ) {
        break;
      }
    }

    const actualRemainingFlowers =
      currentRemainingBudget - minimumCostToReachLevel[adjustmentPointer];
    const totalGardensInMinGroup = gardenCount - adjustmentPointer;
    currentMinimumValue = Math.min(
      completionTarget - 1,
      totalGardensInMinGroup > 0
        ? initialFlowers[adjustmentPointer] +
            Math.floor(actualRemainingFlowers / totalGardensInMinGroup)
        : 0,
    );
  }

  if (initialFlowers[gardenCount - 1] >= completionTarget) {
    maximumOverallBeauty = Math.max(
      maximumOverallBeauty,
      gardenCount * fullReward,
    );
  }

  return maximumOverallBeauty;
};
