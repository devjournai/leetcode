/**
 * Partition Labels
 * Intuition: A partition can end at index i only when every character seen in the current piece has its last occurrence at or before i. Track `furthestReach` while scanning.
 * Approach: 1. Fill `lastOccurrenceMap` with each char’s last index. 2. Walk with `currentSegmentPointer`, update `furthestReach = max(furthestReach, last of s[i])`. 3. When `i === furthestReach`, push `furthestReach - beginOfPartition + 1` and set `beginOfPartition` to i+1. Return `partitionSizes`.
 * Dry Run: s = "ababcbacadefegdehijhklij".
 *   - Last of a is 8, so the first piece grows until i=8 → length 9.
 *   - Next piece "defegde" ends at 15 → length 7; last piece length 8. Return [9,7,8].
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
