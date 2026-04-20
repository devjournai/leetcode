/**
 * Find Duplicate File In System
 * Time Complexity: O(S + P^2)
 * Space Complexity: O(S)
 */
var findDuplicate = function (paths) {
  const contentToPathListMap = new Map();
  const totalPathEntries = paths.length;

  for (let pathIndex = 0; pathIndex < totalPathEntries; pathIndex++) {
    const currentPathString = paths[pathIndex];
    const pathSegments = currentPathString.split(" ");
    const baseDirectoryIdentifier = pathSegments[0];
    const fileDescriptions = pathSegments.slice(1);
    const numberOfFiles = fileDescriptions.length;

    for (let fileIndex = 0; fileIndex < numberOfFiles; fileIndex++) {
      const singleFileDescription = fileDescriptions[fileIndex];
      const contentStartIndex = singleFileDescription.indexOf("(");

      const extractedFileName = singleFileDescription.substring(
        0,
        contentStartIndex,
      );
      const rawContentSegment = singleFileDescription.substring(
        contentStartIndex + 1,
      );

      const cleanedFileContent = rawContentSegment.slice(0, -1);
      const composedFilePath = `${baseDirectoryIdentifier}/${extractedFileName}`;

      const existingPathArray = contentToPathListMap.get(cleanedFileContent);
      const updatedPathsForContent = (existingPathArray || []).concat([
        composedFilePath,
      ]);
      contentToPathListMap.set(cleanedFileContent, updatedPathsForContent);
    }
  }

  const allPathCollections = Array.from(contentToPathListMap.values());
  const finalDuplicateGroups = allPathCollections.filter(
    (pathCollectionCandidate) => pathCollectionCandidate.length > 1,
  );

  return finalDuplicateGroups;
};
