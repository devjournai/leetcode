/**
 * Find The Xor Of Numbers Which Appear Twice
 * Intuition: XOR together only the values whose frequency is exactly two.
 * Approach: 1. Count frequencies in a map. 2. XOR every key whose count is 2. 3. Return the XOR (0 if none).
 * Dry Run:
 *   nums = [1,2,1,3] -> 1 appears twice, XOR = 1
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var duplicateNumbersXOR = function (nums) {
  const frequencyByValue = new Map();
  for (const currentValue of nums) {
    frequencyByValue.set(
      currentValue,
      (frequencyByValue.get(currentValue) || 0) + 1,
    );
  }
  let xorOfDuplicates = 0;
  for (const [value, frequency] of frequencyByValue) {
    if (frequency === 2) {
      xorOfDuplicates ^= value;
    }
  }
  return xorOfDuplicates;
};
