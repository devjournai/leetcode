/**
 * Hexspeak
 * Intuition: Convert to hex, map 0->O and 1->I, and reject any digit 2-9. Remaining A-F letters already look like hexspeak.
 * Approach: 1. BigInt(num).toString(16).toUpperCase(). 2. For each char, ERROR if in 2-9; push O/I for 0/1 else the letter. 3. Join.
 * Dry Run: num = "257"
 *   hex 101 -> I O I -> "IOI".
 *   num = "3": hex 3 -> ERROR.
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var toHexspeak = function (num) {
  const hexadecimalRepresentation = BigInt(num).toString(16).toUpperCase();
  const finalHexspeakBuilder = [];
  const forbiddenDigits = new Set(["2", "3", "4", "5", "6", "7", "8", "9"]);

  for (
    let currentCharacterIndex = 0;
    currentCharacterIndex < hexadecimalRepresentation.length;
    currentCharacterIndex++
  ) {
    const charToProcess = hexadecimalRepresentation[currentCharacterIndex];

    if (forbiddenDigits.has(charToProcess)) {
      return "ERROR";
    }

    if (charToProcess === "0") {
      finalHexspeakBuilder.push("O");
    } else if (charToProcess === "1") {
      finalHexspeakBuilder.push("I");
    } else {
      finalHexspeakBuilder.push(charToProcess);
    }
  }

  return finalHexspeakBuilder.join("");
};
