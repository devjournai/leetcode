/**
 * Groups Of Strings
 * Intuition: The problem describes connectivity between strings based on character set modifications. This naturally suggests a graph problem where strings are nodes and connections are edges. Since we need to find the number of connected components and the size of the largest, a Union-Find (Disjoint Set Union) data structure is ideal for efficiently managing these groups. Representing each string's unique character set as a bitmask allows for quick computation of potential connections.
 * Approach:
 * 1. Initialize a Union-Find data structure with `N` elements, where `N` is the number of input strings. Each string initially belongs to its own group.
 * 2. Convert each input string into a unique bitmask. A '1' at bit `k` indicates the presence of the `k`-th letter of the alphabet ('a' is 0, 'b' is 1, etc.). Store these bitmasks in an array.
 * 3. Create a map, `maskToRepresentativeIndex`, to store the first encountered index for each unique bitmask. Iterate through the `bitmasks` array. If a mask has been seen before, use the Union-Find structure to unite the current string's index with the previously recorded index for that mask, as strings with identical character sets belong to the same group.
 * 4. Iterate through each string's original index (and its corresponding bitmask) to find connections via add, delete, or replace operations. To optimize, maintain a set `processedUniqueMasks` to ensure each unique mask is processed for connections only once.
 * 5. For each `currentMaskValue` being processed:
 *    a. Iterate through `bitPosition` from 0 to 25 (representing 'a' through 'z').
 *    b. Check for an "add" operation: If `bitPosition` is not set in `currentMaskValue`, generate `maskWithAddedLetter` by setting `bitPosition`. If `maskWithAddedLetter` exists in `maskToRepresentativeIndex`, unite the current string's index with the representative index of `maskWithAddedLetter`.
 *    c. Check for a "delete" operation: If `bitPosition` is set in `currentMaskValue`, generate `maskWithDeletedLetter` by unsetting `bitPosition`. If `maskWithDeletedLetter` exists, unite.
 *    d. Check for a "replace" operation: If `bitPosition` is set in `currentMaskValue` (this is the letter to be deleted), iterate through `anotherBitPosition` from 0 to 25. If `anotherBitPosition` is not set in `currentMaskValue` (this is the letter to be added), generate `maskAfterReplacement` by unsetting `bitPosition` and setting `anotherBitPosition`. If `maskAfterReplacement` exists, unite.
 * 6. After all connections are processed, the Union-Find structure holds the final groups. The number of groups is `disjointSet.setCount`, and the size of the largest group is obtained by calling `disjointSet.retrieveLargestGroupSize()`.
 * Dry Run: words = ["a", "b", "ab"]
 * 1. Initialization:
 *    - `totalStrings = 3`
 *    - `disjointSet = new UnionFind(3)`: `parentArray = [0,1,2]`, `setCount = 3`, `groupSizes = [1,1,1]`
 *    - `bitmasks = [1, 2, 3]` (for 'a', 'b', 'ab' respectively, using 0-bit for 'a', 1-bit for 'b')
 *    - `maskToRepresentativeIndex = Map()`
 *    - `processedUniqueMasks = Set()`
 *
 * 2. Populate `maskToRepresentativeIndex` and initial unions:
 *    - `currentWordIdx = 0`, `bitmasks[0] = 1`. `maskToRepresentativeIndex.set(1, 0)`.
 *    - `currentWordIdx = 1`, `bitmasks[1] = 2`. `maskToRepresentativeIndex.set(2, 1)`.
 *    - `currentWordIdx = 2`, `bitmasks[2] = 3`. `maskToRepresentativeIndex.set(3, 2)`.
 *    - `disjointSet` state remains `setCount = 3`, `groupSizes = [1,1,1]`.
 *
 * 3. Process connections:
 *    - `currentWordIdx = 0` (mask `1` for "a"):
 *      - `processedUniqueMasks` adds `1`.
 *      - `bitPosition = 0` (for 'a'):
 *        - Is set in `1`. Try delete: `maskWithDeletedLetter = 0`. Not in `maskToRepresentativeIndex`.
 *        - Try replace (delete 'a'):
 *          - `anotherBitPosition = 1` (for 'b'): Not set in `1`.
 *            `maskAfterReplacement = (1 ^ (1<<0)) | (1<<1) = 0 | 2 = 2` ('b').
 *            `maskToRepresentativeIndex` has `2` (representative `1`).
 *            `disjointSet.unite(0, 1)`: unites index `0` and `1`. `setCount = 2`, `groupSizes` becomes `[2,1,1]` (root `0` now has size `2`).
 *      - `bitPosition = 1` (for 'b'):
 *        - Not set in `1`. Try add: `maskWithAddedLetter = 1 | (1<<1) = 3` ('ab').
 *        - `maskToRepresentativeIndex` has `3` (representative `2`).
 *        - `disjointSet.unite(0, 2)`: unites root of `0` (which is `0`) and `2`. `setCount = 1`, `groupSizes` becomes `[3,1,1]` (root `0` now has size `3`).
 *    - `currentWordIdx = 1` (mask `2` for "b"):
 *      - `processedUniqueMasks` adds `2`.
 *      - `bitPosition = 0` (for 'a'):
 *        - Not set in `2`. Try add: `maskWithAddedLetter = 2 | (1<<0) = 3` ('ab').
 *        - `maskToRepresentativeIndex` has `3` (representative `2`).
 *        - `disjointSet.unite(1, 2)`: `1` and `2` are already in the same set as `0`. No change to `setCount` or `groupSizes`.
 *      - `bitPosition = 1` (for 'b'):
 *        - Is set in `2`. Try delete: `maskWithDeletedLetter = 0`. Not in `maskToRepresentativeIndex`.
 *        - Try replace (delete 'b'):
 *          - `anotherBitPosition = 0` (for 'a'): Not set in `2`.
 *            `maskAfterReplacement = (2 ^ (1<<1)) | (1<<0) = 0 | 1 = 1` ('a').
 *            `maskToRepresentativeIndex` has `1` (representative `0`).
 *            `disjointSet.unite(1, 0)`: `1` and `0` are already in the same set. No change.
 *    - `currentWordIdx = 2` (mask `3` for "ab"):
 *      - `processedUniqueMasks` adds `3`. All checks for `add`, `delete`, `replace` with existing masks will result in no new unions as `0, 1, 2` are already connected.
 *
 * 4. Result: `disjointSet.setCount = 1`, `disjointSet.retrieveLargestGroupSize() = 3`. Returns `[1, 3]`.
 *
 * Time Complexity: O(N * (L + A^2 * α(N)))
 * Space Complexity: O(N + A^2)
 */
class UnionFindStructure {
  constructor(totalElements) {
    this.parentArray = Array(totalElements)
      .fill()
      .map((_val, idx) => idx);
    this.rankArray = Array(totalElements).fill(0);
    this.setCount = totalElements;
    this.groupSizes = Array(totalElements).fill(1);
  }

  findRoot(elementIndex) {
    if (this.parentArray[elementIndex] !== elementIndex) {
      this.parentArray[elementIndex] = this.findRoot(
        this.parentArray[elementIndex]
      );
    }
    return this.parentArray[elementIndex];
  }

  unite(elementOne, elementTwo) {
    let rootOfElementOne = this.findRoot(elementOne);
    let rootOfElementTwo = this.findRoot(elementTwo);

    if (rootOfElementOne === rootOfElementTwo) return false;

    if (this.rankArray[rootOfElementOne] < this.rankArray[rootOfElementTwo]) {
      this.parentArray[rootOfElementOne] = rootOfElementTwo;
      this.groupSizes[rootOfElementTwo] += this.groupSizes[rootOfElementOne];
    } else if (
      this.rankArray[rootOfElementOne] > this.rankArray[rootOfElementTwo]
    ) {
      this.parentArray[rootOfElementTwo] = rootOfElementOne;
      this.groupSizes[rootOfElementOne] += this.groupSizes[rootOfElementTwo];
    } else {
      this.parentArray[rootOfElementTwo] = rootOfElementOne;
      this.rankArray[rootOfElementOne]++;
      this.groupSizes[rootOfElementOne] += this.groupSizes[rootOfElementTwo];
    }

    this.setCount--;
    return true;
  }

  retrieveLargestGroupSize() {
    let maximumSize = 0;
    for (let idx = 0; idx < this.parentArray.length; idx++) {
      if (this.parentArray[idx] === idx) {
        maximumSize = Math.max(maximumSize, this.groupSizes[idx]);
      }
    }
    return maximumSize;
  }
}

var groupStrings = function (inputWords) {
  const totalStrings = inputWords.length;
  const allWordBitmasks = inputWords.map((currentWord) => {
    let wordBitmask = 0;
    let charIndex = 0;
    while (charIndex < currentWord.length) {
      wordBitmask |=
        1 << (currentWord.charCodeAt(charIndex) - "a".charCodeAt(0));
      charIndex++;
    }
    return wordBitmask;
  });

  const disjointSet = new UnionFindStructure(totalStrings);
  const maskToRepresentativeIndex = new Map();
  let indexIterator = 0;
  while (indexIterator < totalStrings) {
    const currentMaskValue = allWordBitmasks[indexIterator];
    if (maskToRepresentativeIndex.has(currentMaskValue)) {
      disjointSet.unite(
        maskToRepresentativeIndex.get(currentMaskValue),
        indexIterator
      );
    } else {
      maskToRepresentativeIndex.set(currentMaskValue, indexIterator);
    }
    indexIterator++;
  }

  const processedUniqueMasks = new Set();
  let wordScanner = 0;
  while (wordScanner < totalStrings) {
    const currentStringMask = allWordBitmasks[wordScanner];

    if (processedUniqueMasks.has(currentStringMask)) {
      wordScanner++;
      continue;
    }
    processedUniqueMasks.add(currentStringMask);

    let alphabetBitPosition = 0;
    while (alphabetBitPosition < 26) {
      const oneBit = 1 << alphabetBitPosition;

      if (!((currentStringMask >> alphabetBitPosition) & 1)) {
        const maskAfterAdd = currentStringMask | oneBit;
        if (maskToRepresentativeIndex.has(maskAfterAdd)) {
          disjointSet.unite(
            wordScanner,
            maskToRepresentativeIndex.get(maskAfterAdd)
          );
        }
      }

      if ((currentStringMask >> alphabetBitPosition) & 1) {
        const maskAfterDelete = currentStringMask ^ oneBit;
        if (maskToRepresentativeIndex.has(maskAfterDelete)) {
          disjointSet.unite(
            wordScanner,
            maskToRepresentativeIndex.get(maskAfterDelete)
          );
        }

        let replacementBitPosition = 0;
        while (replacementBitPosition < 26) {
          if (!((currentStringMask >> replacementBitPosition) & 1)) {
            const replacementBit = 1 << replacementBitPosition;
            const maskAfterReplacement =
              (currentStringMask ^ oneBit) | replacementBit;
            if (maskToRepresentativeIndex.has(maskAfterReplacement)) {
              disjointSet.unite(
                wordScanner,
                maskToRepresentativeIndex.get(maskAfterReplacement)
              );
            }
          }
          replacementBitPosition++;
        }
      }
      alphabetBitPosition++;
    }
    wordScanner++;
  }

  return [disjointSet.setCount, disjointSet.retrieveLargestGroupSize()];
};
