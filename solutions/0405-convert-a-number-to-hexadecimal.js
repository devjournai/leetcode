/**
 * Convert A Number To Hexadecimal
 * Intuition: Two’s-complement hex is the low 32 bits, four bits at a time. `>>>` treats `num` as unsigned so negatives become the correct 8-nibble pattern.
 * Approach: 1. 0 → `"0"`. 2. Up to 8 times: take `currentNumericalValue & 0xF`, prepend `hexadecimalSymbols[quad]`, unsigned-shift by 4, stop early if the rest is 0. 3. Return the built string.
 * Dry Run: num = 26 → nibble 10='a', then 1 → "1a".
 *   num = -1 → eight f nibbles → "ffffffff".
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var toHex = function (num) {
  if (num === 0) {
    return "0";
  }

  const hexadecimalSymbols = "0123456789abcdef";
  let builtHexadecimal = "";
  let currentNumericalValue = num;

  for (let iterationCount = 0; iterationCount < 8; iterationCount++) {
    const currentQuad = currentNumericalValue & 0xf;
    builtHexadecimal = hexadecimalSymbols[currentQuad] + builtHexadecimal;
    currentNumericalValue >>>= 4;

    if (currentNumericalValue === 0) {
      break;
    }
  }

  return builtHexadecimal;
};
