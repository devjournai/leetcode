/**
 * Minimum Adjacent Swaps To Reach The Kth Smallest Number
 * Time Complexity: O(k * N + N^2)
 * Space Complexity: O(N)
 */
var getMinSwaps = function (num, k) {
  const generateNextPermutation = (charArray) => {
    let firstDecreasingIndex = charArray.length - 2;
    while (
      firstDecreasingIndex >= 0 &&
      charArray[firstDecreasingIndex] >= charArray[firstDecreasingIndex + 1]
    ) {
      firstDecreasingIndex--;
    }

    let secondDecreasingIndex = charArray.length - 1;
    while (
      charArray[secondDecreasingIndex] <= charArray[firstDecreasingIndex]
    ) {
      secondDecreasingIndex--;
    }

    [charArray[firstDecreasingIndex], charArray[secondDecreasingIndex]] = [
      charArray[secondDecreasingIndex],
      charArray[firstDecreasingIndex],
    ];

    let leftBoundary = firstDecreasingIndex + 1;
    let rightBoundary = charArray.length - 1;
    while (leftBoundary < rightBoundary) {
      [charArray[leftBoundary], charArray[rightBoundary]] = [
        charArray[rightBoundary],
        charArray[leftBoundary],
      ];
      leftBoundary++;
      rightBoundary--;
    }
  };

  const initialDigitsArray = num.split("");
  const currentPermutationArray = num.split("");

  for (let iterationCount = 0; iterationCount < k; iterationCount++) {
    generateNextPermutation(currentPermutationArray);
  }

  let totalSwapsCount = 0;
  for (
    let outerIndex = 0;
    outerIndex < initialDigitsArray.length;
    outerIndex++
  ) {
    if (
      initialDigitsArray[outerIndex] !== currentPermutationArray[outerIndex]
    ) {
      let searchIndex = outerIndex + 1;
      while (
        searchIndex < initialDigitsArray.length &&
        initialDigitsArray[searchIndex] !== currentPermutationArray[outerIndex]
      ) {
        searchIndex++;
      }

      let shiftIndex = searchIndex;
      while (shiftIndex > outerIndex) {
        [initialDigitsArray[shiftIndex], initialDigitsArray[shiftIndex - 1]] = [
          initialDigitsArray[shiftIndex - 1],
          initialDigitsArray[shiftIndex],
        ];
        totalSwapsCount++;
        shiftIndex--;
      }
    }
  }

  return totalSwapsCount;
};
