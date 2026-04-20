/**
 * Maximum Binary String After Change
 * Time Complexity: O(inputStringLength)
 * Space Complexity: O(inputStringLength)
 */
var maximumBinaryString = function (binaryInput) {
  const inputStringLength = binaryInput.length;
  let totalZeroCount = 0;
  let initialZeroPosition = -1;

  for (
    let currentPosition = 0;
    currentPosition < inputStringLength;
    currentPosition++
  ) {
    if (binaryInput[currentPosition] === "0") {
      if (initialZeroPosition === -1) {
        initialZeroPosition = currentPosition;
      }
      totalZeroCount++;
    }
  }

  if (totalZeroCount <= 1) {
    return binaryInput;
  }

  const modifiedBinaryArray = new Array(inputStringLength).fill("1");
  const finalZeroPlacementIndex = initialZeroPosition + totalZeroCount - 1;
  modifiedBinaryArray[finalZeroPlacementIndex] = "0";

  return modifiedBinaryArray.join("");
};
