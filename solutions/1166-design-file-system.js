/**
 * Design File System
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
