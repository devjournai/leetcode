/**
 * Maximum Candies You Can Get From Boxes
 * Time Complexity: O(N^2 + E_k + E_c)
 * Space Complexity: O(N)
 */
var maxCandies = function (
  status,
  candies,
  keys,
  containedBoxes,
  initialBoxes,
) {
  let accumulatedCandies = 0;
  const boxDiscoveryQueue = [...initialBoxes];
  const obtainedKeyIdentifiers = new Set();
  const pendingClosedBoxes = new Set();

  let currentBoxIdentifier;
  while ((currentBoxIdentifier = boxDiscoveryQueue.shift()) !== undefined) {
    if (status[currentBoxIdentifier] === 1) {
      accumulatedCandies += candies[currentBoxIdentifier];

      const currentBoxKeyList = keys[currentBoxIdentifier];
      for (let keyIndex = 0; keyIndex < currentBoxKeyList.length; ++keyIndex) {
        const keyToAcquire = currentBoxKeyList[keyIndex];
        obtainedKeyIdentifiers.add(keyToAcquire);
      }

      const internalBoxesList = containedBoxes[currentBoxIdentifier];
      for (
        let internalBoxIndex = 0;
        internalBoxIndex < internalBoxesList.length;
        ++internalBoxIndex
      ) {
        const foundInternalBoxId = internalBoxesList[internalBoxIndex];
        boxDiscoveryQueue.push(foundInternalBoxId);
      }
    } else {
      pendingClosedBoxes.add(currentBoxIdentifier);
    }

    const boxesToRecheckArray = Array.from(pendingClosedBoxes);
    for (
      let recheckIndex = 0;
      recheckIndex < boxesToRecheckArray.length;
      ++recheckIndex
    ) {
      const boxPendingRecheck = boxesToRecheckArray[recheckIndex];
      if (obtainedKeyIdentifiers.has(boxPendingRecheck)) {
        status[boxPendingRecheck] = 1;
        pendingClosedBoxes.delete(boxPendingRecheck);
        boxDiscoveryQueue.push(boxPendingRecheck);
      }
    }
  }

  return accumulatedCandies;
};
