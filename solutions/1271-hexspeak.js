/**
 * Hexspeak
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
