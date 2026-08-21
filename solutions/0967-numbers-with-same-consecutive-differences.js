/**
 * Numbers With Same Consecutive Differences
 * Intuition: Build n-digit numbers digit-by-digit from 1–9, appending last±k when the new digit stays in 0–9 (skip minus when k=0 to avoid duplicates).
 * Approach: 1. If n===1 return 1..9. 2. BFS-style: while length < n, for each number take last digit, try +k and −k. 3. Replace `currentNumbersBuilding` with the next layer. 4. Return that list.
 * Dry Run: n=3, k=7. Start 1..9. Length 2: 18,29,70,81,92. Length 3: 181,292,707,818,929.
 * Time Complexity: O(2^n)
 * Space Complexity: O(2^n)
 */
var numsSameConsecDiff = function (n, k) {
  let collectionOfResults = [];

  let levelOneNumbers = Array.from(
    { length: 9 },
    (_, initialDigitIndex) => initialDigitIndex + 1
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
