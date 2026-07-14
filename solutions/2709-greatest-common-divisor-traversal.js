/**
 * Greatest Common Divisor Traversal
 * Intuition: The problem asks if all pairs of numbers in the array can be connected through a sequence of traversals where two numbers are connected if their greatest common divisor (GCD) is greater than 1. This means they share at least one common prime factor. This is a classic connected components problem. We can model this using a Disjoint Set Union (DSU) data structure. If all numbers belong to the same connected component, then traversal is possible between any pair.
 * Approach:
 * 1. Initialize a DSU structure for all possible values up to the maximum number in the input array. This DSU will manage connectivity.
 * 2. Maintain a map (`primeFactorMap`) to store the first index in `nums` where a particular prime factor was encountered.
 * 3. Iterate through each number `numbersInput[elementIndex]` in the input array:
 *    a. If `numbersInput[elementIndex]` is 1 and the array has more than one element, it cannot share a common prime factor with any other number, so return `false`.
 *    b. Find all distinct prime factors for `numbersInput[elementIndex]` using an efficient factorization method.
 *    c. For each `primeCandidate` found:
 *       i. If `primeFactorMap` already contains `primeCandidate`, it means this prime has been seen before at `otherIndex = primeFactorMap.get(primeCandidate)`. Unite the current `elementIndex` with `otherIndex` in the DSU, establishing a connection through this shared prime factor.
 *       ii. If `primeFactorMap` does not contain `primeCandidate`, record that `primeCandidate` was first seen at `elementIndex` by setting `primeFactorMap.set(primeCandidate, elementIndex)`.
 * 4. After processing all numbers, check if all indices `0` to `arraySize - 1` belong to the same connected component in the DSU. This is done by finding the representative (root) of index `0` and then comparing it with the representatives of all other indices. If any index has a different representative, return `false`.
 * 5. If all checks pass, return `true`.
 * Dry Run:
 * Input: `nums = [2, 3, 4]`
 * 1. `numbersInput.length = 3` (not 1).
 * 2. `arraySize = 3`, `maximumPossibleValue = 4`.
 * 3. `parentArray = [0, 1, 2, 3, 4]`, `rankArray = [0, 0, 0, 0, 0]`.
 * 4. `primeFactorMap = Map{}`.
 * 5. Loop `elementIndex` from `0` to `2`:
 *    - `elementIndex = 0`, `numbersInput[0] = 2`:
 *      - `computePrimeDivisors(2)` returns `[2]`. `currentNumberFactors = [2]`.
 *      - `primeCandidate = 2`: `primeFactorMap.has(2)` is `false`. `primeFactorMap.set(2, 0)`. `primeFactorMap = {2: 0}`.
 *    - `elementIndex = 1`, `numbersInput[1] = 3`:
 *      - `computePrimeDivisors(3)` returns `[3]`. `currentNumberFactors = [3]`.
 *      - `primeCandidate = 3`: `primeFactorMap.has(3)` is `false`. `primeFactorMap.set(3, 1)`. `primeFactorMap = {2: 0, 3: 1}`.
 *    - `elementIndex = 2`, `numbersInput[2] = 4`:
 *      - `computePrimeDivisors(4)` returns `[2]`. `currentNumberFactors = [2]`.
 *      - `primeCandidate = 2`: `primeFactorMap.has(2)` is `true`. `primeFactorMap.get(2)` is `0`.
 *      - `uniteSets(0, 2)`:
 *        - `rootA = determineRepresentative(0)` (which is `0`), `rootB = determineRepresentative(2)` (which is `2`).
 *        - `parentArray[2] = 0` (assuming ranks are equal or 0's rank is greater), `rankArray[0]` potentially increments.
 *        - `parentArray` is now `[0, 1, 0, 3, 4]`.
 * 6. After loop:
 *    - `overallRoot = determineRepresentative(0)` which returns `0`.
 *    - Loop `checkIndex` from `1` to `2`:
 *      - `checkIndex = 1`: `determineRepresentative(1)` returns `1`. `1 !== overallRoot (0)` is `true`.
 *      - Return `false`.
 * Output for `[2,3,4]` should be false, as 3 is not connected to 2 or 4. Correct.
 *
 * Another Dry Run: `nums = [2, 6, 10]`
 * 1. `numbersInput.length = 3`.
 * 2. `arraySize = 3`, `maximumPossibleValue = 10`.
 * 3. `parentArray = [0...10]`, `rankArray = [0...0]`.
 * 4. `primeFactorMap = Map{}`.
 * 5. Loop `elementIndex` from `0` to `2`:
 *    - `elementIndex = 0`, `numbersInput[0] = 2`:
 *      - `computePrimeDivisors(2)` returns `[2]`. `primeFactorMap.set(2, 0)`. `primeFactorMap = {2: 0}`.
 *    - `elementIndex = 1`, `numbersInput[1] = 6`:
 *      - `computePrimeDivisors(6)` returns `[2, 3]`.
 *      - `primeCandidate = 2`: `primeFactorMap.has(2)` is `true`. `primeFactorMap.get(2)` is `0`.
 *        - `uniteSets(0, 1)`: `parentArray[1] = 0`. `rankArray[0]` increments. `parentArray = [0, 0, 2, ..., 10]`.
 *      - `primeCandidate = 3`: `primeFactorMap.has(3)` is `false`. `primeFactorMap.set(3, 1)`. `primeFactorMap = {2: 0, 3: 1}`.
 *    - `elementIndex = 2`, `numbersInput[2] = 10`:
 *      - `computePrimeDivisors(10)` returns `[2, 5]`.
 *      - `primeCandidate = 2`: `primeFactorMap.has(2)` is `true`. `primeFactorMap.get(2)` is `0`.
 *        - `uniteSets(0, 2)`: `parentArray[2] = 0`. `parentArray = [0, 0, 0, ..., 10]`.
 *      - `primeCandidate = 5`: `primeFactorMap.has(5)` is `false`. `primeFactorMap.set(5, 2)`. `primeFactorMap = {2: 0, 3: 1, 5: 2}`.
 * 6. After loop:
 *    - `overallRoot = determineRepresentative(0)` returns `0`.
 *    - Loop `checkIndex` from `1` to `2`:
 *      - `checkIndex = 1`: `determineRepresentative(1)` path compresses to `0`, returns `0`. `0 === overallRoot (0)`.
 *      - `checkIndex = 2`: `determineRepresentative(2)` path compresses to `0`, returns `0`. `0 === overallRoot (0)`.
 *    - Loop finishes.
 *    - Return `true`.
 * Output for `[2,6,10]` should be true. Correct.
 * Time Complexity: O(N * sqrt(M) + N * alpha(M))
 * Space Complexity: O(M)
 */
var canTraverseAllPairs = function (numbersInput) {
  function determineRepresentative(nodeId) {
    if (parentArray[nodeId] !== nodeId) {
      parentArray[nodeId] = determineRepresentative(parentArray[nodeId]);
    }
    return parentArray[nodeId];
  }

  function uniteSets(itemA, itemB) {
    let rootA = determineRepresentative(itemA);
    let rootB = determineRepresentative(itemB);
    if (rootA === rootB) return;

    if (rankArray[rootA] < rankArray[rootB]) {
      let tempRoot = rootA;
      rootA = rootB;
      rootB = tempRoot;
    }

    parentArray[rootB] = rootA;
    if (rankArray[rootA] === rankArray[rootB]) {
      rankArray[rootA]++;
    }
  }

  function computePrimeDivisors(numericValue) {
    const divisorsList = [];
    let currentDivisor = 2;
    let temporaryValue = numericValue;
    while (currentDivisor * currentDivisor <= temporaryValue) {
      if (temporaryValue % currentDivisor === 0) {
        divisorsList.push(currentDivisor);
        while (temporaryValue % currentDivisor === 0) {
          temporaryValue /= currentDivisor;
        }
      }
      currentDivisor++;
    }
    if (temporaryValue > 1) {
      divisorsList.push(temporaryValue);
    }
    return divisorsList;
  }

  if (numbersInput.length === 1) return true;

  const arraySize = numbersInput.length;
  let maximumPossibleValue = 0;

  for (let counter = 0; counter < arraySize; counter++) {
    if (numbersInput[counter] === 1) return false;
    if (numbersInput[counter] > maximumPossibleValue) {
      maximumPossibleValue = numbersInput[counter];
    }
  }

  const parentArray = new Array(maximumPossibleValue + 1)
    .fill(0)
    .map((_val, idx) => idx);
  const rankArray = new Array(maximumPossibleValue + 1).fill(0);

  const primeFactorMap = new Map();

  for (let elementIndex = 0; elementIndex < arraySize; elementIndex++) {
    const currentNumberFactors = computePrimeDivisors(
      numbersInput[elementIndex],
    );
    for (const primeCandidate of currentNumberFactors) {
      if (primeFactorMap.has(primeCandidate)) {
        uniteSets(primeFactorMap.get(primeCandidate), elementIndex);
      } else {
        primeFactorMap.set(primeCandidate, elementIndex);
      }
    }
  }

  const overallRoot = determineRepresentative(0);
  for (let checkIndex = 1; checkIndex < arraySize; checkIndex++) {
    if (determineRepresentative(checkIndex) !== overallRoot) return false;
  }

  return true;
};
