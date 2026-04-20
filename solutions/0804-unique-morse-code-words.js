/**
 * Unique Morse Code Words
 * Time Complexity: O(N * L)
 * Space Complexity: O(N * L)
 */
var uniqueMorseRepresentations = function (words) {
  const morseEncodings = [
    ".-",
    "-...",
    "-.-.",
    "-..",
    ".",
    "..-.",
    "--.",
    "....",
    "..",
    ".---",
    "-.-",
    ".-..",
    "--",
    "-.",
    "---",
    ".--.",
    "--.-",
    ".-.",
    "...",
    "-",
    "..-",
    "...-",
    ".--",
    "-..-",
    "-.--",
    "--..",
  ];

  const charToMorseMapping = new Map();
  for (
    let iterationIndex = 0;
    iterationIndex < morseEncodings.length;
    iterationIndex++
  ) {
    const asciiCode = 97 + iterationIndex;
    const alphabetCharacter = String.fromCharCode(asciiCode);
    const currentMorseCode = morseEncodings[iterationIndex];
    charToMorseMapping.set(alphabetCharacter, currentMorseCode);
  }

  const uniqueRepresentationsSet = new Set();
  for (const inputWord of words) {
    const wordMorseParts = [];
    for (
      let characterPosition = 0;
      characterPosition < inputWord.length;
      characterPosition++
    ) {
      const currentLetter = inputWord[characterPosition];
      const letterMorseValue = charToMorseMapping.get(currentLetter);
      wordMorseParts.push(letterMorseValue);
    }
    const compiledTransformation = wordMorseParts.join("");
    uniqueRepresentationsSet.add(compiledTransformation);
  }

  return uniqueRepresentationsSet.size;
};
