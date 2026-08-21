/**
 * Smallest Substring With Identical Characters II
 * Intuition: Same as 3398 but on longer strings: binary search the minimum achievable longest identical run after `numOps` bit flips.
 * Approach: 1. Binary search run length `m`. 2. `m = 1` needs an alternating string (choose the cheaper of the two patterns). 3. Longer `m` costs `floor(run / (m + 1))` flips per run.
 * Dry Run: s = "00000", numOps = 1. One flip in the middle yields longest run 2 (00 1 00).
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */

var minLength = function (s, numOps) {
  let lowLength = 1;
  let highLength = s.length;

  while (lowLength < highLength) {
    const midLength = Math.floor((lowLength + highLength) / 2);
    if (getMinOpsII(s, midLength) <= numOps) {
      highLength = midLength;
    } else {
      lowLength = midLength + 1;
    }
  }

  return lowLength;
};

function getMinOpsII(s, maxRunLength) {
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
