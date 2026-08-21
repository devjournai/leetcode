/**
 * Maximum Candies You Can Get From Boxes
 * Intuition: Process found boxes in a queue. Open ones add candies, keys, and nested boxes; closed ones wait until a key appears, then re-queue.
 * Approach: 1. Queue initialBoxes. 2. If status is open, add candies, record keys, enqueue contained boxes. 3. Else store in pendingClosedBoxes. 4. After each dequeue, reopen any pending box whose key was obtained. 5. Return accumulatedCandies.
 * Dry Run: status=[1,0,1], candies=[7,5,4], keys=[[],[],[]], contained=[[1,2],[],[]], initial=[0]
 *   Open 0 get 7 and boxes 1,2. 1 is closed no key stays pending. Open 2 get 4. Total 11.
 * Time Complexity: O(N^2 + E_k + E_c)
 * Space Complexity: O(N)
 */
var maxCandies = function (
  status,
  candies,
  keys,
  containedBoxes,
  initialBoxes
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
