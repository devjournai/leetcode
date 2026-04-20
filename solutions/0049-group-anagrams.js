/**
 * Group Anagrams
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
