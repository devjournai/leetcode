/**
 * Minimum Adjacent Swaps To Reach The Kth Smallest Number
 * Intuition: The kth next permutation is the target. Adjacent swaps to rearrange digits equal the number of bubble-sort swaps that bring each target digit into place.
 * Approach: 1. Copy `num` into `currentPermutationArray` and apply `generateNextPermutation` k times. 2. For each mismatch at `outerIndex`, find the needed digit later in `initialDigitsArray` and adjacent-swap it left, counting each swap.
 * Dry Run: num="5489355142", k=4. After 4 next-permutations the target is "5489355214". Counting adjacent swaps from the original to that string yields 2.
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
