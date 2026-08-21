/**
 * 3sum With Multiplicity
 * Intuition: Values are 0–100, so count frequencies and enumerate a≤b≤c with a+b+c=target, using combinations for equal values.
 * Approach: 1. Fill `valueFrequencies[0..100]`. 2. Nested loops indexOne≤indexTwo; indexThree=target−a−b, require c≥b and c≤100. 3. Combinations: all equal nC3; a=b≠c nC2*freq_c; a≠b=c freq_a*nC2; else product of three freqs. 4. Sum mod 1e9+7.
 * Dry Run: [1,1,2,2,3,3,4,4,5,5], target=8. (1,2,5)=8; (1,3,4)=8; (2,2,4)=(2*1/2)*2=2; (2,3,3)=2*(2*1/2)=2. Total 20.
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
