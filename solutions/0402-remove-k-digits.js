/**
 * Remove K Digits
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var removeKdigits = function (num, k) {
  const numberDigits = [];
  let removalBudget = k;

  for (let digitIndex = 0; digitIndex < num.length; digitIndex++) {
    const currentCharacter = num[digitIndex];

    while (
      removalBudget > 0 &&
      numberDigits.length > 0 &&
      numberDigits[numberDigits.length - 1] > currentCharacter
    ) {
      numberDigits.pop();
      removalBudget--;
    }
    numberDigits.push(currentCharacter);
  }

  while (removalBudget > 0 && numberDigits.length > 0) {
    numberDigits.pop();
    removalBudget--;
  }

  const rawNumberString = numberDigits.join('');
  const cleanedNumberString = rawNumberString.replace(/^0+/, '');

  const resultToReturn = cleanedNumberString.length > 0 ? cleanedNumberString : '0';

  return resultToReturn;
};