/**
 * Dice Roll Simulation
 * Intuition: Count n-roll sequences by last face and current consecutive streak, never exceeding rollMax[face].
 * Approach: 1. dp[len][face][streak]. Seed length 1 with streak 1. 2. A new streak-1 of face f is all previous sequences not ending in f. 3. Streak k≥2 copies previous streak k-1 of the same face if allowed. 4. Sum dp[n] mod 10^9+7.
 * Dry Run: n=2, rollMax all 1. Cannot repeat; 6*5=30.
 * Time Complexity: O(n * F * R_max)
 * Space Complexity: O(n * F * R_max)
 */
var dieSimulator = function (n, rollMax) {
  const moduloConstant = 1000000007;
  const totalDiceFaces = 6;
  const maximumRollConstraint = 15;

  const dynamicProgram = new Array(n + 1)
    .fill(0)
    .map(() =>
      new Array(totalDiceFaces)
        .fill(0)
        .map(() => new Array(maximumRollConstraint + 1).fill(0))
    );

  const initialRoll = 1;
  for (let faceIndex = 0; faceIndex < totalDiceFaces; faceIndex++) {
    dynamicProgram[initialRoll][faceIndex][1] = 1;
  }

  for (let rollIteration = 2; rollIteration <= n; rollIteration++) {
    let totalPreviousCombinations = 0;
    const waysEndingByFacePrevious = new Array(totalDiceFaces).fill(0);

    for (
      let previousFaceIndex = 0;
      previousFaceIndex < totalDiceFaces;
      previousFaceIndex++
    ) {
      for (
        let previousConsecutiveCount = 1;
        previousConsecutiveCount <= rollMax[previousFaceIndex];
        previousConsecutiveCount++
      ) {
        const valueFromPrevious =
          dynamicProgram[rollIteration - 1][previousFaceIndex][
            previousConsecutiveCount
          ];
        totalPreviousCombinations =
          (totalPreviousCombinations + valueFromPrevious) % moduloConstant;
        waysEndingByFacePrevious[previousFaceIndex] =
          (waysEndingByFacePrevious[previousFaceIndex] + valueFromPrevious) %
          moduloConstant;
      }
    }

    for (
      let currentFaceIndex = 0;
      currentFaceIndex < totalDiceFaces;
      currentFaceIndex++
    ) {
      const sequencesStartingNewStreak =
        (totalPreviousCombinations -
          waysEndingByFacePrevious[currentFaceIndex] +
          moduloConstant) %
        moduloConstant;
      dynamicProgram[rollIteration][currentFaceIndex][1] =
        sequencesStartingNewStreak;

      for (
        let consecutiveStreakLength = 2;
        consecutiveStreakLength <= rollMax[currentFaceIndex];
        consecutiveStreakLength++
      ) {
        dynamicProgram[rollIteration][currentFaceIndex][
          consecutiveStreakLength
        ] =
          dynamicProgram[rollIteration - 1][currentFaceIndex][
            consecutiveStreakLength - 1
          ];
      }
    }
  }

  let finalSequenceCount = 0;
  for (let finalFaceType = 0; finalFaceType < totalDiceFaces; finalFaceType++) {
    for (
      let finalConsecutiveStreak = 1;
      finalConsecutiveStreak <= rollMax[finalFaceType];
      finalConsecutiveStreak++
    ) {
      finalSequenceCount =
        (finalSequenceCount +
          dynamicProgram[n][finalFaceType][finalConsecutiveStreak]) %
        moduloConstant;
    }
  }

  return finalSequenceCount;
};
