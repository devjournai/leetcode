/**
 * Group Shifted Strings
 * Intuition: Strings that become each other by a uniform alphabet shift share the same sequence of adjacent letter distances (mod 26). Length-1 strings all share one dummy key.
 * Approach: 1. For length 1, key = `'lengthOne'`. 2. Else push `(s[i]-s[i-1]+26)%26` for each adjacent pair and join with commas. 3. Bucket each input string by that key. 4. Return the map’s value arrays.
 * Dry Run: ["abc", "bcd", "a"].
 *   - "abc" diffs 1,1; "bcd" diffs 1,1 → same group. "a" → lengthOne group. Return [["abc","bcd"], ["a"]].
 * Time Complexity: O(N * L)
 * Space Complexity: O(N * L)
 */
var groupStrings = function (inputStrings) {
  const classifiedGroups = new Map();

  const getShiftPattern = (processingString) => {
    const stringLengthValue = processingString.length;
    if (stringLengthValue === 1) {
      return "lengthOne";
    }

    const computedDiffs = [];
    for (
      let charIterator = 1;
      charIterator < stringLengthValue;
      charIterator++
    ) {
      const currentAsciiValue = processingString.charCodeAt(charIterator);
      const previousAsciiValue = processingString.charCodeAt(charIterator - 1);
      let diffRaw = currentAsciiValue - previousAsciiValue;
      const diffNormalized = (diffRaw + 26) % 26;
      computedDiffs.push(diffNormalized);
    }
    return computedDiffs.join(",");
  };

  for (const currentInputItem of inputStrings) {
    const stringPattern = getShiftPattern(currentInputItem);
    if (!classifiedGroups.has(stringPattern)) {
      classifiedGroups.set(stringPattern, []);
    }
    const existingGroupList = classifiedGroups.get(stringPattern);
    existingGroupList.push(currentInputItem);
  }

  const finalResultArray = Array.from(classifiedGroups.values());
  return finalResultArray;
};
