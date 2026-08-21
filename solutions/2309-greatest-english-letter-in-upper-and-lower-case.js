/**
 * Greatest English Letter In Upper And Lower Case
 * Intuition: To find the greatest letter existing in both cases, we can first record all encountered lowercase and uppercase letters. Then, iterate through the alphabet in reverse order (from 'Z' down to 'A') and check if the current letter's uppercase and lowercase forms are both present. The first one found will be the greatest.
 * Approach: 1. Initialize two sets, one for tracking unique lowercase letters and another for unique uppercase letters found in the input string. 2. Iterate through the input string, adding each character to the appropriate set. 3. Iterate backwards from 'Z' to 'A' using character ASCII codes. For each potential uppercase letter, derive its lowercase equivalent. 4. Check if both the uppercase and lowercase forms of this letter are present in their respective sets. If true, this is the greatest such letter, so return its uppercase form immediately. 5. If the loop completes without finding such a letter, return an empty string.
 * Dry Run: s = "lEeTcOdE"
 *   1. Initialize: `lowercaseLettersFound = {}`, `uppercaseLettersFound = {}`
 *   2. Populate sets:
 *      - 'l': add 'l' to `lowercaseLettersFound`. {'l'}
 *      - 'E': add 'E' to `uppercaseLettersFound`. {'E'}
 *      - 'e': add 'e' to `lowercaseLettersFound`. {'l', 'e'}
 *      - 'T': add 'T' to `uppercaseLettersFound`. {'E', 'T'}
 *      - 'c': add 'c' to `lowercaseLettersFound`. {'l', 'e', 'c'}
 *      - 'O': add 'O' to `uppercaseLettersFound`. {'E', 'T', 'O'}
 *      - 'd': add 'd' to `lowercaseLettersFound`. {'l', 'e', 'c', 'd'}
 *      - 'E': 'E' already in `uppercaseLettersFound`.
 *      Final sets: `lowercaseLettersFound = {'l', 'e', 'c', 'd'}`, `uppercaseLettersFound = {'E', 'T', 'O'}`
 *   3. Iterate 'Z' down to 'A':
 *      - `greatestLetterAscii` starts at 'Z' (90).
 *      - ... (loop continues until 'E')
 *      - `greatestLetterAscii` = 'E' (69):
 *          - `potentialUpperLetter` = 'E'
 *          - `potentialLowerLetter` = 'e'
 *          - `uppercaseLettersFound.has('E')` is true.
 *          - `lowercaseLettersFound.has('e')` is true.
 *          - Both true, return 'E'.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var greatestLetter = function (s) {
  const lowercaseLettersFound = new Set();
  const uppercaseLettersFound = new Set();

  const ascii_a = "a".charCodeAt(0);
  const ascii_z = "z".charCodeAt(0);
  const asciiA = "A".charCodeAt(0);
  const asciiZ = "Z".charCodeAt(0);

  for (
    let characterIterator = 0;
    characterIterator < s.length;
    characterIterator++
  ) {
    const currentChar = s[characterIterator];
    const charValue = currentChar.charCodeAt(0);

    if (charValue >= ascii_a && charValue <= ascii_z) {
      lowercaseLettersFound.add(currentChar);
    } else if (charValue >= asciiA && charValue <= asciiZ) {
      uppercaseLettersFound.add(currentChar);
    }
  }

  for (
    let greatestLetterAscii = asciiZ;
    greatestLetterAscii >= asciiA;
    greatestLetterAscii--
  ) {
    const potentialUpperLetter = String.fromCharCode(greatestLetterAscii);
    const potentialLowerLetter = String.fromCharCode(
      greatestLetterAscii + (ascii_a - asciiA)
    );

    if (
      uppercaseLettersFound.has(potentialUpperLetter) &&
      lowercaseLettersFound.has(potentialLowerLetter)
    ) {
      return potentialUpperLetter;
    }
  }

  return "";
};
