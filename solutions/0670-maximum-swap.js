/**
 * Maximum Swap
 * Time Complexity: O(log(num))
 * Space Complexity: O(log(num))
 */
var maximumSwap = function (num) {
  const digitStringArray = Array.from(String(num));
  const lastSeenIndices = new Array(10).fill(-1);

  for (let indexValue = 0; indexValue < digitStringArray.length; indexValue++) {
    const currentDigitChar = digitStringArray[indexValue];
    lastSeenIndices[parseInt(currentDigitChar)] = indexValue;
  }

  for (
    let currentPosition = 0;
    currentPosition < digitStringArray.length;
    currentPosition++
  ) {
    const digitAtCurrentPosition = parseInt(digitStringArray[currentPosition]);

    for (
      let targetDigitValue = 9;
      targetDigitValue > digitAtCurrentPosition;
      targetDigitValue--
    ) {
      const potentialSwapIndex = lastSeenIndices[targetDigitValue];
      if (potentialSwapIndex > currentPosition) {
        let temporaryHolder = digitStringArray[currentPosition];
        digitStringArray[currentPosition] =
          digitStringArray[potentialSwapIndex];
        digitStringArray[potentialSwapIndex] = temporaryHolder;
        return parseInt(digitStringArray.join(""));
      }
    }
  }

  return num;
};
