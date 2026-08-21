/**
 * Find Numbers With Even Number Of Digits
 * Intuition: Count digits by repeated divide-by-10; even counts increment the answer.
 * Approach: 1. For each number, digitCounter while n>0 divide by 10. 2. If digitCounter is even, increment evenDigitNumbersTally. 3. Return the tally.
 * Dry Run: nums = [12,345,2,6,7896]
 *   12:2 even, 345:3, 2:1, 6:1, 7896:4 even. Return 2.
 * Time Complexity: O(N * log(maxNum))
 * Space Complexity: O(1)
 */
var findNumbers = function (nums) {
  let evenDigitNumbersTally = 0;

  for (const currentNumberValue of nums) {
    let digitCounter = 0;
    let mutableNumber = currentNumberValue;

    while (mutableNumber > 0) {
      mutableNumber = Math.floor(mutableNumber / 10);
      digitCounter++;
    }

    if (digitCounter % 2 === 0) {
      evenDigitNumbersTally++;
    }
  }

  return evenDigitNumbersTally;
};
