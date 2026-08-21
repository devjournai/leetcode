/**
 * String Compression
 * Intuition: In-place run-length: write each distinct group’s character, then its count digits only when the run is longer than 1.
 * Approach: 1. Two pointers `writeCurrentIndex` and `scanCurrentIndex`. 2. Advance scan while the char matches; `currentGroupCounter` is the run length. 3. Write the char. 4. If count>1, write `String(count)` digit by digit. 5. Return the write pointer as the new length.
 * Dry Run: ["a","a","b","b","c","c","c"]. Write a,2,b,2,c,3. Return 6.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var compress = function (chars) {
  let writeCurrentIndex = 0;
  let scanCurrentIndex = 0;
  const originalLength = chars.length;

  while (scanCurrentIndex < originalLength) {
    const charUnderExamination = chars[scanCurrentIndex];
    let groupFirstIndex = scanCurrentIndex;

    while (
      scanCurrentIndex < originalLength &&
      chars[scanCurrentIndex] === charUnderExamination
    ) {
      scanCurrentIndex++;
    }

    let currentGroupCounter = scanCurrentIndex - groupFirstIndex;

    chars[writeCurrentIndex] = charUnderExamination;
    writeCurrentIndex++;

    if (currentGroupCounter > 1) {
      const numericString = String(currentGroupCounter);
      let digitCharIndex = 0;
      while (digitCharIndex < numericString.length) {
        chars[writeCurrentIndex] = numericString[digitCharIndex];
        writeCurrentIndex++;
        digitCharIndex++;
      }
    }
  }

  return writeCurrentIndex;
};
