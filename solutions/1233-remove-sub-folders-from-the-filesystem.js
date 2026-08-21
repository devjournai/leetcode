/**
 * Remove Sub Folders From The Filesystem
 * Intuition: Lexicographic sort puts a parent immediately before its subfolders, so skip any path that starts with parent+"/".
 * Approach: 1. Sort paths. 2. Keep a path if the result is empty or it does not start with currentRoot+"/". 3. Update currentRoot when keeping.
 * Dry Run: ["/a","/a/b","/c/d"] → keep "/a", skip "/a/b", keep "/c/d".
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
