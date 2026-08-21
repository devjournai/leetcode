/**
 * Minimum Number Of Operations To Reinitialize A Permutation
 * Intuition: The permutation is a linear map on indices: even i → i/2, odd i → n/2 + (i-1)/2. Tracking index 1 until it returns to 1 gives the order of that cycle, which is the number of operations to restore the array.
 * Approach: 1. Start `currentPermutationIndex = 1`. 2. Apply the even/odd rule, increment `operationsCounter`. 3. Stop when the index is 1 again. 4. Return the counter.
 * Dry Run: n = 4.
 *   - 1 is odd → 2+(1-1)/2=2. 2 even → 1. Two operations.
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
