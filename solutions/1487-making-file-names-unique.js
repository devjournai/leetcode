/**
 * Making File Names Unique
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
