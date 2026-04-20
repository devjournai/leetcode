/**
 * Find Xor Sum Of All Pairs Bitwise And
 * Time Complexity: O(arr1.length + arr2.length)
 * Space Complexity: O(1)
 */
var getXORSum = function (arr1, arr2) {
  let firstArrayXorAccumulator = 0;
  for (const firstArrayValue of arr1) {
    firstArrayXorAccumulator ^= firstArrayValue;
  }

  let secondArrayXorResult = 0;
  arr2.forEach((secondArrayElement) => {
    secondArrayXorResult ^= secondArrayElement;
  });

  const resultantXorAndSum = firstArrayXorAccumulator & secondArrayXorResult;
  return resultantXorAndSum;
};
