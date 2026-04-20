/**
 * Count Triplets That Can Form Two Arrays Of Equal Xor
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var countTriplets = function (arr) {
  const lengthOfArray = arr.length;
  let totalCountOfTriplets = 0;
  let currentXorValue = 0;
  const prefixXorMap = new Map();

  prefixXorMap.set(0, [0, 1]);

  for (
    let currentArrIndex = 0;
    currentArrIndex < lengthOfArray;
    currentArrIndex++
  ) {
    currentXorValue ^= arr[currentArrIndex];

    if (prefixXorMap.has(currentXorValue)) {
      const mapData = prefixXorMap.get(currentXorValue);
      const sumOfPreviousPIndices = mapData[0];
      const countOfPreviousPIndices = mapData[1];

      totalCountOfTriplets +=
        countOfPreviousPIndices * currentArrIndex - sumOfPreviousPIndices;

      prefixXorMap.set(currentXorValue, [
        sumOfPreviousPIndices + (currentArrIndex + 1),
        countOfPreviousPIndices + 1,
      ]);
    } else {
      prefixXorMap.set(currentXorValue, [currentArrIndex + 1, 1]);
    }
  }

  return totalCountOfTriplets;
};
