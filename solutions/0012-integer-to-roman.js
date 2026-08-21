/**
 * Integer To Roman
 * Intuition: Greedy conversion using a descending table of value/symbol pairs (including subtractive forms like 900→CM) repeatedly subtracts the largest fit from `remainingNumber`.
 * Approach: 1. Walk `romanMap` from 1000 down to 1. 2. If `remainingNumber >= divisor`, append `romanDigit` `count` times where `count = floor(remainingNumber / divisor)`. 3. Set `remainingNumber %= divisor`. 4. Return `resultString`.
 * Dry Run: number = 58.
 *   - 50→L, remaining=8; 5→V, remaining=3; three I's → "LVIII".
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var intToRoman = function (number) {
  const romanMap = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let resultString = "";
  let remainingNumber = number;

  for (let i = 0; i < romanMap.length; i++) {
    const currentPair = romanMap[i];
    const divisor = currentPair.value;
    const romanDigit = currentPair.symbol;

    if (remainingNumber >= divisor) {
      const count = Math.floor(remainingNumber / divisor);
      for (let j = 0; j < count; j++) {
        resultString += romanDigit;
      }
      remainingNumber %= divisor;
    }
  }

  return resultString;
};
