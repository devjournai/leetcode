/**
 * Minimize Hamming Distance After Swap Operations
 * Time Complexity: O(N + M * α(N))
 * Space Complexity: O(N)
 */
var minimumHammingDistance = function (
  sourceInput,
  targetInput,
  allowedSwapsInput,
) {
  const dataLength = sourceInput.length;
  const parentDisjointSet = Array(dataLength)
    .fill(0)
    .map((_, currentItemIndex) => currentItemIndex);

  function findRoot(elementToFind) {
    if (parentDisjointSet[elementToFind] === elementToFind) {
      return elementToFind;
    }
    const foundRootPath = findRoot(parentDisjointSet[elementToFind]);
    parentDisjointSet[elementToFind] = foundRootPath;
    return foundRootPath;
  }

  function uniteSets(nodeAIndex, nodeBIndex) {
    const rootOfA = findRoot(nodeAIndex);
    const rootOfB = findRoot(nodeBIndex);
    if (rootOfA !== rootOfB) {
      parentDisjointSet[rootOfA] = rootOfB;
    }
  }

  for (
    let swapOperationIndex = 0;
    swapOperationIndex < allowedSwapsInput.length;
    swapOperationIndex++
  ) {
    const currentSwapPair = allowedSwapsInput[swapOperationIndex];
    const firstPosition = currentSwapPair[0];
    const secondPosition = currentSwapPair[1];
    uniteSets(firstPosition, secondPosition);
  }

  const componentToElementsMap = new Map();

  let arrayTraversalIndex = 0;
  while (arrayTraversalIndex < dataLength) {
    const componentIdentifier = findRoot(arrayTraversalIndex);
    let currentGroupStructure = componentToElementsMap.get(componentIdentifier);

    if (!currentGroupStructure) {
      currentGroupStructure = { originalValues: [], comparisonValues: [] };
      componentToElementsMap.set(componentIdentifier, currentGroupStructure);
    }
    currentGroupStructure.originalValues.push(sourceInput[arrayTraversalIndex]);
    currentGroupStructure.comparisonValues.push(
      targetInput[arrayTraversalIndex],
    );
    arrayTraversalIndex++;
  }

  let finalHammingDistance = 0;

  componentToElementsMap.forEach((groupData) => {
    const sourceGroupContent = groupData.originalValues;
    const targetGroupContent = groupData.comparisonValues;
    const valueFrequencyMap = new Map();

    let sourceContentIterator = 0;
    if (sourceGroupContent.length > 0) {
      do {
        const currentSourceValue = sourceGroupContent[sourceContentIterator];
        const existingCount = valueFrequencyMap.get(currentSourceValue) || 0;
        valueFrequencyMap.set(currentSourceValue, existingCount + 1);
        sourceContentIterator++;
      } while (sourceContentIterator < sourceGroupContent.length);
    }

    for (const targetElementValue of targetGroupContent) {
      const availableInSource = valueFrequencyMap.get(targetElementValue) || 0;
      if (availableInSource === 0) {
        finalHammingDistance++;
      } else {
        valueFrequencyMap.set(targetElementValue, availableInSource - 1);
      }
    }
  });

  return finalHammingDistance;
};
