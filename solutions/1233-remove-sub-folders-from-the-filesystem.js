/**
 * Remove Sub Folders From The Filesystem
 * Time Complexity: O(N * L * log N)
 * Space Complexity: O(N * L)
 */
var removeSubfolders = function (folder) {
  const sortedFolderPaths = [...folder];
  sortedFolderPaths.sort();

  const resultFolderCollection = [];
  let currentRootCandidate = "";

  for (let pathEntry of sortedFolderPaths) {
    const checkPrefix = currentRootCandidate + "/";
    if (
      resultFolderCollection.length === 0 ||
      !pathEntry.startsWith(checkPrefix)
    ) {
      resultFolderCollection.push(pathEntry);
      currentRootCandidate = pathEntry;
    }
  }

  return resultFolderCollection;
};
