/**
 * Making File Names Unique
 * Intuition: Track the next suffix to try per base name. On collision, bump k until name(k) is unused, then record both the base's next k and the new unique name.
 * Approach: 1. Map name -> next suffix to try (0 unused means first occurrence). 2. If unseen, emit as-is and set count 1. 3. Else start from stored suffix, while candidate exists increment. 4. Emit candidate, update base suffix and mark candidate used.
 * Dry Run: names = ["gta","gta(1)","gta","avalon"]
 *   - gta, gta(1) taken, next gta -> gta(2), avalon
 *   - ["gta","gta(1)","gta(2)","avalon"]
 * Time Complexity: O(N * (L + logK_max))
 * Space Complexity: O(N * (L + logK_max))
 */
var getFolderNames = function (inputNamesArray) {
  const folderNameOccurrences = new Map();
  const finalFolderList = [];

  for (const currentFolderName of inputNamesArray) {
    if (!folderNameOccurrences.has(currentFolderName)) {
      finalFolderList.push(currentFolderName);
      folderNameOccurrences.set(currentFolderName, 1);
    } else {
      let currentSuffixValue = folderNameOccurrences.get(currentFolderName);
      let candidateFileName = `${currentFolderName}(${currentSuffixValue})`;

      while (folderNameOccurrences.has(candidateFileName)) {
        currentSuffixValue++;
        candidateFileName = `${currentFolderName}(${currentSuffixValue})`;
      }

      finalFolderList.push(candidateFileName);
      folderNameOccurrences.set(currentFolderName, currentSuffixValue + 1);
      folderNameOccurrences.set(candidateFileName, 1);
    }
  }

  return finalFolderList;
};
