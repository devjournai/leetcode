/**
 * Numbers With Same Consecutive Differences
 * Time Complexity: O(2^n)
 * Space Complexity: O(2^n)
 */
var numsSameConsecDiff = function (n, k) {
  let collectionOfResults = [];

  let levelOneNumbers = Array.from(
    { length: 9 },
    (_, initialDigitIndex) => initialDigitIndex + 1,
  );

  if (n === 1) {
    collectionOfResults = levelOneNumbers;
    return collectionOfResults;
  }

  let currentNumbersBuilding = levelOneNumbers;
  let currentLengthBuilding = 1;

  while (currentLengthBuilding < n) {
    let nextIterationNumbers = [];
    for (
      let numberPointer = 0;
      numberPointer < currentNumbersBuilding.length;
      numberPointer++
    ) {
      let currentNumberValue = currentNumbersBuilding[numberPointer];
      let lastNumericCharacter = currentNumberValue % 10;

      let nextCharacterPlusK = lastNumericCharacter + k;
      if (nextCharacterPlusK <= 9) {
        let constructedNumberPlus =
          currentNumberValue * 10 + nextCharacterPlusK;
        nextIterationNumbers.push(constructedNumberPlus);
      }

      if (k !== 0) {
        let nextCharacterMinusK = lastNumericCharacter - k;
        if (nextCharacterMinusK >= 0) {
          let constructedNumberMinus =
            currentNumberValue * 10 + nextCharacterMinusK;
          nextIterationNumbers.push(constructedNumberMinus);
        }
      }
    }
    currentNumbersBuilding = nextIterationNumbers;
    currentLengthBuilding++;
  }

  collectionOfResults = currentNumbersBuilding;
  return collectionOfResults;
};
