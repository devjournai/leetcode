/**
 * Better Compression Of String
 * Intuition: Parse letter+frequency tokens, merge frequencies of the same letter, then emit letters in alphabetical order with their total counts.
 * Approach: 1. Scan compressed, reading a letter then its decimal frequency. 2. Add into a 26-slot count array. 3. Build letter+count for every positive frequency in a-z order.
 * Dry Run:
 *   compressed = "a3c9b2c1" -> a3 b2 c10 -> "a3b2c10"
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var betterCompression = function (compressed) {
  const letterFrequency = new Array(26).fill(0);
  let scanIndex = 0;
  while (scanIndex < compressed.length) {
    const letterChar = compressed[scanIndex++];
    let frequency = 0;
    while (
      scanIndex < compressed.length &&
      compressed[scanIndex] >= "0" &&
      compressed[scanIndex] <= "9"
    ) {
      frequency = frequency * 10 + (compressed.charCodeAt(scanIndex) - 48);
      scanIndex++;
    }
    letterFrequency[letterChar.charCodeAt(0) - 97] += frequency;
  }

  let compressedResult = "";
  for (let letterIndex = 0; letterIndex < 26; letterIndex++) {
    if (letterFrequency[letterIndex] > 0) {
      compressedResult +=
        String.fromCharCode(97 + letterIndex) +
        String(letterFrequency[letterIndex]);
    }
  }
  return compressedResult;
};
