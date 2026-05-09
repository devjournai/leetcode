/**
 * Delete Duplicate Folders In System
 * Time Complexity: O(N * L * log(D))
 * Space Complexity: O(N * L)
 */
var deleteDuplicateFolder = function (inputPaths) {
  const rootNode = {};

  for (let pathIndex = 0; pathIndex < inputPaths.length; ++pathIndex) {
    let currentTrieNode = rootNode;
    const currentPathSegments = inputPaths[pathIndex];
    for (
      let segmentIndex = 0;
      segmentIndex < currentPathSegments.length;
      ++segmentIndex
    ) {
      const folderNameSegment = currentPathSegments[segmentIndex];
      if (!currentTrieNode[folderNameSegment]) {
        currentTrieNode[folderNameSegment] = {};
      }
      currentTrieNode = currentTrieNode[folderNameSegment];
    }
  }

  const structureIdentifierMap = new Map();

  const performSerializationAndMapStructures = (treeNode, pathAccumulator) => {
    const childKeys = Object.keys(treeNode);
    if (childKeys.length === 0) {
      return "";
    }

    const aggregatedChildStructures = [];
    childKeys.sort();

    for (
      let childKeyCursor = 0;
      childKeyCursor < childKeys.length;
      ++childKeyCursor
    ) {
      const childKeyName = childKeys[childKeyCursor];
      const childReferenceNode = treeNode[childKeyName];
      const subStructureId = performSerializationAndMapStructures(
        childReferenceNode,
        [...pathAccumulator, childKeyName],
      );
      aggregatedChildStructures.push(`${childKeyName}(${subStructureId})`);
    }

    const nodeStructureKey = aggregatedChildStructures.join("");

    if (nodeStructureKey.length > 0) {
      if (!structureIdentifierMap.has(nodeStructureKey)) {
        structureIdentifierMap.set(nodeStructureKey, []);
      }
      structureIdentifierMap.get(nodeStructureKey).push(pathAccumulator);
    }

    return nodeStructureKey;
  };

  const initialSerializationKeys = Object.keys(rootNode);
  for (
    let initialSKeyIdx = 0;
    initialSKeyIdx < initialSerializationKeys.length;
    ++initialSKeyIdx
  ) {
    const topLevelFolderName = initialSerializationKeys[initialSKeyIdx];
    performSerializationAndMapStructures(rootNode[topLevelFolderName], [
      topLevelFolderName,
    ]);
  }

  const primaryDeletionTargetsSet = new Set();

  const mapEntries = Array.from(structureIdentifierMap.entries());
  for (
    let entryIteration = 0;
    entryIteration < mapEntries.length;
    ++entryIteration
  ) {
    const [structuralSignature, pathCollection] = mapEntries[entryIteration];
    if (pathCollection.length > 1) {
      for (
        let pathListIndex = 0;
        pathListIndex < pathCollection.length;
        ++pathListIndex
      ) {
        const individualPath = pathCollection[pathListIndex];
        primaryDeletionTargetsSet.add(individualPath.join("/"));
      }
    }
  }

  const finalDeletionSet = new Set();

  const markDescendantsForDeletion = (
    traversalNode,
    currentPathComponents,
    isParentMarked,
  ) => {
    const currentPathIdentifier = currentPathComponents.join("/");
    const shouldCurrentNodeBeMarked =
      isParentMarked || primaryDeletionTargetsSet.has(currentPathIdentifier);

    if (shouldCurrentNodeBeMarked) {
      finalDeletionSet.add(currentPathIdentifier);
    }

    const childrenOfCurrentNode = Object.keys(traversalNode);
    for (
      let childKeyCount = 0;
      childKeyCount < childrenOfCurrentNode.length;
      ++childKeyCount
    ) {
      const childKeyName = childrenOfCurrentNode[childKeyCount];
      markDescendantsForDeletion(
        traversalNode[childKeyName],
        [...currentPathComponents, childKeyName],
        shouldCurrentNodeBeMarked,
      );
    }
  };

  const topLevelFolderKeys = Object.keys(rootNode);
  for (
    let topKeyLoop = 0;
    topKeyLoop < topLevelFolderKeys.length;
    ++topKeyLoop
  ) {
    const topKeyName = topLevelFolderKeys[topKeyLoop];
    markDescendantsForDeletion(rootNode[topKeyName], [topKeyName], false);
  }

  const filteredPathsContainer = [];

  const collectNonDeletedPaths = (
    processingTreeElement,
    currentPathSegments,
  ) => {
    const assembledPathKey = currentPathSegments.join("/");
    if (finalDeletionSet.has(assembledPathKey)) {
      return;
    }

    if (currentPathSegments.length > 0) {
      filteredPathsContainer.push([...currentPathSegments]);
    }

    const childElementsList = Object.keys(processingTreeElement);
    for (
      let childElementIdx = 0;
      childElementIdx < childElementsList.length;
      ++childElementIdx
    ) {
      const childElementKey = childElementsList[childElementIdx];
      collectNonDeletedPaths(processingTreeElement[childElementKey], [
        ...currentPathSegments,
        childElementKey,
      ]);
    }
  };

  const initialFolderNamesForCollection = Object.keys(rootNode);
  for (
    let initialFldrIdx = 0;
    initialFldrIdx < initialFolderNamesForCollection.length;
    ++initialFldrIdx
  ) {
    const initialFolderName = initialFolderNamesForCollection[initialFldrIdx];
    collectNonDeletedPaths(rootNode[initialFolderName], [initialFolderName]);
  }

  return filteredPathsContainer;
};
