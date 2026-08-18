/**
 * Minimum Number Of Operations To Make Array Xor Equal To K
 * Intuition: Flipping a bit at a specific position 'p' in any single number within the array ultimately flips the 'p'-th bit in the total XOR sum of the entire array. Therefore, to make the total XOR sum equal to 'k', we only need to identify how many bit positions differ between the initial XOR sum of the array and 'k'. Each differing bit position requires exactly one operation.
 * Approach: 1. Calculate the initial bitwise XOR sum of all elements in the input array `nums`. 2. Compute the bitwise XOR between this initial sum and the target value `k`. This result will have a '1' at every bit position where a flip is necessary to match `k`. 3. Count the number of set bits (1s) in this difference value. This count represents the minimum number of operations.
 * Dry Run: nums = [2, 1, 3, 4], k = 1
 * Binary representations: nums = [010_2, 001_2, 011_2, 100_2], k = 001_2
 *
 * 1. Initialize `currentXorAccumulator = 0`.
 * 2. Iterate through `nums`:
 *    - `currentNumberInArray = 2 (010_2)`: `currentXorAccumulator = 0 ^ 010_2 = 010_2`
 *    - `currentNumberInArray = 1 (001_2)`: `currentXorAccumulator = 010_2 ^ 001_2 = 011_2`
 *    - `currentNumberInArray = 3 (011_2)`: `currentXorAccumulator = 011_2 ^ 011_2 = 000_2`
 *    - `currentNumberInArray = 4 (100_2)`: `currentXorAccumulator = 000_2 ^ 100_2 = 100_2`
 *    After loop, `currentXorAccumulator = 4 (100_2)`.
 * 3. Calculate `calculatedXorDifference = currentXorAccumulator ^ k`:
 *    `calculatedXorDifference = 100_2 ^ 001_2 = 101_2` (decimal 5).
 * 4. Initialize `minimumFlips = 0`.
 * 5. Loop while `calculatedXorDifference > 0`:
 *    - **Iteration 1**: `calculatedXorDifference = 101_2`
 *      - `calculatedXorDifference & 1` is `1`.
 *      - `minimumFlips` becomes `0 + 1 = 1`.
 *      - `calculatedXorDifference` becomes `101_2 >> 1 = 010_2`.
 *    - **Iteration 2**: `calculatedXorDifference = 010_2`
 *      - `calculatedXorDifference & 1` is `0`.
 *      - `minimumFlips` remains `1`.
 *      - `calculatedXorDifference` becomes `010_2 >> 1 = 001_2`.
 *    - **Iteration 3**: `calculatedXorDifference = 001_2`
 *      - `calculatedXorDifference & 1` is `1`.
 *      - `minimumFlips` becomes `1 + 1 = 2`.
 *      - `calculatedXorDifference` becomes `001_2 >> 1 = 000_2`.
 *    - **Iteration 4**: `calculatedXorDifference = 0`. Loop terminates.
 * 6. Return `minimumFlips = 2`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minOperations = function (nums, k) {
  let currentXorAccumulator = 0;
  for (const currentNumberInArray of nums) {
    currentXorAccumulator ^= currentNumberInArray;
  }

  let minimumFlips = 0;
  let calculatedXorDifference = currentXorAccumulator ^ k;
  while (calculatedXorDifference > 0) {
    minimumFlips += calculatedXorDifference & 1;
    calculatedXorDifference >>= 1;
  }

  return minimumFlips;
};
