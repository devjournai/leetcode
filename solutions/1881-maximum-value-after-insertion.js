/**
 * Maximum Value After Insertion
 * Intuition: For a positive number insert x at the first position where it is strictly larger than the digit (greedy left). For a negative number insert where x is strictly smaller, to make the magnitude smaller.
 * Approach: 1. If n starts with '-', scan the numeric part until x < digit or end. 2. Else scan until x > digit or end. 3. Splice x into that index and return the string.
 * Dry Run: n="99", x=9 → insert at end "999". n="-13", x=2 → insert before 3 giving "-123".
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
