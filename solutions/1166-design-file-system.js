/**
 * Design File System
 * Intuition: Paths are created only if they are new and their parent already exists (root’s parent is empty). A map from full path string to value is enough.
 * Approach: 1. createPath: reject duplicates; parent is the prefix before the last '/'; if parent is nonempty it must exist; then store value. 2. get: return the map value or -1.
 * Dry Run: createPath("/leet",1) true; createPath("/leet/code",2) true; get("/leet/code")=2; createPath("/c/d",1) false (no /c).
 * Time Complexity: O(L)
 * Space Complexity: O(N*L_avg)
 */
var FileSystem = function () {
  this.pathDataStore = new Map();
};

FileSystem.prototype.createPath = function (path, value) {
  if (this.pathDataStore.has(path)) {
    return false;
  }

  const lastSeparatorIndex = path.lastIndexOf("/");
  const parentPathString = path.substring(0, lastSeparatorIndex);

  if (
    parentPathString.length > 0 &&
    !this.pathDataStore.has(parentPathString)
  ) {
    return false;
  }

  this.pathDataStore.set(path, value);
  return true;
};

FileSystem.prototype.get = function (path) {
  const requestedValue = this.pathDataStore.get(path);
  return requestedValue === undefined ? -1 : requestedValue;
};
