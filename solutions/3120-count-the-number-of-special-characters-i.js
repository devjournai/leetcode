/**
 * Count the Number of Special Characters I
 * Intuition: To identify special characters, we need to determine for each letter of the alphabet (a-z) if both its lowercase and uppercase forms are present in the given word.
 * Approach: 1. Initialize two boolean arrays, `seenLower` and `seenUpper`, both of size 26. Each index `i` (0-25) corresponds to a letter (e.g., index 0 for 'a'/'A', index 1 for 'b'/'B'). `seenLower[i]` will be true if the lowercase letter ('a'+i) has been encountered, and `seenUpper[i]` will be true if the uppercase letter ('A'+i) has been encountered.
 * 2. Iterate through each character in the input string `word`.
 *    a. If the character is a lowercase letter, calculate its 0-based index (e.g., 'a' maps to 0, 'b' to 1) and set the corresponding entry in `seenLower` to true.
 *    b. If the character is an uppercase letter, calculate its 0-based index and set the corresponding entry in `seenUpper` to true.
 * 3. After processing all characters in `word`, initialize a counter `specialCount` to 0.
 * 4. Iterate from `i = 0` to `25`. For each `i`, check if both `seenLower[i]` and `seenUpper[i]` are true. If they are, it means the letter corresponding to index `i` (e.g., 'a' for `i=0`) appeared in both lowercase and uppercase forms in the word, so increment `specialCount`.
 * 5. Return `specialCount`.
 * Dry Run: word = "abBCab"
 * 1. Initialize:
 *    seenLower = [F,F,F,...,F] (26 times)
 *    seenUpper = [F,F,F,...,F] (26 times)
 *    specialCount = 0
 * 2. Iterate through word:
 *    - 'a': lowercase. index = 0. seenLower[0] = T. (seenLower becomes [T,F,...])
 *    - 'b': lowercase. index = 1. seenLower[1] = T. (seenLower becomes [T,T,...])
 *    - 'B': uppercase. index = 1. seenUpper[1] = T. (seenUpper becomes [F,T,...])
 *    - 'C': uppercase. index = 2. seenUpper[2] = T. (seenUpper becomes [F,T,T,...])
 *    - 'a': lowercase. index = 0. seenLower[0] is already T.
 *    - 'b': lowercase. index = 1. seenLower[1] is already T.
 * 3. specialCount remains 0.
 * 4. Iterate i from 0 to 25:
 *    - i = 0: seenLower[0] (T) && seenUpper[0] (F) is F.
 *    - i = 1: seenLower[1] (T) && seenUpper[1] (T) is T. Increment specialCount. specialCount = 1.
 *    - i = 2: seenLower[2] (F) && seenUpper[2] (T) is F.
 *    - For i = 3 to 25: Both seenLower[i] and seenUpper[i] are F.
 * 5. Return specialCount = 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numberOfSpecialChars = function (word) {
  const seenLower = new Array(26).fill(false);
  const seenUpper = new Array(26).fill(false);

  for (const char of word) {
    const charCode = char.charCodeAt(0);
    if (charCode >= "a".charCodeAt(0) && charCode <= "z".charCodeAt(0)) {
      const index = charCode - "a".charCodeAt(0);
      seenLower[index] = true;
    } else if (charCode >= "A".charCodeAt(0) && charCode <= "Z".charCodeAt(0)) {
      const index = charCode - "A".charCodeAt(0);
      seenUpper[index] = true;
    }
  }

  let specialCount = 0;
  for (let i = 0; i < 26; i++) {
    if (seenLower[i] && seenUpper[i]) {
      specialCount++;
    }
  }

  return specialCount;
};
