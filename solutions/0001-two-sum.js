/**
 * Two Sum
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var twoSum = function (numbers, value) {
  const complements = new Map();

  for (let index = 0; index < numbers.length; index++) {
    const currentNumber = numbers[index];
    const neededComplement = value - currentNumber;

    if (complements.has(neededComplement)) {
      return [complements.get(neededComplement), index];
    }

    complements.set(currentNumber, index);
  }
};
