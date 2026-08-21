/**
 * Roman To Integer
 * Intuition: Each symbol is added unless the next symbol is larger, in which case the current value is a subtractive prefix (IV, IX, XL, …) and is subtracted instead.
 * Approach: 1. Map letters to values in `romanValueMap`. 2. For each index, read `currentSymbolValue` and `nextSymbolValue`. 3. If next is greater, subtract current; else add current. 4. Return `integerAccumulator`.
 * Dry Run: inputString = "MCM".
 *   - M vs C: 1000≥100 → +1000. C vs M: 100<1000 → -100. M vs undefined → +1000. Total 1900.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var romanToInt = function (inputString) {
  const romanValueMap = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1,
  };

  let integerAccumulator = 0;
  const stringLength = inputString.length;

  for (let index = 0; index < stringLength; index++) {
    const currentSymbolValue = romanValueMap[inputString[index]];
    const nextSymbolValue = romanValueMap[inputString[index + 1]];

    if (nextSymbolValue > currentSymbolValue) {
      integerAccumulator -= currentSymbolValue;
    } else {
      integerAccumulator += currentSymbolValue;
    }
  }

  return integerAccumulator;
};
