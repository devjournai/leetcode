/**
 * Remove Vowels From A String
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
