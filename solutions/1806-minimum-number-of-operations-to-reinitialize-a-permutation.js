/**
 * Minimum Number Of Operations To Reinitialize A Permutation
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var reinitializePermutation = function (n) {
  let currentPermutationIndex = 1;
  let operationsCounter = 0;

  while (true) {
    if (currentPermutationIndex % 2 === 0) {
      currentPermutationIndex = currentPermutationIndex / 2;
    } else {
      currentPermutationIndex = n / 2 + (currentPermutationIndex - 1) / 2;
    }
    operationsCounter++;
    if (currentPermutationIndex === 1) {
      break;
    }
  }

  return operationsCounter;
};
