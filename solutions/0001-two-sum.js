/**
 * Two Sum
 * Intuition: We can find two numbers that add up to a target by storing the numbers we've seen so far in a hashmap. This allows us to check for the required "complement" of the current number in constant time.
 * Approach: 1. Initialize an empty Map. 2. Iterate through the array. 3. For each number, calculate its complement (target - current). 4. If the complement exists in the map, return the indices. 5. Otherwise, store the current number and its index in the map.
 * Dry Run: numbers = [2, 7, 11], target = 9.
 *   - i=0: current=2, needed=7. 7 not in map. map = {2: 0}
 *   - i=1: current=7, needed=2. 2 is in map! Return [0, 1].
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
