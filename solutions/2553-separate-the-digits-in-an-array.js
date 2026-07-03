/**
 * Separate the Digits in an Array
 * Intuition: Each integer can be represented as a sequence of digits. We need to extract these digits individually while maintaining their original order within each number and the order of numbers from the input array.
 * Approach: 1. Initialize an empty array to store the final separated digits. 2. Iterate through each number in the input array. 3. For each number, convert it into its string representation. 4. Iterate through each character of this string representation. 5. Convert each character back into its numeric value. 6. Add this numeric value to the final result array.
 * Dry Run: nums = [13, 25]
 *   1. `resultantArray = []`
 *   2. First iteration: `numberToProcess = 13`
 *      a. `stringRepresentation = String(13)` which is `"13"`
 *      b. Inner loop (`innerIndex` from 0 to 1):
 *         - `innerIndex = 0`: `digitCharacter = "1"`, `convertedDigit = Number("1")` which is `1`. `resultantArray.push(1)`. `resultantArray` is now `[1]`.
 *         - `innerIndex = 1`: `digitCharacter = "3"`, `convertedDigit = Number("3")` which is `3`. `resultantArray.push(3)`. `resultantArray` is now `[1, 3]`.
 *   3. Second iteration: `numberToProcess = 25`
 *      a. `stringRepresentation = String(25)` which is `"25"`
 *      b. Inner loop (`innerIndex` from 0 to 1):
 *         - `innerIndex = 0`: `digitCharacter = "2"`, `convertedDigit = Number("2")` which is `2`. `resultantArray.push(2)`. `resultantArray` is now `[1, 3, 2]`.
 *         - `innerIndex = 1`: `digitCharacter = "5"`, `convertedDigit = Number("5")` which is `5`. `resultantArray.push(5)`. `resultantArray` is now `[1, 3, 2, 5]`.
 *   4. All numbers processed. Return `resultantArray` which is `[1, 3, 2, 5]`.
 * Time Complexity: O(S)
 * Space Complexity: O(S)
 */
var separateDigits = function (nums) {
  const resultantArray = [];

  for (const numberToProcess of nums) {
    const stringRepresentation = String(numberToProcess);
    for (
      let innerIndex = 0;
      innerIndex < stringRepresentation.length;
      innerIndex++
    ) {
      const digitCharacter = stringRepresentation[innerIndex];
      const convertedDigit = Number(digitCharacter);
      resultantArray.push(convertedDigit);
    }
  }

  return resultantArray;
};
