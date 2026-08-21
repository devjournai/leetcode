/**
 * Maximum Swap
 * Intuition: For each digit from the left, swap with the rightmost occurrence of a strictly larger digit if one exists later; the first such swap is optimal.
 * Approach: 1. Convert `num` to a char array. 2. Record `lastSeenIndices[d]` for digits 0–9. 3. For each position, scan target 9 down to current+1; if `lastSeenIndices[target] > currentPosition`, swap and parseInt. 4. If none, return num.
 * Dry Run: num = 2736.
 *   - Last indices: 2@0,7@1,3@2,6@3. At 2, digit 7 appears at 1 > 0 → swap → 7236. Return 7236.
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
