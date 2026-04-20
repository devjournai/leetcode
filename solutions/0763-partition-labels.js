/**
 * Partition Labels
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var partitionLabels = function (s) {
  const lastOccurrenceMap = new Map();
  const stringLength = s.length;

  for (let charIndex = 0; charIndex < stringLength; charIndex++) {
    lastOccurrenceMap.set(s[charIndex], charIndex);
  }

  const partitionSizes = [];
  let currentSegmentPointer = 0;
  let beginOfPartition = 0;
  let furthestReach = 0;

  while (currentSegmentPointer < stringLength) {
    const currentChar = s[currentSegmentPointer];
    const charLastIndex = lastOccurrenceMap.get(currentChar);
    furthestReach = Math.max(furthestReach, charLastIndex);

    if (currentSegmentPointer === furthestReach) {
      const segmentLength = furthestReach - beginOfPartition + 1;
      partitionSizes.push(segmentLength);
      beginOfPartition = currentSegmentPointer + 1;
    }
    currentSegmentPointer++;
  }

  return partitionSizes;
};
