/**
 * Monotone Increasing Digits
 * Time Complexity: O(log N)
 * Space Complexity: O(log N)
 */
var monotoneIncreasingDigits = function (n) {
  const stringValueOfN = String(n);
  const digitCollection = stringValueOfN.split("").map(Number);
  const lengthOfCollection = digitCollection.length;
  let startModifyIndex = lengthOfCollection;

  for (
    let currentBackwardIndex = lengthOfCollection - 1;
    currentBackwardIndex > 0;
    currentBackwardIndex--
  ) {
    if (
      digitCollection[currentBackwardIndex - 1] >
      digitCollection[currentBackwardIndex]
    ) {
      startModifyIndex = currentBackwardIndex;
      digitCollection[currentBackwardIndex - 1]--;
    }
  }

  for (
    let currentForwardIndex = startModifyIndex;
    currentForwardIndex < lengthOfCollection;
    currentForwardIndex++
  ) {
    digitCollection[currentForwardIndex] = 9;
  }

  const finalResultString = digitCollection.join("");
  return Number(finalResultString);
};
