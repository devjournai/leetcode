/**
 * Repeated String Match
 * Intuition: B can sit inside A repeated just enough to cover B’s length, or one extra copy if it straddles the wrap. More than ceil(|B|/|A|)+1 copies cannot help.
 * Approach: 1. `baseRepetitions = ceil(B.length / A.length)`. 2. Try `A.repeat` for that count and count+1; return the first that `.includes(B)`. 3. Else -1.
 * Dry Run: A="abcd", B="cdabcdab". ceil(8/4)=2; "abcdabcd" does not contain B; 3 copies "abcdabcdabcd" does → 3.
 * Time Complexity: O(A.length + B.length)
 * Space Complexity: O(A.length + B.length)
 */
var repeatedStringMatch = function (A, B) {
  let baseRepetitions = Math.ceil(B.length / A.length);

  for (
    let currentRepetitionCount = baseRepetitions;
    currentRepetitionCount <= baseRepetitions + 1;
    currentRepetitionCount++
  ) {
    let constructedString = A.repeat(currentRepetitionCount);
    if (constructedString.includes(B)) {
      return currentRepetitionCount;
    }
  }

  return -1;
};
