/**
 * Maximum Number Of Removable Characters
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
