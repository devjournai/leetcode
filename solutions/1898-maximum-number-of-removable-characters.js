/**
 * Maximum Number Of Removable Characters
 * Intuition: If you can remove the first k removable indices and still have p as a subsequence, you can remove fewer. Binary-search k.
 * Approach: 1. Search currentMid in [0, removable.length]. 2. Put first mid indices in a Set. 3. Two-pointer check p against s skipping removed indices. 4. If p still matches, raise low; else lower high. Return `resultValue`.
 * Dry Run: s="abcacb", p="ab", removable=[3,1,0]. Can remove first 2. Return 2.
 * Time Complexity: O(R * log(R) + N * log(R))
 * Space Complexity: O(R)
 */
var maximumRemovals = function (s, p, removable) {
  let lowBoundary = 0;
  let highBoundary = removable.length;
  let resultValue = 0;

  while (lowBoundary <= highBoundary) {
    const currentMid = Math.floor((lowBoundary + highBoundary) / 2);

    const temporaryRemovedList = removable.slice(0, currentMid);
    const removedIndicesSet = new Set(temporaryRemovedList);

    let sPointer = 0;
    let pPointer = 0;

    while (sPointer < s.length && pPointer < p.length) {
      if (!removedIndicesSet.has(sPointer) && s[sPointer] === p[pPointer]) {
        pPointer++;
      }
      sPointer++;
    }

    if (pPointer === p.length) {
      resultValue = currentMid;
      lowBoundary = currentMid + 1;
    } else {
      highBoundary = currentMid - 1;
    }
  }

  return resultValue;
};
