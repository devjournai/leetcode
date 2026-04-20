/**
 * Allocate Mailboxes
 * Time Complexity: O(N^2 * K)
 * Space Complexity: O(N^2)
 */
var minDistance = function (houseLocations, kMailboxes) {
  houseLocations.sort(
    (firstElement, secondElement) => firstElement - secondElement,
  );
  const totalHouseCount = houseLocations.length;

  const prefixSumsArray = new Array(totalHouseCount + 1).fill(0);
  for (
    let currentHouseIndex = 0;
    currentHouseIndex < totalHouseCount;
    currentHouseIndex++
  ) {
    prefixSumsArray[currentHouseIndex + 1] =
      prefixSumsArray[currentHouseIndex] + houseLocations[currentHouseIndex];
  }

  const singleMailboxCostMatrix = Array(totalHouseCount)
    .fill(0)
    .map(() => Array(totalHouseCount).fill(0));
  for (
    let startHouseAddress = 0;
    startHouseAddress < totalHouseCount;
    startHouseAddress++
  ) {
    for (
      let endHouseAddress = startHouseAddress;
      endHouseAddress < totalHouseCount;
      endHouseAddress++
    ) {
      const medianPositionIndex = Math.floor(
        (startHouseAddress + endHouseAddress) / 2,
      );
      const medianHouseValue = houseLocations[medianPositionIndex];

      const costToLeft =
        (medianPositionIndex - startHouseAddress + 1) * medianHouseValue -
        (prefixSumsArray[medianPositionIndex + 1] -
          prefixSumsArray[startHouseAddress]);
      const costToRight =
        prefixSumsArray[endHouseAddress + 1] -
        prefixSumsArray[medianPositionIndex + 1] -
        (endHouseAddress - medianPositionIndex) * medianHouseValue;

      singleMailboxCostMatrix[startHouseAddress][endHouseAddress] =
        costToLeft + costToRight;
    }
  }

  const memoizationStore = new Map();

  function calculateMinTotalDistance(
    currentLocationOffset,
    mailboxesRemainingCount,
  ) {
    if (currentLocationOffset === totalHouseCount) {
      return mailboxesRemainingCount === 0 ? 0 : Infinity;
    }
    if (mailboxesRemainingCount === 0) {
      return Infinity;
    }

    const dpStateKey = `${currentLocationOffset}_${mailboxesRemainingCount}`;
    if (memoizationStore.has(dpStateKey)) {
      return memoizationStore.get(dpStateKey);
    }

    let overallMinimumDistance = Infinity;
    for (
      let segmentEndIndex = currentLocationOffset;
      segmentEndIndex < totalHouseCount &&
      totalHouseCount - segmentEndIndex >= mailboxesRemainingCount;
      segmentEndIndex++
    ) {
      const costForCurrentMailbox =
        singleMailboxCostMatrix[currentLocationOffset][segmentEndIndex];
      const resultForRemaining = calculateMinTotalDistance(
        segmentEndIndex + 1,
        mailboxesRemainingCount - 1,
      );

      if (resultForRemaining !== Infinity) {
        overallMinimumDistance = Math.min(
          overallMinimumDistance,
          costForCurrentMailbox + resultForRemaining,
        );
      }
    }

    memoizationStore.set(dpStateKey, overallMinimumDistance);
    return overallMinimumDistance;
  }

  return calculateMinTotalDistance(0, kMailboxes);
};
