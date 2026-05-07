/**
 * Longest Common Subpath
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
        friendPathCurrentHash,
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
          friendPathCurrentHash,
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
