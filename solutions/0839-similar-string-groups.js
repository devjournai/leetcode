/**
 * Similar String Groups
 * Time Complexity: O(N^2 * L + N * alpha(N))
 * Space Complexity: O(N)
 */
var numSimilarGroups = function (strs) {
  const totalStrings = strs.length;
  const parentArray = Array.from(
    { length: totalStrings },
    (_, elementIndex) => elementIndex,
  );
  const depthArray = new Array(totalStrings).fill(0);

  const retrieveRoot = (elementIndex) => {
    if (parentArray[elementIndex] === elementIndex) {
      return elementIndex;
    }
    parentArray[elementIndex] = retrieveRoot(parentArray[elementIndex]);
    return parentArray[elementIndex];
  };

  const uniteSets = (idxA, idxB) => {
    const rootA = retrieveRoot(idxA);
    const rootB = retrieveRoot(idxB);

    if (rootA === rootB) {
      return;
    }

    if (depthArray[rootA] < depthArray[rootB]) {
      parentArray[rootA] = rootB;
    } else if (depthArray[rootB] < depthArray[rootA]) {
      parentArray[rootB] = rootA;
    } else {
      parentArray[rootB] = rootA;
      depthArray[rootA]++;
    }
  };

  const similarityCheck = (stringOne, stringTwo) => {
    if (stringOne === stringTwo) {
      return true;
    }

    let differenceCount = 0;
    const stringLength = stringOne.length;

    for (let charPosition = 0; charPosition < stringLength; charPosition++) {
      if (stringOne[charPosition] !== stringTwo[charPosition]) {
        differenceCount++;
        if (differenceCount > 2) {
          return false;
        }
      }
    }
    return differenceCount === 2;
  };

  for (let indexOuter = 0; indexOuter < totalStrings; indexOuter++) {
    for (
      let indexInner = indexOuter + 1;
      indexInner < totalStrings;
      indexInner++
    ) {
      if (similarityCheck(strs[indexOuter], strs[indexInner])) {
        uniteSets(indexOuter, indexInner);
      }
    }
  }

  const uniqueRoots = new Set();
  for (
    let currentElement = 0;
    currentElement < totalStrings;
    currentElement++
  ) {
    uniqueRoots.add(retrieveRoot(currentElement));
  }

  return uniqueRoots.size;
};
