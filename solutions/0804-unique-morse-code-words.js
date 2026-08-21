/**
 * Unique Morse Code Words
 * Intuition: Each word maps to a Morse concatenation; uniqueness is the size of that set.
 * Approach: 1. Table of 26 codes; map `'a'+i` → code. 2. For each word join letter codes. 3. Add to `uniqueRepresentationsSet`. 4. Return `.size`.
 * Dry Run: ["gin","zen","gig","msg"]. gin and zen both "--...-."; gig and msg both "--...--." → size 2.
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
