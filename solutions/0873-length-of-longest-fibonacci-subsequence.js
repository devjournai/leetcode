/**
 * Length Of Longest Fibonacci Subsequence
 * Intuition: Any Fib-like subsequence is determined by its first two terms. Put `arr` in a set and, for every pair `(valueA, valueB)`, keep extending `first+second` while that sum exists.
 * Approach: 1. `lookupSet = Set(arr)`. 2. For each index pair with `indexA < currentInnerIndex`, start length 2 and while `firstTerm + secondTerm` is in the set, shift the window and increment length. 3. Track `longestOverall`. 4. Return it if `>= 3`, else 0.
 * Dry Run: arr = [1, 2, 3, 4, 5, 6, 7, 8].
 *   - Pair (1, 2): 3,5,8 exist → length 5. Pair (1, 3): 4,7 → length 4. Best is 5 ≥ 3 → 5.
 * Time Complexity: O(N^2 log(Max_Value))
 * Space Complexity: O(N)
 */
var lenLongestFibSubseq = function (arr) {
  const lookupSet = new Set(arr);
  const arrLength = arr.length;
  let longestOverall = 0;

  arr.forEach((valueA, indexA) => {
    let currentInnerIndex = indexA + 1;

    while (currentInnerIndex < arrLength) {
      const valueB = arr[currentInnerIndex];
      let firstTerm = valueA;
      let secondTerm = valueB;
      let currentFibLength = 2;
      let conditionForNext = true;

      while (conditionForNext) {
        const possibleSum = firstTerm + secondTerm;
        if (lookupSet.has(possibleSum)) {
          const nextFibValue = possibleSum;
          firstTerm = secondTerm;
          secondTerm = nextFibValue;
          currentFibLength++;
        } else {
          conditionForNext = false; // Exit this specific while loop
        }
      }

      const tempMax = Math.max(longestOverall, currentFibLength);
      longestOverall = tempMax;

      currentInnerIndex++;
    }
  });

  const minAcceptedLength = 3;
  const zeroDefault = 0;
  const finalResult =
    longestOverall >= minAcceptedLength ? longestOverall : zeroDefault;

  return finalResult;
};
