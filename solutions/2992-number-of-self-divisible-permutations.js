/**
 * Number Of Self Divisible Permutations
 * Intuition: This problem asks to count permutations satisfying a condition at each position. This is a classic backtracking problem where we try to place numbers one by one into positions, pruning branches that violate the condition. Pre-calculating valid number-position pairs can optimize the `gcd` checks.
 * Approach: 1. Define a helper function `calculateGcd` for the greatest common divisor using the Euclidean algorithm. 2. Initialize an `adjacencyList` where `adjacencyList[i]` stores all numbers `j` (1 to n) such that `gcd(j, i) == 1`. This pre-computation avoids repeated `gcd` calculations during backtracking. 3. Implement a recursive backtracking function `findPermutations` that takes the `currentPosition` to fill and a `usedNumbersMask` (a bitmask) indicating which numbers have already been placed. 4. The base case for `findPermutations` is when `currentPosition` exceeds `n`, meaning a valid permutation has been found, returning 1. 5. In the recursive step, iterate through `possibleValue`s from `adjacencyList[currentPosition]`. For each `possibleValue`, check if it's already in `usedNumbersMask`. If not, mark it as used in a new mask and recursively call `findPermutations` for the next position (`currentPosition + 1`). Sum up the results from valid recursive calls. 6. The initial call is `findPermutations(1, 0)`.
 * Dry Run: n = 2
 *   1. calculateGcd(a, b) is defined.
 *   2. adjacencyList initialized as `[[],[],[]]`.
 *   3. Pre-computation:
 *      - posIndex = 1:
 *          - valOption = 1: gcd(1,1)=1. adjacencyList[1] = [1].
 *          - valOption = 2: gcd(2,1)=1. adjacencyList[1] = [1,2].
 *      - posIndex = 2:
 *          - valOption = 1: gcd(1,2)=1. adjacencyList[2] = [1].
 *          - valOption = 2: gcd(2,2)=2 != 1. Skip.
 *      adjacencyList becomes `[[], [1,2], [1]]`.
 *   4. Call `findPermutations(1, 0)`:
 *      - `recursivePosition = 1`, `recursiveUsedMask = 0`. `currentPermutationCount = 0`.
 *      - For `nextPermutationValue` in `adjacencyList[1]` ([1,2]):
 *          - `nextPermutationValue = 1`:
 *              - `(0 & (1 << 1))` is 0. Valid.
 *              - `updatedBitmask = 0 | (1 << 1) = 2`.
 *              - `currentPermutationCount += findPermutations(2, 2)`:
 *                  - `recursivePosition = 2`, `recursiveUsedMask = 2`. `currentPermutationCount = 0`.
 *                  - For `nextPermutationValue` in `adjacencyList[2]` ([1]):
 *                      - `nextPermutationValue = 1`:
 *                          - `(2 & (1 << 1))` is 2. Invalid (1 is used).
 *                  - Returns 0.
 *          - `currentPermutationCount` is 0.
 *          - `nextPermutationValue = 2`:
 *              - `(0 & (1 << 2))` is 0. Valid.
 *              - `updatedBitmask = 0 | (1 << 2) = 4`.
 *              - `currentPermutationCount += findPermutations(2, 4)`:
 *                  - `recursivePosition = 2`, `recursiveUsedMask = 4`. `currentPermutationCount = 0`.
 *                  - For `nextPermutationValue` in `adjacencyList[2]` ([1]):
 *                      - `nextPermutationValue = 1`:
 *                          - `(4 & (1 << 1))` is 0. Valid.
 *                          - `updatedBitmask = 4 | (1 << 1) = 6`.
 *                          - `currentPermutationCount += findPermutations(3, 6)`:
 *                              - `recursivePosition = 3`. `3 > inputN (2)`. Base case. Returns 1.
 *                          - `currentPermutationCount` becomes 1.
 *                  - Returns 1.
 *          - `currentPermutationCount` becomes 0 + 1 = 1.
 *      - Returns 1.
 *   5. Final result is 1. (Permutation: [2,1])
 * Time Complexity: O(N^2 * 2^N)
 * Space Complexity: O(N^2)
 */
var selfDivisiblePermutationCount = function (inputN) {
  const adjacencyList = new Array(inputN + 1).fill().map(() => []);

  for (let posIndex = 1; posIndex <= inputN; posIndex++) {
    for (let valOption = 1; valOption <= inputN; valOption++) {
      if (calculateGcd(valOption, posIndex) === 1) {
        adjacencyList[posIndex].push(valOption);
      }
    }
  }

  return findPermutations(1, 0);

  function findPermutations(recursivePosition, recursiveUsedMask) {
    if (recursivePosition > inputN) {
      return 1;
    }

    let currentPermutationCount = 0;
    for (const nextPermutationValue of adjacencyList[recursivePosition]) {
      if ((recursiveUsedMask & (1 << nextPermutationValue)) === 0) {
        const updatedBitmask = recursiveUsedMask | (1 << nextPermutationValue);
        currentPermutationCount += findPermutations(
          recursivePosition + 1,
          updatedBitmask,
        );
      }
    }

    return currentPermutationCount;
  }

  function calculateGcd(firstNumber, secondNumber) {
    while (secondNumber !== 0) {
      const temporaryHolder = secondNumber;
      secondNumber = firstNumber % secondNumber;
      firstNumber = temporaryHolder;
    }
    return firstNumber;
  }
};
