/**
 * Length Of Longest Fibonacci Subsequence
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
