/**
 * Count Triplets That Can Form Two Arrays Of Equal Xor
 * Intuition: arr[i]^...^arr[j-1] equals arr[j]^...^arr[k] iff the prefix XOR at i-1 equals the prefix XOR at k. For each ending index, previous equal prefixes contribute (count * i - sumOf(p+1)) triplets.
 * Approach: 1. Map prefixXor -> [sum of (index+1), count], start with 0 -> [0,1]. 2. Fold XOR along the array. 3. If the current XOR was seen, add count*i - sumP to the answer and update the pair. 4. Else store [i+1, 1].
 * Dry Run: arr = [2,3,1,6,7]
 *   - prefixes 2,1,0,6,1
 *   - when XOR returns to 0 at index 2: contributes triplets; later XOR 1 also matches. Total 4.
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
