/**
 * Faulty Keyboard
 * Intuition: We need to build a string character by character, with a special rule for 'i'. An efficient way to handle character additions and string reversals is to maintain an array of characters, which allows O(1) appending and O(N) reversal.
 * Approach: 1. Initialize an empty array to accumulate characters. 2. Iterate through each character of the input string using a functional approach like `reduce`. 3. If the current character is 'i', reverse the accumulated array of characters. 4. Otherwise, append the current character to the accumulated array. 5. After processing all input characters, join the elements of the final array to form the resulting string.
 * Dry Run: s = "string"
 * 1. `finalCharacterArray = []`
 * 2. `singleCharacter = 's'`: `currentCharacters` is `[]`. `currentCharacters.push('s')`. Returns `['s']`. `finalCharacterArray` becomes `['s']`.
 * 3. `singleCharacter = 't'`: `currentCharacters` is `['s']`. `currentCharacters.push('t')`. Returns `['s', 't']`. `finalCharacterArray` becomes `['s', 't']`.
 * 4. `singleCharacter = 'r'`: `currentCharacters` is `['s', 't']`. `currentCharacters.push('r')`. Returns `['s', 't', 'r']`. `finalCharacterArray` becomes `['s', 't', 'r']`.
 * 5. `singleCharacter = 'i'`: `currentCharacters` is `['s', 't', 'r']`. `currentCharacters.reverse()`. Returns `['r', 't', 's']`. `finalCharacterArray` becomes `['r', 't', 's']`.
 * 6. `singleCharacter = 'n'`: `currentCharacters` is `['r', 't', 's']`. `currentCharacters.push('n')`. Returns `['r', 't', 's', 'n']`. `finalCharacterArray` becomes `['r', 't', 's', 'n']`.
 * 7. `singleCharacter = 'g'`: `currentCharacters` is `['r', 't', 's', 'n']`. `currentCharacters.push('g')`. Returns `['r', 't', 's', 'n', 'g']`. `finalCharacterArray` becomes `['r', 't', 's', 'n', 'g']`.
 * End of iteration. Return `['r', 't', 's', 'n', 'g'].join('')` which is `"rtsng"`.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var finalString = function (s) {
  const characterAccumulator = Array.from(s).reduce(
    (currentCharacters, individualCharacter) => {
      if (individualCharacter === "i") {
        return currentCharacters.reverse();
      } else {
        currentCharacters.push(individualCharacter);
        return currentCharacters;
      }
    },
    []
  );

  return characterAccumulator.join("");
};
