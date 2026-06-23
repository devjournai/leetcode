/**
 * Minimize Xor
 * Intuition: To minimize the XOR sum (x XOR num1), we want the binary representations of x and num1 to be as similar as possible. The constraint is that x must have the same number of set bits as num2.
 * Approach:
 * 1. Determine the target number of set bits for x by counting the set bits in num2.
 * 2. Initialize a working variable, `resultCandidate`, with the value of num1. This variable will be transformed into x.
 * 3. Count the current number of set bits in `resultCandidate`.
 * 4. First, handle the case where `resultCandidate` has more set bits than the target. To minimize XOR, we must remove set bits from `resultCandidate`. Removing a set bit makes its corresponding XOR contribution 0. To keep the overall XOR minimal, we should preserve higher-order set bits and remove the least significant set bits. This is achieved by repeatedly applying `resultCandidate &= (resultCandidate - 1)`, which clears the rightmost (least significant) set bit, until `resultCandidate` has the target number of set bits.
 * 5. Second, handle the case where `resultCandidate` has fewer set bits than the target. We need to add more set bits to `resultCandidate`. Adding a set bit where `num1` had a zero will result in an XOR contribution of 1 for that bit position. To minimize the overall XOR value, these new set bits should be placed at the least significant zero-bit positions. This is achieved by repeatedly applying `resultCandidate |= (resultCandidate + 1)`, which sets the rightmost (least significant) zero bit, until `resultCandidate` has the target number of set bits.
 * 6. Return the final `resultCandidate` value.
 * Dry Run:
 *   num1 = 3 (binary 0011), num2 = 5 (binary 0101)
 *   1. targetSetBits = num2.toString(2).split('1').length - 1 = 2
 *   2. resultCandidate = num1 = 3 (0011)
 *   3. currentSetBits = num1.toString(2).split('1').length - 1 = 2
 *   4. First loop (currentSetBits > targetSetBits): 2 is not > 2. Skip.
 *   5. Second loop (currentSetBits < targetSetBits): 2 is not < 2. Skip.
 *   6. Return resultCandidate = 3.
 *
 *   num1 = 1 (binary 0001), num2 = 12 (binary 1100)
 *   1. targetSetBits = num2.toString(2).split('1').length - 1 = 2
 *   2. resultCandidate = num1 = 1 (0001)
 *   3. currentSetBits = num1.toString(2).split('1').length - 1 = 1
 *   4. First loop (currentSetBits > targetSetBits): 1 is not > 2. Skip.
 *   5. Second loop (currentSetBits < targetSetBits): 1 is < 2.
 *      Iteration 1:
 *        resultCandidate = 1 | (1 + 1) = 1 | 2 = 3 (0011)
 *        currentSetBits = 2
 *      Now currentSetBits (2) is not < targetSetBits (2). Loop terminates.
 *   6. Return resultCandidate = 3.
 *
 *   num1 = 7 (binary 0111), num2 = 1 (binary 0001)
 *   1. targetSetBits = num2.toString(2).split('1').length - 1 = 1
 *   2. resultCandidate = num1 = 7 (0111)
 *   3. currentSetBits = num1.toString(2).split('1').length - 1 = 3
 *   4. First loop (currentSetBits > targetSetBits): 3 is > 1.
 *      Iteration 1:
 *        resultCandidate = 7 & (7 - 1) = 7 & 6 = 0111 & 0110 = 0110 (6)
 *        currentSetBits = 2
 *      Iteration 2:
 *        resultCandidate = 6 & (6 - 1) = 6 & 5 = 0110 & 0101 = 0100 (4)
 *        currentSetBits = 1
 *      Now currentSetBits (1) is not > targetSetBits (1). Loop terminates.
 *   5. Second loop (currentSetBits < targetSetBits): 1 is not < 1. Skip.
 *   6. Return resultCandidate = 4.
 * Time Complexity: O(log(max(num1, num2)))
 * Space Complexity: O(log(max(num1, num2)))
 */
var minimizeXor = function (num1, num2) {
  let targetSetBits = num2.toString(2).split("1").length - 1;
  let resultCandidate = num1;
  let currentSetBits = num1.toString(2).split("1").length - 1;

  while (currentSetBits > targetSetBits) {
    resultCandidate &= resultCandidate - 1;
    currentSetBits--;
  }

  while (currentSetBits < targetSetBits) {
    resultCandidate |= resultCandidate + 1;
    currentSetBits++;
  }

  return resultCandidate;
};
