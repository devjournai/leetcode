/**
 * Find Numbers With Even Number Of Digits
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
