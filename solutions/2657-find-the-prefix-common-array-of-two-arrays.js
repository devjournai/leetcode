/**
 * Find the Prefix Common Array of Two Arrays
 * Intuition: To find the count of common elements in prefixes A[0...i] and B[0...i] for each index i, we can efficiently track the presence of numbers in each prefix using boolean arrays. As we iterate through the arrays, we update the presence of the current elements and check if adding them makes any number common between the two prefixes.
 * Approach: 1. Initialize an empty array `resultCollection` to store the prefix common counts. 2. Create two boolean arrays, `presentInA` and `presentInB`, of size `n+1` (since numbers are 1 to n), initialized to `false`. These arrays will track whether a number has appeared in the prefix of A or B, respectively, up to the current index. 3. Initialize `totalCurrentCommon` to 0. This variable will keep track of the count of numbers common to both prefixes at the current index. 4. Iterate from `indexIterator = 0` to `n-1`. 5. In each iteration, get `valueFromA = A[indexIterator]` and `valueFromB = B[indexIterator]`. 6. Before marking `valueFromA` as present in `presentInA`: if `valueFromA` was not in `presentInA` but was already in `presentInB`, it means `valueFromA` just became common, so increment `totalCurrentCommon`. 7. Mark `presentInA[valueFromA]` as `true`. 8. Before marking `valueFromB` as present in `presentInB`: if `valueFromB` was not in `presentInB` but was already in `presentInA`, it means `valueFromB` just became common, so increment `totalCurrentCommon`. 9. Mark `presentInB[valueFromB]` as `true`. 10. Add the current `totalCurrentCommon` to `resultCollection`. 11. After the loop, return `resultCollection`.
 * Dry Run: A = [1, 3, 2], B = [3, 1, 2]
 * lengthOfArrays = 3
 * resultCollection = []
 * presentInA = [F,F,F,F] (index 0 unused)
 * presentInB = [F,F,F,F]
 * totalCurrentCommon = 0
 *
 * indexIterator = 0: valueFromA = 1, valueFromB = 3
 *   !presentInA[1] (T) && presentInB[1] (F) -> No change to totalCurrentCommon.
 *   presentInA[1] = T. presentInA = [F,T,F,F]
 *   !presentInB[3] (T) && presentInA[3] (F) -> No change to totalCurrentCommon.
 *   presentInB[3] = T. presentInB = [F,F,F,T]
 *   resultCollection.push(0). resultCollection = [0]
 *
 * indexIterator = 1: valueFromA = 3, valueFromB = 1
 *   totalCurrentCommon = 0
 *   !presentInA[3] (T) && presentInB[3] (T) -> totalCurrentCommon++. totalCurrentCommon = 1
 *   presentInA[3] = T. presentInA = [F,T,F,T]
 *   !presentInB[1] (T) && presentInA[1] (T) -> totalCurrentCommon++. totalCurrentCommon = 2
 *   presentInB[1] = T. presentInB = [F,T,F,T]
 *   resultCollection.push(2). resultCollection = [0, 2]
 *
 * indexIterator = 2: valueFromA = 2, valueFromB = 2
 *   totalCurrentCommon = 2
 *   !presentInA[2] (T) && presentInB[2] (F) -> No change to totalCurrentCommon.
 *   presentInA[2] = T. presentInA = [F,T,T,T]
 *   !presentInB[2] (T) && presentInA[2] (T) -> totalCurrentCommon++. totalCurrentCommon = 3
 *   presentInB[2] = T. presentInB = [F,T,T,T]
 *   resultCollection.push(3). resultCollection = [0, 2, 3]
 *
 * Return [0, 2, 3].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var findThePrefixCommonArray = function (A, B) {
  const lengthOfArrays = A.length;
  const resultCollection = new Array(lengthOfArrays);
  const presentInA = new Array(lengthOfArrays + 1).fill(false);
  const presentInB = new Array(lengthOfArrays + 1).fill(false);
  let totalCurrentCommon = 0;

  for (let indexIterator = 0; indexIterator < lengthOfArrays; indexIterator++) {
    const valueFromA = A[indexIterator];
    const valueFromB = B[indexIterator];

    if (!presentInA[valueFromA] && presentInB[valueFromA]) {
      totalCurrentCommon++;
    }
    presentInA[valueFromA] = true;

    if (!presentInB[valueFromB] && presentInA[valueFromB]) {
      totalCurrentCommon++;
    }
    presentInB[valueFromB] = true;

    resultCollection[indexIterator] = totalCurrentCommon;
  }

  return resultCollection;
};
