/**
 * Crawler Log Folder
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minOperations = function (logs) {
  let currentFolderLevel = 0;

  for (const logCommand of logs) {
    if (logCommand === "../") {
      if (currentFolderLevel > 0) {
        currentFolderLevel--;
      }
    } else if (logCommand === "./") {
    } else {
      currentFolderLevel++;
    }
  }

  return currentFolderLevel;
};
