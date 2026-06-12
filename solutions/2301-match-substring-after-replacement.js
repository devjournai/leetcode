/**
 * Match Substring After Replacement
 * Intuition: A substring match can occur if characters match directly, or if a character from `sub` can be replaced by the corresponding character in `s` according to the provided mappings.
 * Approach: 1. Preprocess the `mappings` into a hash map where keys are original characters from `sub` and values are sets of characters they can be replaced with. This allows for efficient O(1) average time lookup. 2. Iterate through all possible starting positions of `sub` within `s`. 3. For each starting position, compare `sub` character by character with the corresponding segment of `s`. 4. If characters at a given position do not match, consult the preprocessed mappings to see if `sub`'s character can be replaced by `s`'s character. 5. If all characters match (either directly or via mapping) for a given starting position, return true. 6. If no such match is found after checking all possible starting positions, return false.
 * Dry Run: s = "abc", sub = "axc", mappings = [["x","b"]]
 * 1. Preprocessing: `charMappingStore` = Map {'x' -> Set {'b'}}.
 * 2. `sourceStringLength` = 3, `subStringLength` = 3.
 * 3. Loop `currentSIndex` from 0 to (3 - 3) = 0.
 *    `currentSIndex` = 0:
 *      `segmentMatchPossible` = true.
 *      Loop `subCharIter` from 0 to 2.
 *        `subCharIter` = 0:
 *          `sCharValue` = s[0] = 'a'. `subCharValue` = sub[0] = 'a'. They match. Continue.
 *        `subCharIter` = 1:
 *          `sCharValue` = s[1] = 'b'. `subCharValue` = sub[1] = 'x'. They do not match.
 *          Check `charMappingStore`. Does 'x' exist as a key? Yes.
 *          `potentialReplacementSet` = `charMappingStore.get('x')` = Set {'b'}.
 *          Does `potentialReplacementSet` contain 'b'? Yes. Match by mapping. Continue.
 *        `subCharIter` = 2:
 *          `sCharValue` = s[2] = 'c'. `subCharValue` = sub[2] = 'c'. They match. Continue.
 *      Inner loop completes. `segmentMatchPossible` is true.
 *      Return `true`.
 * Time Complexity: O(M + (N - L + 1) * L)
 * Space Complexity: O(M + A)
 */
var matchReplacement = function (s, sub, mappings) {
  const charMappingStore = new Map();

  for (const mappingEntry of mappings) {
    const originalCharacter = mappingEntry[0];
    const targetCharacter = mappingEntry[1];
    if (!charMappingStore.has(originalCharacter)) {
      charMappingStore.set(originalCharacter, new Set());
    }
    charMappingStore.get(originalCharacter).add(targetCharacter);
  }

  const sourceStringLength = s.length;
  const subStringLength = sub.length;

  for (
    let currentSIndex = 0;
    currentSIndex <= sourceStringLength - subStringLength;
    currentSIndex++
  ) {
    let segmentMatchPossible = true;
    for (let subCharIter = 0; subCharIter < subStringLength; subCharIter++) {
      const sCharValue = s[currentSIndex + subCharIter];
      const subCharValue = sub[subCharIter];

      if (sCharValue !== subCharValue) {
        const potentialReplacementSet = charMappingStore.get(subCharValue);
        if (
          !potentialReplacementSet ||
          !potentialReplacementSet.has(sCharValue)
        ) {
          segmentMatchPossible = false;
          break;
        }
      }
    }
    if (segmentMatchPossible) {
      return true;
    }
  }

  return false;
};
