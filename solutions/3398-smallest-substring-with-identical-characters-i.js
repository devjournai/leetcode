/**
 * Smallest Substring With Identical Characters I
 * Intuition: After at most `numOps` flips of bits, minimize the longest run of identical characters. Binary search that length `m`.
 * Approach: 1. Search `m` in [1, n]. 2. If `m === 1`, the string must be 0101... or 1010...; ops = min mismatches. 3. Otherwise a run of length `L` needs `floor(L / (m + 1))` flips. Feasible when total ops ≤ numOps.
 * Dry Run: s = "000001", numOps = 1. One flip can break the five 0s so the longest run becomes 3 (e.g. 000101).
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */

var minLength = function (s, numOps) {
  let lowLength = 1;
  let highLength = s.length;

  while (lowLength < highLength) {
    const midLength = Math.floor((lowLength + highLength) / 2);
    if (getMinOps(s, midLength) <= numOps) {
      highLength = midLength;
    } else {
      lowLength = midLength + 1;
    }
  }

  return lowLength;
};

function getMinOps(s, maxRunLength) {
  if (maxRunLength === 1) {
    let patternMismatches = 0;
    for (let index = 0; index < s.length; index++) {
      if (s.charCodeAt(index) - 48 === index % 2) {
        patternMismatches++;
      }
    }
    return Math.min(patternMismatches, s.length - patternMismatches);
  }

  let requiredOps = 0;
  let runningLength = 1;
  for (let index = 1; index < s.length; index++) {
    if (s[index] === s[index - 1]) {
      runningLength++;
    } else {
      requiredOps += Math.floor(runningLength / (maxRunLength + 1));
      runningLength = 1;
    }
  }
  return requiredOps + Math.floor(runningLength / (maxRunLength + 1));
}
