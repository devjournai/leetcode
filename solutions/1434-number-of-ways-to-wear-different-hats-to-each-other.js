/**
 * Number Of Ways To Wear Different Hats To Each Other
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
