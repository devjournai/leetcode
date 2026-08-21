/**
 * Maximum Building Height
 * Intuition: The maximum height for any building is determined by its explicit restrictions and by the height and position of neighboring restricted buildings due to the height difference rule. A two-pass dynamic programming approach from left-to-right and right-to-left can establish the true maximum height for each restricted building. Then, the tallest possible building can exist either at a restricted point or as a peak between two restricted points.
 * Approach:
 * 1. Preprocessing: Initialize a comprehensive list of restrictions. This includes the provided `restrictions`, an implicit restriction for building 1 (ID 1, height 0), and an implicit restriction for building `n` (ID `n`, max height `n-1` to cap growth from building 1). Sort this combined list by building ID.
 * 2. Forward Pass: Iterate through the sorted restrictions from left to right. For each restriction `i`, update its maximum allowed height. The new height is the minimum of its current specified maximum height and the maximum height it could achieve coming from the previous restriction `i-1` (which is `height[i-1] + (id[i] - id[i-1])`). This propagates left-to-right constraints.
 * 3. Backward Pass: Iterate through the updated restrictions from right to left. For each restriction `i`, further update its maximum allowed height. The new height is the minimum of its current height (after the forward pass) and the maximum height it could achieve coming from the next restriction `i+1` (which is `height[i+1] + (id[i+1] - id[i])`). After both passes, `restrictions[i][1]` will hold the absolute maximum possible height for building `restrictions[i][0]` given all explicit and adjacency rules.
 * 4. Maximum Peak Calculation: Iterate through adjacent pairs of restricted buildings in the final list. Between any two such buildings `(leftId, leftHeight)` and `(rightId, rightHeight)`, a peak can form. The maximum possible height in this segment can be calculated using the formula: `max(leftHeight, rightHeight) + floor((distance - abs(rightHeight - leftHeight)) / 2)`, where `distance` is `rightId - leftId`. The overall maximum height is the highest value found among all these potential peaks and the heights of the restricted buildings themselves.
 * Dry Run:
 * n = 5, restrictions = [[2,1],[4,2]]
 *
 * 1. Preprocessing:
 *    `initialRestrictionsArray` = [[2,1],[4,2]]
 *    Add [1,0] and [5, 5-1=4].
 *    `allRestrictionsData` = [[1,0], [2,1], [4,2], [5,4]] (sorted)
 *    `totalRestrictionEntries` = 4
 *
 * 2. Forward Pass (index `forwardPassIndex` from 1 to 3):
 *    - `forwardPassIndex` = 1 (current: [2,1], previous: [1,0]):
 *      `currentMaxHeightForward` = 1, `previousMaxHeightForward` = 0
 *      `possibleHeightFromPrev` = 0 + (2 - 1) = 1
 *      `allRestrictionsData`[1][1] = Math.min(1, 1) = 1
 *      `allRestrictionsData`: [[1,0], [2,1], [4,2], [5,4]]
 *    - `forwardPassIndex` = 2 (current: [4,2], previous: [2,1]):
 *      `currentMaxHeightForward` = 2, `previousMaxHeightForward` = 1
 *      `possibleHeightFromPrev` = 1 + (4 - 2) = 3
 *      `allRestrictionsData`[2][1] = Math.min(2, 3) = 2
 *      `allRestrictionsData`: [[1,0], [2,1], [4,2], [5,4]]
 *    - `forwardPassIndex` = 3 (current: [5,4], previous: [4,2]):
 *      `currentMaxHeightForward` = 4, `previousMaxHeightForward` = 2
 *      `possibleHeightFromPrev` = 2 + (5 - 4) = 3
 *      `allRestrictionsData`[3][1] = Math.min(4, 3) = 3
 *      `allRestrictionsData`: [[1,0], [2,1], [4,2], [5,3]]
 *
 * 3. Backward Pass (index `backwardPassIndex` from 2 down to 0):
 *    - `backwardPassIndex` = 2 (current: [4,2], next: [5,3]):
 *      `currentMaxHeightBackward` = 2, `nextMaxHeightBackward` = 3
 *      `possibleHeightFromNext` = 3 + (5 - 4) = 4
 *      `allRestrictionsData`[2][1] = Math.min(2, 4) = 2
 *      `allRestrictionsData`: [[1,0], [2,1], [4,2], [5,3]] (no change)
 *    - `backwardPassIndex` = 1 (current: [2,1], next: [4,2]):
 *      `currentMaxHeightBackward` = 1, `nextMaxHeightBackward` = 2
 *      `possibleHeightFromNext` = 2 + (4 - 2) = 4
 *      `allRestrictionsData`[1][1] = Math.min(1, 4) = 1
 *      `allRestrictionsData`: [[1,0], [2,1], [4,2], [5,3]] (no change)
 *    - `backwardPassIndex` = 0 (current: [1,0], next: [2,1]):
 *      `currentMaxHeightBackward` = 0, `nextMaxHeightBackward` = 1
 *      `possibleHeightFromNext` = 1 + (2 - 1) = 2
 *      `allRestrictionsData`[0][1] = Math.min(0, 2) = 0
 *      `allRestrictionsData`: [[1,0], [2,1], [4,2], [5,3]] (no change)
 *    After passes, `allRestrictionsData`: [[1,0], [2,1], [4,2], [5,3]]
 *
 * 4. Maximum Peak Calculation (`maximumOverallHeight` initialized to 0, `peakCalculationIndex` from 1 to 3):
 *    - `peakCalculationIndex` = 1 (left: [1,0], right: [2,1]):
 *      `leftSegmentId`=1, `leftSegmentHeight`=0, `rightSegmentId`=2, `rightSegmentHeight`=1
 *      `segmentIdentifierDistance` = 2 - 1 = 1
 *      `segmentHeightDifferenceValue` = Math.abs(1 - 0) = 1
 *      `potentialPeakHeight` = Math.max(0, 1) + Math.floor((1 - 1) / 2) = 1 + 0 = 1
 *      `maximumOverallHeight` = Math.max(0, 1) = 1
 *    - `peakCalculationIndex` = 2 (left: [2,1], right: [4,2]):
 *      `leftSegmentId`=2, `leftSegmentHeight`=1, `rightSegmentId`=4, `rightSegmentHeight`=2
 *      `segmentIdentifierDistance` = 4 - 2 = 2
 *      `segmentHeightDifferenceValue` = Math.abs(2 - 1) = 1
 *      `potentialPeakHeight` = Math.max(1, 2) + Math.floor((2 - 1) / 2) = 2 + 0 = 2
 *      `maximumOverallHeight` = Math.max(1, 2) = 2
 *    - `peakCalculationIndex` = 3 (left: [4,2], right: [5,3]):
 *      `leftSegmentId`=4, `leftSegmentHeight`=2, `rightSegmentId`=5, `rightSegmentHeight`=3
 *      `segmentIdentifierDistance` = 5 - 4 = 1
 *      `segmentHeightDifferenceValue` = Math.abs(3 - 2) = 1
 *      `potentialPeakHeight` = Math.max(2, 3) + Math.floor((1 - 1) / 2) = 3 + 0 = 3
 *      `maximumOverallHeight` = Math.max(2, 3) = 3
 *
 * Final Result: 3
 *
 * Time Complexity: O(R log R)
 * Space Complexity: O(R)
 */
var maxBuilding = function (n, restrictions) {
  const numBuildings = n;
  const initialRestrictionsArray = restrictions;

  const allRestrictionsData = initialRestrictionsArray.slice();
  allRestrictionsData.push([1, 0]);
  allRestrictionsData.push([numBuildings, numBuildings - 1]);

  allRestrictionsData.sort(
    (restrictionA, restrictionB) => restrictionA[0] - restrictionB[0]
  );

  const totalRestrictionEntries = allRestrictionsData.length;

  for (
    let forwardPassIndex = 1;
    forwardPassIndex < totalRestrictionEntries;
    forwardPassIndex++
  ) {
    const currentEntryForward = allRestrictionsData[forwardPassIndex];
    const previousEntryForward = allRestrictionsData[forwardPassIndex - 1];

    const currentIdForward = currentEntryForward[0];
    const currentMaxHeightForward = currentEntryForward[1];
    const previousIdForward = previousEntryForward[0];
    const previousMaxHeightForward = previousEntryForward[1];

    const possibleHeightFromPrev =
      previousMaxHeightForward + (currentIdForward - previousIdForward);
    const finalHeightAfterForwardPass = Math.min(
      currentMaxHeightForward,
      possibleHeightFromPrev
    );
    allRestrictionsData[forwardPassIndex][1] = finalHeightAfterForwardPass;
  }

  for (
    let backwardPassIndex = totalRestrictionEntries - 2;
    backwardPassIndex >= 0;
    backwardPassIndex--
  ) {
    const currentEntryBackward = allRestrictionsData[backwardPassIndex];
    const nextEntryBackward = allRestrictionsData[backwardPassIndex + 1];

    const currentIdBackward = currentEntryBackward[0];
    const currentMaxHeightBackward = currentEntryBackward[1];
    const nextIdBackward = nextEntryBackward[0];
    const nextMaxHeightBackward = nextEntryBackward[1];

    const possibleHeightFromNext =
      nextMaxHeightBackward + (nextIdBackward - currentIdBackward);
    const finalHeightAfterBackwardPass = Math.min(
      currentMaxHeightBackward,
      possibleHeightFromNext
    );
    allRestrictionsData[backwardPassIndex][1] = finalHeightAfterBackwardPass;
  }

  let maximumOverallHeight = 0;

  for (
    let peakCalculationIndex = 1;
    peakCalculationIndex < totalRestrictionEntries;
    peakCalculationIndex++
  ) {
    const leftSegmentEntry = allRestrictionsData[peakCalculationIndex - 1];
    const rightSegmentEntry = allRestrictionsData[peakCalculationIndex];

    const leftSegmentId = leftSegmentEntry[0];
    const leftSegmentHeight = leftSegmentEntry[1];
    const rightSegmentId = rightSegmentEntry[0];
    const rightSegmentHeight = rightSegmentEntry[1];

    const segmentIdentifierDistance = rightSegmentId - leftSegmentId;
    const segmentHeightDifferenceValue = Math.abs(
      rightSegmentHeight - leftSegmentHeight
    );

    const potentialPeakHeight =
      Math.max(leftSegmentHeight, rightSegmentHeight) +
      Math.floor(
        (segmentIdentifierDistance - segmentHeightDifferenceValue) / 2
      );
    maximumOverallHeight = Math.max(maximumOverallHeight, potentialPeakHeight);
  }

  return maximumOverallHeight;
};
