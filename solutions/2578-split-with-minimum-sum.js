/**
 * Split With Minimum Sum
 * Intuition: To minimize the sum of two numbers formed from a set of digits, distribute the smallest digits to the highest place values of both numbers, alternatingly assigning them to each number.
 * Approach: 1. Convert the input number to a string and then to an array of characters (digits). 2. Sort these digits in ascending order. 3. Initialize two empty strings to build the two numbers. 4. Iterate through the sorted digits, appending every other digit to the first number string and the remaining digits to the second number string. 5. Convert the two resulting strings to numbers and return their sum.
 * Dry Run: num = 4009
 * 1. `numericInput = 4009`
 * 2. `digitCharacters = ['4', '0', '0', '9']`
 * 3. `sortedCharacterList = ['0', '0', '4', '9']`
 * 4. `firstAccumulator = ''`, `secondAccumulator = ''`
 * 5. First loop (`firstCounter` increments by 2):
 *    - `firstCounter = 0`: `sortedCharacterList[0]` is '0'. `firstAccumulator = '0'`
 *    - `firstCounter = 2`: `sortedCharacterList[2]` is '4'. `firstAccumulator = '04'`
 * 6. Second loop (`secondCounter` increments by 2):
 *    - `secondCounter = 1`: `sortedCharacterList[1]` is '0'. `secondAccumulator = '0'`
 *    - `secondCounter = 3`: `sortedCharacterList[3]` is '9'. `secondAccumulator = '09'`
 * 7. `valueOne = Number('04')` which is 4.
 * 8. `valueTwo = Number('09')` which is 9.
 * 9. `finalSum = 4 + 9 = 13`. Return 13.
 * Time Complexity: O(D log D)
 * Space Complexity: O(D)
 */
var splitNum = function (num) {
  const currentDigits = String(num)
    .split("")
    .sort((firstItem, secondItem) => firstItem - secondItem);
  let numberStringA = "";
  let numberStringB = "";

  for (let idxA = 0; idxA < currentDigits.length; idxA += 2) {
    numberStringA += currentDigits[idxA];
  }

  for (let idxB = 1; idxB < currentDigits.length; idxB += 2) {
    numberStringB += currentDigits[idxB];
  }

  const numericValueA = Number(numberStringA);
  const numericValueB = Number(numberStringB);

  return numericValueA + numericValueB;
};
