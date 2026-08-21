/**
 * Longest Common Subpath
 * Intuition: If a common subpath of length `L` exists, every shorter length also exists, so binary search `L`. For a candidate length, rolling hashes on the shortest path collect windows, then each other path keeps only windows whose hash (and actual cities) still match the remaining set.
 * Approach: 1. Sort paths by length; search `searchLow..searchHigh` on the shortest path. 2. `checkIfSubpathExists` hashes every window of length `mid` on path 0 into a map of start indices. 3. For each later path, rebuild the map with windows whose hash matches and whose cities equal the original window. 4. Return false if the map empties; otherwise raise the binary-search bound.
 * Dry Run: paths = [[1,2,3,4], [2,3,4], [2,3]].
 *   - mid=2: windows of path0 include [2,3] and [3,4]; both later paths contain [2,3] → ok, foundLength=2
 *   - mid=3: [2,3,4] is not in the third path → fail. Answer 2.
 * Time Complexity: O(log(min_path_len) * total_path_len)
 * Space Complexity: O(total_path_len)
 */
var longestCommonSubpath = function (cityCount, allPaths) {
  if (allPaths.length === 0) {
    return 0;
  }

  allPaths.sort((pathA, pathB) => pathA.length - pathB.length);

  let searchLow = 0;
  let searchHigh = allPaths[0].length;
  let foundLength = 0;

  while (searchLow <= searchHigh) {
    const currentMidLength = Math.floor((searchLow + searchHigh) / 2);

    if (checkIfSubpathExists(allPaths, currentMidLength, cityCount)) {
      foundLength = currentMidLength;
      searchLow = currentMidLength + 1;
    } else {
      searchHigh = currentMidLength - 1;
    }
  }

  return foundLength;
};

function checkIfSubpathExists(friendPaths, subpathLengthToCheck, maxCityId) {
  if (subpathLengthToCheck === 0) {
    return true;
  }

  const primaryPath = friendPaths[0];
  if (primaryPath.length < subpathLengthToCheck) {
    return false;
  }

  const modulusPrime = 1000000007;
  const hashBase = 100003;

  let basePowerHighest = 1;
  for (
    let powerIndex = 0;
    powerIndex < subpathLengthToCheck - 1;
    powerIndex++
  ) {
    basePowerHighest = (basePowerHighest * hashBase) % modulusPrime;
  }

  let commonPathHashesAndIndices = new Map();

  let currentHashValue = 0;
  for (
    let segmentIndex = 0;
    segmentIndex < subpathLengthToCheck;
    segmentIndex++
  ) {
    currentHashValue =
      (currentHashValue * hashBase + primaryPath[segmentIndex]) % modulusPrime;
  }

  if (!commonPathHashesAndIndices.has(currentHashValue)) {
    commonPathHashesAndIndices.set(currentHashValue, []);
  }
  commonPathHashesAndIndices.get(currentHashValue).push(0);

  for (
    let windowStartIndex = 1;
    windowStartIndex <= primaryPath.length - subpathLengthToCheck;
    windowStartIndex++
  ) {
    currentHashValue =
      (((currentHashValue -
        ((primaryPath[windowStartIndex - 1] * basePowerHighest) %
          modulusPrime) +
        modulusPrime) %
        modulusPrime) *
        hashBase +
        primaryPath[windowStartIndex + subpathLengthToCheck - 1]) %
      modulusPrime;

    if (!commonPathHashesAndIndices.has(currentHashValue)) {
      commonPathHashesAndIndices.set(currentHashValue, []);
    }
    commonPathHashesAndIndices.get(currentHashValue).push(windowStartIndex);
  }

  for (let pathIndex = 1; pathIndex < friendPaths.length; pathIndex++) {
    const currentFriendPath = friendPaths[pathIndex];

    if (currentFriendPath.length < subpathLengthToCheck) {
      return false;
    }

    const nextCommonPathHashes = new Map();

    let friendPathCurrentHash = 0;
    for (
      let initialSegment = 0;
      initialSegment < subpathLengthToCheck;
      initialSegment++
    ) {
      friendPathCurrentHash =
        (friendPathCurrentHash * hashBase + currentFriendPath[initialSegment]) %
        modulusPrime;
    }

    if (commonPathHashesAndIndices.has(friendPathCurrentHash)) {
      const potentialStartPositions = commonPathHashesAndIndices.get(
        friendPathCurrentHash
      );
      for (const originalPathStart of potentialStartPositions) {
        let actualMatchFound = true;
        for (
          let comparisonOffset = 0;
          comparisonOffset < subpathLengthToCheck;
          comparisonOffset++
        ) {
          if (
            primaryPath[originalPathStart + comparisonOffset] !==
            currentFriendPath[comparisonOffset]
          ) {
            actualMatchFound = false;
            break;
          }
        }

        if (actualMatchFound) {
          if (!nextCommonPathHashes.has(friendPathCurrentHash)) {
            nextCommonPathHashes.set(friendPathCurrentHash, []);
          }
          nextCommonPathHashes
            .get(friendPathCurrentHash)
            .push(originalPathStart);
          break;
        }
      }
    }

    for (
      let pathSegmentStart = 1;
      pathSegmentStart <= currentFriendPath.length - subpathLengthToCheck;
      pathSegmentStart++
    ) {
      friendPathCurrentHash =
        (((friendPathCurrentHash -
          ((currentFriendPath[pathSegmentStart - 1] * basePowerHighest) %
            modulusPrime) +
          modulusPrime) %
          modulusPrime) *
          hashBase +
          currentFriendPath[pathSegmentStart + subpathLengthToCheck - 1]) %
        modulusPrime;

      if (commonPathHashesAndIndices.has(friendPathCurrentHash)) {
        const potentialStartPositions = commonPathHashesAndIndices.get(
          friendPathCurrentHash
        );
        for (const originalPathStart of potentialStartPositions) {
          let actualMatchFound = true;
          for (
            let comparisonOffset = 0;
            comparisonOffset < subpathLengthToCheck;
            comparisonOffset++
          ) {
            if (
              primaryPath[originalPathStart + comparisonOffset] !==
              currentFriendPath[pathSegmentStart + comparisonOffset]
            ) {
              actualMatchFound = false;
              break;
            }
          }

          if (actualMatchFound) {
            if (!nextCommonPathHashes.has(friendPathCurrentHash)) {
              nextCommonPathHashes.set(friendPathCurrentHash, []);
            }
            nextCommonPathHashes
              .get(friendPathCurrentHash)
              .push(originalPathStart);
            break;
          }
        }
      }
    }

    if (nextCommonPathHashes.size === 0) {
      return false;
    }

    commonPathHashesAndIndices = nextCommonPathHashes;
  }

  return commonPathHashesAndIndices.size > 0;
}
