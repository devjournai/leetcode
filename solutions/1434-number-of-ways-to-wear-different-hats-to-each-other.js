/**
 * Number Of Ways To Wear Different Hats To Each Other
 * Intuition: People are few (n<=10) and hats are many. DP over which people already have a hat while iterating hats 1..40; each hat can be skipped or given to someone who likes it and is still hatless.
 * Approach: 1. Build hatToIndividualMapping[hat] = people who like it. 2. dp[mask] = ways to assign processed hats so that mask people are assigned. 3. For each hat, copy dp then for each person who likes it, add dp[mask] into next[mask | personBit] when that bit is off. 4. Return dp[full mask] mod 1e9+7.
 * Dry Run: hats = [[3,4],[4,5],[5]]
 *   - hat 3 can go to person 0; hat 4 to 0 or 1; hat 5 to 1 or 2
 *   - DP fills until all three people are assigned. Result 4.
 * Time Complexity: O(H * N * 2^N)
 * Space Complexity: O(H + 2^N)
 */
var numberWays = function (hats) {
  const totalIndividuals = hats.length;
  const maximumMaskValue = 1 << totalIndividuals;
  const resultModulus = 1e9 + 7;

  const hatToIndividualMapping = Array(41)
    .fill()
    .map(() => []);

  for (let personIdx = 0; personIdx < totalIndividuals; personIdx++) {
    for (const hatPreference of hats[personIdx]) {
      hatToIndividualMapping[hatPreference].push(personIdx);
    }
  }

  const dpCurrentState = Array(maximumMaskValue).fill(0);
  dpCurrentState[0] = 1;

  for (let currentHatId = 1; currentHatId <= 40; currentHatId++) {
    const peopleWhoLikeCurrentHat = hatToIndividualMapping[currentHatId];

    const dpNextState = Array(maximumMaskValue).fill(0);
    for (
      let maskCopyIterator = 0;
      maskCopyIterator < maximumMaskValue;
      maskCopyIterator++
    ) {
      dpNextState[maskCopyIterator] = dpCurrentState[maskCopyIterator];
    }

    for (let personIterator of peopleWhoLikeCurrentHat) {
      const personBitRepresentation = 1 << personIterator;

      for (
        let currentPeopleCombination = 0;
        currentPeopleCombination < maximumMaskValue;
        currentPeopleCombination++
      ) {
        if (!(currentPeopleCombination & personBitRepresentation)) {
          const updatedPeopleCombination =
            currentPeopleCombination | personBitRepresentation;
          dpNextState[updatedPeopleCombination] =
            (dpNextState[updatedPeopleCombination] +
              dpCurrentState[currentPeopleCombination]) %
            resultModulus;
        }
      }
    }

    for (
      let finalMaskUpdateIterator = 0;
      finalMaskUpdateIterator < maximumMaskValue;
      finalMaskUpdateIterator++
    ) {
      dpCurrentState[finalMaskUpdateIterator] =
        dpNextState[finalMaskUpdateIterator];
    }
  }

  return dpCurrentState[maximumMaskValue - 1];
};
