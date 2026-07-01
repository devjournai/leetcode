/**
 * Find Xor Beauty Of Array
 * Intuition: The core insight relies on the properties of XOR sums and bitwise operations. For each bit position, the p-th bit of the final XOR-beauty is 1 if and only if an odd number of triplets (i, j, k) result in an effective value whose p-th bit is 1. Upon detailed bitwise analysis, for a given bit position, this parity condition simplifies to whether the count of numbers in the input array with that specific bit set is odd. This is precisely the definition of XORing all numbers in the array.
 * Approach: 1. Initialize an accumulator variable to zero. 2. Iterate through each number in the input array. 3. XOR the current number with the accumulator. 4. Return the final accumulated XOR value.
 * Dry Run:
 * nums = [1, 2, 3]
 *
 * 1. Initialize `accumulatedXor` = 0.
 * 2. First element `currentNumber` = 1:
 *    `accumulatedXor` = 0 ^ 1 = 1.
 * 3. Second element `currentNumber` = 2:
 *    `accumulatedXor` = 1 ^ 2 = 3.
 *      (Binary: 01 ^ 10 = 11)
 * 4. Third element `currentNumber` = 3:
 *    `accumulatedXor` = 3 ^ 3 = 0.
 *      (Binary: 11 ^ 11 = 00)
 * 5. All elements processed. Return `accumulatedXor` which is 0.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var xorBeauty = function (nums) {
  let accumulatedXor = 0;

  for (const currentNumber of nums) {
    accumulatedXor ^= currentNumber;
  }

  return accumulatedXor;
};
