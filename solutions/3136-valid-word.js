/**
 * Valid Word
 * Intuition: A valid word is long enough, uses only letters and digits, and contains at least one vowel and one consonant.
 * Approach: 1. Reject words shorter than 3. 2. Scan each character. 3. Fail if any character is not alphanumeric. 4. Track whether a vowel and a consonant appear. 5. Return true only if both flags are set.
 * Dry Run: word = "234Adas"
 * - Length 7 >= 3
 * - All characters alphanumeric
 * - Vowels: 'a'; consonants: 'd', 's'
 * - Return true
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var isValid = function (word) {
  if (word.length < 3) {
    return false;
  }

  const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
  let hasVowel = false;
  let hasConsonant = false;

  for (const char of word) {
    const isLetter = /[a-zA-Z]/.test(char);
    const isDigit = /[0-9]/.test(char);
    if (!isLetter && !isDigit) {
      return false;
    }
    if (vowels.has(char)) {
      hasVowel = true;
    } else if (isLetter) {
      hasConsonant = true;
    }
  }

  return hasVowel && hasConsonant;
};
