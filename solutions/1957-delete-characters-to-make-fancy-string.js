/**
 * Delete Characters To Make Fancy String
 * Intuition: To make a string "fancy" (no three consecutive identical characters), we can build the result character by character, always checking if appending the current character would violate the "fancy" rule based on the last two characters already added to our result.
 * Approach: 1. Initialize an empty array, `fancyCharacters`, to store the characters of the fancy string being built. 2. Iterate through each `itemCharacter` in the input string `s` using an index `currentPosition`. 3. For each `itemCharacter`, determine `currentFancyLength` (the number of characters currently in `fancyCharacters`). 4. If `currentFancyLength` is less than 2, append `itemCharacter` unconditionally, as it cannot form three consecutive identical characters yet. 5. If `currentFancyLength` is 2 or more, retrieve `lastFancyChar` (the last character added) and `penultimateFancyChar` (the second-to-last character added) from `fancyCharacters`. 6. If `itemCharacter` is identical to both `lastFancyChar` AND `penultimateFancyChar`, then appending `itemCharacter` would create three consecutive identical characters; therefore, skip appending `itemCharacter`. 7. Otherwise (if `itemCharacter` is different from `lastFancyChar` or `penultimateFancyChar`), append `itemCharacter` to `fancyCharacters`. 8. After iterating through all characters in `s`, join the characters in `fancyCharacters` to form the final fancy string.
 * Dry Run: s = "aaabbbccc"
 *   - fancyCharacters = []
 *   - currentPosition = 0, itemCharacter = 'a': currentFancyLength (0) < 2. Push 'a'. fancyCharacters = ['a']
 *   - currentPosition = 1, itemCharacter = 'a': currentFancyLength (1) < 2. Push 'a'. fancyCharacters = ['a', 'a']
 *   - currentPosition = 2, itemCharacter = 'a': currentFancyLength (2) >= 2. lastFancyChar = 'a', penultimateFancyChar = 'a'. itemCharacter ('a') === lastFancyChar ('a') AND itemCharacter ('a') === penultimateFancyChar ('a'). Skip. fancyCharacters = ['a', 'a']
 *   - currentPosition = 3, itemCharacter = 'b': currentFancyLength (2) >= 2. lastFancyChar = 'a', penultimateFancyChar = 'a'. itemCharacter ('b') !== lastFancyChar ('a'). Push 'b'. fancyCharacters = ['a', 'a', 'b']
 *   - currentPosition = 4, itemCharacter = 'b': currentFancyLength (3) >= 2. lastFancyChar = 'b', penultimateFancyChar = 'a'. itemCharacter ('b') !== penultimateFancyChar ('a'). Push 'b'. fancyCharacters = ['a', 'a', 'b', 'b']
 *   - currentPosition = 5, itemCharacter = 'b': currentFancyLength (4) >= 2. lastFancyChar = 'b', penultimateFancyChar = 'b'. itemCharacter ('b') === lastFancyChar ('b') AND itemCharacter ('b') === penultimateFancyChar ('b'). Skip. fancyCharacters = ['a', 'a', 'b', 'b']
 *   - currentPosition = 6, itemCharacter = 'c': currentFancyLength (4) >= 2. lastFancyChar = 'b', penultimateFancyChar = 'b'. itemCharacter ('c') !== lastFancyChar ('b'). Push 'c'. fancyCharacters = ['a', 'a', 'b', 'b', 'c']
 *   - currentPosition = 7, itemCharacter = 'c': currentFancyLength (5) >= 2. lastFancyChar = 'c', penultimateFancyChar = 'b'. itemCharacter ('c') !== penultimateFancyChar ('b'). Push 'c'. fancyCharacters = ['a', 'a', 'b', 'b', 'c', 'c']
 *   - currentPosition = 8, itemCharacter = 'c': currentFancyLength (6) >= 2. lastFancyChar = 'c', penultimateFancyChar = 'c'. itemCharacter ('c') === lastFancyChar ('c') AND itemCharacter ('c') === penultimateFancyChar ('c'). Skip. fancyCharacters = ['a', 'a', 'b', 'b', 'c', 'c']
 *   - End of loop. Join fancyCharacters. Result: "aabbcc"
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var makeFancyString = function (s) {
  let fancyCharacters = [];
  let stringLength = s.length;

  for (
    let currentPosition = 0;
    currentPosition < stringLength;
    currentPosition++
  ) {
    let itemCharacter = s[currentPosition];
    let currentFancyLength = fancyCharacters.length;

    if (currentFancyLength < 2) {
      fancyCharacters.push(itemCharacter);
    } else {
      let lastFancyChar = fancyCharacters[currentFancyLength - 1];
      let penultimateFancyChar = fancyCharacters[currentFancyLength - 2];

      if (
        itemCharacter === lastFancyChar &&
        itemCharacter === penultimateFancyChar
      ) {
      } else {
        fancyCharacters.push(itemCharacter);
      }
    }
  }

  return fancyCharacters.join("");
};
