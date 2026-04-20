/**
 * Roman To Integer
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
    I: 1
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