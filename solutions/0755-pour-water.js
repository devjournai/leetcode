/**
 * Pour Water
 * Time Complexity: O(V * N)
 * Space Complexity: O(N)
 */
var pourWater = function (terrainElevation, totalWaterUnits, initialDropPoint) {
  const mapLength = terrainElevation.length;
  const waterAmounts = new Array(mapLength).fill(0);

  let dropsAccumulated = 0;
  while (dropsAccumulated < totalWaterUnits) {
    let finalLandingSpot = initialDropPoint;

    let currentLeftCheckIndex = initialDropPoint - 1;
    let lowestLevelAchievedLeft =
      terrainElevation[initialDropPoint] + waterAmounts[initialDropPoint];
    let candidateLeftIndex = initialDropPoint;

    while (currentLeftCheckIndex >= 0) {
      const levelAtLeftCandidate =
        terrainElevation[currentLeftCheckIndex] +
        waterAmounts[currentLeftCheckIndex];
      if (levelAtLeftCandidate < lowestLevelAchievedLeft) {
        lowestLevelAchievedLeft = levelAtLeftCandidate;
        candidateLeftIndex = currentLeftCheckIndex;
      } else if (levelAtLeftCandidate > lowestLevelAchievedLeft) {
        break;
      }
      currentLeftCheckIndex--;
    }

    if (candidateLeftIndex !== initialDropPoint) {
      finalLandingSpot = candidateLeftIndex;
    } else {
      let currentRightCheckIndex = initialDropPoint + 1;
      let lowestLevelAchievedRight =
        terrainElevation[initialDropPoint] + waterAmounts[initialDropPoint];
      let candidateRightIndex = initialDropPoint;

      while (currentRightCheckIndex < mapLength) {
        const levelAtRightCandidate =
          terrainElevation[currentRightCheckIndex] +
          waterAmounts[currentRightCheckIndex];
        if (levelAtRightCandidate < lowestLevelAchievedRight) {
          lowestLevelAchievedRight = levelAtRightCandidate;
          candidateRightIndex = currentRightCheckIndex;
        } else if (levelAtRightCandidate > lowestLevelAchievedRight) {
          break;
        }
        currentRightCheckIndex++;
      }

      if (candidateRightIndex !== initialDropPoint) {
        finalLandingSpot = candidateRightIndex;
      }
    }

    waterAmounts[finalLandingSpot]++;
    dropsAccumulated++;
  }

  const resultLevels = new Array(mapLength);
  let processIndex = 0;
  while (processIndex < mapLength) {
    resultLevels[processIndex] =
      terrainElevation[processIndex] + waterAmounts[processIndex];
    processIndex++;
  }

  return resultLevels;
};
