/**
 * Encrypt And Decrypt Strings
 * Intuition: The key to efficiently handling the decryption process, which can involve multiple possible decryptions, is to reverse the logic. Instead of finding all possible decryptions for an input string and then checking the dictionary, we can pre-compute all possible *encryptions* of the dictionary words. Since encryption is deterministic (each key maps to a unique value), each dictionary word has only one possible encrypted form. By storing these encrypted dictionary words and their frequencies, decryption becomes a simple lookup.
 * Approach: 1. In the constructor, build a direct character-to-string mapping for encryption. 2. Also in the constructor, iterate through the provided dictionary, encrypt each word using the character mapping, and store the count of each resulting encrypted string in another map. 3. The `encrypt` method uses the character-to-string map to build the encrypted output, returning an empty string if any character is not encrytable. 4. The `decrypt` method simply looks up the input encrypted string in the pre-computed map of encrypted dictionary words and returns its count.
 * Dry Run:
 * keys = ['a', 'b'], values = ["cd", "ef"], dictionary = ["ab", "ba", "abc"]
 *
 * Constructor(keys, values, dictionary):
 *   1. `this.charToMappedString` is initialized.
 *      - `charToMappedString.set('a', "cd")`
 *      - `charToMappedString.set('b', "ef")`
 *   2. `this.encryptedDictionaryCounts` is initialized.
 *   3. Iterate through `dictionary`:
 *      - `currentDictWord = "ab"`:
 *        - Call `this.encrypt("ab")`:
 *          - `finalEncryptedText = ""`
 *          - `originalCharacter = 'a'`: `finalEncryptedText += charToMappedString.get('a')` -> `"cd"`
 *          - `originalCharacter = 'b'`: `finalEncryptedText += charToMappedString.get('b')` -> `"cdef"`
 *          - Returns `"cdef"`
 *        - `this.encryptedDictionaryCounts.set("cdef", (0 || 0) + 1)` -> `{"cdef": 1}`
 *      - `currentDictWord = "ba"`:
 *        - Call `this.encrypt("ba")`:
 *          - `finalEncryptedText = ""`
 *          - `originalCharacter = 'b'`: `finalEncryptedText += charToMappedString.get('b')` -> `"ef"`
 *          - `originalCharacter = 'a'`: `finalEncryptedText += charToMappedString.get('a')` -> `"efcd"`
 *          - Returns `"efcd"`
 *        - `this.encryptedDictionaryCounts.set("efcd", (0 || 0) + 1)` -> `{"cdef": 1, "efcd": 1}`
 *      - `currentDictWord = "abc"`:
 *        - Call `this.encrypt("abc")`:
 *          - `finalEncryptedText = ""`
 *          - `originalCharacter = 'a'`: `finalEncryptedText += charToMappedString.get('a')` -> `"cd"`
 *          - `originalCharacter = 'b'`: `finalEncryptedText += charToMappedString.get('b')` -> `"cdef"`
 *          - `originalCharacter = 'c'`: `charToMappedString.has('c')` is false. Returns `""`.
 *        - `""` is skipped.
 *
 * encrypt("ab"): (already traced above) returns "cdef"
 *
 * decrypt("cdef"):
 *   - `targetEncryptedString = "cdef"`
 *   - `this.encryptedDictionaryCounts.get("cdef")` is `1`.
 *   - Returns `1`.
 *
 * decrypt("efcd"):
 *   - `targetEncryptedString = "efcd"`
 *   - `this.encryptedDictionaryCounts.get("efcd")` is `1`.
 *   - Returns `1`.
 *
 * decrypt("xyz"):
 *   - `targetEncryptedString = "xyz"`
 *   - `this.encryptedDictionaryCounts.get("xyz")` is `undefined`.
 *   - Returns `0`.
 * Time Complexity: O(K + D * L_max * V_len)
 * Space Complexity: O(K * V_len + D * L_max * V_len)
 */
var Encrypter = function (keysInput, valuesInput, dictionaryInput) {
  this.charToMappedString = new Map();
  this.encryptedDictionaryCounts = new Map();

  for (
    let keyMappingIndex = 0;
    keyMappingIndex < keysInput.length;
    keyMappingIndex++
  ) {
    this.charToMappedString.set(
      keysInput[keyMappingIndex],
      valuesInput[keyMappingIndex],
    );
  }

  for (const dictEntry of dictionaryInput) {
    const generatedEncryptedWord = this.encrypt(dictEntry);
    if (generatedEncryptedWord !== "") {
      this.encryptedDictionaryCounts.set(
        generatedEncryptedWord,
        (this.encryptedDictionaryCounts.get(generatedEncryptedWord) || 0) + 1,
      );
    }
  }
};

Encrypter.prototype.encrypt = function (word1) {
  let encryptedOutput = "";

  for (const sourceCharacter of word1) {
    if (!this.charToMappedString.has(sourceCharacter)) {
      return "";
    }
    encryptedOutput += this.charToMappedString.get(sourceCharacter);
  }

  return encryptedOutput;
};

Encrypter.prototype.decrypt = function (word2) {
  return this.encryptedDictionaryCounts.get(word2) || 0;
};
