/**
 * Count Good Triplets
 * Time Complexity: O(N^3)
 * Space Complexity: O(1)
 */
var countGoodTriplets = function (arr, a, b, c) {
  const arrayLength = arr.length;
  let goodTripletsCounter = 0;

  for (
    let currentFirstIndex = 0;
    currentFirstIndex < arrayLength - 2;
    currentFirstIndex++
  ) {
    for (
      let currentSecondIndex = currentFirstIndex + 1;
      currentSecondIndex < arrayLength - 1;
      currentSecondIndex++
    ) {
      const diffFirstSecond = Math.abs(
        arr[currentFirstIndex] - arr[currentSecondIndex],
      );
      if (diffFirstSecond <= a) {
        for (
          let currentThirdIndex = currentSecondIndex + 1;
          currentThirdIndex < arrayLength;
          currentThirdIndex++
        ) {
          const diffSecondThird = Math.abs(
            arr[currentSecondIndex] - arr[currentThirdIndex],
          );
          const diffFirstThird = Math.abs(
            arr[currentFirstIndex] - arr[currentThirdIndex],
          );
          if (diffSecondThird <= b && diffFirstThird <= c) {
            goodTripletsCounter++;
          }
        }
      }
    }
  }

  return goodTripletsCounter;
};
