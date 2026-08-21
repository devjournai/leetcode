/**
 * Number Of Different Integers In A String
 * Intuition: Integers are maximal digit runs; leading zeros do not create new values. Parse each run as BigInt and store its canonical string in a set.
 * Approach: 1. Append a letter sentinel to `word`. 2. Accumulate digits in `buildingNumber`. 3. On a non-digit, if the buffer is nonempty add `String(BigInt(buffer))` to the set. 4. Return set size.
 * Dry Run: word = "a123bc34d8ef34".
 *   - Tokens 123, 34, 8, 34 → unique {123,34,8} size 3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var numDifferentIntegers = function (word) {
  const uniqueNumbersSet = new Set();
  let buildingNumber = "";
  const processedInput = word + "a";

  for (let charIndex = 0; charIndex < processedInput.length; ++charIndex) {
    const currentChar = processedInput[charIndex];

    if (/\d/.test(currentChar)) {
      buildingNumber += currentChar;
    } else {
      if (buildingNumber.length > 0) {
        const bigIntValue = BigInt(buildingNumber);
        const stringifiedNumber = String(bigIntValue);
        uniqueNumbersSet.add(stringifiedNumber);
        buildingNumber = "";
      }
    }
  }

  return uniqueNumbersSet.size;
};
