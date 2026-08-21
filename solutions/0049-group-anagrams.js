/**
 * Group Anagrams
 * Intuition: Anagrams share the same characters, so sorting each string yields a common key. A map from that key to a list groups them.
 * Approach: 1. Create an empty Map. 2. For each string, sort its characters and join them as the key. 3. Append the original string to that key’s list (create the list if needed). 4. Return the map’s values.
 * Dry Run: strs = ["eat", "tea", "tan", "ate"].
 *   - "eat"/"tea"/"ate" all key to "aet". "tan" keys to "ant".
 *   - Groups: [["eat","tea","ate"], ["tan"]].
 * Time Complexity: O(N * L * log L)
 * Space Complexity: O(N * L)
 */
var groupAnagrams = function (inputStrings) {
  const anagramGroupsMap = new Map();

  for (const currentString of inputStrings) {
    const charactersArray = [...currentString];
    const sortedKey = charactersArray.sort().join("");

    const existingGroup = anagramGroupsMap.get(sortedKey);

    if (existingGroup) {
      existingGroup.push(currentString);
    } else {
      anagramGroupsMap.set(sortedKey, [currentString]);
    }
  }

  return Array.from(anagramGroupsMap.values());
};
