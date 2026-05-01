/**
 * Maximum Building Height
 * Time Complexity: O(R log R)
 * Space Complexity: O(R)
 */
var maxBuilding = function (n, restrictions) {
  let buildingConstraints = [...restrictions];

  const firstBuildingDatum = [1, 0];
  buildingConstraints.push(firstBuildingDatum);

  const lastBuildingBoundary = [n, n - 1];
  buildingConstraints.push(lastBuildingBoundary);

  buildingConstraints.sort((itemA, itemB) => itemA[0] - itemB[0]);

  const constraintCount = buildingConstraints.length;

  for (let forwardIndex = 1; forwardIndex < constraintCount; forwardIndex++) {
    const currentBuildingIdentifier = buildingConstraints[forwardIndex][0];
    const currentMaximumHeight = buildingConstraints[forwardIndex][1];

    const previousBuildingIdentifier = buildingConstraints[forwardIndex - 1][0];
    const previousMaximumHeight = buildingConstraints[forwardIndex - 1][1];

    const calculatedMaxHeightForward =
      previousMaximumHeight +
      (currentBuildingIdentifier - previousBuildingIdentifier);
    buildingConstraints[forwardIndex][1] = Math.min(
      currentMaximumHeight,
      calculatedMaxHeightForward,
    );
  }

  for (
    let backwardIndex = constraintCount - 2;
    backwardIndex >= 0;
    backwardIndex--
  ) {
    const currentRestrictionId = buildingConstraints[backwardIndex][0];
    const currentRestrictionHeight = buildingConstraints[backwardIndex][1];

    const nextRestrictionId = buildingConstraints[backwardIndex + 1][0];
    const nextRestrictionHeight = buildingConstraints[backwardIndex + 1][1];

    const calculatedMaxHeightBackward =
      nextRestrictionHeight + (nextRestrictionId - currentRestrictionId);
    buildingConstraints[backwardIndex][1] = Math.min(
      currentRestrictionHeight,
      calculatedMaxHeightBackward,
    );
  }

  let overallMaxHeight = 0;

  for (let segmentIndex = 1; segmentIndex < constraintCount; segmentIndex++) {
    const leftBoundaryId = buildingConstraints[segmentIndex - 1][0];
    const leftBoundaryHeight = buildingConstraints[segmentIndex - 1][1];

    const rightBoundaryId = buildingConstraints[segmentIndex][0];
    const rightBoundaryHeight = buildingConstraints[segmentIndex][1];

    const segmentLength = rightBoundaryId - leftBoundaryId;
    const heightDifferenceAbs = Math.abs(
      rightBoundaryHeight - leftBoundaryHeight,
    );

    const potentialPeakHeight =
      Math.max(leftBoundaryHeight, rightBoundaryHeight) +
      Math.floor((segmentLength - heightDifferenceAbs) / 2);

    overallMaxHeight = Math.max(overallMaxHeight, potentialPeakHeight);
  }

  return overallMaxHeight;
};
