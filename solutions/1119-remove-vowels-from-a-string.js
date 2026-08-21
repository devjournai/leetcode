/**
 * Remove Vowels From A String
 * Intuition: Filter out a,e,i,o,u in one pass using a set lookup, then join the remaining characters.
 * Approach: 1. Build a vowel set. 2. Convert s to an array and filter non-vowels. 3. Join and return.
 * Dry Run: leetcode → ltcd.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var removeVowels = function (s) {
  const vowelSetIndicator = new Set(["a", "e", "i", "o", "u"]);

  const charactersArray = Array.from(s);

  const filteredCharacters = charactersArray.filter((singleChar) => {
    return !vowelSetIndicator.has(singleChar);
  });

  const resultingString = filteredCharacters.join("");
  return resultingString;
};
