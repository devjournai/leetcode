/**
 * Find Most Frequent Vowel and Consonant
 * Intuition: The answer is the highest vowel frequency plus the highest consonant frequency in the lowercase string.
 * Approach: 1. Count letters a–z. 2. Track the max count among aeiou and the max among the rest. 3. Return their sum.
 * Dry Run: s = "successes". Vowels: e×2, u×1 → 2. Consonants: s×4 → 4. Answer 6.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxFreqSum = function (s) {
  const count = new Array(26).fill(0);
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  let maxVowel = 0;
  let maxConsonant = 0;

  for (const character of s) {
    count[character.charCodeAt(0) - 97] += 1;
  }

  for (const character of s) {
    const frequency = count[character.charCodeAt(0) - 97];
    if (vowels.has(character)) {
      maxVowel = Math.max(maxVowel, frequency);
    } else {
      maxConsonant = Math.max(maxConsonant, frequency);
    }
  }

  return maxVowel + maxConsonant;
};
