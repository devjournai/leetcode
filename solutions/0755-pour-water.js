/**
 * Pour Water
 * Intuition: Each drop falls at `initialDropPoint` and first seeks the leftmost lower surface (terrain + water), else the rightmost lower surface, else stays. Repeat `totalWaterUnits` times.
 * Approach: 1. Keep `waterAmounts` per index. 2. For each drop, scan left from `initialDropPoint - 1`; track `candidateLeftIndex` whenever the combined height is strictly lower; stop when a cell is strictly higher. 3. If a left candidate exists, land there; else scan right the same way. 4. Increment `waterAmounts[finalLandingSpot]`. 5. Return `terrainElevation[i] + waterAmounts[i]` for all i.
 * Dry Run: terrainElevation = [2,1,1,2,1,2,2], totalWaterUnits = 4, initialDropPoint = 3.
 *   - Drop 1: left finds index 1 (height 1) → land 1.
 *   - Drop 2: left finds index 2 → land 2.
 *   - Drop 3: left is flat at 2; right finds index 4 → land 4.
 *   - Drop 4: no lower left/right → land 3. Heights become [2,2,2,3,2,2,2].
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
