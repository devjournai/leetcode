/**
 * Maximum Value After Insertion
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var maxValue = function (n, x) {
  const isInputNegative = n[0] === "-";
  let resultString = "";

  if (isInputNegative) {
    const numericPartNegative = n.slice(1);
    let negativeInsertionIndex;
    for (
      negativeInsertionIndex = 0;
      negativeInsertionIndex <= numericPartNegative.length;
      negativeInsertionIndex++
    ) {
      const currentDigitCharNegative =
        numericPartNegative[negativeInsertionIndex];
      if (
        negativeInsertionIndex === numericPartNegative.length ||
        x < parseInt(currentDigitCharNegative)
      ) {
        const newNegativeString =
          "-" +
          numericPartNegative.slice(0, negativeInsertionIndex) +
          x +
          numericPartNegative.slice(negativeInsertionIndex);
        resultString = newNegativeString;
        break;
      }
    }
  } else {
    const numericPartPositive = n;
    let positiveInsertionIndex;
    for (
      positiveInsertionIndex = 0;
      positiveInsertionIndex <= numericPartPositive.length;
      positiveInsertionIndex++
    ) {
      const currentDigitCharPositive =
        numericPartPositive[positiveInsertionIndex];
      if (
        positiveInsertionIndex === numericPartPositive.length ||
        x > parseInt(currentDigitCharPositive)
      ) {
        const newPositiveString =
          numericPartPositive.slice(0, positiveInsertionIndex) +
          x +
          numericPartPositive.slice(positiveInsertionIndex);
        resultString = newPositiveString;
        break;
      }
    }
  }

  return resultString;
};
