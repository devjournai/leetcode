/**
 * Convert The Temperature
 * Intuition: The problem requires straightforward application of well-known temperature conversion formulas. The core idea is to translate the given Celsius temperature into its equivalent Kelvin and Fahrenheit values using their respective mathematical relationships.
 * Approach: 1. Calculate the Kelvin temperature by adding the constant 273.15 to the provided Celsius temperature. 2. Calculate the Fahrenheit temperature by first multiplying the Celsius temperature by 1.80, and then adding 32 to that product. 3. Store these two newly computed temperatures in an array, with Kelvin first and Fahrenheit second. 4. Return this array.
 * Dry Run: For an input of celsius = 30.00: 1. Calculate kelvinEquivalent: 30.00 + 273.15 = 303.15. 2. Calculate fahrenheitEquivalent: (30.00 * 1.80) + 32 = 54.00 + 32 = 86.00. 3. Construct the output array as [303.15, 86.00]. 4. Return [303.15, 86.00].
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var convertTemperature = function (celsius) {
  let kelvinEquivalent = celsius + 273.15;
  let fahrenheitEquivalent = celsius * 1.8 + 32;
  return [kelvinEquivalent, fahrenheitEquivalent];
};
