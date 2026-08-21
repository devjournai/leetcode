/**
 * Find The Index Of Permutation
 * Intuition: The lexicographical index of a permutation can be calculated by summing the contributions of each element. For each element `perm[i]`, its contribution is determined by how many available numbers smaller than `perm[i]` could have been placed at that position, multiplied by the factorial of the remaining positions `(n-1-i)!`.
 * Approach: 1. Precompute factorials modulo 10^9 + 7 up to (n-1)!. 2. Initialize a Fenwick Tree (BIT) of size `n` with all elements from 1 to `n` marked as available (value 1). 3. Initialize `totalPermutationIndex` to 0. 4. Iterate through the input `perm` array from `elementPosition = 0` to `n-1`: a. Get the `currentPermutationElement` at `perm[elementPosition]`. b. Query the BIT for `countOfSmallerAvailable`, which is the sum of available elements less than `currentPermutationElement`. c. Calculate the term's contribution as `(countOfSmallerAvailable * factorials[n - 1 - elementPosition]) % MOD` and add it to `totalPermutationIndex`. d. Mark `currentPermutationElement` as used in the BIT by performing an update with -1. 5. Return the final `totalPermutationIndex`.
 * Dry Run: perm = [2, 1, 3], n = 3, MOD = 10^9 + 7
 *   1. factorials = [1, 1, 2] (for 0!, 1!, 2!)
 *   2. FenwickTree `numberAvailabilityTree` of size 3 initialized: `updateValue(1,1)`, `updateValue(2,1)`, `updateValue(3,1)`.
 *   3. `totalPermutationIndex = 0`.
 *   4. Loop `elementPosition` from 0 to 2:
 *      - `elementPosition = 0`:
 *        `currentPermutationElement = perm[0] = 2`.
 *        `countOfSmallerAvailable = numberAvailabilityTree.querySum(2 - 1) = numberAvailabilityTree.querySum(1)`.
 *        Initially, `numberAvailabilityTree.querySum(1)` returns 1 (for '1'). So, `countOfSmallerAvailable = 1`.
 *        `termContribution = (1 * factorials[3 - 1 - 0]) % MOD = (1 * factorials[2]) % MOD = (1 * 2) % MOD = 2`.
 *        `totalPermutationIndex = (0 + 2) % MOD = 2`.
 *        `numberAvailabilityTree.updateValue(2, -1)` (mark '2' as used).
 *      - `elementPosition = 1`:
 *        `currentPermutationElement = perm[1] = 1`.
 *        `countOfSmallerAvailable = numberAvailabilityTree.querySum(1 - 1) = numberAvailabilityTree.querySum(0) = 0`.
 *        `termContribution = (0 * factorials[3 - 1 - 1]) % MOD = (0 * factorials[1]) % MOD = (0 * 1) % MOD = 0`.
 *        `totalPermutationIndex = (2 + 0) % MOD = 2`.
 *        `numberAvailabilityTree.updateValue(1, -1)` (mark '1' as used).
 *      - `elementPosition = 2`:
 *        `currentPermutationElement = perm[2] = 3`.
 *        `countOfSmallerAvailable = numberAvailabilityTree.querySum(3 - 1) = numberAvailabilityTree.querySum(2)`.
 *        Since '1' and '2' are now marked as used, `numberAvailabilityTree.querySum(2)` returns 0.
 *        `termContribution = (0 * factorials[3 - 1 - 2]) % MOD = (0 * factorials[0]) % MOD = (0 * 1) % MOD = 0`.
 *        `totalPermutationIndex = (2 + 0) % MOD = 2`.
 *        `numberAvailabilityTree.updateValue(3, -1)` (mark '3' as used).
 *   5. Returns `totalPermutationIndex = 2`. (Correct for 0-indexed permutations)
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
class FenwickTree {
  constructor(arraySize) {
    this.bitArray = new Array(arraySize + 1).fill(0);
    this.fenwickSize = arraySize;
  }

  updateValue(updateIndex, deltaValue) {
    let loopIndex = updateIndex;
    while (loopIndex <= this.fenwickSize) {
      this.bitArray[loopIndex] += deltaValue;
      loopIndex += loopIndex & -loopIndex;
    }
  }

  querySum(queryIndex) {
    let sumResult = 0;
    let queryLoopIndex = queryIndex;
    while (queryLoopIndex > 0) {
      sumResult += this.bitArray[queryLoopIndex];
      queryLoopIndex -= queryLoopIndex & -queryLoopIndex;
    }
    return sumResult;
  }
}

var getPermutationIndex = function (perm) {
  const permLength = perm.length;
  const moduloValue = 10 ** 9 + 7;

  const allFactorials = new Array(permLength);
  allFactorials[0] = 1;
  for (
    let factorialIteration = 1;
    factorialIteration < permLength;
    factorialIteration++
  ) {
    allFactorials[factorialIteration] =
      (allFactorials[factorialIteration - 1] * factorialIteration) %
      moduloValue;
  }

  let totalPermutationIndex = 0;
  const numberAvailabilityTree = new FenwickTree(permLength);

  for (
    let initialElementCount = 1;
    initialElementCount <= permLength;
    initialElementCount++
  ) {
    numberAvailabilityTree.updateValue(initialElementCount, 1);
  }

  for (
    let elementPosition = 0;
    elementPosition < permLength;
    elementPosition++
  ) {
    const currentPermutationElement = perm[elementPosition];
    const countOfSmallerAvailable = numberAvailabilityTree.querySum(
      currentPermutationElement - 1
    );

    const remainingPositionsFactorial =
      allFactorials[permLength - 1 - elementPosition];
    const termContribution =
      (countOfSmallerAvailable * remainingPositionsFactorial) % moduloValue;

    totalPermutationIndex =
      (totalPermutationIndex + termContribution) % moduloValue;

    numberAvailabilityTree.updateValue(currentPermutationElement, -1);
  }

  return totalPermutationIndex;
};
