/**
 * Find Xor Sum Of All Pairs Bitwise And
 * Intuition: XOR of all (a_i AND b_j) distributes as (XOR of arr1) AND (XOR of arr2) because AND distributes over XOR bitwisely.
 * Approach: 1. XOR-reduce `arr1` into `firstArrayXorAccumulator`. 2. XOR-reduce `arr2` into `secondArrayXorResult`. 3. Return their bitwise AND.
 * Dry Run: arr1 = [1,2,3], arr2 = [6,5].
 *   - 1^2^3=0, 6^5=3, 0&3=0.
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
