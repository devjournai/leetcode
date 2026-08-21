/**
 * Decode The Message
 * Intuition: Create a mapping from unique characters in the key to the standard alphabet, then apply this mapping to decode the message.
 * Approach: 1. Initialize a map to store character substitutions and an index to track the current alphabet letter ('a', 'b', ...). 2. Iterate through the `key` string. For each non-space character encountered for the first time, add an entry to the map, mapping it to the alphabet letter corresponding to the current index, then increment the index. 3. Initialize an array to build the decoded message. 4. Iterate through the `message` string. For each character, if it's a space, append a space to the array; otherwise, look up its substitute in the map and append it. 5. Join the characters in the array to form the final decoded message string.
 * Dry Run: key = "the quick brown fox jumps over the lazy dog", message = "vkjp qdrhm qdb"
 *   - substitutionMapping = {}
 *   - currentAlphabetIndex = 0
 *   - Key processing:
 *     - 't' -> 'a', currentAlphabetIndex = 1
 *     - 'h' -> 'b', currentAlphabetIndex = 2
 *     - 'e' -> 'c', currentAlphabetIndex = 3
 *     - 'q' -> 'd', currentAlphabetIndex = 4
 *     - 'u' -> 'e', currentAlphabetIndex = 5
 *     - 'i' -> 'f', currentAlphabetIndex = 6
 *     - 'c' -> 'g', currentAlphabetIndex = 7
 *     - 'k' -> 'h', currentAlphabetIndex = 8
 *     - 'b' -> 'i', currentAlphabetIndex = 9
 *     - 'r' -> 'j', currentAlphabetIndex = 10
 *     - 'o' -> 'k', currentAlphabetIndex = 11
 *     - 'w' -> 'l', currentAlphabetIndex = 12
 *     - 'f' -> 'm', currentAlphabetIndex = 13
 *     - 'x' -> 'n', currentAlphabetIndex = 14
 *     - 'j' -> 'o', currentAlphabetIndex = 15
 *     - 'm' -> 'p', currentAlphabetIndex = 16
 *     - 'p' -> 'q', currentAlphabetIndex = 17
 *     - 's' -> 'r', currentAlphabetIndex = 18
 *     - 'v' -> 's', currentAlphabetIndex = 19
 *     - 'l' -> 't', currentAlphabetIndex = 20
 *     - 'a' -> 'u', currentAlphabetIndex = 21
 *     - 'z' -> 'v', currentAlphabetIndex = 22
 *     - 'd' -> 'w', currentAlphabetIndex = 23
 *     - 'g' -> 'x', currentAlphabetIndex = 24
 *   - Message processing (builtDecodedChars = []):
 *     - 'v' -> 's', builtDecodedChars.push('s')
 *     - 'k' -> 'h', builtDecodedChars.push('h')
 *     - 'j' -> 'o', builtDecodedChars.push('o')
 *     - 'p' -> 'q', builtDecodedChars.push('q')
 *     - ' ' -> ' ', builtDecodedChars.push(' ')
 *     - 'q' -> 'd', builtDecodedChars.push('d')
 *     - 'd' -> 'w', builtDecodedChars.push('w')
 *     - 'r' -> 'j', builtDecodedChars.push('j')
 *     - 'h' -> 'b', builtDecodedChars.push('b')
 *     - 'm' -> 'p', builtDecodedChars.push('p')
 *     - ' ' -> ' ', builtDecodedChars.push(' ')
 *     - 'q' -> 'd', builtDecodedChars.push('d')
 *     - 'd' -> 'w', builtDecodedChars.push('w')
 *     - 'b' -> 'i', builtDecodedChars.push('i')
 *   - builtDecodedChars = ['s', 'h', 'o', 'q', ' ', 'd', 'w', 'j', 'b', 'p', ' ', 'd', 'w', 'i']
 *   - finalDecodedMessage = "shoq dwjbp dwi"
 *   - Return "shoq dwjbp dwi"
 * Time Complexity: O(L + M)
 * Space Complexity: O(1)
 */
var decodeMessage = function (keyString, messageString) {
  const substitutionMapping = new Map();
  let currentAlphabetIndex = 0;

  for (
    let keyTraversalIndex = 0;
    keyTraversalIndex < keyString.length;
    keyTraversalIndex++
  ) {
    const currentCharFromKey = keyString[keyTraversalIndex];
    if (
      currentCharFromKey !== " " &&
      !substitutionMapping.has(currentCharFromKey)
    ) {
      const alphabetCharacterCode = 97 + currentAlphabetIndex;
      substitutionMapping.set(
        currentCharFromKey,
        String.fromCharCode(alphabetCharacterCode)
      );
      currentAlphabetIndex++;
    }
  }

  const builtDecodedChars = [];
  messageString.split("").forEach((currentCharFromMessage) => {
    if (currentCharFromMessage === " ") {
      builtDecodedChars.push(" ");
    } else {
      builtDecodedChars.push(substitutionMapping.get(currentCharFromMessage));
    }
  });

  const finalDecodedMessage = builtDecodedChars.join("");
  return finalDecodedMessage;
};
