/**
 * 3sum With Multiplicity
 * Time Complexity: O(N + M^2)
 * Space Complexity: O(M)
 */
var threeSumMulti = function (inputArray, target) {
  const modulusValue = 1e9 + 7;
  const maximumPossibleValue = 100;

  const valueFrequencies = new Array(maximumPossibleValue + 1).fill(0);
  for (const numberInstance of inputArray) {
    valueFrequencies[numberInstance]++;
  }

  let currentTotalTuples = 0;

  for (let indexOne = 0; indexOne <= maximumPossibleValue; indexOne++) {
    const frequencyOne = valueFrequencies[indexOne];
    if (frequencyOne === 0) {
      continue;
    }

    for (
      let indexTwo = indexOne;
      indexTwo <= maximumPossibleValue;
      indexTwo++
    ) {
      const frequencyTwo = valueFrequencies[indexTwo];
      if (frequencyTwo === 0) {
        continue;
      }

      const indexThree = target - indexOne - indexTwo;

      if (indexThree < indexTwo || indexThree > maximumPossibleValue) {
        continue;
      }

      const frequencyThree = valueFrequencies[indexThree];
      if (frequencyThree === 0) {
        continue;
      }

      let tripletCombinations = 0;

      if (indexOne === indexTwo && indexTwo === indexThree) {
        tripletCombinations =
          (frequencyOne * (frequencyOne - 1) * (frequencyOne - 2)) / 6;
      } else if (indexOne === indexTwo) {
        tripletCombinations =
          (frequencyOne * (frequencyOne - 1) * frequencyThree) / 2;
      } else if (indexTwo === indexThree) {
        tripletCombinations =
          (frequencyOne * frequencyTwo * (frequencyTwo - 1)) / 2;
      } else {
        tripletCombinations = frequencyOne * frequencyTwo * frequencyThree;
      }

      currentTotalTuples =
        (currentTotalTuples + tripletCombinations) % modulusValue;
    }
  }

  return currentTotalTuples;
};
