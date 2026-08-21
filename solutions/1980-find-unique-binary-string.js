/**
 * Find Unique Binary String
 * Intuition: Cantor's diagonal: for each index `i`, flip bit `i` of `nums[i]`. The constructed string differs from every input in at least one position, so it cannot appear in the list.
 * Approach: 1. Map over `nums`: at `elementIndex`, take `elementString[elementIndex]` and flip 0↔1. 2. Join those characters. 3. Return the string.
 * Dry Run: nums = ["01","10"].
 *   - i=0: '0'→'1'; i=1: '0'→'1' → "11", which is missing.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var findDifferentBinaryString = function (nums) {
  const transformedCharacters = nums.map((elementString, elementIndex) => {
    const charToFlip = elementString[elementIndex];
    const flippedChar = charToFlip === "0" ? "1" : "0";
    return flippedChar;
  });

  const resultantString = transformedCharacters.join("");

  return resultantString;
};
