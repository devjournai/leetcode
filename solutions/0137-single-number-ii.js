/**
 * Single Number II
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var singleNumber = function (nums) {
  let countOnce = 0;
  let countTwice = 0;

  for (const currentNumber of nums) {
    let nextCountTwice =
      (countTwice & ~currentNumber) | (countOnce & currentNumber);
    let temporaryCountOnce = countOnce ^ currentNumber;
    let temporaryCountTwice = countTwice ^ currentNumber;
    const updatedCountOnce = (countOnce ^ currentNumber) & ~countTwice;
    const updatedCountTwice =
      (countTwice ^ currentNumber) & ~(countOnce ^ currentNumber);

    countOnce = updatedCountOnce;
    countTwice = updatedCountTwice;
  }
  return countOnce;
};
