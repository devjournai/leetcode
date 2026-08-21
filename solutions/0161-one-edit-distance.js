/**
 * One Edit Distance
 * Intuition: Exactly one insert, delete, or replace is allowed. After aligning so A is the shorter string, a first mismatch is a replace (equal lengths) or a skip on B (insert into A). A second mismatch fails; a leftover extra char on B is the single insert.
 * Approach: 1. If `s === t`, return false. 2. If length diff > 1, return false. 3. Swap so `currentStringA` is shorter or equal. 4. Walk `pointerA`/`pointerB`; on mismatch, if `foundDifference` already, return false; if equal length advance both, else only `pointerB`. 5. Return `foundDifference` or `(lengthB - lengthA === 1)` (insert at the end).
 * Dry Run: s = "ab", t = "acb"
 * A is "ab", B is "acb". Mismatch at index 1: skip B's 'c'. Then 'b' matches. foundDifference true → true
 * Time Complexity: O(min(s.length, t.length))
 * Space Complexity: O(1)
 */
var isOneEditDistance = function (s, t) {
  if (s === t) {
    return false;
  }

  const initialLengthS = s.length;
  const initialLengthT = t.length;

  if (Math.abs(initialLengthS - initialLengthT) > 1) {
    return false;
  }

  let currentStringA = s;
  let currentStringB = t;
  let lengthA = initialLengthS;
  let lengthB = initialLengthT;

  if (lengthA > lengthB) {
    [currentStringA, currentStringB] = [currentStringB, currentStringA];
    [lengthA, lengthB] = [lengthB, lengthA];
  }

  let pointerA = 0;
  let pointerB = 0;
  let foundDifference = false;

  while (pointerA < lengthA && pointerB < lengthB) {
    if (currentStringA[pointerA] !== currentStringB[pointerB]) {
      if (foundDifference) {
        return false;
      }
      foundDifference = true;

      if (lengthA === lengthB) {
        pointerA++;
        pointerB++;
      } else {
        pointerB++;
      }
    } else {
      pointerA++;
      pointerB++;
    }
  }

  return foundDifference || lengthB - lengthA === 1;
};
