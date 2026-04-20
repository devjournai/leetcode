/**
 * Design In Memory File System
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var FileSystem = function () {
  this.rootDirectory = new Map();
};

FileSystem.prototype.ls = function (path) {
  const pathSegmentsLs = path === "/" ? [] : path.split("/").slice(1);
  let currentPointerLs = this.rootDirectory;

  for (const segmentLs of pathSegmentsLs) {
    currentPointerLs = currentPointerLs.get(segmentLs);
  }

  if (typeof currentPointerLs === "string") {
    const fileNameLs = pathSegmentsLs[pathSegmentsLs.length - 1];
    return [fileNameLs];
  }

  const directoryContentNames = Array.from(currentPointerLs.keys());
  const sortedResult = directoryContentNames.sort();
  return sortedResult;
};

FileSystem.prototype.mkdir = function (path) {
  const directoryPieces = path.split("/").slice(1);
  let traverseNodeMkdir = this.rootDirectory;

  for (const pieceMkdir of directoryPieces) {
    if (!traverseNodeMkdir.has(pieceMkdir)) {
      traverseNodeMkdir.set(pieceMkdir, new Map());
    }
    traverseNodeMkdir = traverseNodeMkdir.get(pieceMkdir);
  }
};

FileSystem.prototype.addContentToFile = function (filePath, content) {
  const filePathUnits = filePath.split("/").slice(1);
  const fileIdentifier = filePathUnits.pop();
  let currentLocationAdd = this.rootDirectory;

  for (const unitAdd of filePathUnits) {
    if (!currentLocationAdd.has(unitAdd)) {
      currentLocationAdd.set(unitAdd, new Map());
    }
    currentLocationAdd = currentLocationAdd.get(unitAdd);
  }

  const existingText = currentLocationAdd.get(fileIdentifier) || "";
  const newTextValue = existingText + content;
  currentLocationAdd.set(fileIdentifier, newTextValue);
};

FileSystem.prototype.readContentFromFile = function (filePath) {
  const readPathComponents = filePath.split("/").slice(1);
  const requestedFileName = readPathComponents.pop();
  let readNode = this.rootDirectory;

  for (const readComponent of readPathComponents) {
    readNode = readNode.get(readComponent);
  }

  const fileStringContent = readNode.get(requestedFileName);
  return fileStringContent;
};
