/**
 * Smallest String With Swaps
 * Intuition: Swappable indices form connected components; characters may be freely rearranged inside each component, so sort them into the sorted positions.
 * Approach: 1. Union-find on all pairs. 2. Group indices and characters by root. 3. Sort chars and indices; write sorted chars back into sorted index order.
 * Dry Run: s="dcab", pairs=[[0,3],[1,2]]. Components {0,3}:"da"→"ad", {1,2}:"cb"→"bc" → "bacd".
 * Time Complexity: O((N + M) * α(N) + N log N)
 * Space Complexity: O(N)
 */
var smallestStringWithSwaps = function (s, pairs) {
  const stringLength = s.length;
  const dsuParent = Array.from({ length: stringLength }, (_, i) => i);
  const dsuRank = new Array(stringLength).fill(0);

  const findSet = (elementIndex) => {
    if (dsuParent[elementIndex] === elementIndex) {
      return elementIndex;
    }
    dsuParent[elementIndex] = findSet(dsuParent[elementIndex]);
    return dsuParent[elementIndex];
  };

  const unionSets = (firstIndex, secondIndex) => {
    let rootOne = findSet(firstIndex);
    let rootTwo = findSet(secondIndex);

    if (rootOne !== rootTwo) {
      if (dsuRank[rootOne] < dsuRank[rootTwo]) {
        dsuParent[rootOne] = rootTwo;
      } else if (dsuRank[rootOne] > dsuRank[rootTwo]) {
        dsuParent[rootTwo] = rootOne;
      } else {
        dsuParent[rootTwo] = rootOne;
        dsuRank[rootOne]++;
      }
    }
  };

  for (let pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
    const currentPair = pairs[pairIndex];
    const indexA = currentPair[0];
    const indexB = currentPair[1];
    unionSets(indexA, indexB);
  }

  const componentGroups = new Map();
  for (let charPointer = 0; charPointer < stringLength; charPointer++) {
    const groupRoot = findSet(charPointer);
    if (!componentGroups.has(groupRoot)) {
      componentGroups.set(groupRoot, { memberIndices: [], memberChars: [] });
    }
    const currentGroup = componentGroups.get(groupRoot);
    currentGroup.memberIndices.push(charPointer);
    currentGroup.memberChars.push(s[charPointer]);
  }

  const resultStringArray = new Array(stringLength);

  for (const groupEntry of componentGroups.values()) {
    const currentMemberIndices = groupEntry.memberIndices;
    const currentMemberChars = groupEntry.memberChars;

    currentMemberChars.sort((charX, charY) => charX.localeCompare(charY));
    currentMemberIndices.sort((idxX, idxY) => idxX - idxY);

    for (
      let componentOffset = 0;
      componentOffset < currentMemberIndices.length;
      componentOffset++
    ) {
      const targetPosition = currentMemberIndices[componentOffset];
      const characterToInsert = currentMemberChars[componentOffset];
      resultStringArray[targetPosition] = characterToInsert;
    }
  }

  return resultStringArray.join("");
};
