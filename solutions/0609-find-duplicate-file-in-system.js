/**
 * Find Duplicate File In System
 * Intuition: Group files by content. Parse each `"dir file(content)..."` line into full paths, map content → path list, then keep groups with more than one path.
 * Approach: 1. Split each `currentPathString` on spaces: first token `baseDirectoryIdentifier`, rest file descriptions. 2. `indexOf("(")` splits name vs content; `slice(0,-1)` drops the closing `)`. 3. Concatenate `base/name` onto `contentToPathListMap`. 4. Filter `values()` where `pathCollectionCandidate.length > 1`.
 * Dry Run: paths=["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)"].
 *   - "abcd" → ["root/a/1.txt","root/c/3.txt"]; "efgh" singleton dropped. Return the abcd group.
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
        contentStartIndex
      );
      const rawContentSegment = singleFileDescription.substring(
        contentStartIndex + 1
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
    (pathCollectionCandidate) => pathCollectionCandidate.length > 1
  );

  return finalDuplicateGroups;
};
