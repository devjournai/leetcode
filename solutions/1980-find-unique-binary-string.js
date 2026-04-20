/**
 * Find Unique Binary String
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
