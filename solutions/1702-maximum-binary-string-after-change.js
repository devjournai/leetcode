/**
 * Maximum Binary String After Change
 * Intuition: Operation "00→10" moves zeros rightward and "10→01" bubbles zeros left. All zeros can collapse into a single 0 sitting after the leading 1s prefix: at index (firstZero + zeroCount − 1), rest 1s.
 * Approach: 1. Count `totalZeroCount` and `initialZeroPosition`. 2. If ≤1 zero, return the string. 3. Fill an array of '1's and place '0' at `finalZeroPlacementIndex`. 4. Join.
 * Dry Run: binary = "000110"
 * zeros at indices 0,1,2,5 (`totalZeroCount=4`, `initialZeroPosition=0`); place the single 0 at 0+4-1=3 → "111011".
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
