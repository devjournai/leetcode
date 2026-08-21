/**
 * Crawler Log Folder
 * Intuition: Depth counter: '../' goes up if not at root, './' is a no-op, otherwise enter a folder.
 * Approach: 1. level=0. 2. ../ decrement if >0; ./ skip; else increment. 3. Return level.
 * Dry Run: logs = ["d1/","d2/","../","d21/","./"].
 *   - End depth 2.
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
